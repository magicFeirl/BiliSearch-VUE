<template>
  <el-dialog :visible.sync="dialogVisible" width="50%">
    <template #title>
      <span class="font-bold">{{ detail.title }}</span> 的详细信息
    </template>
    <div class="flex flex-col detail-dialog-body gap-2">
      <p class="-mt-8 mb-2"><a target="_blank" :href="videoLink(detail.aid)">av{{ detail.aid }}</a></p>
      <div class="stats mb-2">
        <p class="dialog-title">播放数据</p>
        <i class="iconfont icon-bofangshu !ml-0"></i><span>{{ detail.view }}</span>
        <i class="iconfont icon-zan ml-2"></i><span>{{ detail.like }}</span>
        <i class="iconfont icon-danmushu ml-2"></i><span>{{ detail.danmaku }}</span>
        <i class="iconfont icon-fenxiang ml-2"></i><span>{{ detail.share }}</span>
      </div>

      <div v-if="detail.description">
        <p class="dialog-title">简介</p>
        <!-- <p v-html="descWithLink(detail.description)"></p> -->
        <TextWithLink :text="detail.description" class="whitespace-pre-wrap"
          :onSearchText="(text) => search(text, 'desc_or_title')" />
      </div>

      <div>
        <p class="dialog-title">投稿时间</p>
        <p>{{ getPubdate(detail.pubdate) }}</p>
      </div>

      <div v-if="detail.tags">
        <p class="dialog-title mb-2">标签</p>
        <p class="flex flex-wrap gap-2">
          <span @click="search(tag, 'tags')" v-for="tag in detail.tags.split(' ')" class="tag">{{ tag
          }}</span>
        </p>
      </div>

      <div>
        <p class="dialog-title mt-4">其他操作</p>
        <div class="flex justify-between w-full">
          <div class="video-left-options">
            <a :href="detail.cover" target="_blank">下载封面</a>
            <a :href="videoLink(detail.aid)" target="_blank">跳转播放</a>
          </div>
          <a @click.prevent="close" href="/">关闭</a>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import TextWithLink from './TextWithLink.vue';

import { getPubdate, videoLink } from '../utils/video'

export default {
  methods: {
    videoLink,
    getPubdate,
    close() {
      this.$emit('close')
    },
    search(keyword, type) {
      this.close()
      this.$emit('search', {
        keyword, type
      })
    }
  },
  components: {
    TextWithLink,
  },
  computed: {
    dialogVisible: {
      get() {
        return this.visible
      },
      set() {
        this.close()
      }
    }
  },
  props: {
    visible: Boolean,
    detail: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="less" scoped>
.video-left-options a {
  @apply mr-2;
}

.tag {
  @apply py-1 px-2 rounded-2xl bg-gray-300/70 text-gray-600 text-sm cursor-pointer;
  @apply hover: bg-gray-400/70;
}

.dialog-title {
  @apply font-bold text-sm mb-2 text-gray-500;
}

.card {
  @apply border border-light-800;
  @apply w-285px rounded-sm overflow-hidden;

}
</style>
