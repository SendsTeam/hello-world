<script setup lang="ts">
import type { Card } from '@/models/card'
import { useCardStore } from '@/stores/card'
import { NModal, NCard, NInput, NSpace, NButton, useMessage } from 'naive-ui'
import { ref } from 'vue'
//Define
//#region

const showDisplayModal = defineModel<boolean>('show', {
    required: true
})
const showPostModal = defineModel<boolean>('post', {
    required: true
})
const { card } = defineProps<{
    card: Card
}>()

//#endregion

//Style
//#region

const displayCardStyle = {
    width: document.body.clientWidth > 400 ? '400px' : '80%'
}
const postCardStyle = displayCardStyle

//#endregion

//发布卡片
//#region
const cardStore = useCardStore()
const cardTitle = ref('')
const cardContent = ref('')
const msgProvider = useMessage()
const postCard = () => {
    if (!cardTitle.value) {
        msgProvider.error('卡片标题不能为空!')
    } else if (!cardContent.value) {
        msgProvider.error('卡片内容不能为空!')
    } else {
        const newCard: Card = {
            title: cardTitle.value,
            content: cardContent.value,
            position: [0, 0]
        }
        cardStore.postCard(newCard)
        msgProvider.success('发布成功!')
    }
}
const resetCard = () => {
    cardTitle.value = ''
    cardContent.value = ''
}
//#endregion
</script>

<template>
    <!-- 卡片展示模态框 -->

    <n-modal v-model:show="showDisplayModal">
        <n-card
            :style="displayCardStyle"
            :segmented="{
                content: 'soft',
                footer: 'soft'
            }"
            :title="card.title"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
            closable
            @close="showDisplayModal = false"
        >
            {{ card.content }}
        </n-card>
    </n-modal>
    <!-- 卡片发布模态框 -->
    <n-modal v-model:show="showPostModal">
        <n-card
            :style="postCardStyle"
            :segmented="{
                content: 'soft',
                footer: 'soft'
            }"
            title="发布卡片!"
            :bordered="false"
            size="huge"
            role="dialog"
            aria-modal="true"
            closable
            @close="showPostModal = false"
        >
            <n-space vertical>
                <n-input v-model:value="cardTitle" type="text" placeholder="卡片标题" />
                <n-input v-model:value="cardContent" type="textarea" placeholder="卡片内容" />
                <n-space>
                    <n-button @click="postCard">发布卡片</n-button>
                    <n-button @click="resetCard">重置卡片</n-button>
                </n-space>
            </n-space>
        </n-card>
    </n-modal>
</template>

<style scoped></style>
