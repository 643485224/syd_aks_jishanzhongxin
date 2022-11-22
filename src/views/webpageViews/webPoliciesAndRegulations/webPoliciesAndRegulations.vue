<template>
  <div>
    <div class="content-body">
      <div class="content-one">
        <div class="one-div">
          <div class="bg_e0edff one-left">
            <div class="bg_e0edff one-left-title">
              <div class="one-left-titleIconName">
                <div class="one-left-titleIcon">
                  <img v-lazy src="./image/webPoliciesAndRegulations-1.png" alt="" />
                </div>
                <div class="one-left-titleName">新闻法规</div>
              </div>

              <div class="one-left-titleEnglish">POLICIES AND REGULATIONS</div>
            </div>
            <div
              class="one-left-item"
              :class="isActive == '国家政策' ? 'active' : ''"
              @click="isActiveClick('国家政策')"
            >
              国家政策
            </div>
            <div
              class="one-left-item"
              :class="isActive == '地方政策' ? 'active' : ''"
              @click="isActiveClick('地方政策')"
            >
              地方政策
            </div>
            <div
              class="one-left-item"
              :class="isActive == '交易规则' ? 'active' : ''"
              @click="isActiveClick('交易规则')"
            >
              交易规则
            </div>
          </div>
          <div
            class="bg_fde5e5  one-right"
            v-loading="isloading"
            element-loading-text="数据加载中，请稍后..."
            element-loading-spinner="el-icon-loading"
          >
            <div class="one-right-title">{{ isActive }}</div>
            <div class="one-right-FG"></div>
            <div class="one-right-tabsListHeight">
              <div
                class="one-right-tabsList"
                v-for="(item, index) in list"
                :key="index"
                @click="jumpDetailsButton(item.id)"
              >
                <div class="tabsList-title">{{ item.title }}</div>
                <div>{{ item.releaseTime }}</div>
              </div>
            </div>

            <div class="one-right-page">
              <Page
                :total="pages.total"
                :current="pages.current"
                @on-change="currentChange($event)"
              />
            </div>
          </div>
        </div>
      </div>
      <cu-friendshipLink></cu-friendshipLink>
    </div>
    <webMainFooter></webMainFooter>

    <cu-dialog :visible="visible" :center="true" @handleClose="handleClose">
      <div class="detailTitle">{{ listdetails.title }}</div>
      <div class="detailTime">发布时间：{{ listdetails.releaseTime }}</div>
      <div class="detail">{{ listdetails.detail }}</div>
      <template slot="footer">
        <div class="flex">
          <el-button type="primary" @click="handleClose">关闭</el-button>
        </div>
      </template>
    </cu-dialog>
  </div>
</template>
<script>
import {
  infomationPagePoliciesList,
  infomationGetPoliciesById,
} from "@/api/aksApi/webApi/webApi.js";
export default {
  data() {
    return {
      isActive: "国家政策", //左侧选中状态
      visible: false, //详情弹框
      isloading: false, //加载中
      pages: {
        total: 100,
        current: 1,
        size: 10,
      },
      // 国家政策列表
      list: [],
      listdetails: {}, //公告详情
    };
  },
  mounted() {
    this.infomationPagePoliciesListApi(); //通过标题查询信息表中国家政策分页列表信息（1 国家政策 2 地方政策 3 交易规则）-接口
  },
  methods: {
    //通过标题查询信息表中政策法规分页列表信息 （4 国家政策 5 地方政策 6 交易规则）-接口
    infomationPagePoliciesListApi() {
      // 1 国家政策 2 地方政策 3 交易规则
      this.isloading = true;
      this.list = [];
      let valueId = 4;
      if (this.isActive == "国家政策") {
        valueId = 4;
      } else if (this.isActive == "地方政策") {
        valueId = 5;
      } else if (this.isActive == "交易规则") {
        valueId = 6;
      }
      let valueData = {
        title: "",
        policiestId: valueId,
        currPageNo: this.pages.current,
        pageSize: this.pages.size,
      };
      infomationPagePoliciesList(valueData)
        .then((res) => {
          this.isloading = false;
          if (res.code == 200) {
            this.list = res.data.list;
            this.pages.total = res.data.totalCount;
          }
        })
        .catch((err) => {
          this.isloading = false;
          console.log(err);
        });
    },
    // 通过信息ID查询政策法规详情列表-接口
    infomationGetPoliciesByIdApi(valueId) {
      this.isloading = true;
      infomationGetPoliciesById(valueId)
        .then((res) => {
          this.isloading = false;
          if (res.code == 200) {
            this.visible = true;
            this.listdetails = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.isloading = false;
          console.log(err);
        });
    },
    // 左侧点击回调
    isActiveClick(value) {
      this.isActive = value;
      this.infomationPagePoliciesListApi();
    },
    // 分页改变回调
    currentChange(value) {
      this.pages.current = value;
      this.infomationPagePoliciesListApi();
    },
    // 弹框关闭
    handleClose() {
      this.visible = false;
    },

    // 点击跳转详情
    jumpDetailsButton(id) {
      // 本页面打开
      // this.$router.push({
      //   name: "textDetails",
      //   query: { type: 1, id: id },
      // });
      // 新页面打开
      let routeData = this.$router.resolve({
        name: "textDetails",
        query: { type: 1, id: id },
      });
      window.open(routeData.href, "_blank");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./webPoliciesAndRegulations.scss";
</style>
