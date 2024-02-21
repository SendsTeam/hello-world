<template>
    <var-card
        src="https://varlet.gitee.io/varlet-ui/cat.jpg"
        :style="displayCardStyle"
        :title="cardStore.currentCard.title"
        subtitle="Nker Ppe Suzz"
        :description="cardStore.currentCard.content"
    />
</template>

<script setup lang="ts">
import { useCardStore } from '@/stores/card'
const cardStore = useCardStore()
const displayCardStyle = {
    width: document.body.clientWidth > 400 ? '400px' : '80%',
    padding: '10px'
}
</script>

<style scoped></style>
