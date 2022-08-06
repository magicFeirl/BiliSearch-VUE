<template>
  <el-header class="fixed left-0 right-0 top-0 bg-white">
    <el-row :gutter="6">
      <el-col :span="6">
        <router-link to="/">
          <i class="el-icon-monitor"></i>
          银饼视频检索站
        </router-link>
      </el-col>
      <el-col :span="12" class="form-container">
        <el-form :model="search_form" :rules="search_form_rules" ref="search_form_ref">
          <el-form-item prop="keyword">
            <el-input placeholder="输入关键字，按回车键进行检索。多个关键字用空格隔开。" v-model="search_form.keyword" clearable
              @keyup.enter.native="search">
              <el-select slot="prepend" v-model="search_form.type" placeholder="请选择" style="background-color: white">
                <el-option :key="option.label" v-for="option in searchOptions" v-bind="option"></el-option>
              </el-select>

              <el-popover slot="append" placement="top-start" title="提示" width="200" trigger="hover">
                <div>
                  <span>交集: 表示搜索的关键字必须同时存在；</span><br />
                  <span>并集：只要有关键字符合条件就会被作为结果显示；</span><br /><br />
                  <span>多个关键字用空格隔开。</span>
                </div>
                <el-switch slot="reference" v-model="search_form.join" active-text="交集" inactive-text="并集"></el-switch>
              </el-popover>
            </el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-row>
          <el-col :span="8"><a href="https://rudk.ml" target="_blank"><i class="el-icon-star-off"></i>饼图站</a></el-col>

          <el-col :span="8">
            <router-link to="/about">
              <i class="el-icon-warning-outline"></i>
              关于
            </router-link>
          </el-col>

          <el-col :span="8"><a href='http://121.5.133.245:3630'>不能访问？</a></el-col>

        </el-row>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
export default {
  computed: {
    searchOptions() {
      return [
        { label: "按简介或标题搜索", value: "desc_or_title" },
        { label: "按简介搜索", value: "desc" },
        { label: "按标题搜索", value: "title" },
        { label: "按用户名搜索", value: "owner" },
        { label: "按av号搜索（不带av前缀）", value: "aid" },
        { label: "按bv号搜索", value: "bvid" }
      ]
    }
  },
  mounted() {
    for (const key in this.$route.query) {
      this.search_form[key] = this.$route.query[key]
    }
  },
  data() {
    return {
      search_form: {
        type: "desc_or_title",
        keyword: "",
        pn: 1,
        ps: 20,
        join: false,
      },
      search_form_rules: {
        keyword: {
          required: true,
          message: "  ",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    search() {
      this.$refs.search_form_ref.validate((valid) => {
        if (!valid) {
          return;
        }

        this.$router.replace({
          path: "search",
          query: {
            type: this.search_form.type,
            keyword: this.search_form.keyword,
            pn: 1,
            ps: this.search_form.ps,
            join: this.search_form.join ? "and" : "or",
          },
        });
      });
    },
  },
};
</script>

<style lang="less">
.el-header {
  border-bottom: 1px solid #ccc;
  z-index: 1001;

  .el-row {
    height: 100%;
    display: flex;
    align-items: center;

    .el-col {
      text-align: center;
    }
  }

  .el-select {
    width: 130px;
  }
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .el-form {
    height: 40px;
  }
}
</style>
