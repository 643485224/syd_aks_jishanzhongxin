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
      <div v-if="$store.state.vuex_user.username" class="topoLogin_login flex">
        <!-- 采购商个人中心 -->
        <el-menu
          v-if="$store.state.vuex_user.sysType == 2"
          class="el_menu_demo"
          mode="horizontal"
        >
          <el-submenu index="1">
            <template slot="title">个人中心</template>
            <el-menu-item
              index="1-1"
              @click="clickRouter('/webPersonalMain/webPersonalCenterHome')"
              >个人中心</el-menu-item
            >
            <el-menu-item
              index="1-2"
              @click="clickRouter('/webPersonalMain/procurementRegistration')"
              >采购管理</el-menu-item
            >
            <el-menu-item
              index="1-3"
              @click="clickRouter('/webPersonalMain/transactionOrderDetails')"
              >交易管理</el-menu-item
            >
            <el-menu-item
              index="1-4"
              @click="clickRouter('/webPersonalMain/supplierManagement')"
              >供应商管理</el-menu-item
            >
            <el-menu-item
              index="1-5"
              @click="
                clickRouter('/webPersonalMain/enterpriseInformationManagement')
              "
              >账号管理</el-menu-item
            >
            <el-menu-item
              index="1-6"
              @click="clickRouter('/webPersonalMain/controlOverInvoices')"
              >发票管理</el-menu-item
            >
            <el-menu-item
              index="1-7"
              @click="clickRouter('/webPersonalMain/paymentSettlementCenter')"
              >结算中心</el-menu-item
            >
          </el-submenu>
        </el-menu>

        <!-- 供应商个人中心 -->
        <el-menu
          v-if="$store.state.vuex_user.sysType == 3"
          class="el_menu_demo"
          mode="horizontal"
        >
          <el-submenu index="1">
            <template slot="title">个人中心</template>
            <el-menu-item index="1-1">
              <span
                @click="
                  clickRouter('/webPersonalMain/webPersonalCenterSupplierHome')
                "
                >个人中心</span
              ></el-menu-item
            >
            <el-menu-item
              index="1-2"
              @click="
                clickRouter('/webPersonalMain/supplierTransactionOrderList')
              "
              >交易管理</el-menu-item
            >
            <el-menu-item
              index="1-3"
              @click="clickRouter('/webPersonalMain/supplierLogisticsTracking')"
              >物流管理</el-menu-item
            >
            <el-menu-item
              index="1-4"
              @click="clickRouter('/webPersonalMain/supplierPendingPayMent')"
              >物业管理</el-menu-item
            >
            <el-menu-item
              index="1-5"
              @click="clickRouter('/webPersonalMain/supplierProductManage')"
              >商品管理</el-menu-item
            >
            <el-menu-item
              index="1-6"
              @click="clickRouter('/webPersonalMain/supplierPurchaserManage')"
              >采购商管理</el-menu-item
            >
            <el-menu-item
              index="1-6"
              @click="
                clickRouter('/webPersonalMain/supplierEnterpriseInfoManage')
              "
              >账号管理</el-menu-item
            >
            <el-menu-item
              index="1-7"
              @click="clickRouter('/webPersonalMain/supplierInvoiced')"
              >发票管理</el-menu-item
            >
            <el-menu-item
              index="1-8"
              @click="clickRouter('/webPersonalMain/supplierSettlementHome')"
              >结算中心</el-menu-item
            >
          </el-submenu>
        </el-menu>
        <!-- 用户个人中心 -->
        <el-menu
          v-if="$store.state.vuex_user.sysType == 5"
          class="el_menu_demo"
          mode="horizontal"
        >
          <el-submenu index="1">
            <template slot="title">个人中心</template>
            <el-menu-item index="1-1">
              <span
                @click="clickRouter('/webPersonalMain/webRetailPurchaseHome')"
                >个人中心</span
              ></el-menu-item
            >
            <el-menu-item
              index="1-2"
              @click="clickRouter('/webPersonalMain/webRetailMyOrder')"
              >我的订单</el-menu-item
            >
            <el-menu-item
              index="1-3"
              @click="clickRouter('/webPersonalMain/webRetailShoppingCart')"
              >我的购物车</el-menu-item
            >
            <el-menu-item
              index="1-4"
              @click="
                clickRouter('/webPersonalMain/webRetailProductsConcerned')
              "
              >关注的商品</el-menu-item
            >
            <el-menu-item
              index="1-5"
              @click="clickRouter('/webPersonalMain/webRetailShopsConcerned')"
              >关注的店铺</el-menu-item
            >
            <el-menu-item
              index="1-6"
              @click="clickRouter('/webPersonalMain/webRetailLnformation')"
              >个人信息</el-menu-item
            >
            <el-menu-item
              index="1-6"
              @click="clickRouter('/webPersonalMain/webRetailShipToAddress')"
              >收货地址</el-menu-item
            >
            <el-menu-item
              index="1-7"
              @click="clickRouter('/webPersonalMain/webRetailAccountBinding')"
              >账号绑定</el-menu-item
            >
          </el-submenu>
        </el-menu>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span style="color: #ff480e">
          {{ $store.state.vuex_user.username }}
          <!-- ({{
            $store.state.vuex_user.sysType == 2
              ? "采购商"
              : $store.state.vuex_user.sysType == 3
              ? "供应商"
              : ""
          }}) -->
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a style="color: #909399" @click="LoginOutApi">退出</a>
        <!-- <a @click="routerAction('login')">运营平台登录</a>， -->

        <!-- <a style="color: #ff480e" @click="routerAction('Register')">免费注册</a> -->
      </div>
      <div v-else class="topoLogin_login">
        <span class="topoLogin_login_button" @click="retailPurchaseButton()"
          >我是零购客户</span
        >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;你好请 <span class="lse" style="color: #409EFF" @click="retailPurchaseButton()">登录 </span>
        <!-- <a @click="routerAction('login')">运营平台登录</a>， -->

        <a style="color: #ff480e" @click="routerAction('RetailRegistration')">免费注册</a>
      </div>
    </div>
    <div class="topLogoss">
      <div class="top_one mt_10">
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

        <div class="toprightSelect">
          <el-input
            class="selectInput"
            placeholder="请输入商品名称"
            v-model="elInputModel"
          >
          </el-input>
          <el-button
            type="primary"
            class="selcetButton"
            @click="clickRouter('/webTradingMallSearch', elInputModel)"
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

    <div class="center" ref="center">
      <router-view :key="$route.path.routerQuery"></router-view>
    </div>
  </div>
