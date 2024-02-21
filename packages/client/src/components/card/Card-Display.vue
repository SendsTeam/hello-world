<template>
    <var-card
        :style="cardStyle"
        :title="cardStore.currentCard.title"
        :subtitle="cardStore.currentCard.subtitle"
        :description="cardStore.currentCard.content"
        :elevation="4"
    >
        <template #image>
            <var-swipe
                v-if="cardStore.currentCard.imgs.length > 1"
                navigation="hover"
                @change="(index) => (previewInitialIndex = index)"
            >
                <var-swipe-item v-for="(imgSrc, index) in cardStore.currentCard.imgs" :key="index">
                    <var-image fit="contain" @click="showImgPreview = true" :src="imgSrc" />
                </var-swipe-item>
            </var-swipe>
            <var-image
                v-else-if="cardStore.currentCard.imgs.length === 1"
                fit="contain"
                @click="showImgPreview = true"
                :src="cardStore.currentCard.imgs[0]"
            />
            <var-image-preview
                v-model:show="showImgPreview"
                :initial-index="previewInitialIndex"
                :images="cardStore.currentCard.imgs"
                closeable
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
    'overflow-y': 'auto'
}

//图片预览
//#region
const showImgPreview = ref(false)
const previewInitialIndex = ref(0)
//#endregion
</script>

<style scoped></style>
