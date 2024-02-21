<template>
    <var-paper style="padding: 20px" :elevation="2">
        <var-space direction="column">
            <var-input v-model="cardTitle" placeholder="标题" />
            <var-input v-model="cardSubTitle" placeholder="副标题" />
            <var-input v-model="cardContent" textarea placeholder="内容" />
            <var-space>
                <var-button @click="postCard">发布卡片</var-button>
                <var-button @click="resetCard">重置卡片</var-button>
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

//发布卡片
//#region
const cardTitle = ref('')
const cardContent = ref('')
const cardSubTitle = ref('')
const postCard = () => {
    if (!cardTitle.value) {
        Snackbar.error('卡片标题不能为空!')
    } else if (!cardContent.value) {
        Snackbar.error('卡片内容不能为空!')
    } else {
        const newCard: Card = {
            title: cardTitle.value,
            subtitle: cardSubTitle.value,
            content: cardContent.value,
            position: [0, 0],
            imgSrc: ''
        }
        cardStore.postCard(newCard)
        Snackbar.success('发布成功!')
    }
}
const resetCard = () => {
    cardTitle.value = ''
    cardContent.value = ''
}
//#endregion
</script>
