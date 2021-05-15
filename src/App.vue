<template>
  <div id="app">
    <router-view>
    </router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.initCNZZ();
  },
  methods: {
    initCNZZ() {
      //添加脚本
      const script = document.createElement('script');
      script.src = 'https://s9.cnzz.com/z_stat.php?id=1279913187&web_id=1279913187';
      script.language = 'JavaScript';
      script.id = 'cnzz';
      document.body.appendChild(script);
    }
  }
}
</script>

<style scoped lang="less">

</style>