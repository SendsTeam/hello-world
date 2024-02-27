import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio-store', () => {
    const preAudio = new Audio('')
    const nextAudio = new Audio('') //作为缓存
    const audio = ref(preAudio)
    preAudio.loop = true
    nextAudio.loop = true
    const isInit = ref(false)
    const isPaused = ref(true)
    const loadTarget = ref<'pre' | 'next'>('pre') //一开始指向pre

    // 要确保链接是https的,不然无法加载
    function load(src: string) {
        isInit.value = true
        if (loadTarget.value === 'pre') {
            audio.value = preAudio
        } else {
            audio.value = nextAudio
        }
        audio.value.src = src
    }

    async function swap(nextSrc: string) {
        if (!isInit.value) return
        stop()
        load(nextSrc)
        await play()
    }

    async function play(target: HTMLAudioElement = audio.value) {
        if (!isInit.value) return
        await target.play()
        isPaused.value = false
    }

    function pause(target: HTMLAudioElement = audio.value) {
        if (!isInit.value) return
        target.pause()
        isPaused.value = true
    }

    function stop(target: HTMLAudioElement = audio.value) {
        if (!isInit.value) return
        target.pause()
        target.currentTime = 0
        isPaused.value = true
    }

    async function toggle(target: HTMLAudioElement = audio.value) {
        if (target.paused) {
            await play(target)
        } else {
            pause(target)
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
        isInit,
        loadTarget,
        audio,
        nextAudio,
        preAudio
    }
})
