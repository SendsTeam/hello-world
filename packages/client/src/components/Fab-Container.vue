<template>
    <var-fab type="primary" :direction="direction" :elevation="12">
        <var-button class="action" type="success" round @click="handlePostCard">
            <var-icon name="plus" />
        </var-button>
        <var-button class="action" type="info" round>
            <var-icon name="account-circle" />
        </var-button>
        <var-button class="action" type="warning" round>
            <var-icon name="bell" />
        </var-button>
        <var-button class="action" type="danger" round>
            <var-icon name="delete" />
        </var-button>
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
    statusStore.mapPageStatus.showDisplayModal = false
    statusStore.mapPageStatus.showPostModal = true
}
</script>
