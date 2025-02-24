<template>
  <div class="min-h-100vh">
    <!-- 搜索结果显示区域 -->
    <nav-header></nav-header>

    <div id="main" class="pt-65px pb-8 px-4 overflow-auto">
      <transition name="el-fade-in">
        <router-view> </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import { h } from 'vue'

import NavHeader from '../components/NavHeader.vue'
export default {
  name: "Home",
  components: {
    NavHeader
  },
  created() {
    const neverShowAgain = localStorage.getItem('NEVER_SHOW_MSG_AGAING')
    if (neverShowAgain == '1') {
      return
    }

    this.$msgbox({
      title: '简讯',
      message:
        h('div', {}, [
          h('p', {}, [h('span', {}, ['人生自古谁无死，不幸的，']), h('a', { attrs: { href: 'https://space.bilibili.com/343118157', target: '_blank' } }, ['@银饼综合推送bot']), h('span', {}, ['因高强度试图重发某些图片被封号 30 天，暂时无法与您互动。'])]),
          h('br', {}, []),
          h('p', {}, [h('span', {}, ['无关系的文字列：']), h('a', { attrs: { href: 'https://t.me/+fttqo2m0na42ZjU1', target: '_blank' } }, ['🍪⭐🤖'])]),
          h('p', {}, ['预计解封时间：2025年3月23日']),
        ]),
      showCancelButton: true,
      confirmButtonText: '不再显示',
      cancelButtonText: '关闭',
    }).then(() => {
      localStorage.setItem('NEVER_SHOW_MSG_AGAING', '1')
    }).catch(() => {
      // do nothing
    })
  }
};
</script>