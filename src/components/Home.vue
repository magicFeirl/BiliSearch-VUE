<template>
  <div>
    <!-- 搜索结果显示区域 -->
    <nav-header></nav-header>

    <div id="main" class="pt-65px pb-16 px-4 overflow-auto">
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