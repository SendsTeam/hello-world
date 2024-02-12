import { defineStore } from 'pinia'

import AMapLoader from '@amap/amap-jsapi-loader'
import { ref } from 'vue'

export const useMapStore = defineStore('map_store', () => {
    // const AMap = ref()
    const isMapReady = ref(false)
    const _isInited = ref(false)
    async function initMap() {
        if (_isInited.value) return
        ;(window as any)._AMapSecurityConfig = {
            securityJsCode: 'dd844b500f9cfbe5b37e18747722b498'
        }
        // AMap.value = await AMapLoader.load({
        //     key: 'ce4efcd48481b1ca16eb621b59427c1a',
        //     version: '2.0'
        // })
        isMapReady.value = true
        _isInited.value = true
    }
    type MapOptions = {
        viewMode: '2D' | '3D'
        zoom: number
        center: [number, number]
    }
    function newMap<T extends HTMLDivElement>(
        el: T,
        opts: MapOptions = {
            viewMode: '3D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
            zoom: 11, // 初始化地图层级
            center: [116.397428, 39.90923] // 初始化地图中心点
        }
    ) {
        if (_isInited.value) {
            new AMap.Map(el, opts)
        }
    }

    return {
        initMap,
        newMap,
        isMapReady
    }
})
