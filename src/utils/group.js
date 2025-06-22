export function groupData(keyword, data) {
    const keywords = [...new Set(keyword.split(/\s+/).filter(s => s))]
    const result = []

    for (const keyword of keywords) {
        const obj = { keyword: '', data: [] }

        Object.assign(obj, {
            keyword,
            data: data.filter(item => item.title.includes(keyword) || item.description.includes(keyword))
        })

        obj.total = obj.data.length

        result.push(obj)
    }

    return result
}