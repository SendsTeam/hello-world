export type Card = {
    title: string
    subtitle: string
    content: string
    position: [number, number]
    imgs: string[]
    music?: {
        id: string //音乐id
        level: 'standard' | 'higher' | 'exhigh' | '' //音质
    }
}
