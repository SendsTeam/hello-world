<template>
    <Teleport to="body">
        <var-fab
            v-model:active="activeFab"
            :style="fixedPlayerStyle"
            :elevation="12"
            type="primary"
            position="left-top"
            direction="right"
        >
            <template #trigger>
                <var-avatar :class="anim" :src="music?.cover" @click="() => toggle()" />
            </template>

            <var-tooltip type="primary" content="复制歌名">
                <var-button type="primary" @click="copyMusicName">
                    <var-icon name="content-copy" />
                </var-button>
            </var-tooltip>

            <var-tooltip type="primary" content="取消固定">
                <var-button type="primary" @click="unfixMusic">
                    <var-icon name="pin" />
                </var-button>
            </var-tooltip>

            <var-tooltip type="primary" content="重新播放">
                <var-button type="primary" @click="replayMusic">
                    <var-icon name="refresh" />
                </var-button>
            </var-tooltip>
        </var-fab>
    </Teleport>
</template>

<script setup lang="ts">
import type { Card } from '@/models/card'
import { useCardStore } from '@/stores/card'
import { computed, ref, watch } from 'vue'

//Props
const { audio, music } = defineProps<{
    audio: HTMLAudioElement
    music: Card['music']
}>()

//监听暂停信号
const pauseSignal = defineModel<boolean>('pauseSignal', {
    required: true
})
watch(pauseSignal, () => pause())

//Events
const emit = defineEmits<{
    unfix: []
    pauseUnfixedAudio: []
}>()

//Store
const cardStore = useCardStore()

//样式
//#region
const fixedPlayerStyle = {
    cursor: 'pointer',
    padding: '10px',
    'z-index': 99999,
    top: 0,
    left: 0
}
//#endregion

//音频控制
//#region
const status = ref<'play' | 'pause' | 'stop'>(pauseSignal.value ? 'pause' : 'play')
const anim = computed(() => {
    return {
        'rotate-anim': status.value === 'play' || status.value === 'pause',
        'pause-anim': status.value === 'pause'
    }
})

function play() {
    emit('pauseUnfixedAudio')
    audio.play()
    status.value = 'play'
}

function pause() {
    audio.pause()
    status.value = 'pause'
}

function stop() {
    audio.pause()
    // eslint-disable-next-line vue/no-mutating-props
    audio.currentTime = 0
    status.value = 'stop'
}

//注意点击后才加载
async function toggle() {
    audio.paused ? play() : pause()
}
//#endregion

//音频交互
//#region
const activeFab = ref(false)
const copyMusicName = () => {
    navigator.clipboard
        .writeText(cardStore.currentCard.music!.name)
        .then(() => {
            Snackbar.success('复制歌名成功!')
        })
        .catch(() => {
            Snackbar.error(`复制歌名失败! ${cardStore.currentCard.music?.name}`)
        })
}
//取消固定bgm
const unfixMusic = () => {
    emit('unfix')
    Snackbar.success('取消固定')
    stop()
}
//重新播放bgm
const replayMusic = () => {
    setTimeout(() => {
        stop()
        play()
    }, 1000)
}
//#endregion
</script>

<style scoped>
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
