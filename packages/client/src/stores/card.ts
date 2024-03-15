import '@amap/amap-jsapi-types'
import testCards from '@/__tests__/card/01.json'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import type { Card } from '@/models/card'

export const useCardStore = defineStore('card-store', () => {
    const cards = ref<Card[]>(testCards as Card[])
    const postedCards = ref<Card[]>([])
    //空卡片模板
    const emptyCard: Card = {
        title: '',
        subtitle: '',
        content: '',
        position: [0, 0],
        imgs: [],
        music: {
            name: '',
            cover: '',
            id: '',
            level: ''
        }
    }
    //当前展示的卡片
    const currentCard: Card = reactive(emptyCard)
    //两个响应式状态量,用于watch其变化
    const newCard = ref<Card | null>(null)
    const removedCard = ref<Card | null>(null)

    //发布卡片
    function postCard(card: Card) {
        postedCards.value.push(card)
        cards.value.push(card)
        newCard.value = card //更新 newCard的引用,触发watch
    }
    //TODO 使用ws同步卡片状态:新卡片/删除卡片
    // function syncCardStatus() {}

    return {
        cards,
        currentCard,
        postedCards,
        postCard,
        newCard,
        removedCard
    }
})
