<template>
  <div class="page-container">
    <div class="content_one">
      <div class="content_one1">
        <div class="content_one12">
          <div class="content_one121">
            <img v-lazy src="../../assets/images/Logo.png" alt="" />
          </div>
          <div class="content_one122">{{overViewData.username}}</div>
          <div class="content_one123">{{tokType[vuex_token.supplier.supplierType]}}</div> 
          <div class="content_one124">{{vuex_token.supplier.unitName}}</div>
          <el-button type="default" class="content_one125">完善信息</el-button>
        </div>
      </div>
      <div class="content_one2">
        <div class="content_one21">我的钱包</div>
        <div class="content_one22">
          <div class="content_one221">
            <div class="content_one2211">
              {{ walletReturn.score }}
              <span class="content_one22111">
                {{
    walletReturn.score &lt;  60
    ? "差"
                : walletReturn.score >= 60 && walletReturn.score &lt; 80
    ? "一般"
                : walletReturn.score >= 80 && walletReturn.score &lt; 90
    ? "良好"
                : "极好"
                }}
              </span>
            </div>
            <div class="content_one2212">信用分</div>
            <div class="content_one2213">
              <a @click="toRouter('supplierSettlementHome')">查看</a>
            </div>
          </div>
          <div class="content_one222">
            <div class="content_one2221">{{ walletReturn.amount }}</div>
            <div class="content_one2222">账号余额</div>
            <div class="content_one2223">
              <a @click="toRouter('supplierSettlementHome')">充值</a>
              <div class="content_one22231">|</div>
              <a @click="toRouter('supplierSettlementHome')">提现</a>
            </div>
          </div>
          <div class="content_one223">
            <div class="content_one2231">
              {{ walletReturn.credit - walletReturn.usedCredit }}
            </div>
            <div class="content_one2232">信用付（可用额度）</div>
            <div class="content_one2233">
              <a @click="toRouter('supplierCreditLoan')">查看</a>
            </div>
          </div>
          <div class="content_one224">
            <div class="content_one2241" style="color: #ff480e">
              {{ walletReturn.usedCredit}}
            </div>
            <div class="content_one2242">待还金额</div>
            <div class="content_one2243">
              <a @click="toRouter('supplierSettlementHome')">查看</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_two">
      <div class="content_two1">
        <div class="content_two11">
          <div class="content_two11_title">集散中心药企</div>
          <div class="content_two11_body">
            <div class="invoicing-content">
              <div class="invoicing-item">
                <span>排名</span>
                <span>会员名称</span>
                <span>信用分</span>
              </div>
              <div class="invoicing-item-ul">
                <vueSeamlessScroll :data="getSupplierTopNReturn" class="warp" :class-option="classOption">
                  <ul >
                    <li v-for="(item, index) in getSupplierTopNReturn" :key="index" class="invoicing-item-ul-li"
                      @click="scrollClick(item.unitName)">
                      <span>{{ index + 1 }}</span>
                      <span>{{ item.unitName }}</span>
                      <span>{{ item.score }}</span>
                    </li>
                  </ul>
                </vueSeamlessScroll>
              </div>
            </div>
          </div>
        </div>

        <div class="content_two12">
          <div class="content_two121">
            <div class="content_two121_title">交易金额</div>
            <div class="content_two121_body">
              <div class="content_two1211">
                <count-to class="trade-amount-num" :decimals="2" :startVal='0' :endVal='overViewData.jyAmount'
                  :duration=4000></count-to>
                <div class="trade-amount-text">交易金额(元)</div>
              </div>
            </div>
          </div>
          <div class="content_two122">
            <div class="content_two122_title">
              交易笔数
            </div>
            <div class="content_two122_body">
              <count-to class="trade-count-num" :startVal='0' :endVal='overViewData.orderCount' :duration=4000>
              </count-to>
              <div class="trade-count-text">交易笔数(次)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="statistics-cards">

      <div class="card-item " id="storeOverViewEchartPieWrap" ref="storeOverViewEchartPieWrap">
          <div id="storeOverViewEchartPie" ref="storeOverViewEchartPie"></div>
        </div>

        <div class="card-item " id="storeOverViewEchartPieWrapdfk" ref="storeOverViewEchartPieWrapdfk">
          <div id="storeOverViewEchartPiedfk" ref="storeOverViewEchartPiedfk"></div>
        </div>
        <div class="card-item " id="storeOverViewEchart" ref="storeOverViewEchart">
          <div id="storeOverViewEchart1" ref="storeOverViewEchart1"></div>
        </div>
      </div>
      <div class="tab-list">
        <div class="tab-item">
          <ul class="item-ul">
            <li :class="index==1?'ative':''" @click="inadd(1)">我的药品销售排行</li>
            <li :class="index==2?'ative':''" @click="inadd(2)">药品销售总排行（集散中心药企）</li>
          </ul>
          <div class="tab-conter">
            <h2> {{index==1?'我的药品销售排行':'药品销售总排行（集散中心药企）'}}</h2>
            <div class="tab-teadh">
              <span>类别</span>
              <span>商品名称</span>
              <span>规格</span>
              <span>交易金额（元）</span>
              <span>交易笔数</span>
            </div>
            <div class="tab-cont">
              <!-- <vueSeamlessScroll :data="tabypList" class="warp" :class-option="classOption"> -->
                <el-empty description="暂无数据" v-if="tabypList.length==0" class="zwsj"  ></el-empty>
                  <ul v-else>
                    <!-- @click="scrollClick(item.unitName)" -->
                   
                    <li  v-for="(item, index) in tabypList" :key="index"
                     class="item-ul-li"
                      >
                      <span>{{ item.categoryName }}</span>
                      <span>{{ item.drugName }}</span>
                      <span>{{ item.specification }}</span>
                      <span>{{ item.orderAmount }}</span>
                      <span>{{ item.orderCount }}</span>
                    </li>
                  </ul>
                <!-- </vueSeamlessScroll> -->
            </div>
          </div>
        </div>
      </div>
      <div class="tab-list">
        <div class="tab-item">
          <ul class="item-ul">
            <li :class="inde==1?'ative':''" @click="indd(1)">我的药械销售排行</li>
            <li :class="inde==2?'ative':''" @click="indd(2)">药械销售总排行（集散中心药企）</li>
          </ul>
          <div class="tab-conter">
            <h2> {{inde==1?'我的药械销售排行':'药械销售总排行（集散中心药企）'}}</h2>
            <div class="tab-teadh">
              <span>类别</span>
              <span>商品名称</span>
              <span>规格</span>
              <span>交易金额（元）</span>
              <span>交易笔数</span>
            </div>
            <div class="tab-cont">
              <!-- <vueSeamlessScroll :data="tabypList" class="warp" :class-option="classOption"> -->
                
                <el-empty description="暂无数据" v-if="tabypList1.length==0" class="zwsj"  ></el-empty>
                  <ul v-else >
                    <!--  @click="scrollClick(item.unitName)"  -->
                    <li v-for="(item, index) in tabypList1" :key="index"
                     class="item-ul-li"
                      >
                      <span>{{ item.categoryName }}</span>
                      <span>{{ item.drugName }}</span>
                      <span>{{ item.specification }}</span>
                      <span>{{ item.orderAmount }}</span>
                      <span>{{ item.orderCount }}</span>
                    </li>
                  </ul>
                <!-- </vueSeamlessScroll> -->
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import { pieOptions } from "./pieOptions.js"
import { mapState } from "vuex";
import { getStatistics,getDrug30Top20Shop,getDrug30Top20, getApparatus30Top20OurShop, getApparatus30Top20,getwallet,getBuyerTopN } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import vueSeamlessScroll from "vue-seamless-scroll";

