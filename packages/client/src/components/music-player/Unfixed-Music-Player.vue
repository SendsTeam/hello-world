<template>
    <var-fab
        v-model:active="activeFab"
        :style="unfixedPlayerStyle"
        type="primary"
        :teleport="false"
        direction="right"
    >
        <template #trigger>
            <var-avatar
                :class="anim"
                :src="cardStore.currentCard.music?.cover"
                @click="() => toggle()"
            />
        </template>

        <var-tooltip type="primary" content="复制歌名">
            <var-button type="primary" @click="copyMusicName">
                <var-icon name="content-copy" />
            </var-button>
        </var-tooltip>

        <var-tooltip type="primary" content="固定">
            <var-button type="primary" @click="fixMusic">
                <var-icon v-if="isNeedToFixed" name="pin" />
                <var-icon v-else name="pin-outline" />
            </var-button>
        </var-tooltip>

        <var-tooltip type="primary" content="重新播放">
            <var-button type="primary" @click="replayMusic">
                <var-icon name="refresh" />
            </var-button>
        </var-tooltip>
    </var-fab>
</template>

<script setup lang="ts">
import type { Card } from '@/models/card'
import { useCardStore } from '@/stores/card'
import { useStatusStore } from '@/stores/status'
import { Snackbar } from '@varlet/ui'
import { computed, toRaw, watch } from 'vue'
import { reactive } from 'vue'
import { ref } from 'vue'

//Models
const audio = defineModel<HTMLAudioElement>('audio', {
    required: true
})

//监听暂停信号
const pauseSignal = defineModel<boolean>('pauseSignal', {
    required: true
})
watch(pauseSignal, () => pause())

//Events
const emit = defineEmits<{
    fix: [audio: HTMLAudioElement, music: Card['music']]
    pauseFixedAudio: []
}>()

//Store
const statusStore = useStatusStore()
const cardStore = useCardStore()

//魔改样式
const unfixedPlayerStyle = {
    right: 0,
    bottom: 0,
    top: 0,
    left: 0,
    position: 'relative',
    cursor: 'pointer',
    padding: '10px'
}

const isNeedToFixed = ref(false)

//音频控制
//#region

const status = ref<'play' | 'pause' | 'stop'>('stop')
const anim = computed(() => {
    return {
        'rotate-anim': status.value === 'play' || status.value === 'pause',
        'pause-anim': status.value === 'pause'
    }
})

//关闭卡片后并且没有固定bgm将停止bgm
watch(
    () => statusStore.mapPageStatus.showDisplayModal,
    (isOpen) => {
        if (isOpen) {
            return
        }
        //关闭卡片后
        if (isNeedToFixed.value) {
            emit('fix', audio.value, toRaw(cardStore.currentCard.music))
            //这里要重置状态,不然进入新卡片会直接默认固定!
            isNeedToFixed.value = false
            status.value = 'stop'
        } else {
            stop()
        }
    }
)

function play() {
    emit('pauseFixedAudio')
    audio.value.play()
    status.value = 'play'
}

function pause() {
    audio.value.pause()
    status.value = 'pause'
}

function stop() {
    audio.value.pause()
    audio.value.currentTime = 0
    status.value = 'stop'
}

function toggle() {
    audio.value.paused ? play() : pause()
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
//TODO 固定bgm
const fixMusic = () => {
    isNeedToFixed.value = !isNeedToFixed.value
    if (isNeedToFixed.value) {
        Snackbar.success('固定音乐,关闭卡片后生效')
    } else {
        Snackbar.success('取消固定')
    }
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
