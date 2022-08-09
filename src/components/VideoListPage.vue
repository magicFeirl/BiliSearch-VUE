<template>
  <div>
    <VideoCardList @search="doSearch">
      <VideoCardListItem @showVideoDetail="showVideoDetail" v-for="(item, idx) in data" :key="idx" :item="item" />
    </VideoCardList>

    <!-- <div class="flex mt-35px justify-center">
      <el-pagination @size-change="(ps) => search({ ps })" @current-change="(pn) => search({ pn })"
        :current-page="parseInt(query_param.pn)" :page-size="parseInt(query_param.ps)"
        layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div> -->

    <VideoDetailDialog :detail="videoDetail" @close="closeDialog" @search="doSearch" :visible="dialogVisible" />
  </div>
</template>

<script>
import VideoCardList from './VideoCardList.vue';
import VideoCardListItem from './VideoCardListItem.vue';
import VideoDetailDialog from './VideoDetailDialog.vue';

export default {
  name: "VideListPage",
  components: {
    VideoCardList,
    VideoCardListItem,
    VideoDetailDialog
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      videoDetail: {},
      dialogVisible: false
    }
  },
  methods: {
    showVideoDetail(video) {
      this.dialogVisible = true
      this.videoDetail = video
    },
    closeDialog() {
      this.dialogVisible = false
    },
    isEmtpyObject(obj) {
      return Object.keys(obj).length === 0
    },
    search(queries = {}) {
      if (this.isEmtpyObject(queries)) {
        return
      }

      this.$router.replace({
        path: 'search',
        query: {
          ...this.query_param,
          ...queries
        }
      })
    },
    doSearch({ type, keyword }) {
      // 潜在bug：搜索同一个关键字时会报重复导航的错误
      this.search({ pn: 1, type, keyword })
    },
    handleSizeChange(newSize) {
      this.search({ ps: newSize })
    },
    handleCurrentChange(newPage) {
      this.search({ pn: newPage })
    }
  },
};
</script>