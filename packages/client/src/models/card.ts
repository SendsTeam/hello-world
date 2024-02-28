export type Card = {
    title: string
    subtitle: string
    content: string
    position: [number, number]
    imgs: string[]
    music?: {
        name: string //音乐名字
        id: string //音乐id
        level: 'standard' | 'higher' | 'exhigh' | '' //音质
    }
}
