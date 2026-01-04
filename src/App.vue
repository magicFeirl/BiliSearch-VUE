<template>
  <div id="app" class="min-h-100vh">
    <router-view></router-view>
    <BottomNav />
  </div>
</template>

<script>
import BottomNav from './components/BottomNav.vue'
export default {
  name: 'App',
  components: {
    BottomNav
  },
  created() {
    if (true || location.hostname == '101.132.142.130') {
      this.$alert('服务器即将到期，请访问新网址：https://514810.xyz/', '提示', {
        confirmButtonText: '确定'
      }).then(() => {
        window.open('http://514810.xyz/', '_blank')
      })
    }
  }
}
</script>