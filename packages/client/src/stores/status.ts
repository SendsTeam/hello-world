import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { ref } from 'vue'

export const useStatusStore = defineStore('status-store', () => {
    const currentPage = ref<'map'>('map')
    const mapPageStatus = reactive({
        showPostModal: false,
        showDisplayModal: false,
        showPreviewModal: false,
        openPostModal() {
            this.showDisplayModal = false
            this.showPostModal = true
            this.showPreviewModal = false
        },
        openDisplayModal() {
            this.showDisplayModal = true
            this.showPostModal = false
            this.showPreviewModal = false
        },
        openPreviewModal() {
            this.showPreviewModal = true
            this.showDisplayModal = false
            this.showPostModal = false
        }
    })
    return {
        currentPage,
        mapPageStatus
    }
})
