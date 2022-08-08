<template>
  <div>
    <div v-if="loaded">
      <div v-if="total !== 0">
        <div class="pt-4 pb-8 px-4 font-bold text-sm text-gray-400 flex w-full justify-between">
          <span>搜索结果({{ total }})</span>
          <!-- <div>过滤总分小于:
            <el-input-number size="small" :controls="false" />数据
          </div> -->
        </div>

        <!-- 结果列表卡片
        思路是父组件分页，把请求的数据放到子组件中
        -->
        <VideoCardList @search="doSearch">
          <VideoCardListItem @showVideoDetail="showVideoDetail" v-for="(item, idx) in data" :key="idx" :item="item" />
        </VideoCardList>

        <div class="pagination_wrapper">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="parseInt(query_param.pn)" :page-size="parseInt(query_param.ps)"
            layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <div style="margin-top: 25vh; text-align: center;" v-else>
        <div class="text-gray-600"><i class="el-icon-paperclip"></i>我们没有找到你想要的结果 :(，你可以试试:</div>
        <br>
        <div><a :href="`https://search.bilibili.com/video?keyword=${query_param.keyword}`" target="_blank">B站站内搜索:
            {{ query_param.keyword }}</a></div>
        <br>
        <div><a :href="`https://www.baidu.com/s?ie=UTF-8&wd=${query_param.keyword}`" target="_blank">百度搜索:
            {{ query_param.keyword }}</a></div>
        <br>
        <div><a :href="`https://www.google.com.hk/search?q=${query_param.keyword}`" target="_blank">Google搜索:
            {{ query_param.keyword }}</a></div>
      </div>
    </div>
    <div style="margin-top: 35vh; text-align: center;" v-else>
      <div>
        <div v-if="no_error" class="text-gray-400">
          <i class="el-icon-loading"></i>正在搜索中，请耐心等候...
        </div>
        <div v-else>
          <i class="el-icon-warning-outline"></i>连接后端服务器出错，请检查你的网络设置，或点击<strong><a style="color: grey"
              href="https://message.bilibili.com/#/whisper/mid343118157" target="_blank">这↑里↓</a></strong>通知站长后端炸了。
        </div>
      </div>
    </div>

    <VideoDetailDialog :detail="videoDetail" @close="closeDialog" @search="doSearch" :visible="dialogVisible" />
  </div>
</template>
  
  <script>
import VideoCardList from '../components/VideoCardList.vue';
import VideoCardListItem from '../components/VideoCardListItem.vue';
import VideoDetailDialog from '../components/VideoDetailDialog.vue';

export default {
  name: "SearchResult",
  components: {
    VideoCardList, VideoCardListItem, VideoDetailDialog
  },
  created() {
    this.getResultList();
  },
  data() {
    return {
      data: [],
      total: 0,
      loaded: false,
      no_error: true,
      dialogVisible: false,
      videoDetail: {}
    };
  },
  watch: { '$route': 'getResultList' }, props: {
    query_param: {
      type: Object, default:
        () => {
          return {
            ps: 20
          }
        }
    },
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

      console.log(this.query_param, queries)
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
    },
    async getResultList() {
      const res = await this.$http
        .get("search", {
          params: this.query_param,
        })
        .catch(() => {
          this.$message.error("获取数据失败，请稍后再试。");
        });

      if (!res) {
        this.no_error = false;
        return;
      }

      this.loaded = true;
      this.total = res.data.total;
      this.data = res.data.data;
    },
  },
};
</script>

      <style scoped lang="less">
      .pagination_wrapper {
        display: flex;
        justify-content: center;
        margin-top: 35px;
      }
      </style>
