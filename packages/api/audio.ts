import { _audioAPI } from './instance'
import 'axios'

export async function getMusicUrl(id: string, level: string): Promise<string> {
    const { data } = await _audioAPI.get(`/song/url/v1?id=${id}&level=${level}`)
    if (data.code === 200) {
        const url = data.data[0].url as string
        const safeUrl = 'https:' + url.split(':')[1]
        return safeUrl
    } else {
        return ''
    }
}
