<script setup lang="ts">
import { onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import CardModal from './card/Card-Modal.vue'
import { useMapStore } from '@/stores/map'
import type { Card } from '@/models/card'
import { getRandomFloat } from '@/utils/index'
import { NButton } from 'naive-ui'
import { useCardStore } from '@/stores/card'

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
    //定时更新位置
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
const cardStore = useCardStore()
const getRandomOffset = () => getRandomFloat(0.00001, 0.0001)
const showDisplayModal = ref(false)
const handleDisplayCard = (card: Card) => {
    cardStore.currentCard = card
    showDisplayModal.value = true
    showPostModal.value = false
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
//TODO 这里可能会有性能问题!
watch(cardStore.cards, () => {
    mapStore.clearMarkers()
    cardStore.cards.forEach((card) => {
        const lng = currentPos.longitude + getRandomOffset()
        const lat = currentPos.latitude + getRandomOffset()
        const pos: [number, number] = [lng, lat]
        mapStore.newMarker(pos).on('click', () => {
            handleDisplayCard(card)
        })
    })
})
//#endregion

//#endregion

//发布卡片
//#region
const showPostModal = ref(false)
const handlePostCard = () => {
    showDisplayModal.value = false
    showPostModal.value = true
}

//#endregion
</script>

<template>
    <div class="tip">
        <div>{{ currentPos.longitude }} | {{ currentPos.latitude }}</div>
        <div>{{ currStatus }} {{ posCount }}</div>
        <div>
            <n-button @click="handlePostCard">点我发布!</n-button>
        </div>
    </div>
    <card-modal
        v-model:show="showDisplayModal"
        v-model:post="showPostModal"
        :card="cardStore.currentCard"
    />
    <div ref="mapRef" :style="mapStyle"></div>
</template>

<style scoped>
.tip {
    position: absolute;
    z-index: 10;
    top: 25px;
}
</style>
