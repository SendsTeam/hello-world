import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ref } from 'vue'

export const useStatusStore = defineStore('status-store', () => {
    const currentPage = ref<'map'>('map')
    const mapPageStatus = reactive({
        showPostModal: false,
        showDisplayModal: false
    })
    return {
        currentPage,
        mapPageStatus
    }
})
