<script>
export default {
    props: {
        text: String,
        onSearchText: Function
    },
    render(h) {
        let text = this.text

        const splitWord = '*#@$@#)()'

        const patterns = {
            'https://www.nicovideo.jp/watch/': /(sm\d+)/g,
            'https://www.bilibili.com/video/': /(BV\w+|av\d+)/g
        }

        const attrs = {}

        for (const url in patterns) {
            const regexp = patterns[url]

            for (const word of (text.match(regexp) || [])) {
                attrs[word] = url
            }

            text = text.replace(regexp, splitWord + '$1' + splitWord)
        }

        const words = text.split(splitWord).filter(word => word != '')

        const children = []
        for (const word of words) {
            const url = attrs[word]
            if (url) {
                children.push(h('span', null, [
                    h('a', {
                        attrs: {
                            href: url + word
                        }
                    }, word),
                    h('i', {
                        'class': 'el-icon-search',
                        attrs: {
                            title: '站内搜索该关键字'
                        },
                        on: {
                            click: () => this.onSearchText(word)
                        },
                    })
                ]))
            } else {
                children.push(word)
            }
        }

        return h('p', children)
    }
}
</script>

<style scoped>
.el-icon-search {
    @apply cursor-pointer hover: text-gray-400 text-sm mx-1;
}
</style>