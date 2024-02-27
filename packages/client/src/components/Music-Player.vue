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
import { useAudioStore } from '@/stores/audio'
import { useCardStore } from '@/stores/card'
import { getMusicUrl } from '@hello-world/api'
import { computed } from 'vue'
import { watchEffect } from 'vue'
import { useLock } from '@hello-world/hooks'

const audioStore = useAudioStore()
const cardStore = useCardStore()

watchEffect(async () => {
    if (cardStore.currentCard.music) {
        const url = await getMusicUrl(
            cardStore.currentCard.music.id,
            cardStore.currentCard.music.level
        )
        //说明是不一样的两首bgm
        locked()
        if (url !== audioStore.audio.src) {
            audioStore.load(url)
        }
    }
})

const { locked, unlock } = useLock(
    () => (audioStore.loadTarget = audioStore.loadTarget === 'pre' ? 'next' : 'pre'),
    true
)
function toggle() {
    if (audioStore.loadTarget === 'pre') {
        audioStore.stop(audioStore.nextAudio)
    } else {
        audioStore.stop(audioStore.preAudio)
    }
    audioStore.toggle()
    unlock()
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
