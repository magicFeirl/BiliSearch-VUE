<template>
  <div>
    <div class="pt-4 pb-8 px-4 font-bold text-sm text-gray-400 flex w-full justify-between">
      <span>搜索结果({{ total }})</span>
    </div>
    <VideoListPage v-if="data.length" :data="data">
      <template #pagination>
        <div class="flex mt-35px justify-center">
          <el-pagination :hide-on-single-page="true" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="parseInt(params.pn)"
            :page-size="parseInt(params.ps) || ps" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </template>
    </VideoListPage>
    <NotFound v-else-if="!loading" :keyword="keyword" />
    <!-- 只在第一次加载时失效，因为没有清空 data -->
    <div class="text-center mt-8 text-gray-400" v-else>
      搜索中，请稍后...
    </div>
  </div>
</template>
  
<script>
import VideoListPage from '../components/VideoListPage.vue';
import NotFound from '../components/NotFound.vue';

import getVideoList from '../http/searchVideo'

export default {
  name: "SearchResult",
  components: {
    VideoListPage,
    NotFound
  },
  data() {
    return {
      data: [],
      total: 0,
      ps: 20,
      loading: true
    };
  },
  watch: {
    '$route': 'getResultList'
  },
  created() {
    this.getResultList();
  },
  computed: {
    keyword() {
      return this.$route.query.keyword
    }
  },
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          ps: 20,
          pn: 1,
        }
      }
    },
  },
  methods: {
    async getResultList() {
      this.loading = true

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
        this.loading = false
      }
    },
    handleSizeChange(newSize) {
      this.$router.replace({ path: 'search', query: { ...this.$route.query, ps: newSize } })
    },
    handleCurrentChange(newPage) {
      this.$router.replace({ path: 'search', query: { ...this.$route.query, pn: newPage } })
    },
  }
};
</script>