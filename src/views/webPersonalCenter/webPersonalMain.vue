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
        <span class="routerClick" @click="clickRouter('/webHomePage')"
          >中心商城</span
        >
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span style="color: #ff480e">
          {{ $store.state.vuex_user.username }}
        </span>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <a style="color: #515a6e" @click="LoginOutApi">退出</a>
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
    </div>
    <div class="content_all">
      <div class="content">
        <div class="content_aside">
          <!-- 采购商首页 -->
          <div
            v-if="$store.state.vuex_user.sysType == 2"
            class="content_aside_one"
            :class="
              path == '/webPersonalMain/webPersonalCenterHome'
                ? 'menuActive'
                : ''
            "
            @click="menuClick('/webPersonalMain/webPersonalCenterHome')"
          >
            首页
          </div>
          <!-- 供应商首页 -->
          <div
            v-if="$store.state.vuex_user.sysType == 3"
            class="content_aside_one"
            :class="
              path == '/webPersonalMain/webPersonalCenterSupplierHome'
                ? 'menuActive'
                : ''
            "
            @click="menuClick('/webPersonalMain/webPersonalCenterSupplierHome')"
          >
            首页
          </div>
          <!-- 零购用户首页 -->
          <div
            v-if="$store.state.vuex_user.sysType == 5"
            class="content_aside_one"
            :class="
              path == '/webPersonalMain/webRetailPurchaseHome'
                ? 'menuActive'
                : ''
            "
            @click="menuClick('/webPersonalMain/webRetailPurchaseHome')"
          >
            首页
          </div>

          <div class="content_aside_division"></div>
          <div v-for="item in menuList" :key="item.name">
            <div class="content_aside_list">
              <div class="content_aside_list_title">{{ item.name }}</div>
              <div v-for="itemm in item.children" :key="itemm.name">
                <div
                  class="content_aside_list_text"
                  :class="path == itemm.path ? 'menuActive' : ''"
                  @click="menuClick(itemm.path)"
                >
                  {{ itemm.name }}
                </div>
              </div>
            </div>
            <div class="content_aside_division"></div>
          </div>
        </div>
        <div class="content_body">
          <div class="web">
            当前位置：
            <el-breadcrumb separator="/">
              <template v-for="item in breadcrumbList">
                <el-breadcrumb-item
                  :key="item.path"
                  :to="{ path: item.path }"
                  >{{ item.name }}</el-breadcrumb-item
                >
              </template>
            </el-breadcrumb>
          </div>

          <router-view
            class="routerView"
            ref="routerView"
            :key="$route.path.routerQuery"
          ></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { logout } from "@/api/aksApi/platformApi/loginApi";
import { mapState } from "vuex";
import breadCrumb from "@/components/BreadCrumb.vue";

