<template>
    <var-paper :style="postCardStyle" :elevation="2">
        <var-space direction="column">
            <var-input v-model="newCard.title" placeholder="标题" />
            <var-input v-model="newCard.subtitle" placeholder="副标题" />
            <var-input v-model="newCard.content" textarea placeholder="内容" />
            <var-space>
                <var-button @click="postCard">发布卡片</var-button>
                <var-button @click="resetCard">重置卡片</var-button
                ><var-button @click="resetCard">预览卡片</var-button>
            </var-space>
        </var-space>
    </var-paper>
</template>

<script setup lang="ts">
import type { Card } from '@/models/card'
import { useCardStore } from '@/stores/card'
import { useStatusStore } from '@/stores/status'
import { Snackbar } from '@varlet/ui'
import { ref } from 'vue'

//Store
const statusStore = useStatusStore()
const cardStore = useCardStore()

//Style
const postCardStyle = {
    height: document.body.clientHeight * 0.7 + 'px',
    padding: '20px'
}

//卡片交互
//#region
const emptyCard: Card = {
    title: '',
    subtitle: '',
    content: '',
    position: [0, 0],
    imgs: [],
    music: {
        id: '',
        level: ''
    }
}
const newCard = ref({ ...emptyCard })
const postCard = () => {
    if (!newCard.value.title) {
        Snackbar.error('卡片标题不能为空!')
    } else if (!newCard.value.content) {
        Snackbar.error('卡片内容不能为空!')
    } else {
        cardStore.postCard({ ...newCard.value })
        Snackbar.success('发布成功!')
    }
}
const resetCard = () => {
    newCard.value = emptyCard
}
const previewCard = () => {}
//#endregion
</script>
