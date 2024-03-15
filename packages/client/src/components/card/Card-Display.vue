<template>
    <MusicPlayer />
    <var-card
        class="better-scroll"
        :style="displayCardStyle"
        :title="cardStore.currentCard.title"
        :subtitle="cardStore.currentCard.subtitle"
        :description="cardStore.currentCard.content"
        :elevation="4"
    >
        <template #image>
            <var-swipe
                v-if="cardStore.currentCard.imgs && cardStore.currentCard.imgs.length > 1"
                navigation="hover"
                @change="(index) => (previewInitialIndex = index)"
            >
                <var-swipe-item v-for="(imgSrc, index) in cardStore.currentCard.imgs" :key="index">
                    <var-image fit="contain" @click="preview" :src="imgSrc" />
                </var-swipe-item>
            </var-swipe>
            <var-image
                v-else-if="cardStore.currentCard.imgs && cardStore.currentCard.imgs.length === 1"
                fit="contain"
                @click="preview"
                :src="cardStore.currentCard.imgs[0]"
            />
        </template>
        <template #extra>
            <var-space :size="[10, 10]">
                <var-button type="primary"> 拾取 </var-button>

                <var-button type="success" round>
                    <var-icon :name="agreeIconName" :transition="150" @click="toggleAgreeIcon" />
                </var-button>

                <var-button type="info" round>
                    <var-icon
                        :name="favoriteIconName"
                        :transition="150"
                        @click="toggleFavoriteIcon"
                    />
                </var-button>

                <var-button type="warning" round>
                    <var-icon name="warning" />
                </var-button>
            </var-space>
        </template>
    </var-card>
</template>

<script setup lang="ts">
import MusicPlayer from '@/components/music-player/Music-Player.vue'
import { useCardStore } from '@/stores/card'
import { ImagePreview } from '@varlet/ui'
import { ref } from 'vue'

const cardStore = useCardStore()
const displayCardStyle = {
    'max-height': document.body.clientHeight * 0.7 + 'px'
}

//图片预览
//#region
const preview = () => {
    ImagePreview({
        images: cardStore.currentCard.imgs,
        closeable: true,
        initialIndex: previewInitialIndex.value
    })
}
const previewInitialIndex = ref(0)
//#endregion

//底部交互栏
//#region

//图标切换过渡
//#region
const agreeIconName = ref<'thumb-up-outline' | 'thumb-up'>('thumb-up-outline')
const toggleAgreeIcon = () => {
    if (agreeIconName.value === 'thumb-up') {
        agreeIconName.value = 'thumb-up-outline'
    } else {
        agreeIconName.value = 'thumb-up'
    }
}

const favoriteIconName = ref<'heart-outline' | 'heart'>('heart-outline')
const toggleFavoriteIcon = () => {
    if (favoriteIconName.value === 'heart') {
        favoriteIconName.value = 'heart-outline'
    } else {
        favoriteIconName.value = 'heart'
    }
}

//#endregion

//#endregion

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
