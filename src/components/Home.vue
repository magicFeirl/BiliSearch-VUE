<template>
  <div class="container">
    <!-- 导航栏 -->
    <nav-header id="header"></nav-header>

    <!-- 搜索结果显示区域 -->
    <div id="main">
      <transition name="el-fade-in">
        <router-view> </router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import NavHeader from './NavHeader.vue'

export default {
  name: "Home",
  components: {
    NavHeader
  },
};
</script>

<style scoped lang="less">
.container {
  height: 100%;
}

#header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background-color: white;
}

#main {
  height: 100%;
  padding: 80px;
  padding-bottom: 30px;
  box-sizing: border-box;
  overflow: scroll;
}
</style>