</template>
<script>
import { logout } from "@/api/aksApi/platformApi/loginApi";
export default {
  data() {
    return {
      newTime: new Date(), //动态时间时分秒 'hh:mm:ss'
      newDate: new Date().Format("yyyy-MM-dd"), //动态日期年月日 'yyyy-MM-dd'
      newWeek: this.$cu.timeAllFounctioncu.getWeekMethod(new Date()), //动态星期 '星期六'
      elInputModel: "",
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
    } else if (window.location.href.indexOf("webEntrepot") != -1) {
      webName = "webEntrepot";
    } else if (window.location.href.indexOf("webCentralTransaction") != -1) {
      webName = "webCentralTransaction";
    } else if (window.location.href.indexOf("webFinancialService") != -1) {
      webName = "webFinancialService";
    } else if (window.location.href.indexOf("webIndustrySupervision") != -1) {
      webName = "webIndustrySupervision";
    } else if (window.location.href.indexOf("webTradingMall") != -1) {
      webName = "webTradingMall";
    } else if (
      window.location.href.indexOf("webPoliciesAndRegulations") != -1
    ) {
      webName = "webPoliciesAndRegulations";
    } else if (window.location.href.indexOf("webPartyBuildingCulture") != -1) {
      webName = "webPartyBuildingCulture";
    } else if (window.location.href.indexOf("webNoticeAndAnnouncement") != -1) {
      webName = "webNoticeAndAnnouncement";
    }
    if (webName) {
      this.$store.commit("$uStore", {
        name: "vuex_webName",
        value: webName,
      });
    }
  },
  watch: {
    // 路由切换滚动到顶部
    $route(to, from) {
      this.$refs.center.scrollTop = 0;
    },
  },

  // 销毁时清除计时器
  beforeDestroy: function () {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  methods: {
    // 我是零购客户按钮
    retailPurchaseButton() {
      this.$store.commit("switchPlatform", "RetailPurchase");
      this.$router.push("/login");
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
    clickRouter(routerPath, routerQuery) {
      if (routerPath == "/webTradingMallSearch") {
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
  color: #909399;
  font-size: 14px;
  .topLogin_time {
    margin-right: 730px;
  }
  .topoLogin_login {
    .topoLogin_login_button {
      cursor: pointer;
    }
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
        font-size: 26px;
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
        font-size: 26px;
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

::v-deep .el_menu_demo {
  border-bottom: none;
  .el-submenu {
    .el-submenu__title {
      height: 40px !important;
      line-height: 40px !important;
      color: #909399;
      border-bottom: none !important;
    }
  }
}
.el-menu--horizontal {
}
// 菜单浮出层样式
.el-menu--horizontal .el-menu .el-menu-item,
.el-menu--horizontal .el-menu .el-submenu__title {
  background-color: #ffffff;
  float: none;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  padding: 0 22px;
  color: #909399 !important;
  z-index: 100;
  font-weight: 500;
}

//菜单悬浮及背景样式
.el-menu--popup-bottom-start .el-menu-item:hover {
  background: #ff480e !important;
  color: #ffffff !important;
  // color: #ff480e !important;
}
.lse{
  position: relative;
  cursor: pointer;
  margin-right: 5px;
  &::after{
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 95%;
    height: 1px;
    background: #409EFF;
  }
}
</style>
