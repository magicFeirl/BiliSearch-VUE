import axios from './axios'

export default async function (params) {
    let { data, total } = await axios.get("search", { params })        

    total = data.length ? total : 0

    return { data, total }
}