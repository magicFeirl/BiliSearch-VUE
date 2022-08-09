<template>
  <VideoListPage :data="data" />
</template>
  
<script>
import VideoListPage from '../components/VideoListPage.vue';
import getVideoList from '../http/searchVideo'

export default {
  name: "SearchResult",
  components: {
    VideoListPage
  },
  data() {
    return {
      data: [],
      total: 0,
    };
  },
  watch: {
    '$route': 'getResultList'
  },
  created() {
    this.getResultList();
  },
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          ps: 20
        }
      }
    },
  },
  methods: {
    async getResultList() {
      try {
        const { total, data } = await getVideoList({
          ...this.params,
          ...this.$route.query
        })

        this.total = total;
        this.data = data;
      } catch (e) {
        console.log(e)
        this.$message.error("获取数据失败，请稍后再试。");

      } finally {

      }
    },
  }
};
</script>