import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio-store', () => {
    const audio = new Audio('')
    audio.loop = true
    const isInit = ref(false)
    const isPaused = ref(true)

    // 要确保链接是https的,不然无法加载
    function load(src: string) {
        audio.src = src
        isInit.value = true
    }

    async function swap(nextSrc: string) {
        if (!isInit.value) return
        stop()
        load(nextSrc)
        await play()
    }

    async function play() {
        if (!isInit.value) return
        await audio.play()
        isPaused.value = false
    }

    function pause() {
        if (!isInit.value) return
        audio.pause()
        isPaused.value = true
    }

    function stop() {
        if (!isInit.value) return
        audio.pause()
        audio.currentTime = 0
        isPaused.value = true
    }

    async function toggle() {
        if (audio.paused) {
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
        isPaused,
        isInit
    }
})
