<template>
    <div v-show="cardStore.currentCard.music" id="music-player-container">
        <var-fab
            v-model:active="activeFab"
            :style="playerStyle"
            type="primary"
            :teleport="false"
            direction="right"
        >
            <template #trigger>
                <var-avatar
                    :class="anim"
                    :src="cardStore.currentCard.imgs[0]"
                    @click="() => toggle()"
                />
            </template>
            <var-button type="primary">
                <!-- 复制歌名 -->
                <var-icon name="content-copy" />
            </var-button>
            <var-button type="primary">
                <!-- 固定音乐 -->
                <var-icon name="pin-outline" />
            </var-button>
            <var-button type="primary" @click="replayMusic">
                <!-- 重新播放 -->
                <var-icon name="refresh" />
            </var-button>
        </var-fab>
    </div>
</template>

<script setup lang="ts">
import { useCardStore } from '@/stores/card'
import { useStatusStore } from '@/stores/status'
import { getMusicUrl } from '@hello-world/api'
import { watch } from 'vue'
import { reactive } from 'vue'
import { watchEffect } from 'vue'
import { ref } from 'vue'

const cardStore = useCardStore()
const statusStore = useStatusStore()

//魔改样式
const playerStyle = {
    right: 0,
    bottom: 0,
    position: 'relative',
    cursor: 'pointer'
}

//更新音频
//#region
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
//#endregion

//音频控制
//#region
const audio = new Audio()

const status = ref<'play' | 'pause' | 'stop'>('stop')
const anim = reactive({
    'rotate-anim': false,
    'pause-anim': false
})

//关闭卡片后停止bgm
watch(
    () => statusStore.mapPageStatus.showDisplayModal,
    (v) => {
        if (!v) {
            stop()
        }
    }
)

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
    audio.pause()
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
//#endregion

//音频交互
//#region
const activeFab = ref(false)
const copyMusicName = () => {}
const fixMusic = () => {}
const replayMusic = () => {
    setTimeout(() => {
        stop()
        play()
    }, 1000)
}
//#endregion
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
