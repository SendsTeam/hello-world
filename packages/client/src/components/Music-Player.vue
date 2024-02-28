<template>
    <div v-show="cardStore.currentCard.music" id="music-player-container">
        <var-space>
            <var-avatar
                :class="anim"
                :src="cardStore.currentCard.imgs[0]"
                @click="() => toggle()"
            />
        </var-space>
    </div>
</template>

<script setup lang="ts">
import { useCardStore } from '@/stores/card'
import { getMusicUrl } from '@hello-world/api'
import { reactive } from 'vue'
import { watchEffect } from 'vue'
import { ref } from 'vue'

const cardStore = useCardStore()

//触发音频
const newUrl = ref('')
watchEffect(async () => {
    if (cardStore.currentCard.music) {
        const url = await getMusicUrl(
            cardStore.currentCard.music.id,
            cardStore.currentCard.music.level
        )
        newUrl.value = url
    }
})

const audio = new Audio()

const status = ref<'play' | 'pause' | 'stop'>('stop')
const anim = reactive({
    'rotate-anim': false,
    'pause-anim': false
})

function play() {
    audio.play()
    status.value = 'play'
    anim['rotate-anim'] = true
    anim['pause-anim'] = false
}

function pause() {
    audio.pause()
    status.value = 'pause'
    anim['pause-anim'] = true
}

function stop() {
    audio.currentTime = 0
    status.value = 'stop'
    anim['pause-anim'] = false
    anim['rotate-anim'] = false
}

//注意点击后才加载
async function toggle() {
    if (audio.src === '' || audio.src !== newUrl.value) {
        audio.src = newUrl.value
        return play()
    } else {
        audio.paused ? play() : pause()
    }
}
</script>

<style scoped>
#music-player-container {
    padding: 10px;
    display: flex;
}

.rotate-anim {
    animation: rotate 5s linear 0s infinite normal;
}

.pause-anim {
    animation-play-state: paused;
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
</style>
