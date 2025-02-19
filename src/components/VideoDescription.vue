<script>
import { h } from 'vue';
import HighLightText from './HighLightText.vue'

export default {
    props: {
        description: String,
        keyword: String,
    },
    emits: ['onSearchText'],
    render(createElement) {
        const textList = this.splitText()

        const children = textList.map(text => {
            const highlightedText = createElement(HighLightText, { props: { highlights: [this.keyword] } }, [text.text])

            if (text.type == 'link') {
                return h('a', { attrs: { href: text.url } }, [highlightedText, this.createSearchEl(text.text)])
            } else {
                return highlightedText
            }
        })

        return createElement('div', { 'class': 'description-text' }, children)
    },
    methods: {
        createSearchEl(word) {
            return h('i', {
                'class': 'el-icon-search',
                attrs: {
                    title: '站内搜索该关键字'
                },
                on: {
                    click: (e) => {
                        e.preventDefault()
                        this.$emit('onSearchText', word)
                    }
                },
            })
        },
        splitText() {
            const linkRegs = /(sm\d+)|(BV\w+|av\d+)|(?:https?:\/\/)?(?:www\.)?[\w.-]+\.[a-zA-Z]{2,}(?:\/\S*)?/g
            const sep = '(*!)_))'
            const textList = this.description.replace(linkRegs, (matched) => {
                return `${sep}${matched}${sep}`
            }).split(sep).filter(t => t)

            return textList.map(text => {
                let baseurl = ''
                const isLink = linkRegs.test(text)

                if (isLink) {
                    if (text.startsWith('sm')) {
                        baseurl = 'https://www.nicovideo.jp/watch/'
                    } else if (text.startsWith('BV') || text.startsWith('av')) {
                        baseurl = 'https://www.bilibili.com/video/'
                    } else {
                        baseurl = ''
                    }
                }

                return {
                    type: isLink ? 'link' : 'text',
                    // 如果是链接则拼接 baseurl + id
                    url: baseurl + text,
                    text
                }
            })
        }
    },
    components: {
        HighLightText
    }
}
</script>

<style lang="less">
.description-text {
    @apply whitespace-pre-wrap;
}
</style>