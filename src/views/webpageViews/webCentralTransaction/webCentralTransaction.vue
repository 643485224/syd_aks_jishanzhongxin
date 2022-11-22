<template>
  <div>
    <div class="content-body">
      <div class="content-LBs">
        <div class="content-LB pt_20">
          <div class="headerBox">
            <div class="headerTitleBox">
              <div class="headerTitle">全流程 全品类 全覆盖</div>
              <div class="headerTitlePY">
                集全域线下入驻企业 全流程全品类全覆盖涉公立、私立端
                形成最优势的B端+C端互联网平台
              </div>
            </div>
            <div class="headerImg"></div>
          </div>
        </div>
      </div>

      <div class="content-btn mt_20">
        <div
          class="content_btnItem btnItem_three"
          @click="clickButton('申请入驻')"
        >
          <div class="itemBox">
            <div class="itemTitle">申请入驻</div>
            <div class="itemTitlePY">APPLICATION IN</div>
          </div>
          <img v-lazy class="itemImage" :src="gifSrc3" alt="" />
        </div>
        <div
          class="content_btnItem btnItem_four"
          @click="clickButton('我是采购商')"
        >
          <div class="itemBox">
            <div class="itemTitle">我是采购商</div>
            <div class="itemTitlePY">PURCHASER</div>
          </div>
          <img v-lazy class="itemImage" :src="gifSrc1" alt="" />
        </div>

        <div
          class="content_btnItem btnItem_two"
          @click="clickButton('我是供应商')"
        >
          <div class="itemBox">
            <div class="itemTitle">我是供应商</div>
            <div class="itemTitlePY">SUPPLIER</div>
          </div>
          <img v-lazy class="itemImage mr_20" :src="gifSrc2" alt="" />
        </div>

        <div
          class="content_btnItem btnItem_one"
          @click="clickButton('我是监管机构')"
        >
          <div class="itemBox">
            <div class="itemTitle">我是监管机构</div>
            <div class="itemTitlePY">I'M THE REGULATOR</div>
          </div>
          <img
            v-lazy
            class="itemImage"
            :src="gifSrc4"
            alt=""
            style="width: 130px"
          />
        </div>
      </div>
      <div class=" content-two ">
        <div class=" bg_e0edff two-div">
          <div class=" two-title ">
            <span class="mr_10">服务内容</span>
            <span>THE SERVICE CONTENT</span>
          </div>
          <div class="two-body">
            <div class="two-iconList mt_20">
              <div class="two-iconitem" @click="toPay">
                <img v-lazy src="./image/webTradingMall-5.png" alt="" />
                <div class="iconName">药品交易</div>
              </div>
              <div class="two-iconitem" @click="toPay">
                <img v-lazy src="./image/webTradingMall-6.png" alt="" />
                <div class="iconName">医疗耗材交易</div>
              </div>
              <div class="two-iconitem" @click="toPay">
                <img v-lazy src="./image/webTradingMall-7.png" alt="" />
                <div class="iconName">医疗器械交易</div>
              </div>
            </div>
            <div class="two-iconList mt_20">
              <div class="two-iconitem" @click="getapp">
                <img v-lazy src="./image/webTradingMall-8.png" alt="" />
                <div class="iconName">结算服务</div>
              </div>
              <div class="two-iconitem" @click="getapp">
                <img v-lazy src="./image/webTradingMall-9.png" alt="" />
                <div class="iconName">金融服务</div>
              </div>
              <div class="two-iconitem" @click="toOperateProperty">
                <img v-lazy src="./image/webTradingMall-10.png" alt="" />
                <div class="iconName">物业服务</div>
              </div>
            </div>
          </div>
        </div>
        <div class="bg_fde5e5 two-div ml_20">
          <div class="bg_fde5e5 two-title">
            <span class="mr_10">服务对象</span>
            <span>THE SERVICE OBJECT</span>
          </div>
          <div class="two-body">
            <div class="two-iconList mt_20">
              <div class="two-iconitem" @click="toSupplier">
                <img v-lazy src="./image/webTradingMall-11.png" alt="" />
                <div class="iconName">药品生产企业</div>
              </div>
              <div class="two-iconitem" @click="toSupplier">
                <img v-lazy src="./image/webTradingMall-12.png" alt="" />
                <div class="iconName">医药销售企业</div>
              </div>
              <div class="two-iconitem" @click="toPurchaser">
                <img v-lazy src="./image/webTradingMall-13.png" alt="" />
                <div class="iconName">医疗机构</div>
              </div>
            </div>
            <div class="two-iconList mt_20">
              <div class="two-iconitem" @click="getapp">
                <img v-lazy src="./image/webTradingMall-14.png" alt="" />
                <div class="iconName">监理机构</div>
              </div>
              <div class="two-iconitem" @click="toPurchaser">
                <img v-lazy src="./image/webTradingMall-15.png" alt="" />
                <div class="iconName">零售药店</div>
              </div>
              <div class="two-iconitem" @click="toPurchaser">
                <img v-lazy src="./image/webTradingMall-16.png" alt="" />
                <div class="iconName">个体用户</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-three">
        <div class=" three-div">
          <div class="  three-title">
            <div>采购公告</div>
            <div>查看更多></div>
          </div>
          <div class=" bg_e2ffec three-body">
            <div class="three_right_tabsListHeight">
              <div
                class="three_right_tabsList"
                v-for="(item, index) in 6"
                :key="index"
              >
                <div class="tabsList_title">
                  关于对2022年5月份药品价格和供应异常药品进行调查的通知
                  国家医疗保障局办公室关于做好国家组织药品集中带量采购...
                </div>
                <div class="tabslist-color">2022-07-14 17:28:10</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-four">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="药品交易目录" name="first">
            <div class="bg_e0edff four-table">
              <table>
                <div class="bg_e0edff four_table_title">
                  <div class="four_table_Item">产品名称</div>
                  <div class="four_table_Item">包装规格</div>
                  <div class="four_table_Item">生产企业</div>
                </div>
              </table>
              <vue-seamless-scroll :data="listData" class="warp">
                <ul class="item">
                  <li v-for="(item, index) in listData" :key="index">
                    <span class="title" v-text="item.title"></span>
                    <span class="date datamar" v-text="item.date"></span>
                    <span class="data" v-text="item.data"></span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </el-tab-pane>
          <el-tab-pane label="器械交易目录" name="second">
            <div class="bg_e0edff four-table">
              <table>
                <div class="bg_e0edff four_table_title">
                  <div class="four_table_Item">单位名称</div>
                  <div class="four_table_Item">会员类型</div>
                  <div class="four_table_Item">状态</div>
                </div>
              </table>
              <vue-seamless-scroll :data="listData" class="warp">
                <ul class="item">
                  <li v-for="(item, index) in listData" :key="index">
                    <span class="title" v-text="item.title"></span>
                    <span class="date datamar" v-text="item.date"></span>
                    <span class="data" v-text="item.data"></span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="content-four">
        <el-tabs v-model="activeName2" @tab-click="handleClick">
          <el-tab-pane label="药品交易行情" name="third">
            <div class="bg_fde5e5 four-table">
              <table>
                <div class="bg_fde5e5 four_table_title">
                  <div class="four_table_Item">产品信息</div>
                  <div class="four_table_Item">生产企业</div>
                  <div class="four_table_Item">买方会员</div>
                </div>
              </table>
              <vue-seamless-scroll :data="listData" class="warp warp1">
                <ul class="item-item">
                  <li v-for="(item, index) in listData" :key="index">
                    <!-- <span class="title" v-text="item.title"></span> -->
                    <p class="title item-tilet">
                      <span>瑞戈非尼片 (拜万戈 ) </span>
                      <span>40mg *28片 薄膜衣片</span>
                    </p>
                    <span class="date datamar">
                      新疆阿克苏地区葫芦娃药业集团股份有限公司</span
                    >
                    <span class="data" v-text="item.data"></span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </el-tab-pane>
          <el-tab-pane label="器械交易行情" name="fourth">
            <div class="four-table">
              <table>
                <div class="four_table_title">
                  <div class="four_table_Item">产品信息</div>
                  <div class="four_table_Item">生产企业</div>
                  <div class="four_table_Item">买方会员</div>
                </div>
              </table>
              <vue-seamless-scroll
                :data="listData"
                class="warp warp1"
                :class-option="classOption"
              >
                <ul class="item-item">
                  <li v-for="(item, index) in listData" :key="index">
                    <!-- <span class="title" v-text="item.title"></span> -->
                    <p class="title item-tilet">
                      <span>瑞戈非尼片 (拜万戈 ) </span>
                      <span>40mg *28片 薄膜衣片</span>
                    </p>
                    <span class="date datamar">
                      新疆阿克苏地区葫芦娃药业集团股份有限公司</span
                    >
                    <span class="data" v-text="item.data"></span>
                  </li>
                </ul>
              </vue-seamless-scroll>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>

      <!-- 友情链接组件 -->
      <cu-friendshipLink></cu-friendshipLink>
    </div>
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import vueSeamlessScroll from "vue-seamless-scroll";
import { logout } from "@/api/aksApi/platformApi/loginApi";

