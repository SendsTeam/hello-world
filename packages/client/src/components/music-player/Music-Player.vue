<template>
    <FixedMusicPlayer
        v-if="isFixed"
        @fixed="handleFixed"
        @un-fixed="handleUnfixed"
    ></FixedMusicPlayer>
    <UnfixedMusicPlayer></UnfixedMusicPlayer>
</template>

<script setup lang="ts">
import FixedMusicPlayer from './Fixed-Music-Player.vue'
import UnfixedMusicPlayer from './Unfixed-Music-Player.vue'
import { ref } from 'vue'

//固定
//#region
const isFixed = ref(false)
const handleFixed = () => {
    isFixed.value = true
}
const handleUnfixed = () => {
    isFixed.value = false
}
//#endregion
</script>

<style scoped></style>
