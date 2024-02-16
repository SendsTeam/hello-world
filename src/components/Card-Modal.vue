<script setup lang="ts">
import type { Card } from '@/models/card'
import { NModal, NCard } from 'naive-ui'
const showModal = defineModel<boolean>('show', {
    required: true
})
const { card } = defineProps<{
    card: Card
}>()
const cardStyle = {
    width: document.body.clientWidth > 400 ? '400px' : '80%'
}
</script>

<template>
    <n-modal v-model:show="showModal">
        <n-card
            :style="cardStyle"
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
            @close="showModal = false"
        >
            {{ card.content }}
        </n-card>
    </n-modal>
</template>

<style scoped></style>
