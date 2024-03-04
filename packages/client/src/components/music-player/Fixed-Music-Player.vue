<template>
    <Teleport to="body">
        <!-- 固定时的player -->
        <var-fab
            v-model:active="activeFab"
            :style="fixedPlayerStyle"
            :elevation="12"
            type="primary"
            position="left-top"
            direction="right"
        >
            <template #trigger>
                <var-avatar :class="anim" :src="cover" @click="() => toggle()" />
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
import { useCardStore } from '@/stores/card'
import { useStatusStore } from '@/stores/status'
import { reactive, ref } from 'vue'

//Props
const { isFixed, cover} = defineProps<{
    isFixed: boolean //是否固定
    cover: string //唱片封面
    // audio: T
}>()

//Events
const emit = defineEmits<{
    fixed: []
    unFixed: []
}>()

//Store
const cardStore = useCardStore()
const statusStore = useStatusStore()

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
const status = ref<'play' | 'pause' | 'stop'>('stop')
const anim = reactive({
    'rotate-anim': false,
    'pause-anim': false
})

function play() {
    statusStore.musicPlayerStatus.fixedAudio.play()
    status.value = 'play'
    anim['rotate-anim'] = true
    anim['pause-anim'] = false
}

function pause() {
    statusStore.musicPlayerStatus.fixedAudio.pause()
    status.value = 'pause'
    anim['pause-anim'] = true
}

function stop() {
    statusStore.musicPlayerStatus.fixedAudio.pause()
    statusStore.musicPlayerStatus.fixedAudio.currentTime = 0
    status.value = 'stop'
    anim['pause-anim'] = false
    anim['rotate-anim'] = false
}

//注意点击后才加载
async function toggle() {
    statusStore.musicPlayerStatus.fixedAudio.paused ? play() : pause()
}
//#endregion

//音频交互栏
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
    emit('unFixed')
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
reactive, , watch
