<template>
    <var-card
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
</script>

<style scoped></style>
