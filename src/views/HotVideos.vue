<template>
  <div>
    <div class="order">
      <span class="font-bold -ml-4 mr-2">筛选:</span>
      <span @click="switchOrder(type, 'order')" v-for="{ name, type } in orderings" class="operation"
        :class="currentOrder === type ? 'selected' : ''">
        {{ name }}
      </span>
      <span>|</span>
      <span @click="switchOrder(type, 'copyright')" v-for="{ name, type } in copyrights" class="operation"
        :class="currentCopyright === type ? 'selected' : ''">
        {{ name }}
      </span>
      <el-popover placement="top-start" title="说明" width="200" trigger="hover" content="热门内容按视频综合分数排序，最多显示 32 条数据。*综合分数计算方式同饼月刊站计分方式。">
        <i slot="reference" class="iconfont icon-question"></i>
      </el-popover>
    </div>

    <VideoListPage :data="data"></VideoListPage>
  </div>
</template>

<script>
import VideoListPage from '../components/VideoListPage.vue'
import getHotVideoList from '../http/hotVideo'

export default {
  components: {
    VideoListPage
  },
  created() {
    this.getVideoList()
  },
  methods: {
    async getVideoList() {
      const { data } = await getHotVideoList({
        date: this.currentOrder,
        copyright: this.currentCopyright
      })

      this.data = data;
    },
    switchOrder(order, type) {
      if (type === 'copyright') {
        this.currentCopyright = order
      } else {
        this.currentOrder = order
      }
    }
  },
  data() {
    return {
      data: [],
      currentOrder: 'yesterday',
      currentCopyright: -1
    }
  },
  watch: {
    currentOrder: 'getVideoList',
    currentCopyright: 'getVideoList'
  },
  computed: {
    copyrights() {
      return [{ name: '原创', type: 1 }, { name: '搬运', type: 0 }, { name: '全部', type: -1 }]
    },
    orderings() {
      return [
        { name: '昨日', type: 'yesterday' },
        { name: '七天内', type: 'week' },
        { name: '两周内', type: '2week' },
        { name: '三十天内', type: 'month' },
      ]
    }
  }
}
</script>

<style scoped>
.order {
  @apply text-sm text-gray-400 flex gap-2 justify-center mb-6 mt-4;
}

.order span.operation {
  @apply cursor-pointer hover: text-gray-600;
}

.selected {
  @apply text-gray-600 font-bold;
}
</style>