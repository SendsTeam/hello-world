<template>
    <div v-show="cardStore.currentCard.music" id="music-player-container">
        <var-avatar
            :class="animClass"
            :src="cardStore.currentCard.imgs[0]"
            @click="() => toggle()"
        />
    </div>
</template>

<script setup lang="ts">
import { useAudioStore } from '@/stores/music'
import { useCardStore } from '@/stores/card'
import { getMusicUrl } from '@hello-world/api'
import { computed } from 'vue'
import { watchEffect } from 'vue'

const audioStore = useAudioStore()
const cardStore = useCardStore()
watchEffect(async () => {
    if (cardStore.currentCard.music) {
        const url = await getMusicUrl(
            cardStore.currentCard.music.id,
            cardStore.currentCard.music.level
        )
        if (url !== audioStore.audio.src) {
            audioStore.load(url)
        }
    }
})
function toggle() {
    audioStore.toggle()
}
const animClass = computed(() => {
    return audioStore.isPaused ? '' : 'music-player-anim'
})
</script>

<style scoped>
#music-player-container {
    padding: 10px;
    display: flex;
}
.music-player-anim {
    animation: scroll 5s linear infinite;
}
@keyframes scroll {
    /*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
    0% {
        /*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
