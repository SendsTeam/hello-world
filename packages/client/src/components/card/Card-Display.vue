<template>
    <var-card
        :style="cardStyle"
        :src="cardStore.currentCard.imgSrc"
        :title="cardStore.currentCard.title"
        :subtitle="cardStore.currentCard.subtitle"
        :description="cardStore.currentCard.content"
        :elevation="4"
    />
</template>

<script setup lang="ts">
import { useCardStore } from '@/stores/card'
const cardStore = useCardStore()
const cardStyle = {
    'max-height': document.body.clientHeight * 0.7 + 'px',
    'overflow-y': 'scroll'
}
</script>

<style scoped></style>
