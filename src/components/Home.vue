<template>
  <el-container>
    <el-header>
      <el-row :gutter="6">
        <el-col :span="6">
          <router-link to="/">
            <i class="el-icon-monitor"></i>
            银饼视频检索站
          </router-link>
        </el-col>
        <el-col :span="12" class="form-container">
          <el-form
            :model="search_form"
            :rules="search_form_rules"
            ref="search_form_ref"
          >
            <el-form-item prop="keyword">
              <el-input
                placeholder="输入关键字；按回车键进行检索。"
                v-model="search_form.keyword"
                clearable
                @keyup.enter.native="search"
              >
                <el-select
                  slot="prepend"
                  v-model="search_form.type"
                  placeholder="请选择"
                  style="background-color: white"
                >
                  <el-option label="按简介搜索" value="desc"></el-option>
                  <el-option label="按标题搜索" value="title"></el-option>
                  <el-option label="按用户名搜索" value="owner"></el-option>
                </el-select>
                <!--
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="search"
                  style="background-color: white"
                ></el-button>
                -->
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <el-row>
            <el-col :span="24"><a href="https://rudk.ml" target="_blank"><i class="el-icon-star-off
"></i>饼图站</a></el-col>
            <!--
            <el-col :span="8"> 使用方法 </el-col>
            <el-col :span="8"> 关于 </el-col>
            -->
          </el-row>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-main>
        <transition name="el-fade-in">
          <router-view> </router-view>
        </transition>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      search_form: {
        type: "desc",
        keyword: "",
        pn: 1,
        ps: 20,
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
            pn: this.search_form.pn,
            ps: this.search_form.ps,
          },
        });
      });
    },
  },
};
</script>


<style scoped lang="less">
.el-header {
  border-bottom: 1px solid #ccc;

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