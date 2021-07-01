<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    this.initCNZZ();
	this.initBaiduStati();
  },
  methods: {
    initCNZZ() {
      //添加脚本
      const script = document.createElement('script');
      script.src = 'https://s9.cnzz.com/z_stat.php?id=1279913187&web_id=1279913187';
      script.language = 'JavaScript';
      script.id = 'cnzz';
      document.body.appendChild(script);
    },
	initBaiduStati() {
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "https://hm.baidu.com/hm.js?2a3c4097459f6873fc3177c646f78921";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
	}
  }
}
</script>

<style scoped lang="less">

</style>