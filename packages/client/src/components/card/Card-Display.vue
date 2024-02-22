<template>
    <var-card
        class="better-scroll"
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
        <template #extra>
            <var-space :size="[10, 10]">
                <var-button type="primary"> 拾取 </var-button>

                <var-tooltip content="点赞" placement="top" trigger="hover">
                    <var-button type="success" round>
                        <var-icon name="thumb-up-outline" />
                    </var-button>
                </var-tooltip>

                <var-tooltip content="收藏" placement="top" trigger="hover">
                    <var-button type="info" round>
                        <var-icon name="heart-outline" />
                    </var-button>
                </var-tooltip>

                <var-tooltip content="举报" placement="top" trigger="hover">
                    <var-button type="warning" round>
                        <var-icon name="warning" />
                    </var-button>
                </var-tooltip>
            </var-space>
        </template>
    </var-card>
</template>

<script setup lang="ts">
import { useCardStore } from '@/stores/card'
import { ref } from 'vue'
const cardStore = useCardStore()
const cardStyle = {
    'max-height': document.body.clientHeight * 0.7 + 'px'
}

//图片预览
//#region
const showImgPreview = ref(false)
const previewInitialIndex = ref(0)
//#endregion
</script>

<style scoped>
.better-scroll {
    overflow-y: auto;
}
.better-scroll::-webkit-scrollbar {
    width: 10px;
    height: 10px;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
.better-scroll::-webkit-scrollbar-track {
    background: var(--color-body);
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
.better-scroll::-webkit-scrollbar-thumb {
    background: #e0dfdf;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
}
.better-scroll::-webkit-scrollbar-thumb:hover {
    background: #cbcbcb;
}
</style>
