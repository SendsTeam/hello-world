import { defineStore } from 'pinia'
import '@amap/amap-jsapi-types'
import { ref } from 'vue'

export const useMapStore = defineStore('map_store', () => {
    const isMapReady = ref(false)
    const _isInited = ref(false)
    const map = ref<AMap.Map>()
    async function initMap() {
        if (_isInited.value) return
        isMapReady.value = true
        _isInited.value = true
    }

    //创建标记
    //#region
    function newMarker(position: [number, number]): AMap.Marker {
        const marker = new AMap.Marker({
            icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
            position,
        })
        marker.setMap(map.value)
        return marker
    }
    //#endregion

    //修正坐标
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
        map.value = new AMap.Map(el, opts)
    }
    //#endregion

    return {
        initMap,
        newMap,
        newMarker,
        fixPosition,
        isMapReady
    }
})
