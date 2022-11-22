<template>
  <div>
    <!-- 网页模式根入口 -->
    <div class="topLogin">
      <div class="topLogin1">
        <div class="topLogin_time">
          现在是北京时间：
          <span class="mr_10">{{ newDate }}</span>
          <span class="mr_10">{{ newWeek }}</span>
          <span>{{ newTime }}</span>
        </div>
        <div
          v-if="$store.state.vuex_user.username"
          class="topoLogin_login flex"
        >
          <!-- <span class="routerClick" @click="clickRouter('/webHomePage')"
            >中心商城</span
          >
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -->
          <span style="color: #ff480e">
            {{ $store.state.vuex_user.username }}
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a style="color: #515a6e" @click="LoginOutApi">退出</a>
        </div>
      </div>
    </div>
    <div class="topLogoss">
      <div class="top_one mt_10 mb_10">
        <div class="flex">
          <img
            v-lazy
            class="mr_10"
            src="../../assets/images/webMainImage/webMain_logo1.png"
            alt=""
          />
          <img
            v-lazy
            src="../../assets/images/webMainImage/webMain_logo2.png"
            alt=""
          />
        </div>
        <div class="toprightSelect" @click="clickRouter('/webHomePage')">
          平台首页
        </div>
      </div>
    </div>
    <router-view
      class="routerView"
      ref="routerView"
      :key="$route.path.routerQuery"
    ></router-view>
  </div>
</template>
<script>
import { logout } from "@/api/aksApi/platformApi/loginApi";
import { mapState } from "vuex";

export default {
  data() {
    return {
      newTime: new Date(), //动态时间时分秒 'hh:mm:ss'
      newDate: new Date().Format("yyyy-MM-dd"), //动态日期年月日 'yyyy-MM-dd'
      newWeek: this.$cu.timeAllFounctioncu.getWeekMethod(new Date()), //动态星期 '星期六'
      elInputModel: "",
    };
  },
  computed: {
    ...mapState(["vuex_platform", "vuex_menu", "vuex_user"]),
  },
  mounted() {
    let that = this;
    this.timer = setInterval(function () {
      that.newTime = new Date().Format("hh:mm:ss");
    });

    this.getMenuName();
  },
  watch: {
    // 路由切换滚动到顶部
    $route(to, from) {
      this.$refs.routerView.scrollTop = 0;
    },
  },
  // 销毁时清除计时器
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    // 根据当前url获取所处路由页面path，
    getMenuName() {
      let path = window.location.href.slice(
        window.location.href.indexOf("#") + 1
      );
      if (path) {
        this.path = path;
      }
    },

    // 点击路由跳转
    routerAction(router) {
      // if (router == "webIndustrySupervision") {
      //   this.webName = router;
      //   this.$router.push("/" + "webUnderConstruction");
      //   return;
      // }

      this.path = router;
      this.$router.push("/" + router);
      if (router == "login") {
        this.$store.commit("switchPlatform", "operation");
      }
    },

    LoginOutApi() {
      this.$confirm(`确定退出登录？`)
        .then(() => {
          logout()
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                let message = res.message + ",清除登录数据...";
                this.$message.success(message);
                this.$store.commit("$uStore", {
                  name: "vuex_token.tokenHead",
                  value: "",
                });
                this.$store.commit("$uStore", {
                  name: "vuex_user",
                  value: {},
                });
                // 清楚本地存储,重置路由
                setTimeout(() => {
                  window.location.href = `${location.origin}/`;
                  localStorage.clear();
                }, 800);
              } else {
                this.$message.error(res.message);
              }
            })
            .catch((err) => {});
        })
        .catch((err) => {
          console.log(err);
        });
    },
    clickRouter(routerPath, routerQuery) {
      if (routerPath == "/webTradingMallSearch") {
        if (!routerQuery) {
          this.$message.info("请先输入要查找的商品");
          return;
        }
        this.$store.commit("$uStore", {
          name: "vuex_webName",
          value: "webTradingMall",
        });
        this.$router.push({
          path: routerPath,
          query: {
            routerQuery: routerQuery, // payPropertyType: 1水费   2电费   3物业费
          },
        });
      } else {
        this.$router.push({
          path: routerPath,
        });
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
  color: #515a6e;
  font-size: 14px;
  display: flex;
  justify-content: center;
  .topLogin1 {
    width: 1200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
      justify-content: flex-end;
      font-size: 20px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #020552;
      cursor: pointer;
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

::v-deep.gerenzhongxin.el-menu.el-menu--horizontal {
  border-bottom: 0px;
  .el-submenu__title {
    height: 30px;
    line-height: 30px;
    color: #515a6e;
    background: #f4f4f4;
    border-bottom: 0px;
    padding: 0px;
  }
}
.content_all {
  width: 100%;
  height: calc(100vh - 96px);
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f4f4f4;

  .content {
    height: 100%;
    width: 1200px;
    display: flex;
    ::-webkit-scrollbar {
      width: 0 !important;
    }
    .content_aside {
      height: 100%;
      width: 180px;
      background: #ffffff;
      margin-right: 20px;
      overflow: auto;

      .content_aside_one {
        margin: 17px;
        font-size: 20px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 600;
        color: #020552;
        cursor: pointer;
      }

      .content_aside_list {
        margin: 24px 17px;
        .content_aside_list_title {
          font-size: 20px;
          font-family: Source Han Sans CN-Medium, Source Han Sans CN;
          font-weight: 600;
          color: #020552;
        }
        .content_aside_list_text {
          padding-top: 21px;
          font-size: 18px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
          cursor: pointer;
        }
      }
    }
    .content_body {
      width: 1000px;
      height: 100%;
      background: #f4f4f4;
      .routerView {
        height: calc(100% - 59px);
      }
    }
  }
}
.content_aside_division {
  width: 180px;
  height: 1px;
  background: #eeeeee;
}

.routerClick {
  cursor: pointer;
}

.menuActive {
  color: #ff480e !important;
}
// 面包屑样式
::v-deep .web {
  margin-top: 24px;
  margin-bottom: 11px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #020552 !important;
  .el-breadcrumb {
    margin: 0px;
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        font-size: 16px !important;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN !important;
        font-weight: 400 !important;
        color: #020552 !important;
      }
    }
    .el-breadcrumb__item:last-child {
      .el-breadcrumb__inner {
        font-size: 16px !important;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN !important;
        font-weight: 600 !important;
        color: #020552 !important;
      }
    }
  }
}
</style>
