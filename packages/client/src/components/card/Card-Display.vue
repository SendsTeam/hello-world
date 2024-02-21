<template>
    <var-card
        :style="cardStyle"
        :title="cardStore.currentCard.title"
        :subtitle="cardStore.currentCard.subtitle"
        :description="cardStore.currentCard.content"
        :elevation="4"
    >
        <template #image>
            <var-image
                fit="contain"
                @click="showImgPreview = true"
                :src="cardStore.currentCard.imgSrc"
            />
            <var-image-preview
                v-model:show="showImgPreview"
                closeable
                :images="[cardStore.currentCard.imgSrc]"
            />
        </template>
    </var-card>
</template>

<script setup lang="ts">
import { useCardStore } from '@/stores/card'
import { ref } from 'vue'
const cardStore = useCardStore()
const cardStyle = {
    'max-height': document.body.clientHeight * 0.7 + 'px',
    'overflow-y': 'scroll'
}

const showImgPreview = ref(false)
</script>

<style scoped></style>
