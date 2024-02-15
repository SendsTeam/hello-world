<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useMapStore } from '@/stores/map'

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

//实时定位
//#region
const currPos = reactive({
    longitude: 0,
    latitude: 0
})
const currStatus = ref('')
const currMarker = ref<AMap.Marker>()
const posCount = ref(0)
navigator.geolocation.watchPosition(
    (pos) => {
        mapStore
            .fixPosition([pos.coords.longitude, pos.coords.latitude])
            .then((pos) => {
                currPos.longitude = pos[0]
                currPos.latitude = pos[1]
                currMarker.value?.setPosition(pos)
                posCount.value++
            })
            .catch((err) => {
                alert(err)
            })
    },
    (err) => {
        currStatus.value = err.message
    },
    {
        enableHighAccuracy: true
    }
)

//#endregion

//初始化地图
//#region
const mapRef = ref<HTMLDivElement | null>(null)
const mapStore = useMapStore()
await mapStore.initMap()
onMounted(() => {
    if (!mapRef.value) return
    navigator.geolocation.getCurrentPosition(
        async (pos) => {
            //先修正位置
            const center: [number, number] = await mapStore.fixPosition([
                pos.coords.longitude,
                pos.coords.latitude
            ])
            mapStore.newMap(mapRef.value!, {
                viewMode: '3D',
                center,
                zoom: 200
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
</script>

<template>
    <div class="tip">
        <div>{{ currPos.longitude }} | {{ currPos.latitude }}</div>
        <div>{{ currStatus }} {{ posCount }}</div>
    </div>
    <div ref="mapRef" :style="mapStyle"></div>
</template>

<style scoped>
.tip {
    position: absolute;
    z-index: 10;
    top: 25px;
}
</style>
