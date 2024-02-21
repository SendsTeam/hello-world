<script setup lang="ts">
import type { Card } from '@/models/card'
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import CardModal from './card/Card-Modal.vue'
import FabContainer from './Fab-Container.vue'
import { useMapStore } from '@/stores/map'
import { getRandomFloat } from '@/utils/index'
import { useCardStore } from '@/stores/card'
import { useStatusStore } from '@/stores/status'

//Props
//#region
const { width, height } = withDefaults(
    defineProps<{
        width?: string
        height?: string
    }>(),
    {
        width: '100%',
        height: '100%'
    }
)
const mapStyle = {
    width,
    height
}
//#endregion

//Store
//#region
const statusStore = useStatusStore()
const cardStore = useCardStore()
//#endregion

//初始化地图
//#region
const mapRef = ref<HTMLDivElement | null>(null)
const mapStore = useMapStore()
await mapStore.initMap()
onMounted(() => {
    if (!mapRef.value) return
    //根据当前位置初始化地图
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            //先修正位置
            const center: [number, number] = await mapStore.fixPosition([
                pos.coords.longitude,
                pos.coords.latitude
            ])
            mapStore.newMap(mapRef.value!, {
                viewMode: '2D',
                center,
                zoom: 20
            })
            currMarker.value = mapStore.newMarker(center)
            currStatus.value = '定位成功'
        },
        (err) => {
            currStatus.value = '定位失败'
            console.log(err)
        }
    )
})
//#endregion

//实时定位
//#region
const currentPos = reactive({
    longitude: 0,
    latitude: 0
})
const currStatus = ref('')
const currMarker = ref<AMap.Marker>()
const posCount = ref(0)
let watchPosId: number
onMounted(() => {
    //定时更新位置,确保currentPos存储的是经过转化后的正确坐标
    watchPosId = navigator.geolocation.watchPosition(
        async (pos) => {
            const center = await mapStore.fixPosition([pos.coords.longitude, pos.coords.latitude])
            currentPos.longitude = center[0]
            currentPos.latitude = center[1]
            currMarker.value?.setPosition(center)
            posCount.value++
        },
        (err) => {
            currStatus.value = err.message
        },
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 5000
        }
    )
})
onUnmounted(() => {
    navigator.geolocation.clearWatch(watchPosId)
})
//#endregion

//生成卡片
//#region
const getRandomOffset = () => getRandomFloat(0.00001, 0.0001)
const handleDisplayCard = (card: Card) => {
    cardStore.currentCard = card
    statusStore.mapPageStatus.showDisplayModal = true
    statusStore.mapPageStatus.showPostModal = false
}
//用watch监听定位成功后的pos并且初始化卡片
//#region
let once: boolean = false
watch(currentPos, () => {
    if (!once) {
        once = true
        cardStore.cards.forEach((card) => {
            const lng = currentPos.longitude + getRandomOffset()
            const lat = currentPos.latitude + getRandomOffset()
            const pos: [number, number] = [lng, lat]
            mapStore.newMarker(pos).on('click', () => {
                handleDisplayCard(card)
            })
        })
    } else {
        return
    }
})
//#endregion

//同步cards的最新状态
//#region
watch(
    () => cardStore.newCard,
    (newCard) => {
        if (newCard) {
            const lng = currentPos.longitude + getRandomOffset()
            const lat = currentPos.latitude + getRandomOffset()
            const pos: [number, number] = [lng, lat]
            mapStore.newMarker(pos).on('click', () => {
                handleDisplayCard(newCard)
            })
        }
    }
)
//#endregion

//#endregion
</script>

<template>
    <div id="meta">
        <div>{{ currentPos.longitude }} | {{ currentPos.latitude }}</div>
        <div>{{ currStatus }} {{ posCount }}</div>
    </div>
    <fab-container />
    <card-modal />
    <!-- 地图容器 -->
    <div ref="mapRef" :style="mapStyle"></div>
</template>

<style scoped>
#meta {
    position: absolute;
    z-index: 10;
    top: 25px;
}
</style>
