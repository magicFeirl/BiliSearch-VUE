<template>
  <!-- 搜索结果显示区域 -->
  <div id="main" class="pt-65px pb-16 px-4 overflow-auto">
    <transition name="el-fade-in">
      <router-view> </router-view>
    </transition>
  </div>

</template>

<script>

export default {
  name: "Home",
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
  overflow: scroll;
}
</style>