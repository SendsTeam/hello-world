<template>
    <div v-show="cardStore.currentCard.music" id="music-player-container">
        <var-space>
            <var-avatar
                v-show="lastMusicIcon && lastMusicIcon !== cardStore.currentCard.imgs[0]"
                :class="lastAnimClass"
                :src="lastMusicIcon"
                @click="() => toggle()"
            />
            <var-avatar
                :class="currentAnimClass"
                :src="cardStore.currentCard.imgs[0]"
                @click="() => toggle()"
            />
        </var-space>
    </div>
</template>

<script setup lang="ts">
import { useAudioStore } from '@/stores/audio'
import { useCardStore } from '@/stores/card'
import { getMusicUrl } from '@hello-world/api'
import { computed } from 'vue'
import { watchEffect } from 'vue'
import { useLock } from '@hello-world/hooks'
import { ref } from 'vue'

//Store
const audioStore = useAudioStore()
const cardStore = useCardStore()

//ICONS
const lastMusicIcon = ref('')

//触发音频
watchEffect(async () => {
    if (cardStore.currentCard.music) {
        const url = await getMusicUrl(
            cardStore.currentCard.music.id,
            cardStore.currentCard.music.level
        )
        //说明是不一样的两首bgm
        locked()
        if (url !== audioStore.currentAudio.source.src) {
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
        audioStore.stop('next')
    } else {
        audioStore.stop('pre')
    }
    lastMusicIcon.value = cardStore.currentCard.imgs[0]
    audioStore.toggle()
    unlock()
}

//动画class
const lastAnimClass = computed(() => {
    return audioStore.currentAudio.paused ? '' : 'rotate-anim'
})
const currentAnimClass = computed(() => {
    return audioStore.currentAudio.paused ? '' : 'rotate-anim'
})
</script>

<style scoped>
#music-player-container {
    padding: 10px;
    display: flex;
}
.rotate-anim {
    animation: rotate 5s linear infinite;
}
.slide-anim {
    animation: slide 5s linear;
}
@keyframes rotate {
    /*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
    0% {
        /*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

@keyframes slide {
    /*以百分比来规定改变发生的时间 也可以通过"from"和"to",等价于0% 和 100%*/
    0% {
        /*rotate(2D旋转) scale(放大或者缩小) translate(移动) skew(翻转)*/
        transform: translateX(0);
    }
    100% {
        transform: translateX(200);
    }
}
</style>
