<script>
export default {
    name: "HighLightText",
    inheritAttrs: false,
    props: {
        highlights: {
            type: Array,
            default: () => []
        },
    },
    render(createElement) {
        const textContent = this.$slots.default.map(vnode => vnode.text || '').join('').trim()

        if (!this.computedHighlights.length || !textContent) {
            return createElement('span', { attrs: this.$attrs }, this.$slots.default)
        }

        const sep = '_)()='
        const textContentList = textContent.replace(this.highlightRegExp, (matched) => {
            return `${sep}${matched}${sep}`
        }).split(sep).filter(t => t.trim())

        // console.log(textContentList, this.highlightRegExp)

        const children = textContentList.map(text => {
            const isHighLightText = this.highlightRegExp.test(text)

            return createElement('span', { 'class': isHighLightText ? 'highlight-text' : '' }, [text])
        })

        return createElement('span', {}, children)
    },
    computed: {
        highlightRegExp() {
            return RegExp(this.computedHighlights.join('|'), 'g')
        },
        computedHighlights() {
            return this.highlights.filter(t => t && t.trim())
        }
    }
}
</script>

<style scoped lang="less">
.highlight-text {
    background-color: #FFFE2A;
    color: black;
}
</style>