<template>
  <div>
    <div v-if="loaded">
      <div v-if="total !== 0">
        <div
          style="
            margin-bottom: 10px;
            font-weight: bolder;
            color: #aaa;
            font-size: 14px;
          "
        >
          搜索结果
        </div>
        <el-row :gutter="12">
          <el-col :span="6" v-for="item in result_list" :key="item.id">
            <el-card
              shadow="hover"
              :body-style="{ padding: '1px 20px', height: '100%' }"
            >
              <a
                :href="`https://www.bilibili.com/video/av${item.aid}`"
                target="_blank"
                rel="noreferrer"
              >
                <p class="title">{{ item.title }}</p>
                <p class="desc">{{ item.desc }}</p>
              </a>
            </el-card>
          </el-col>
        </el-row>

        <div class="pagination_wrapper">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="parseInt(query_param.pn)"
            :page-sizes="[4, 8, 20, 40]"
            :page-size="parseInt(query_param.ps)"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
      <div style="margin-top: 25vh; text-align: center;" v-else>
        <div><i class="el-icon-paperclip"></i>我们没有找到你想要的结果 :(，你可以试试:</div>
        <br>
        <div><a :href="`https://search.bilibili.com/video?keyword=${query_param.keyword}`" target="_blank">B站站内搜索: {{query_param.keyword}}</a></div>
        <br>
        <div><a :href="`https://www.baidu.com/s?ie=UTF-8&wd=${query_param.keyword}`" target="_blank">用百度搜索: {{query_param.keyword}}</a></div>
        <br>
        <div><a :href="`https://www.google.com.hk/search?q=${query_param.keyword}`" target="_blank">用Google搜索: {{query_param.keyword}}</a></div>
      </div>
    </div>
    <div style="margin-top: 35vh; text-align: center;" v-else>
      <div>
        <div v-if="no_error">
          <i class="el-icon-loading"></i>正在搜索中，请耐心等候...
        </div>
        <div v-else>
          <i class="el-icon-warning-outline"></i
          >连接后端服务器出错，请检查你的网络设置，或点击<strong
            ><a
              style="color: grey"
              href="https://message.bilibili.com/#/whisper/mid194602704"
              target="_blank"
              >这↑里↓</a
            ></strong
          >通知站长后端炸了。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SearchResult",
  created(){
    this.getResultList();
  },
  watch: {
    '$route': 'getResultList'
  },
  data() {
    return {
      result_list: [],
      total: 0,
      loaded: false,
      no_error: true,
    };
  },
  props: {
    query_param: {
      type: Object,
    },
  },
  methods: {
    handleSizeChange(newSize) {
      this.query_param.ps = newSize;
      this.getResultList();
    },
    handleCurrentChange(newPage) {
      this.query_param.pn = newPage;
      this.getResultList();
    },
    async getResultList() {
      // console.log('Result')
      // return 
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
      this.result_list = res.data.data;
    },
  },
};
</script>

<style scoped lang="less">
.title {
  margin: 5px 0;
  font-weight: bolder;
}

.desc {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: scroll;
  white-space: pre-line;
  word-wrap: break-word;
  word-break: break-all;
  height: 100px;
  margin: 0;
}

a {
  color: black;
}

.el-card {
  height: 160px;
  overflow: hidden;
  cursor: pointer;
}

.el-row {
  padding: 0 15px;
}

.el-col {
  margin-top: 10px;
}

.pagination_wrapper {
  display: flex;
  justify-content: center;
  margin-top: 50px;
}

.wrapper {
  height: 100%;
  display: flex;
  justify-content: center;
  justify-items: center;
}
</style>