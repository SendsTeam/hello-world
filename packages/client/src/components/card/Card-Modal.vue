<script setup lang="ts">
import { useStatusStore } from '@/stores/status'
import CardDisplay from './Card-Display.vue'
import CardPost from './Card-Post.vue'
const statusStore = useStatusStore()

const popupStyle = {
    width: document.body.clientWidth > 400 ? '400px' : '80%',
    padding: '12px',
    'background-color': 'transparent',
    'box-shadow': '0 0 0 0' //这里是为了覆盖varlet popup默认的elevation
}

</script>

<template>
    <var-popup :style="popupStyle" v-model:show="statusStore.mapPageStatus.showDisplayModal">
        <card-display></card-display>
    </var-popup>
    <var-popup :style="popupStyle" v-model:show="statusStore.mapPageStatus.showPostModal">
        <card-post></card-post>
    </var-popup>
</template>

<style scoped></style>
