<template>
  <div>
    <div class="pt-4 pb-8 px-4 font-bold text-sm text-gray-400 flex w-full justify-between">
      <span>搜索结果({{ total }})</span>
    </div>
    <VideoListPage :data="data">
      <template #pagination>
        <div class="flex mt-35px justify-center">
          <el-pagination :hide-on-single-page="true" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="pn" :page-size="ps"
            layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </template>
    </VideoListPage>
  </div>
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
      ps: 0,
      pn: 1
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
    handleSizeChange(newSize) {
      this.$router.replace({ path: 'search', query: { ...this.params, ps: newSize } })
    },
    handleCurrentChange(newPage) {
      this.$router.replace({ path: 'search', query: { ...this.params, pn: newPage } })
    },
  }
};
</script>