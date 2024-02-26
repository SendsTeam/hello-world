<template>
    <div id="music-player-container">
        <var-avatar
            :class="animClass"
            src="https://p2.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg"
            @click="() => toggle()"
        />
    </div>
</template>

<script setup lang="ts">
import { useAudioStore } from '@/stores/music'
import { useCardStore } from '@/stores/card'
import { computed } from 'vue'

const audioStore = useAudioStore()
const cardStore = useCardStore()
audioStore.load(
    'https://m701.music.126.net/20240226232447/b03e906f437999a0eb794cf89f476e22/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/33793290472/eb63/0e36/24c5/bef170bf6657bbd6efb4718050ee4206.mp3'
)

const toggle = () => {
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
