import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMapStore = defineStore('map_store', () => {
    const isMapReady = ref(false)
    const _isInited = ref(false)
    const amap = ref()
    async function initMap() {
        if (_isInited.value) return
        ;(window as any)._AMapSecurityConfig = {
            securityJsCode: 'dd844b500f9cfbe5b37e18747722b498'
        }
        isMapReady.value = true
        _isInited.value = true
    }
    type MapOptions = {
        viewMode: '2D' | '3D'
        zoom: number
        center?: [number, number]
    }
    //使用定位插件
    AMap.plugin('AMap.Geolocation', () => {
        const geolocation = new AMap.Geolocation({
            enableHighAccuracy: true, // 是否使用高精度定位，默认：true
            timeout: 10000, // 设置定位超时时间，默认：无穷大
            offset: [20, 20], // 定位按钮的停靠位置的偏移量
            zoomToAccuracy: true, //  定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            position: 'RB' //  定位按钮的排放位置,  RB表示右下
        })

        geolocation.getCurrentPosition((status: string, result: any) => {
            if (status == 'complete') {
                onComplete(result)
            } else {
                onError(result)
            }
        })

        function onComplete(data: any) {
            // data是具体的定位信息
            console.log(data)
        }

        function onError(data: any) {
            // 定位出错
            console.log(data)
        }
    })
    function newMap<T extends HTMLDivElement>(
        el: T,
        opts: MapOptions = {
            viewMode: '3D', // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
            zoom: 20 // 初始化地图层级
        }
    ) {
        if (_isInited.value) {
            amap.value = new AMap.Map(el, opts)
        }
    }

    return {
        initMap,
        newMap,
        isMapReady
    }
})
