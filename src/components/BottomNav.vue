<template>
    <div class="!text-gray-400 text-center py-2 text-sm border-t border-t-light-600">
        <span>相关网址:</span>
        <span v-for="link, idx in links" :key="idx">
            <a target="_blank" class="mx-2" :key="url" :href="url" v-for="(url, name) in link">
                {{ name }}
            </a>
        </span>
    </div>
</template>

<script>
function getMyWebsiteFullURL(port) {
    return 'http://121.5.133.245' + (port ? `:${port}` : '')
}

const links = [
    { '@银饼综合推送bot': 'https://space.bilibili.com/343118157' },
    { '饼图站': getMyWebsiteFullURL() },
    { '搜索站': getMyWebsiteFullURL('3630') },
    { '银图站': getMyWebsiteFullURL('3640') },
    { '饼图仓': getMyWebsiteFullURL('19190') },
    { 'N站视频下载脚本': 'https://greasyfork.org/zh-CN/scripts/439692-nico-dl' }
]

export default {
    name: 'BottomNav',
    data() {
        return {
            links
        }
    },
}
</script>