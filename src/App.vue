<template>
  <div id="app">

    <!-- 导航栏 -->
    <nav-header id="header"></nav-header>
    <router-view></router-view>
  </div>
</template>

<script>
import NavHeader from './components/NavHeader.vue'


export default {
  name: 'App',
  components: {
    NavHeader
  },
  mounted() {

  },
  methods: {

  }
}
</script>

<style scoped lang="less">
</style>