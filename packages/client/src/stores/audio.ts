import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio-store', () => {
    const preAudio = new Audio('')
    const nextAudio = new Audio('')
    preAudio.loop = true
    nextAudio.loop = true
    type AudioTarget = 'pre' | 'next'
    const currentAudio = reactive({
        target: 'pre' as AudioTarget | '', //引用的sourceTarget
        source: preAudio,
        paused: true
    })
    //即将装载的目标
    const loadTarget = ref<AudioTarget>('pre') //一开始指向pre

    // 要确保链接是https的,不然无法加载
    function load(src: string, target: AudioTarget = loadTarget.value) {
        currentAudio.source = target === 'pre' ? preAudio : nextAudio
        currentAudio.source.src = src
        currentAudio.target = target
    }

    async function play(target?: AudioTarget) {
        if (target === 'pre') {
            stop('next')
            await preAudio.play()
        } else if (target === 'next') {
            stop('pre')
            await nextAudio.play()
        } else {
            await currentAudio.source.play()
            currentAudio.paused = false
        }
    }

    function pause(target?: AudioTarget) {
        if (target === 'pre') {
            preAudio.pause()
        } else if (target === 'next') {
            nextAudio.pause()
        } else {
            currentAudio.source.pause()
            currentAudio.paused = true
        }
    }

    function stop(target?: AudioTarget) {
        if (target === 'pre') {
            preAudio.pause()
            preAudio.currentTime = 0
        } else if (target === 'next') {
            nextAudio.pause()
            nextAudio.currentTime = 0
        } else {
            currentAudio.source.pause()
            currentAudio.source.currentTime = 0
        }
    }

    async function toggle(target?: AudioTarget) {
        if (target === 'pre') {
            preAudio.paused ? play(target) : pause(target)
        } else if (target === 'next') {
            nextAudio.paused ? play(target) : pause(target)
        } else {
            currentAudio.paused ? play() : pause()
        }
    }

    return {
        load,
        play,
        pause,
        stop,
        toggle,
        loadTarget,
        currentAudio,
        nextAudio,
        preAudio
    }
})
