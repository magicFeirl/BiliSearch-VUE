<template>
  <div class="card-container">
    <div
      @click="jumpToBili(item.aid)"
      class="card"
      v-for="(item, idx) in data"
      :key="idx"
    >
      <div class="img-warp">
        <div v-if="item.copyright === 1" class="copyright-wrap">原创</div>
        <!-- 方案1: 使用代理 -->
        <!-- <img :src="`https://images.weserv.nl/?url=${item.cover}&w=260&h=160`" title=""/> -->
        <!-- 方案2: 禁用 refer -->
        <el-image
          fit="cover"
          lazy
          :src="`${item.cover}@260w_160h.webp`"
          alt=""
        ></el-image>
        <div class="duration-wrap">{{ videoDuration(item.duration) }}</div>
      </div>
      <div class="info-warp">
        <p class="title">{{ item.title }}</p>
        <div class="video-info">
          <div class="poster">
            <a
              target="_blank"
              :href="`https://space.bilibili.com/${item.owner_id}`"
              >{{ "@" + item.owner_name }}</a
            >
          </div>
          <!-- <div class="stats">
                        <div><i class="iconfont icon-zan"></i><span>{{ item.like }}</span></div>
                        <div><i class="iconfont icon-bofangshu"></i><span>{{ item.view }}</span></div>
                        <div><i class="iconfont icon-danmushu"></i><span>{{ item.danmaku }}</span></div>
                        <div><i class="iconfont icon-fenxiang"></i><span>{{ item.share }}</span></div>
                    </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    jumpToBili(aid) {
      window.open(`https://www.bilibili.com/video/av${aid}`);
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
.card-container {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  padding: 20px;
  justify-content: flex-start;
}

.card {
  width: 285px;
  height: 235px;
  box-sizing: border-box;
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;
  transition: 0.5s;
  margin: 0 15px 30px 15px;
}

.card:hover {
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.5);
}

.img-warp {
  position: relative;
}

.copyright-wrap {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 2px;
  border: 1px solid #dfac67;
  border-radius: 6px;
  background: #dfac67;
  opacity: 0.8;
  color: white;
  font-size: 14px;
  font-weight: 700;
  z-index: 1000;
}

.duration-wrap {
  position: absolute;
  bottom: 4px;
  right: 0;
  padding: 0 5px;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  box-sizing: border-box;
  height: 20px;
  line-height: 20px;
  font-size: 14px;
  min-width: 35px;
}

.img-warp > .el-image {
  height: 160px;
  width: 100%;
}

.info-warp {
  padding: 0 8px;
}

.title {
  font-size: 16px;
  font-weight: 700;
  color: inherit;
  white-space: nowrap;
  overflow: hidden;
  justify-self: stretch;
  text-overflow: ellipsis;
  margin: 10px 0;
}

.iconfont {
  font-size: 12pt;
  margin: 0 4px 0 12px;
}

.video-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(66, 66, 66);
  font-size: 14px;
}

.stats {
  width: 140px;
  display: flex;
  justify-content: space-around;
}
</style>
