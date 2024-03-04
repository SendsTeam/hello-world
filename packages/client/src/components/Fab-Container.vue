<template>
    <var-fab type="primary" :direction="direction" :elevation="12">
        <var-tooltip type="success" content="发布你的卡片" placement="left">
            <var-button class="action" type="success" round @click="handlePostCard">
                <var-icon name="plus" />
            </var-button>
        </var-tooltip>
    </var-fab>
</template>

<script setup lang="ts">
import { useStatusStore } from '@/stores/status'
import { ref } from 'vue'
const direction = ref<'top' | 'bottom' | 'right' | 'left'>('top')

//Store
const statusStore = useStatusStore()
//Handler
const handlePostCard = () => {
    statusStore.mapPageStatus.openPostModal()
}
</script>
