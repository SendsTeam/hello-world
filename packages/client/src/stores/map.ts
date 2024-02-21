import { defineStore } from 'pinia'
import '@amap/amap-jsapi-types'
import { ref } from 'vue'

export const useMapStore = defineStore('map-store', () => {
    const isMapReady = ref(false)
    const _isInited = ref(false)
    const currentMap = ref<AMap.Map>()
    async function initMap() {
        if (_isInited.value) return
        isMapReady.value = true
        _isInited.value = true
    }

    //标记
    //#region
    const markers = ref<AMap.Marker[]>([])
    type MarkerPreset = {
        [key in 'Blue']: string
    }
    const _MarkerPresetMap: MarkerPreset = {
        Blue: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png'
    }
    function newMarker(
        position: [number, number],
        preset: keyof MarkerPreset = 'Blue'
    ): AMap.Marker {
        const marker = new AMap.Marker({
            icon: new AMap.Icon({
                image: _MarkerPresetMap[preset],
                imageSize: new AMap.Size(32, 40) //根据所设置的大小拉伸或压缩图片
            }),
            position,
            zooms: [15, 20]
        })
        console.log(marker.amapId)
        marker.setMap(currentMap.value)
        markers.value.push(marker)
        return marker
    }
    function clearMarkers() {
        markers.value.forEach((marker) => {
            marker.clearEvents('click').destroy()
        })
        markers.value = []
    }
    //#endregion

    //修正坐标:将当前坐标系的坐标转化为高德地图坐标系下的精准坐标
    //#region
    async function fixPosition(pos: [number, number]): Promise<[number, number]> {
        return new Promise((resolve, reject) => {
            AMap.convertFrom(
                pos,
                'gps',
                (status: any, result: { info: string; locations: AMap.LngLat[] }) => {
                    if (result.info === 'ok') {
                        const lnglat = result.locations[0]
                        resolve([lnglat.lng, lnglat.lat])
                    } else {
                        reject('Coordinate conversion failed')
                    }
                }
            )
        })
    }

    //#endregion

    //新建地图
    //#region
    type MapOptions = {
        viewMode: '2D' | '3D'
        zoom: number
        center?: [number, number]
    }
    function newMap<T extends HTMLDivElement>(
        el: T,
        opts: MapOptions = {
            viewMode: '3D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
            zoom: 20 // 初始化地图层级
        }
    ) {
        if (!_isInited.value) return
        currentMap.value = new AMap.Map(el, opts)
    }
    //#endregion

    return {
        initMap,
        newMap,
        newMarker,
        clearMarkers,
        fixPosition,
        currentMap,
        isMapReady
    }
})