export default {
  name: "Example01Basic",
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      activeName: "first",
      activeName2: "third",
      listData: [
        {
          title: "麻仁润肠丸",
          date: "每片含盐酸小檗碱30mg*100 片/瓶",
          data: "新疆阿克苏地区葫芦娃药业集团股份有限公司",
        },
        {
          title: "麻仁润肠丸",
          date: "每片含盐酸小檗碱30mg*100 片/瓶",
          data: "新疆阿克苏地区葫芦娃药业集团股份有限公司",
        },
        {
          title: "盐酸甲氧氯普胺注射液",
          date: "每片含盐酸小檗碱30mg*100 片/瓶",
          data: "新疆阿克苏地区葫芦娃药业集团股份有限公司",
        },
        {
          title: "盐酸甲氧氯普胺注射液",
          date: "每片含盐酸小檗碱30mg*100 片/瓶",
          data: "新疆阿克苏地区葫芦娃药业集团股份有限公司",
        },
        {
          title: "盐酸甲氧氯普胺注射液",
          date: "每片含盐酸小檗碱30mg*100 片/瓶",
          data: "新疆阿克苏地区葫芦娃药业集团股份有限公司",
        },
        {
          title: "盐酸甲氧氯普胺注射液",
          date: "每片含盐酸小檗碱30mg*100 片/瓶",
          data: "新疆阿克苏地区葫芦娃药业集团股份有限公司",
        },
        {
          title: "盐酸甲氧氯普胺注射液",
          date: "每片含盐酸小檗碱30mg*100 片/瓶",
          data: "新疆阿克苏地区葫芦娃药业集团股份有限公司",
        },
        {
          title: "盐酸甲氧氯普胺注射液",
          date: "每片含盐酸小檗碱30mg*100 片/瓶",
          data: "新疆阿克苏地区葫芦娃药业集团股份有限公司",
        },
        {
          title: "无缝滚动第九行无缝滚动第九行",
          date: "每片含盐酸小檗碱30mg*100 片/瓶",
          data: "新疆阿克苏地区葫芦娃药业集团股份有限公司",
        },
      ],
      gifSrc1: require("./image/webTradingMall-btnItem1.gif"),
      gifSrc2: require("./image/webTradingMall-btnItem2.gif"),
      gifSrc3: require("./image/webTradingMall-btnItem3.gif"),
      gifSrc4: require("./image/webTradingMall-btnItem4.gif"),
    };
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  computed: {
    classOption() {
      return {
        direction: 0,
        step: 0.5, // 数值越大速度滚动越快
        waitTime: 1000,
        //     step: 0.2, // 数值越大速度滚动越快
        //     limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        //     hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        //     openWatch: true, // 开启数据实时监控刷新dom
        //     singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        //     singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        //     waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    clickButton(value) {
      if (value == "我是采购商") {
        if (this.$store.state.vuex_user.sysType == 2) {
          this.$message.success("您已登录，无需再次登录");
        } else {
          this.$store.commit("switchPlatform", "purchaser");
          this.$router.push("/login");
        }
      } else if (value == "我是供应商") {
        this.$store.commit("switchPlatform", "supplier");
        this.$router.push("/login");
      } else if (value == "申请入驻") {
        this.$store.commit("switchPlatform", "operation");
        this.$router.push("/Register");
      } else if (value == "我是监管机构") {
        // this.$router.push("/webUnderConstruction");
        // // this.$router.push("/webIndustrySupervision");
        // this.$store.commit("$uStore", {
        //   name: "vuex_webName",
        //   value: "webCentralTransaction",
        // });
        if (this.$store.state.vuex_user.sysType == 4) {
          this.$router.push("/webSuperviseMain/webSuperviseDrugs");
        } else {
          this.$store.commit("switchPlatform", "supervise");
          this.$router.push("/login");
        }
      }
    },
    getapp() {
      console.log(1111);
      this.$router.push("/webUnderConstruction");
    },
    toPay() {
      // 采购商交易相关
      this.checkLoginStatusToPage("purchaser", "myPurchaseOrder");
    },
    toOperateProperty() {
      // 跳转运营商物业管理
      this.checkLoginStatusToPage("operation", "operationPropertyManage");
    },
    toSupplier() {
      // 跳转供应商登录页
      this.checkLoginStatusToPage("supplier", "login");
    },
    toPurchaser() {
      // 跳转采购商登录页
      this.checkLoginStatusToPage("purchaser", "login");
    },
    // 页面跳转前根据登录状态判断跳转页面
    checkLoginStatusToPage(platform, pathName) {
      let platformSysTypes = {
        operation: 1,
        purchaser: 2,
        supplier: 3,
      };
      let vuex_user = this.$store.state.vuex_user;
      console.log(vuex_user);
      if (!vuex_user || !vuex_user.sysType) {
        // 未登录
        this.$store.commit("switchPlatform", platform);
        platform == "operation"
          ? this.$router.push("/admin/login")
          : this.$router.push("/login");
      } else {
        if (vuex_user.sysType == platformSysTypes[platform]) {
          // 该平台已登录
          return this.$router.push({ name: pathName });
        }
        // 非对应平台登录状态
        logout()
          .then((res) => {
            console.log(res);
            if (res.code == 200) {
              this.$store.commit("$uStore", {
                name: "vuex_token.tokenHead",
                value: "",
              });
              this.$store.commit("$uStore", {
                name: "vuex_user",
                value: {},
              });
              let msg = this.$message.success("跳转中");
              // 清楚本地存储,重置路由
              setTimeout(() => {
                localStorage.clear();
                this.$store.commit("switchPlatform", platform);
                platform == "operation"
                  ? this.$router.push("/admin/login")
                  : this.$router.push("/login");
                msg.close();
              }, 800);
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((err) => {});
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./webCentralTransaction.scss";
</style>
