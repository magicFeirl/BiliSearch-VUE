<template>
  <div>
    <VideoCardList @search="search">
      <template v-for="({ keyword, data, total, type }, groupNumber) in groupDataByKeyword">
        <p class="pl-4 mb-6 font-bold text-gray-600 keyword" v-if="keyword && groupDataCount > 1">{{ keyword }} ({{
          total }})</p>
        <div class="card-item grid grid-cols-[repeat(auto-fill,285px)] gap-8 justify-center" v-if="type == 'blocked' ? !hideUnrelated : true">
          <VideoCardListItem @searchUser="search" @showVideoDetail="showVideoDetail" v-for="(item) in data"
            :key="item.aid + '-' + groupNumber" :item="item" :keyword="keyword" />
        </div>
        <div class="mb-4"></div>
      </template>
    </VideoCardList>

    <div v-if="!data.length && hideUnrelated">
      <ElEmpty description="看起来本页数据都被屏蔽了...">
      </ElEmpty>
    </div>

    <slot name="pagination"></slot>

    <VideoDetailDialog :detail="videoDetail" @close="closeDialog" @search="search" :visible="dialogVisible"
      :keyword="keyword" />
  </div>
</template>

<script>
import { ElEmpty } from 'element-ui';
import { groupData } from '../utils/group';
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
    blockedData: {
      type: Array,
      default: () => []
    },
    keyword: {
      type: String,
      default: ""
    },
    hideUnrelated: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    groupDataByKeyword() {
      const blockedDataGroup = { keyword: '被屏蔽的数据', data: this.blockedData, total: this.blockedData.length, type: 'blocked' }

      if (!this.keyword || !this.isDescType) {
        return [{ keyword: '', data: this.data, total: 0 }, blockedDataGroup]
      }

      const group = groupData(this.keyword, this.data)

      return group
    },
    groupDataCount() {
      return this.groupDataByKeyword.length
    },
    isDescType() {
      return this.$route.query.type == 'desc_or_title'
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
    search({ type, keyword }) {
      // 潜在bug：搜索同一个关键字时会报重复导航的错误
      this.$router.replace({
        path: 'search',
        query: { ...this.$route.query, pn: 1, type, keyword, }
      })
    },
  },
};
</script>

<style scoped></style>