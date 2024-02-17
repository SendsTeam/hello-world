import type { Card } from '@/models/card'
import testCards from '@/__tests__/card/01.json'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'

export const useCardStore = defineStore('card-store', () => {
    const cards = ref<Card[]>(testCards as Card[])
    const postedCards = ref<Card[]>([])
    const emptyCard: Card = {
        title: '',
        content: '',
        position: [0, 0]
    }
    //当前展示的卡片
    const currentCard: Card = reactive(emptyCard)

    function postCard(card: Card) {
        postedCards.value.push(card)
        cards.value.push(card)
    }
    return {
        cards,
        currentCard,
        postedCards,
        postCard
    }
})
