<template>
  <div class="card">
    <div class="img-warp h-160px bg-light-500" @click="jumpToBili(item.aid)">
      <!-- copyright -->
      <div class="absolute flex top-10px pl-10px">
        <div v-if="item.copyright" class="mr-2 copyright-wrap">原创</div>
        <div v-if="item.attr != 0 && item.attr != -412" class="copyright-wrap !bg-red-400">{{
          getVideoAttrText(item.attr)
          }}</div>
      </div>

      <!-- description cover -->
      <div class="description-cover overflow-hidden p-1">
        <p class="p-2 whitespace-pre-line line-clamp-4 h-full">
          {{ item.pubdate + '\n\n' + item.description }}
        </p>
      </div>
      <!-- 方案1: 使用代理 -->
      <!-- <img :src="`https://images.weserv.nl/?url=${item.cover}&w=260&h=160`" title=""/> -->
      <!-- 方案2: 禁用 refer -->
      <el-image fit="cover" lazy :src="`${item.cover}@260w_160h.webp`" alt="">
        <template #placeholder>
          <div class="w-full h-full flex items-center justify-center text-gray-400">
            <span class="-ml-2 mr-2">loading...</span><i class="el-icon-picture"></i>
          </div>
        </template>
      </el-image>
      <div class="duration-wrap bottom-0">{{ videoDuration(item.duration) }}</div>
    </div>
    <div class="info-warp">
      <p @click="jumpToBili(item.aid)" class="title" :title="item.title">{{ item.title }}</p>
      <div class="video-info">
        <div class="poster">
          <a target="_blank" :href="`https://space.bilibili.com/${item.owner_id}`">{{ "@" + item.owner_name
            }}</a>
        </div>
        <div class="detail">
          <el-button @click="showVideoDetail(item)" type="text">详情</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getVideoAttrText, jumpToBili, videoDuration, videoLink } from '../utils/video'

export default {
  props: {
    item: {
      type: Object,
      default: () => { }
    }
  },
  methods: {
    showVideoDetail(video) {
      this.$emit('showVideoDetail', video)
    },
    getVideoAttrText,
    jumpToBili,
    videoDuration,
    videoLink
  }
}
</script>

<style lang="less" scoped>
.card {
  @apply border border-light-800;
  @apply w-285px rounded-sm overflow-hidden;

}

.img-warp {
  @apply relative cursor-pointer;
}

.description-cover {
  @apply text-light-400 text-sm;
  @apply opacity-0 transition transition-opacity w-full h-full absolute left-0 top-0 bg-gray-900/50 z-1000;
}

.img-warp:hover .description-cover {
  @apply opacity-100;
}


.copyright-wrap {
  @apply px-6px py-1 rounded-md opacity-80 bg-orange-400 text-white text-sm font-bold z-1000;
}

.duration-wrap {
  position: absolute;
  right: 0;
  padding: 0 5px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  box-sizing: border-box;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  min-width: 35px;
}

.img-warp>.el-image {
  @apply h-160px w-full;
}

.info-warp {
  @apply p-2 pt-0 box-border;
}

.title {
  @apply line-clamp-1 font-bold my-2 cursor-pointer;
}

.video-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(66, 66, 66);
  font-size: 14px;
  position: relative;
}

.detail {
  position: absolute;
  right: 5px;

  .el-button {
    color: #999;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>