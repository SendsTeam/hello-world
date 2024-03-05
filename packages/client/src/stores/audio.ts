import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAudioStore = defineStore('audio-store', () => {
    const isFixed = ref(false)

    return {
        isFixed
    }
})
