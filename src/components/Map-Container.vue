<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
// navigator.geolocation.watchPosition(
//     (pos) => {
//         console.log(pos.coords)
//     },
//     (err) => {
//         console.log(err)
//     }
// )

//#endregion

//初始化地图
//#region
const mapRef = ref<HTMLDivElement | null>(null)
const mapStore = useMapStore()
await mapStore.initMap()
onMounted(() => {
    if (!mapRef.value) return
    // navigator.geolocation.getCurrentPosition(
    //     (pos) => {
    //         // mapStore.newMap(mapRef.value!, {
    //         //     viewMode: '3D',
    //         //     center: [pos.coords.longitude, pos.coords.latitude],
    //         //     zoom: 200
    //         // })
    //         mapStore.newMap(mapRef.value!)
    //     },
    //     (err) => {
    //         alert('定位失败!')
    //         console.log(err)
    //     },
    //     { enableHighAccuracy: true }
    // )
    mapStore.newMap(mapRef.value!)
})

//#endregion
</script>

<template>
    <div ref="mapRef" :style="mapStyle"></div>
</template>
