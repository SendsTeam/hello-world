<template>
    <FixedMusicPlayer
        v-if="isFixed"
        v-model:pauseSignal="pauseFixedSignal"
        @pause-unfixed-audio="pauseUnfixedAudio"
        @unfix="handleUnfix"
        :audio="fixedAudio"
        :music="fixedMusic"
    />
    <div v-show="cardStore.currentCard.music">
        <UnfixedMusicPlayer
            @fix="handleFix"
            @pause-fixed-audio="pauseFixedAudio"
            v-model:audio="unfixedAudio"
            v-model:pauseSignal="pauseUnfixedSignal"
            :music="cardStore.currentCard.music"
        />
    </div>
</template>

<script setup lang="ts">
import { useCardStore } from '@/stores/card'
import FixedMusicPlayer from './Fixed-Music-Player.vue'
import UnfixedMusicPlayer from './Unfixed-Music-Player.vue'
import { getMusicUrl } from '@hello-world/api'
import { ref, shallowRef, toRaw, watchEffect } from 'vue'
import type { Card } from '@/models/card'

//Store
const cardStore = useCardStore()

//音源
//#region
const fixedMusic = shallowRef<Card['music']>()
const fixedAudio = shallowRef(new Audio())
const unfixedAudio = shallowRef(new Audio())
//#endregion

//暂停信号
const pauseFixedSignal = ref(true)
const pauseUnfixedSignal = ref(true)

const pauseFixedAudio = () => {
    pauseFixedSignal.value = !pauseFixedSignal.value
}
const pauseUnfixedAudio = () => {
    pauseUnfixedSignal.value = !pauseUnfixedSignal.value
}

//更新音频url,直接预加载!
watchEffect(async () => {
    if (cardStore.currentCard.music) {
        unfixedAudio.value.src = await getMusicUrl(
            cardStore.currentCard.music.id,
            cardStore.currentCard.music.level
        )
    }
})

//固定
//#region
const isFixed = ref(false)
const handleFix = (audio: HTMLAudioElement, music: Card['music']) => {
    if (isFixed.value) {
        handleUnfix()
        return setTimeout(() => {
            handleFix(audio, music)
        })
    } else {
        isFixed.value = true
        fixedAudio.value = audio
        fixedMusic.value = toRaw(music)
        pauseFixedSignal.value = audio.paused //初始化fixed的播放状态
        unfixedAudio.value = new Audio() //重置引用
    }
}
const handleUnfix = () => {
    isFixed.value = false
    fixedAudio.value = new Audio()
}
//#endregion
</script>

<style scoped></style>
