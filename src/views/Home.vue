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
import NavHeader from '../components/NavHeader.vue'
export default {
  name: "Home",
  components: {
    NavHeader
  },
};
</script>