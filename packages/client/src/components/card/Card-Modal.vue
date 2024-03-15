<script setup lang="ts">
import { useStatusStore } from '@/stores/status'
import DefaultCardDisplay from './Card-Display.vue'
import DefaultCardPost from './Card-Post.vue'
import { computed, defineAsyncComponent, watchEffect } from 'vue'
import { useCardStore } from '@/stores/card'

const statusStore = useStatusStore()
const cardStore = useCardStore()
const popupStyle = {
    width: document.body.clientWidth > 400 ? '400px' : '80%',
    padding: '12px',
    'background-color': 'transparent',
    'box-shadow': '0 0 0 0' //这里是为了覆盖varlet popup默认的elevation
}

const CardDisplay = computed(() => {
    return cardStore.currentCard.link
        ? defineAsyncComponent(() => import(/* @vite-ignore */ cardStore.currentCard.link!))
        : DefaultCardDisplay
})
</script>

<template>
    <var-popup :style="popupStyle" v-model:show="statusStore.mapPageStatus.showDisplayModal">
        <component :is="CardDisplay"></component>
    </var-popup>
    <var-popup :style="popupStyle" v-model:show="statusStore.mapPageStatus.showPostModal">
        <DefaultCardPost></DefaultCardPost>
    </var-popup>
</template>

<style scoped></style>
