<template>
  <div>
    <div class="pt-4 pb-4 px-4 font-bold text-sm text-gray-400 flex w-full justify-between">
      <span>搜索结果 ({{ total }})<span>
          <el-link @click="downloadSearchResult" :underline="false" icon="el-icon-download"></el-link>
        </span>
      </span>
      <span class="ml-auto">
        <span>{{ unrelatedCount }} 条疑似无关数据被屏蔽
          <el-switch v-model="hideUnrelatedData"></el-switch></span>

        <el-popover effect="light" trigger="click" width="20rem">
          <div>
            <p class="mb-4px">
              搜索站根据视频标签收录数据，但是由于某些标签被滥用所以可能会显示实际和例区无关的数据。开启该功能可以一定程度屏蔽这些数据。
            </p>
            <h3 class="font-bold mb-4px">具体规则</h3>
            <p class="mb-4px">{{ unrelatedDataRule }}</p>
            <p>指定关键字搜索时，该功能默认关闭。</p>
          </div>
          <template #reference>
            <i class="iconfont icon-question"></i>
          </template>
        </el-popover>
      </span>
    </div>

    <VideoListPage v-if="data.length" :data="data" :keyword="keyword">
      <template #pagination>
        <div class="flex mt-35px justify-center">
          <el-pagination :hide-on-single-page="true" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page="parseInt(params.pn)"
            :page-size="parseInt(params.ps) || ps" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </template>
    </VideoListPage>
    <NotFound v-else-if="!loading" :keyword="keyword" />
    <!-- 只在第一次加载时失效，因为没有清空 data -->
    <div class="text-center mt-8 text-gray-400" v-else>搜索中，请稍后...</div>
  </div>
</template>

<script>
import { saveAs } from 'file-saver'
import { groupData } from '../utils/group';
import VideoListPage from "../components/VideoListPage.vue";
import NotFound from "../components/NotFound.vue";

import getVideoList from "../http/searchVideo";

export default {
  name: "SearchResult",
  components: {
    VideoListPage,
    NotFound,
  },
  data() {
    return {
      rawData: [],
      total: 0,
      ps: 20,
      loading: true,
      hideUnrelatedData: true,
      needly_tags: [
        "真夏の夜の淫梦",
        "COOKIE☆",
        "Cookie☆",
        "クッキー☆音madリンク",
        "クッキー☆",
        "淫夢本編リンク",
        "创价",
        "银梦实况",
        "真夏夜的淫梦",
        "东方夏银梦",
        "淫夢音MADリンク",
        "哲♂学",
        "东方馅挂炒饭",
        "创价学会",
        "创价",
      ],
      check_tags: ["例のアレ"],
      blacklist_tags: ["原神", "炫神", "吉吉国王"],
    };
  },
  watch: {
    $route: "getResultList",
  },
  created() {
    this.getResultList();
  },
  computed: {
    keyword() {
      return this.$route.query.keyword;
    },
    unrelatedDataRule() {
      return `含有任意一个 ${this.check_tags.join(
        ", "
      )} 标签，但不含有任意一个 ${this.needly_tags.join(
        ", "
      )} 标签的视频，会被程序判断为无关视频并隐藏。`;
    },
    unrelatedCount() {
      return this.rawData.length - this.data.length;
    },
    data() {
      if (!this.hideUnrelatedData) {
        return this.rawData;
      }

      // 筛选出非屏蔽数据
      return this.rawData.filter((item) => {
        const tags = item.tags.split(" ");
        const check_tag_valid = this.check_tags.some((tag) =>
          tags.includes(tag)
        );
        const needly_valid = this.needly_tags.some((tag) => tags.includes(tag));
        const in_blacklist = this.blacklist_tags.some((tag) =>
          tags.includes(tag)
        );

        if (in_blacklist || (check_tag_valid && !needly_valid)) {
          return false;
        }

        return true;
      });
    },
  },
  props: {
    params: {
      type: Object,
      default: () => {
        return {
          ps: 20,
          pn: 1,
        };
      },
    },
  },
  methods: {
    downloadSearchResult() {
      this.$prompt('输入文件名：', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPlaceholder: '搜索结果.json'
      }).then(({ value }) => {
        value = value || '搜索结果.json'
        if (value) {
          const data = groupData(this.keyword, this.data)
          const blob = new Blob([JSON.stringify(data, null, 4)], { type: 'application/json' })
          saveAs(blob, value + '.json')
        }
      })
    },
    async getResultList() {
      this.loading = true;

      // 有关键字搜索时，关闭无关筛选
      if (this.keyword) {
        this.hideUnrelatedData = false;
      }

      try {
        const { total, data } = await getVideoList({
          ...this.params,
          ...this.$route.query,
        });

        // this.unrelatedCount = 0;
        this.total = total;
        this.rawData = data;
      } catch (e) {
        console.log(e);
        this.$message.error("获取数据失败，请稍后再试。");
      } finally {
        this.loading = false;
      }
    },
    handleSizeChange(newSize) {
      this.$router.replace({
        path: "search",
        query: { ...this.$route.query, ps: newSize },
      });
    },
    handleCurrentChange(newPage) {
      this.$router.replace({
        path: "search",
        query: { ...this.$route.query, pn: newPage },
      });
    },
  },
};
</script>
