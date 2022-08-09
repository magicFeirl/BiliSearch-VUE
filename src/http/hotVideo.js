import axios from './axios'

export default async function (params) {
    return axios.get('/hot', { params })
}