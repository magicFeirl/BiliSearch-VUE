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
  }
}
</script>