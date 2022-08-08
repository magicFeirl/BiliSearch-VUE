<template>
  <div class="grid grid-cols-[repeat(auto-fill,285px)] gap-8 justify-center">
    <div class="card" v-for="(item, idx) in data" :key="idx">
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
          <p class="p-2 whitespace-pre-line line-clamp-5 h-full">
            {{ getPubdate(item.pubdate) + '\n\n' + item.description }}
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
            <a target="_blank" :href="`https://space.bilibili.com/${item.owner_id}`">{{ "@" + item.owner_name }}</a>
          </div>
          <div class="detail">
            <el-button @click="showVideoDetail(item)" type="text">详情</el-button>
          </div>
        </div>
      </div>
    </div>

    <el-dialog :visible.sync="isShowVideoDetail" width="50%">
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
            <span @click="search(tag, 'tags')" v-for="tag in detail.tags.split(' ')" class="tag">{{ tag }}</span>
          </p>
        </div>

        <div>
          <p class="dialog-title mt-4">其他操作</p>
          <div class="flex justify-between w-full">
            <div class="video-left-options">
              <a :href="detail.cover" target="_blank">下载封面</a>
              <a :href="videoLink(detail.aid)" target="_blank">跳转播放</a>
            </div>
            <a @click.prevent="isShowVideoDetail = false" href="/">关闭</a>
          </div>
        </div>

      </div>
    </el-dialog>
  </div>
</template>
<script>
import TextWithLink from './TextWithLink.vue';

export default {
  data() {
    return {
      isShowVideoDetail: false,
      detail: {}
    }
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    TextWithLink
  },
  methods: {
    getPubdate(pubdate) {
      return new Date(pubdate * 1000).toLocaleString()
    },
    closeDialog() {
      this.isShowVideoDetail = false
    },
    search(value, type) {
      this.closeDialog()
      this.$emit('search', {
        value, type
      })
    },
    getVideoAttrText(attr) {
      if (attr === 62002) {
        return '失效: 自删'
      }

      return '失效'
    },
    videoLink(aid) {
      return `https://www.bilibili.com/video/av${aid}`
    },
    showVideoDetail(detail) {
      this.detail = detail
      this.isShowVideoDetail = true
    },
    jumpToBili(aid) {
      window.open(this.videoLink(aid));
    },
    videoDuration(duration) {
      let sec = duration % 60,
        min = Math.floor((duration / 60) % 60),
        hour = Math.floor(duration / 3600);

      if (sec < 10) {
        sec = "0" + sec;
      }

      if (min < 10) {
        min = "0" + min;
      }

      let duration_str = "";

      if (hour) {
        duration_str = duration_str + hour + ":";
      }

      duration_str = duration_str + min + ":" + sec;

      return duration_str;
    },
  },
};
</script>
<style lang="less" scoped>
.el-diaolg .el-dialog__body {
  padding: 0 !important;
}

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
