import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio-store', () => {
    const audio = ref(new Audio(''))
    const nextAudio = new Audio('') //作为缓存
    audio.value.loop = true
    nextAudio.loop = true
    const isInit = ref(false)
    const isPaused = ref(true)

    // 要确保链接是https的,不然无法加载
    function load(src: string) {
        audio.value.src = src
        isInit.value = true
    }

    //使用缓存
    function useCache() {
        stop()
        audio.value = nextAudio
    }

    function loadCache(src: string) {
        nextAudio.src = src
    }

    async function swap(nextSrc: string) {
        if (!isInit.value) return
        stop()
        load(nextSrc)
        await play()
    }

    async function play() {
        if (!isInit.value) return
        await audio.value.play()
        isPaused.value = false
    }

    function pause() {
        if (!isInit.value) return
        audio.value.pause()
        isPaused.value = true
    }

    function stop() {
        if (!isInit.value) return
        audio.value.pause()
        audio.value.currentTime = 0
        isPaused.value = true
    }

    async function toggle() {
        if (audio.value.paused) {
            await play()
        } else {
            pause()
        }
    }

    return {
        load,
        play,
        pause,
        stop,
        toggle,
        swap,
        useCache,
        loadCache,
        isPaused,
        isInit,
        audio,
        nextAudio
    }
})