export default {
  components: {
    breadCrumb,
  },
  data() {
    return {
      menuList: [],
      //采购商菜单
      purchaserMenu: [
        {
          path: "",
          name: "采购管理",
          children: [
            {
              path: "/webPersonalMain/procurementRegistration",
              name: "采购登记",
            },
            {
              path: "/webPersonalMain/myShoppingCart",
              name: "我的购物车",
            },
            {
              path: "/webPersonalMain/myPurchaseOrder",
              name: "我的采购单",
            },
            {
              path: "/webPersonalMain/purchaseOrderApproval",
              name: "采购单审核",
            },
            {
              path: "/webPersonalMain/auditRecord",
              name: "审核记录",
            },
          ],
        },
        {
          path: "",
          name: "交易管理",
          children: [
            {
              path: "/webPersonalMain/transactionOrderDetails",
              name: "交易订单明细",
            },
            {
              path: "/webPersonalMain/returnOrderDetails",
              name: "退货订单明细",
            },
          ],
        },
        {
          path: "/webPersonalMain/",
          name: "供应商管理",
          children: [
            {
              path: "/webPersonalMain/supplierManagement",
              name: "供应商管理",
            },
          ],
        },
        {
          path: "",
          name: "账号管理",
          children: [
            {
              path: "/webPersonalMain/enterpriseInformationManagement",
              name: "企业信息管理",
            },
            {
              path: "/webPersonalMain/accountSecurity",
              name: "账号安全",
            },
            {
              path: "/webPersonalMain/receivingAddressManagement",
              name: "收货地址管理",
            },
            {
              path: "/webPersonalMain/authorityAccountManagement",
              name: "权限账号管理",
            },
            {
              path: "/webPersonalMain/roleManagement",
              name: "角色管理",
            },
            {
              path: "/webPersonalMain/loginLog",
              name: "登录日志",
            },
          ],
        },
        {
          path: "",
          name: "发票管理",
          children: [
            {
              path: "/webPersonalMain/controlOverInvoices",
              name: "发票管理",
            },
          ],
        },
        {
          path: "",
          name: "结算中心",
          children: [
            {
              path: "/webPersonalMain/paymentSettlementCenter",
              name: "支付结算中心",
            },
            {
              path: "/webPersonalMain/bankCardManagement",
              name: "银行卡管理",
            },
            {
              path: "/webPersonalMain/creditPayment",
              name: "信用付",
            },
          ],
        },
      ],
      //供应商菜单
      supplierMenu: [
        {
          path: "",
          name: "交易管理",
          children: [
            {
              path: "/webPersonalMain/supplierTransactionOrderList",
              name: "集采订单明细",
            },
            {
              path: "/webPersonalMain/supplierRetailOrderList",
              name: "零售订单明细",
            },
            {
              path: "/webPersonalMain/supplierSalesDailyStatistics",
              name: "销售日报统计",
            },
            {
              path: "/webPersonalMain/supplierCommoditySalesStatistics",
              name: "商品销售统计",
            },
          ],
        },
        {
          path: "",
          name: "物流管理",
          children: [
            {
              path: "/webPersonalMain/supplierLogisticsTracking",
              name: "物流跟踪",
            },
            {
              path: "/webPersonalMain/supplierLogisticsShippingTemplate",
              name: "物流模板",
            },
          ],
        },
        {
          path: "",
          name: "物业费用",
          children: [
            {
              path: "/webPersonalMain/supplierPendingPayMent",
              name: "待缴费用",
            },
            {
              path: "/webPersonalMain/supplierPaid",
              name: "支付记录",
            },
            {
              path: "/webPersonalMain/supplierPropertyExpenses",
              name: "综合查询",
            },
          ],
        },
        {
          path: "",
          name: "商品管理",
          children: [
            {
              path: "/webPersonalMain/supplierProductManage",
              name: "药品管理",
            },
            {
              path: "/webPersonalMain/supplierInstrumentManage",
              name: "药械管理",
            },
            {
              path: "/webPersonalMain/supplierFoodManage",
              name: "美食管理",
            },
          ],
        },
        {
          path: "",
          name: "采购商管理",
          children: [
            {
              path: "/webPersonalMain/supplierPurchaserManage",
              name: "采购商管理",
            },
          ],
        },
        {
          path: "",
          name: "账号管理",
          children: [
            {
              path: "/webPersonalMain/supplierEnterpriseInfoManage",
              name: "企业信息管理",
            },
            {
              path: "/webPersonalMain/supplierAccountSecurity",
              name: "账号安全",
            },
            {
              path: "/webPersonalMain/supplierEnterpriseIntroduce",
              name: "企业介绍",
            },
            {
              path: "/webPersonalMain/supplierAccountManagement",
              name: "权限账号管理",
            },
            {
              path: "/webPersonalMain/supplierRoleManagement",
              name: "角色管理",
            },
            {
              path: "/webPersonalMain/supplierLoginLog",
              name: "登录日志",
            },
          ],
        },
        {
          path: "",
          name: "发票管理",
          children: [
            {
              path: "/webPersonalMain/supplierInvoiced",
              name: "已开发票",
            },
            {
              path: "/webPersonalMain/supplierInvoiceUpload",
              name: "发票上传",
            },
          ],
        },
        {
          path: "",
          name: "结算中心",
          children: [
            {
              path: "/webPersonalMain/supplierSettlementHome",
              name: "结算首页",
            },
            {
              path: "/webPersonalMain/supplierSettlementStatistics",
              name: "结算统计",
            },
            {
              path: "/webPersonalMain/supplierCreditLoan",
              name: "信用贷",
            },
          ],
        },
      ],
      // 零购用户菜单
      retailPurchaseMenu: [
        {
          path: "",
          name: "订单中心",
          children: [
            {
              path: "/webPersonalMain/webRetailMyOrder",
              name: "我的订单",
              children: [
                {
                  path: "/webPersonalMain/webRetailMyOrder/itemderDetail",
                  name: "订单详情",
                  children: [
                    {
                      path: "/webPersonalMain/webRetailMyOrder/itemderDetail/itemLogistics",
                      name: "查看物流",
                    },
                    {
                      path: "/webPersonalMain/webRetailMyOrder/itemderDetail/itemReturnGoods",
                      name: "申请退货",
                    },
                    {
                      path: "/webPersonalMain/webRetailMyOrder/itemderDetail/itemEvaluate",
                      name: "评价晒单",
                    },
                  ],
                },
                {
                  path: "/webPersonalMain/webRetailMyOrder/itemEvaluate",
                  name: "评价晒单",
                },
              ],
            },
            {
              path: "/webPersonalMain/webRetailEvaluationSheet",
              name: "评价晒单",
              children: [
                {
                  path: "/webPersonalMain/webRetailEvaluationSheet/itemderDetail",
                  name: "订单详情",
                  children: [
                    {
                      path: "/webPersonalMain/webRetailEvaluationSheet/itemderDetail/itemLogistics",
                      name: "查看物流",
                    },
                    {
                      path: "/webPersonalMain/webRetailEvaluationSheet/itemderDetail/itemReturnGoods",
                      name: "申请退货",
                    },
                    {
                      path: "/webPersonalMain/webRetailEvaluationSheet/itemderDetail/itemEvaluate",
                      name: "评价晒单",
                    },
                  ],
                },
                {
                  path: "/webPersonalMain/webRetailEvaluationSheet/itemEvaluate",
                  name: "评价晒单",
                },
                {
                  path: "/webPersonalMain/webRetailEvaluationSheet/itemFollowUpComments",
                  name: "追评",
                },
              ],
            },
            {
              path: "/webPersonalMain/webRetailFrequentlyPurchased",
              name: "我的常购商品",
            },
          ],
        },
        {
          path: "",
          name: "我的购物车",
          children: [
            {
              path: "/webPersonalMain/webRetailShoppingCart",
              name: "我的购物车",
            },
          ],
        },
        {
          path: "",
          name: "关注中心",
          children: [
            {
              path: "/webPersonalMain/webRetailProductsConcerned",
              name: "关注的商品",
            },
            {
              path: "/webPersonalMain/webRetailShopsConcerned",
              name: "关注的店铺",
            },
          ],
        },
        {
          path: "",
          name: "设置",
          children: [
            {
              path: "/webPersonalMain/webRetailLnformation",
              name: "个人信息",
            },
            {
              path: "/webPersonalMain/webRetailShipToAddress",
              name: "收货地址",
            },
            {
              path: "/webPersonalMain/webRetailAccountBinding",
              name: "账号绑定",
            },
          ],
        },
      ],
      newTime: new Date(), //动态时间时分秒 'hh:mm:ss'
      newDate: new Date().Format("yyyy-MM-dd"), //动态日期年月日 'yyyy-MM-dd'
      newWeek: this.$cu.timeAllFounctioncu.getWeekMethod(new Date()), //动态星期 '星期六'
      elInputModel: "",
      path: "/webPersonalMain/webPersonalCenterHome",
      breadcrumbList: [
        {
          name: "首页",
          path: "",
        },
      ],
    };
  },
 
  computed: {
    ...mapState(["vuex_platform", "vuex_menu", "vuex_user"]),
    hiddenAside() {
      return this.$route.meta.isHeaderNav;
    },
  },
  mounted() {
    // sysType 系统类型@ 1 运营平台  2  采购商  3  供应商
    if (this.$store.state.vuex_user.sysType == 2) {
      this.menuList = this.purchaserMenu; //采购商菜单
    } else if (this.$store.state.vuex_user.sysType == 3) {
      this.menuList = this.supplierMenu; //供应商菜单
    } else {
      this.menuList = this.retailPurchaseMenu; //零购用户菜单
    }

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
      this.menuCL(to.path);
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
      let path;
      if (window.location.href.indexOf("?") != -1) {
        path = window.location.href.slice(
          window.location.href.indexOf("#") + 1,
          window.location.href.indexOf("?")
        );
      } else {
        path = window.location.href.slice(
          window.location.href.indexOf("#") + 1
        );
      }
      if (path) {
        this.path = path;
        this.menuCL(path);
      }
    },
    menuClick(path) {
      this.path = path;
      this.$router.push(path);
      this.menuCL(path);
    },
    menuCL(path) {
      this.breadcrumbList = [];
      if (path == "/webPersonalMain/webPersonalCenterHome") {
        this.breadcrumbList.push({
          name: "首页",
          path: "/webPersonalMain/webPersonalCenterHome",
        });
      } else if (path == "/webPersonalMain/webPersonalCenterSupplierHome") {
        this.breadcrumbList.push({
          name: "首页",
          path: "/webPersonalMain/webPersonalCenterSupplierHome",
        });
      } else if (path == "/webPersonalMain/webRetailPurchaseHome") {
        this.breadcrumbList.push({
          name: "首页",
          path: "/webPersonalMain/webRetailPurchaseHome",
        });
      } else {
        this.menuList.forEach((element) => {
          element.children.forEach((elemen) => {
            if (elemen.path == path) {
              let a = {
                name: element.name,
                path: element.path,
              };
              this.breadcrumbList.push(a);
              let b = {
                name: elemen.name,
                path: elemen.path,
              };
              this.breadcrumbList.push(b);
              this.$store.commit("$uStore", {
                name: "vuex_webBreadcrumbs",
                value: this.breadcrumbList,
              });
            } else {
              if (elemen.children) {
                elemen.children.forEach((eleme) => {
                  if (eleme.path == path) {
                    let a = {
                      name: element.name,
                      path: element.path,
                    };
                    this.breadcrumbList.push(a);
                    let b = {
                      name: elemen.name,
                      path: elemen.path,
                    };
                    this.breadcrumbList.push(b);
                    let c = {
                      name: eleme.name,
                      path: eleme.path,
                    };
                    this.breadcrumbList.push(c);
                    this.path = elemen.path;
                    this.$store.commit("$uStore", {
                      name: "vuex_webBreadcrumbs",
                      value: this.breadcrumbList,
                    });
                  } else {
                    if (eleme.children) {
                      eleme.children.forEach((elem) => {
                        if (elem.path == path) {
                          let a = {
                            name: element.name,
                            path: element.path,
                          };
                          this.breadcrumbList.push(a);
                          let b = {
                            name: elemen.name,
                            path: elemen.path,
                          };
                          this.breadcrumbList.push(b);
                          let c = {
                            name: eleme.name,
                            path: eleme.path,
                          };
                          this.breadcrumbList.push(c);
                          let d = {
                            name: elem.name,
                            path: elem.path,
                          };
                          this.breadcrumbList.push(d);
                          this.path = elemen.path;
                          this.$store.commit("$uStore", {
                            name: "vuex_webBreadcrumbs",
                            value: this.breadcrumbList,
                          });
                        }
                      });
                    }
                  }
                });
              }
            }
          });
        });
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
    breadcrumbListClick(value) {},
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
  font-size: 14px;
  .topLogin_time {
    margin-right: 730px;
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
      width: 466px;

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
