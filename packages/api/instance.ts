import Axios from 'axios'

const _baseUrl = 'https://tyee.life'

const _baseAPI = Axios.create({
    baseURL: _baseUrl + ':4000'
})

export const _audioAPI = Axios.create({
    baseURL: _baseUrl + ':3001'
})
