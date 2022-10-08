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
        <div class="content_btnItem btnItem_three">
          <div class="itemBox">
            <div class="itemTitle">申请入驻</div>
            <div class="itemTitlePY">APPLICATION IN</div>
          </div>
          <img class="itemImage" :src="gifSrc3" alt="" />
        </div>
        <div class="content_btnItem btnItem_four">
          <div class="itemBox">
            <div class="itemTitle">我是采购商</div>
            <div class="itemTitlePY">PURCHASER</div>
          </div>
          <img class="itemImage" :src="gifSrc1" alt="" />
        </div>

        <div class="content_btnItem btnItem_two">
          <div class="itemBox">
            <div class="itemTitle">我是供应商</div>
            <div class="itemTitlePY">SUPPLIER</div>
          </div>
          <img class="itemImage mr_20" :src="gifSrc2" alt="" />
        </div>

        <div class="content_btnItem btnItem_one">
          <div class="itemBox">
            <div class="itemTitle">我是监管机构</div>
            <div class="itemTitlePY">I'M THE REGULATOR</div>
          </div>
          <img class="itemImage" :src="gifSrc4" alt="" style="width: 130px" />
        </div>
      </div>
      <div class="content-two">
        <div class="two-div">
          <div class="two-title">
            <span class="mr_10">服务内容</span>
            <span>THE SERVICE CONTENT</span>
          </div>
          <div class="two-body">
            <div class="two-iconList mt_20">
              <div class="two-iconitem" @click="getapp" >
                <img src="./image/webTradingMall-5.png" alt="" />
                <div class="iconName">药品交易</div>
              </div>
              <div class="two-iconitem" @click="getapp">
                <img src="./image/webTradingMall-6.png" alt="" />
                <div class="iconName">医疗耗材交易</div>
              </div>
              <div class="two-iconitem" @click="getapp">
                <img src="./image/webTradingMall-7.png" alt="" />
                <div class="iconName">医疗器械交易</div>
              </div>
            </div>
            <div class="two-iconList mt_20">
              <div class="two-iconitem" @click="getapp">
                <img src="./image/webTradingMall-8.png" alt="" />
                <div class="iconName">结算服务</div>
              </div>
              <div class="two-iconitem" @click="getapp">
                <img src="./image/webTradingMall-9.png" alt="" />
                <div class="iconName">金融服务</div>
              </div>
              <div class="two-iconitem" @click="getapp">
                <img src="./image/webTradingMall-10.png" alt="" />
                <div class="iconName">物业服务</div>
              </div>
            </div>
          </div>
        </div>
        <div class="two-div ml_20">
          <div class="two-title">
            <span class="mr_10">服务对象</span>
            <span>THE SERVICE OBJECT</span>
          </div>
          <div class="two-body">
            <div class="two-iconList mt_20">
              <div class="two-iconitem" @click="getapp">
                <img src="./image/webTradingMall-11.png" alt="" />
                <div class="iconName">药品生产企业</div>
              </div>
              <div class="two-iconitem" @click="getapp">
                <img src="./image/webTradingMall-12.png" alt="" />
                <div class="iconName">医药销售企业</div>
              </div>
              <div class="two-iconitem" @click="getapp">
                <img src="./image/webTradingMall-13.png" alt="" />
                <div class="iconName">医疗机构</div>
              </div>
            </div>
            <div class="two-iconList mt_20">
              <div class="two-iconitem" @click="getapp">
                <img src="./image/webTradingMall-14.png" alt="" />
                <div class="iconName">监理机构</div>
              </div>
              <div class="two-iconitem" @click="getapp">
                <img src="./image/webTradingMall-15.png" alt="" />
                <div class="iconName">零售药店</div>
              </div>
              <div class="two-iconitem" @click="getapp">
                <img src="./image/webTradingMall-16.png" alt="" />
                <div class="iconName">个人用户</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="content-three">
        <div class="three-div">
          <div class="three-title">
            <div>采购公告</div>
            <div>查看更多></div>
          </div>
          <div class="three-body">
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
            <div class="four-table">
              <table>
                <div class="four_table_title">
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
          <el-tab-pane label="器械交易目录" name="second">
            <div class="four-table">
              <table>
                <div class="four_table_title">
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
              </vue-seamless-scroll></div
          ></el-tab-pane>
        </el-tabs>
      </div>
      <div class="content-four">
        <el-tabs v-model="activeName2" @tab-click="handleClick">
          <el-tab-pane label="药品交易行情" name="third">
            <div class="four-table">
              <table>
                <div class="four_table_title">
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
              </vue-seamless-scroll></div
          ></el-tab-pane>
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
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
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
  methods:{
    getapp(){
      console.log(1111);
   this.$router.push("/webUnderConstruction");
    },
  }
};
</script>

<style lang="scss" scoped>
@import "./webCentralTransaction.scss";
</style>
