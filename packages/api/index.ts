import Axios from 'axios'

const _baseUrl = 'http://127.0.0.1:4000'
const _userAPI = Axios.create({
    baseURL: _baseUrl + '/user'
})

const _baseAPI = Axios.create({
    baseURL: _baseUrl
})

export async function testAPI() {
    return await _baseAPI.get('/')
}
