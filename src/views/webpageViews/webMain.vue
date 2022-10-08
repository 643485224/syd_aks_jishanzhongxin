<template>
  <div>
    <!-- 网页模式根入口 -->
    <div class="topLogin">
      <div class="topLogin_time">
        现在是北京时间：
        <span class="mr_10">{{ newDate }}</span>
        <span class="mr_10">{{ newWeek }}</span>
        <span>{{ newTime }}</span>
      </div>
      <div class="topoLogin_login">
        你好，
        <!-- <a @click="routerAction('login')">运营平台登录</a>， -->

        <a style="color: #ff480e" @click="routerAction('Register')">免费注册</a>
      </div>
    </div>
    <div class="topLogoss">
      <div class="top_one mt_10">
        <div class="flex">
          <img
            class="mr_10"
            src="../../assets/images/webMainImage/webMain_logo1.png"
            alt=""
          />
          <img
            src="../../assets/images/webMainImage/webMain_logo2.png"
            alt=""
          />
        </div>

        <div class="toprightSelect">
          <el-input class="selectInput" placeholder="请输入商品名称或企业名称">
          </el-input>
          <el-button type="primary" class="selcetButton"
            ><i class="el-icon-search"></i
          ></el-button>
        </div>
      </div>

      <div class="topright mt_10">
        <div class="toprightNav">
          <div
            :class="
              $store.state.vuex_webName == 'webHomePage' ? 'active' : 'nav'
            "
            @click="routerAction('webHomePage')"
          >
            首页
          </div>
          <div
            :class="
              $store.state.vuex_webName == 'webEntrepot' ? 'active' : 'nav'
            "
            @click="routerAction('webEntrepot')"
          >
            集散中心
          </div>
          <div
            :class="
              $store.state.vuex_webName == 'webCentralTransaction'
                ? 'active'
                : 'nav'
            "
            @click="routerAction('webCentralTransaction')"
          >
            中心交易
          </div>
          <div
            :class="
              $store.state.vuex_webName == 'webFinancialService'
                ? 'active'
                : 'nav'
            "
            @click="routerAction('webFinancialService')"
          >
            银行服务
          </div>
          <div
            :class="
              $store.state.vuex_webName == 'webIndustrySupervision'
                ? 'active'
                : 'nav'
            "
            @click="routerAction('webIndustrySupervision')"
          >
            行业监管
          </div>
          <div
            :class="
              $store.state.vuex_webName == 'webTradingMall' ? 'active' : 'nav'
            "
            @click="routerAction('webTradingMall')"
          >
            中心商城
          </div>

          <div
            :class="
              $store.state.vuex_webName == 'webPoliciesAndRegulations'
                ? 'active'
                : 'nav'
            "
            @click="routerAction('webPoliciesAndRegulations')"
          >
            新闻法规
          </div>
          <div
            :class="
              $store.state.vuex_webName == 'webPartyBuildingCulture'
                ? 'active'
                : 'nav'
            "
            @click="routerAction('webPartyBuildingCulture')"
          >
            中心党建
          </div>
          <div
            :class="
              $store.state.vuex_webName == 'webNoticeAndAnnouncement'
                ? 'active'
                : 'nav'
            "
            @click="routerAction('webNoticeAndAnnouncement')"
          >
            关于我们
          </div>
        </div>
      </div>
    </div>

    <div class="center">
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newTime: new Date(), //动态时间时分秒 'hh:mm:ss'
      newDate: new Date().Format("yyyy-MM-dd"), //动态日期年月日 'yyyy-MM-dd'
      newWeek: this.$cu.timeAllFounctioncu.getWeekMethod(new Date()), //动态星期 '星期六'
    };
  },
  mounted() {
    let that = this;
    this.timer = setInterval(function () {
      that.newTime = new Date().Format("hh:mm:ss");
    });
    let webName;
    if (window.location.href.indexOf("webHomePage") != -1) {
      webName = "webHomePage";
    } else if (window.location.href.indexOf("webTradingMall") != -1) {
      webName = "webTradingMall";
    } else if (window.location.href.indexOf("webNoticeAndAnnouncement") != -1) {
      webName = "webNoticeAndAnnouncement";
    } else if (
      window.location.href.indexOf("webPoliciesAndRegulations") != -1
    ) {
      webName = "webPoliciesAndRegulations";
    } else if (window.location.href.indexOf("webFinancialService") != -1) {
      webName = "webFinancialService";
    } else if (window.location.href.indexOf("webPartyBuildingCulture") != -1) {
      webName = "webPartyBuildingCulture";
    }
    this.$store.commit("$uStore", {
      name: "vuex_webName",
      value: webName,
    });
  },

  // 销毁时清除计时器
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    // 根据页面路径判断是哪个导航-对应那个导航变色
    getAction(value) {
      if (value.indexOf("webHomePage") != -1) {
        this.$store.commit("$uStore", {
          name: "vuex_webName",
          value: "webHomePage",
        });
      } else if (value.indexOf("webTradingMall") != -1) {
        this.$store.commit("$uStore", {
          name: "vuex_webName",
          value: "webTradingMall",
        });
      } else if (value.indexOf("webNoticeAndAnnouncement") != -1) {
        this.$store.commit("$uStore", {
          name: "vuex_webName",
          value: "webNoticeAndAnnouncement",
        });
      } else if (value.indexOf("webPoliciesAndRegulations") != -1) {
        this.$store.commit("$uStore", {
          name: "vuex_webName",
          value: "webPoliciesAndRegulations",
        });
      } else if (value.indexOf("webFinancialService") != -1) {
        this.$store.commit("$uStore", {
          name: "vuex_webName",
          value: "webFinancialService",
        });
      } else if (value.indexOf("webPartyBuildingCulture") != -1) {
        this.$store.commit("$uStore", {
          name: "vuex_webName",
          value: "webPartyBuildingCulture",
        });
      }
    },
    // 点击路由跳转
    routerAction(router) {
      // if (router == "webIndustrySupervision") {
      //   this.$store.state.vuex_webName = router;
      //   this.$router.push("/" + "webUnderConstruction");
      //   return;
      // }

      this.$store.state.vuex_webName = router;
      this.$router.push("/" + router);
      if (router == "login") {
        this.$store.commit("switchPlatform", "operation");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.topLogin {
  width: 100%;
  height: 30px;
  background: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #515a6e;
  .topLogin_time {
    margin-right: 760px;
  }
}
::v-deep.topLogoss {
  width: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  .top_one {
    width: 1200px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .toprightSelect {
      display: flex;
      width: 454px;

      .selectInput {
        .el-input__inner {
          width: 400px;
          border: 1px solid #ff480e;
          border-radius: 0px;
        }
      }
      .selcetButton {
        height: 40px;
        padding-top: 0px;
        padding-bottom: 0px;
        border-radius: 0px;
        margin: 0px;
        font-size: 26px;
        background: #ff480e;
        border: #ff480e;
      }
    }
  }

  .topright {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #ff480e;
    .toprightNav {
      width: 1200px;
      display: flex;
      .nav {
        height: 70px;
        width: 133px;
        font-size: 18px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
      .active {
        height: 70px;
        width: 133px;
        font-size: 18px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
        background: #d33300;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
      }
    }
  }
}
.center {
  height: calc(100vh - 166px);
  width: 100%;
  background: #f4f4f4;
  overflow: auto;
}
</style>
