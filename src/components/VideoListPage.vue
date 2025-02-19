<template>
  <div>
    <VideoCardList @search="search">
      <VideoCardListItem @searchUser="search" @showVideoDetail="showVideoDetail" v-for="(item) in data" :key="item.aid"
        :item="item" :keyword="keyword" />
    </VideoCardList>

    <slot name="pagination"></slot>

    <VideoDetailDialog :detail="videoDetail" @close="closeDialog" @search="search" :visible="dialogVisible"
      :keyword="keyword" />
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
    keyword: {
      type: String,
      default: ""
    },
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