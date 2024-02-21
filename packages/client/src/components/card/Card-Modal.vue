<script setup lang="ts">
import { useStatusStore } from '@/stores/status'
import CardDisplay from './Card-Display.vue'
import CardPost from './Card-Post.vue'
const statusStore = useStatusStore()
</script>

<template>
    <var-popup v-model:show="statusStore.mapPageStatus.showDisplayModal">
        <card-display></card-display>
    </var-popup>
    <var-popup v-model:show="statusStore.mapPageStatus.showPostModal">
        <card-post></card-post>
    </var-popup>
</template>

<style scoped></style>