export default {
  components: {
    vueSeamlessScroll
  },
  data() {
    return {
      logo: require('@/assets/images/Logo.png'),
      index:1,
      inde:1,
      tokType:{
          1:'药品集散中心药企 ',
        2:'药品集散中心药械企 ',
        3:'药店',
        4:'个人',
      },
      orderCountEchartPie: null,
      settlementEchartPie: null,
      creditWarningEchartPie: null,
      goodsWarningEchartPie: null,
      getSupplierTopNReturn:[],
      tableHeight: 295,
      tabypList:[],
      tabypList1:[],
      walletReturn:[],
      overViewData: {
        username: '',// 用户名称
        score: null,// 信用分
        dfkCount: 0,// 待付款订单数
        dfhCount: 0,// 待发货订单数
        dshCount: 0,// 待收货订单数
        orderCount: 0,// 交易笔数
        jyAmount: 0,// 交易金额
        yjsAmount: 0,// 已结算金额
        wjsAmount: 0,// 未结算金额
        fhcqCount: 0,// 订单发货超期数
        yjdddxyCount: 0,// 议价订单待响应数
        htdxyCount: 0,// 合同待响应数
        dsjspCount: 0,// 待上架商品数
        yjkcspCount: 0,// 预警库存商品数
        dshspCount: 0,// 待审核商品数
      },
      orderCountData: {},
      settlementData: {},
      storeOverViewEchart: null,
      storeOverViewEchartt: null,
      storeOverViewEcharttt: null,
      // creditWarningData: {},
      goodsWarningData: {},
      trendData: [
        {
          orderAmount: 0, // 采购金额
          orderCount: 0,// 采购笔数
          yf: ''// 月份
        }
      ],
      colors: ['#00B712', '#FF3306', '#FFDC60', '#3CE500', '#FF003D'],
      frequentlyPurchasedReturn: [], // 常购清单-接口回参
      getSupplierTopNReturn: [], // 读取集散中心企业-接口回参
      walletReturn: {}, // 我的钱包-接口回参
    };
  },
  computed:{
    ...mapState(["vuex_token"]),
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
  created() {
    console.log(this.vuex_token);
this.getDrug()
this.getDrugget()
    this.getOverViewData()
    this.getwallet()
    this.getBuyerTopN()
  },
  watch: {
    trendData(val) {
      console.log(val);
    }
  },
  mounted() {
    
    console.log(this.vuex_token.supplier.supplierType,9999);
    this.storeOverViewEchartsPie()
    this.storeOverViewEchartsPies()
    this.storeOverViewEchartsPiess()

    this.tableHeight = 210
    window.onresize = () => {
      this.changeSize()
    }
  },

  methods: {
    inadd(value){
      this.index =value
      this.getDrug()
    },
     // 点击进行跳转
     toRouter(name) {
      // 新页面打开
      let routeData = this.$router.resolve({
        name: name,
        params: {},
      });
      window.open(routeData.href, "_blank");
      // 本页面打开
      // this.$router.push({
      //   name: name,
      //   params: {},
      // });
    },
    //我的钱包
   async getwallet(){
    getwallet().then(res=>{
      console.log(res,222);
      if (res.code == 200) {
       this.walletReturn= res.data
      }
    })
    },
    async getBuyerTopN(){
      let top = 20; //top是根据界面位置，展示几张图片就传几；这个参数是留给前端控制的
      getBuyerTopN(top)
        .then((res) => {
          if (res.code == 200) {
            this.getSupplierTopNReturn = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    indd(value){
      this.inde =value
      this.getDrugget()
    },
    getDrugget(){
      if (this.inde == 1) {
        getApparatus30Top20OurShop().then(res => {
          console.log(res);
          if (res.code == 200) {
            let data  = res.data
            this.tabypList1 = data
            console.log(this.tabypList1);
          }
      })
      } else if(this.inde == 2){
        getApparatus30Top20().then(res => {
          if (res.code == 200) {
            let data  = res.data
            this.tabypList1 = data
            console.log(this.tabypList1);
          }
        })
      }
    },
    getDrug(){
      if (this.index == 1) {
        getDrug30Top20Shop().then(res => {
          console.log(res);
          if (res.code == 200) {
            let data  = res.data
            this.tabypList = data
            console.log(this.tabypList);
          }
      })
      } else if(this.index == 2){
        getDrug30Top20().then(res => {
          if (res.code == 200) {
            let data  = res.data
            this.tabypList = data
            console.log(this.tabypList);
          }
        })
      }
    
    },
    changeSize() {
      let  storeEchart = this.$refs.storeOverViewEchartPieWrap;
      let   storeWrap= this.$refs.storeOverViewEchartPie;
      let productWrap = this.$refs.storeOverViewEchartPieWrapdfk;
      let productEchart = this.$refs.storeOverViewEchartPiedfk; 
       let product = this.$refs.storeOverViewEchart;
      let produt = this.$refs.storeOverViewEchart1;
      this.setEchartStyle(storeWrap, storeEchart)
      this.setEchartStyle(productWrap, productEchart)
      this.setEchartStyle(product, produt)
      this.storeOverViewEchart.resize()
      this.storeOverViewEchartt.resize()
      this.storeOverViewEcharttt.resize()
    },
    setEchartStyle(wrapDom, chartDom) {
      function getStyle(el, name) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(el, null);
        }
        else {
          return el.currentStyle;
        }
      }
      let width = getStyle(wrapDom, "width").width;
      let height = getStyle(wrapDom, "height").height;
      chartDom.style.width = width;
      chartDom.style.height = height;
    },
    storeOverViewEchartsPie() {
      let wrapDom = this.$refs.storeOverViewEchartPieWrap;
      let chartDom = this.$refs.storeOverViewEchartPie;
      this.setEchartStyle(wrapDom, chartDom)
      this.storeOverViewEchart = this.$echarts.init(chartDom);
      this.setStoreOverViewEchartOptions()
    },
    storeOverViewEchartsPies() {
      let wrapDom = this.$refs.storeOverViewEchartPieWrapdfk;
      let chartDom = this.$refs.storeOverViewEchartPiedfk;
      this.setEchartStyle(wrapDom, chartDom)
      this.storeOverViewEchartt = this.$echarts.init(chartDom);
      this.setStoreOverViewEchartOptiones()
    },
    storeOverViewEchartsPiess() {
      let wrapDom = this.$refs.storeOverViewEchart;
      let chartDom = this.$refs.storeOverViewEchart1;
      this.setEchartStyle(wrapDom, chartDom)
      this.storeOverViewEcharttt = this.$echarts.init(chartDom);
      this.setStoreOverViewEchartOptioness()
    },
    setStoreOverViewEchartOptions() {
      let options = new pieOptions();
      let { yjsAmount, wjsAmount } = this.overViewData;
      options.title.text = "结算统计";
      // options.color = this.colors;
      options.title.subtext  =null
      options.series[0].name = "结算统计";
      options.series[0].data = [
        { value: yjsAmount, name:"未结算" },
        { value: wjsAmount, name:"已结算" },
      ];
      console.log(options);
      this.storeOverViewEchart && this.storeOverViewEchart.setOption(options);

    },
    setStoreOverViewEchartOptiones() {
      let options = new pieOptions();
      let { dfkCount, dfhCount,dshCount } = this.overViewData;
      options.title.text = "订单统计";
      // options.color = this.colors;
      options.title.subtext  =null
      options.series[0].name = "订单统计";
      options.series[0].data = [
        { value: dfkCount, name:"待付款" },
        { value: dfhCount, name:"待发货" },
        { value: dshCount, name:"待收货" },
      ];
      console.log(options);
      this.storeOverViewEchartt && this.storeOverViewEchartt.setOption(options);

    },
    setStoreOverViewEchartOptioness() {
      let options = new pieOptions();
      let { dsjspCount, yjkcspCount,dshspCount } = this.overViewData;
      options.title.text = "商品预警";
      // options.color = this.colors;
      options.title.subtext  =null
      options.series[0].name = "商品预警";
      options.series[0].data = [
        { value: dsjspCount, name:"待上架" },
        { value: yjkcspCount, name:"预警库存" },
        { value: dshspCount, name:"待审核" },
      ];
      console.log(options);
      this.storeOverViewEcharttt && this.storeOverViewEcharttt.setOption(options);

    },
    //自适应
    setEchartStyle(wrapDom, chartDom) {
    
      function getStyle(el, name) {
        if (window.getComputedStyle) {
          return window.getComputedStyle(el, null);
        }
        else {
          return el.currentStyle;
        }
      }
      var wi = getStyle(wrapDom, "width").width;
      var hi = getStyle(wrapDom, "height").height;
      console.log(chartDom, 22222);
      chartDom.style.width = wi;
      chartDom.style.height = hi;
      // // 3. 把配置项给实例对象
      // this.draw3Echart.setOption(option);
      // // 4. 让图表跟随屏幕自动的去适应
      // window.addEventListener("resize", function () {
      //   if (this.draw3Echart != null && this.draw3Echart != "" && this.draw3Echart != undefined) {
      //     this.draw3Echart.resize();
      //   }
      // });
    },
    getOverViewData() {
      getStatistics().then(res => {
        console.log(res, 11212);
        if (res.code == 200) {
          let data = res.data;
          this.overViewData = data;
          this.setStoreOverViewEchartOptions()
          this.setStoreOverViewEchartOptiones()
          this.setStoreOverViewEchartOptioness()
          this.storeOverViewEchartsPie()
       this.storeOverViewEchartsPies()
       this.storeOverViewEchartsPiess()
        }
      }).catch(err => {
        console.log(err);
      })
    },

  },
  beforeDestroy() {
    // window.onresize = null;
    window.removeEventListener('resize', this.changeSize, false)
  },
}
</script>
<style lang="scss" src="./supplierHome.scss" scoped>

</style>

<style lang="scss" scoped>
::-webkit-scrollbar {
  width: 0px;
}

.content_one {
  display: flex;
  align-items: center;

  .content_one1 {
    width: 250px;
    height: 250px;
    background: #ff5b27;
    box-shadow: 4px 4px 4px 0px rgba(255, 91, 39, 0.4);
    border-radius: 10px 10px 10px 10px;
    z-index: 2;

    .content_one12 {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;

      .content_one121 {
        margin-top: 15px;
        width: 91px;
        height: 84px;
        border-radius: 50%;
        background: red;

        img {
          width: 91px;
          height: 84px;
        }
      }

      .content_one122 {
        font-size: 20px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
      }

      .content_one123 {
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
      }

      .content_one124 {
        margin-top: 10px;
        font-size: 16px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
      }

      .content_one125 {
        margin-top: 14px;
        width: 94px;
        height: 34px;
        border-radius: 100px 100px 100px 100px;
        border: 1px solid #ffffff;
        background: #ff5b27;
        color: #ffffff;
      }
    }
  }

  .content_one2 {
    width: 750px;
    height: 220px;
    background: #ffffff;
    z-index: 1;

    .content_one21 {
      height: 50px;
      line-height: 50px;
      padding-left: 25px;
      font-size: 20px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #020552;
      border-bottom: 1px solid #eeeeee;
    }

    .content_one22 {
      width: 750px;
      height: 170px;
      padding: 30px 25px;
      display: flex;

      .content_one221 {
        width: 150px;

        .content_one2211 {
          font-size: 28px;
          font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
          font-weight: 800;
          color: #020552;

          .content_one22111 {
            font-size: 14px;
            color: #ff480e;
          }
        }

        .content_one2212 {
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
        }

        .content_one2213 {
          margin-top: 20px;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #0f6fff;
        }
      }

      .content_one222 {
        width: 200px;

        .content_one2221 {
          font-size: 28px;
          font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
          font-weight: 800;
          color: #020552;

          .content_one22211 {
            font-size: 14px;
            color: #ff480e;
          }
        }

        .content_one2222 {
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
        }

        .content_one2223 {
          margin-top: 20px;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #0f6fff;
          display: flex;

          .content_one22231 {
            margin: 0px 10px;
          }
        }
      }

      .content_one223 {
        width: 200px;

        .content_one2231 {
          font-size: 28px;
          font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
          font-weight: 800;
          color: #020552;

          .content_one22311 {
            font-size: 14px;
            color: #ff480e;
          }
        }

        .content_one2232 {
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
        }

        .content_one2233 {
          margin-top: 20px;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #0f6fff;
        }
      }

      .content_one224 {
        width: 200px;

        .content_one2241 {
          font-size: 28px;
          font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
          font-weight: 800;
          color: #020552;

          .content_one22411 {
            font-size: 14px;
            color: #ff480e;
          }
        }

        .content_one2242 {
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
        }

        .content_one2243 {
          margin-top: 20px;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #0f6fff;
        }
      }
    }
  }
}

.content_two {
  margin-top: 15px;

  .content_two1 {
    display: flex;
    align-items: center;

    .content_two11 {
      width: 680px;
      background: #ffffff;

      .content_two11_title {
        height: 50px;
        line-height: 50px;
        padding-left: 25px;
        font-size: 20px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: bold;
        color: #020552;
        border-bottom: 1px solid #eeeeee;
      }

      .content_two11_body {
        height: 270px;
        display: flex;

        .invoicing-content {
          height: 270px;
          width: 680px;
          border-width: 1px 1px 1px 1px;
          border-style: solid;
          border-color: #ededed;

          .invoicing-item {
            display: flex;
            height: 40px;
            background: #fde5e5;
            line-height: 40px;

            span {
              font-size: 18px;
              font-family: Source Han Sans CN-Regular, Source Han Sans CN;
              font-weight: 400;
              color: #020552;
              width: 25%;
              text-align: center;
              border-bottom: 1px solid #ededed;
            }

            span:nth-child(2) {
              width: 80%;
              text-align: left;
              padding-left: 20px;
              border-width: 0px 1px 0px 1px;
              border-style: solid;
              border-color: #ededed;
            }
          }

          .invoicing-item-ul {
            width: 100%;

            .warp {
              width: 100%;
              height: 225px;
              overflow: hidden;

              ul {
                width: 100%;

                li {
                  line-height: 39.5px;
                  display: flex;

                  span {
                    font-size: 18px;
                    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                    font-weight: 400;
                    color: #020552;
                    width: 25%;
                    text-align: center;
                    border-bottom: 1px solid #ededed;
                  }

                  span:nth-child(2) {
                    width: 80%;
                    text-align: left;
                    padding-left: 20px;
                    border-width: 0px 0px 1px 0px;
                    border-style: solid;
                    border-color: #ededed;
                  }
                }
              }
            }
          }
        }
      }
    }

    .content_two12 {
      margin-left: 20px;

      .content_two121 {
        width: 300px;
        background: #ffffff;

        .content_two121_title {
          height: 50px;
          line-height: 50px;
          padding-left: 25px;
          font-size: 20px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
          border-bottom: 1px solid #eeeeee;
        }

        .content_two121_body {
          height: 100px;
          display: flex;
          padding: 14px 25px;
          box-sizing: border-box;

          .content_two1211 {
            width: 100%;
            text-align: center;

            .trade-amount-num {
              font-size: 41px;
              font-weight: bold;
              color: #ff480e;
              text-align: center;
            }

            .trade-amount-text {
              font-size: 14px;
              color: #020552;
              text-align: center;
            }
          }
        }
      }

      .content_two122 {
        margin-top: 20px;
        width: 300px;
        height: 150px;
        background: #ffffff;

        .content_two122_title {
          display: flex;
          justify-content: space-between;
          height: 50px;
          line-height: 50px;
          padding: 0px 25px;
          box-sizing: border-box;
          font-size: 20px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
          border-bottom: 1px solid #eeeeee;

          .content_two122_title_GD {
            cursor: pointer;
            font-size: 16px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #999999;
          }
        }

        .content_two122_body {
          height: 101px;
          width: 100%;
          padding: 0px 20px;
          box-sizing: border-box;
          text-align: center;

          .trade-count-num {
            font-size: 41px;
            font-weight: bold;
            color: #ff480e;
            text-align: center;
          }

          .trade-count-text {
            font-size: 14px;
            color: #020552;
            text-align: center;
          }
        }
      }
    }
  }
}
.invoicing-item-ul-li:hover {
  background: #ff480e;
  span {
    color: #ffffff !important;
  }
}
.page-container{
  padding: 0 !important;
}
</style>
