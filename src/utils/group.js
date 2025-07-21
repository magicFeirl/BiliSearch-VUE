export function groupData(keyword, data) {
    const keywords = [...new Set(keyword.split(/\s+/).filter(s => s))].map(k => k.toLowerCase())
    const result = []

    data = data.map(item => {
        return {
            ...item,
            loTitle: item.title.toLowerCase(),
            loDescription: item.description.toLowerCase(),
        }
    })

    for (const keyword of keywords) {
        const obj = { keyword: '', data: [] }

        Object.assign(obj, {
            keyword,
            data: data.filter(item => item.loTitle.includes(keyword) || item.loDescription.includes(keyword))
        })

        obj.total = obj.data.length

        result.push(obj)
    }

    return result
}