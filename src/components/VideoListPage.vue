<template>
  <div>
    <VideoCardList @search="search">
      <VideoCardListItem @searchUser="search" @showVideoDetail="showVideoDetail" v-for="(item, idx) in data" :key="idx" :item="item" />
    </VideoCardList>

    <slot name="pagination"></slot>

    <VideoDetailDialog :detail="videoDetail" @close="closeDialog" @search="search" :visible="dialogVisible" />
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
    },
    currentPage: Number,
    pageSize: Number,
    total: Number
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
    search({ type, keyword }) {
      // 潜在bug：搜索同一个关键字时会报重复导航的错误
      this.$router.replace({
        path: 'search',
        query: { pn: 1, type, keyword }
      })
    },
  },
};
</script>