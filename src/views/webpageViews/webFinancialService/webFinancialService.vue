<template>
  <div>
    <div class="content_body">
      <div class="content_one">
        <div class="one_div">
          <div class="one-img">
            <img src="./image/Slice44.png" alt="" />
          </div>
          <div class="one_title">
            <h3>货付回款 账期无忧</h3>
            <p>为缓解中小企业资金压力 账期交易贷付回款 加速资金流转</p>
          </div>
        </div>
      </div>
      <div class="content-uls">
        <ul>
          <li class="li-item1">
            <div class="li-title">
              药品药械企业
            </div>
            <div class="li-but"  @click="getapp('/Register?sysType=3')">
              登录
            </div>
            <div class="li-img">
             <img src="./image/Slice55.png" alt="">
            </div>
          </li>
          <li class="li-item2">
            <div class="li-title">
              医疗机构
            </div>
            <div class="li-but"  @click="getapp('/Register')">
              登录
            </div>
            <div class="li-img">
              <img src="./image/Slice54.png" alt="">
            </div>
          </li>
          <li class="li-item3">
            <div class="li-title">
              合作银行
            </div>
            <div class="li-but" @click="getapp('/webUnderConstruction')">
              登录
            </div>
            <div class="li-img">
              <img src="./image/Slice53.png" alt="">
            </div>
          </li>
        </ul>
      </div>
      <div class="content-two">
        <div class="two_h2">
          <h2>结算合作银行</h2>
        </div>
        <div class="two_title">
          <div class="two_left">
            <img src="./image/Slice51.png" alt="">
          </div>
          <div class="two_right">
            <ul>
              <li>
                <div class="two_img">
            <img src="./image/Slice38.png" alt="">

                </div>
                <div class="img_title">信用卡</div>
              </li>
              <li>
                <div class="two_img">
                  <img src="./image/Slice39.png" alt="">
                </div>
                <div class="img_title">信用货款</div>
              </li>
              <li>
                <div class="two_img">
                  <img src="./image/Slice40.png" alt="">
                </div>
                <div class="img_title">生活缴费</div>
              </li>
              <li>
                <div class="two_img">
                  <img src="./image/Slice41.png" alt="">
                </div>
                <div class="img_title">投资理财</div>
              </li>
              <li>
                <div class="two_img">
                  <img src="./image/Slice42.png" alt="">
                </div>
                <div class="img_title">商城</div>
              </li>
              <li>
                <div class="two_img">
                  <img src="./image/Slice43.png" alt="">
                </div>
                <div class="img_title">更多</div>
              </li>
            </ul>
          </div>
        </div>
        <div class="two_title two_title_one">
          <div class="two_left">
            <img src="./image/Slice52.png" alt="">

          </div>
          <div class="two_right">
            <ul>
              <li>
                <div class="two_img">
            <img src="./image/Slice38.png" alt="">

                </div>
                <div class="img_title">信用卡</div>
              </li>
              <li>
                <div class="two_img">
                  <img src="./image/Slice39.png" alt="">
                </div>
                <div class="img_title">信用货款</div>
              </li>
              <li>
                <div class="two_img">
                  <img src="./image/Slice40.png" alt="">
                </div>
                <div class="img_title">生活缴费</div>
              </li>
              <li>
                <div class="two_img">
                  <img src="./image/Slice41.png" alt="">
                </div>
                <div class="img_title">投资理财</div>
              </li>
              <li>
                <div class="two_img">
                  <img src="./image/Slice42.png" alt="">
                </div>
                <div class="img_title">商城</div>
              </li>
              <li>
                <div class="two_img">
                  <img src="./image/Slice43.png" alt="">
                </div>
                <div class="img_title">更多</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="content-three">
        <div class="three-left">
          <img src="http://www.yjsds.com/static/web/images/images/js_img01.jpg" alt="">
          <div class="three-title">
         <h5>服务对象</h5>
         <p><span>园区线下入驻企业</span> | <span>合作医院</span> | <span> 药店药械配送企</span></p>
          </div>
        </div>
        <div class="three_right">
          <img src="http://www.yjsds.com/static/web/images/images/js_img02.jpg" alt="">
          <div class="three-title">
         <h5>服务内容</h5>
         <p><span>交易货款支付结算</span> | <span>结算数据查询</span> | <span> 货款支付提醒</span> | <span>结算统计分析</span></p>
          </div>
        </div>
      </div>
      <div class="content-four">
        <div class="two_h2">
          <h2>结算动态</h2>
        </div>
        <div class="four-cont">
          <div class="four-left">
            <div class="left_item">
              <div class="item-left">
                <h4>899</h4>
                <p>今日创建药品发票笔数</p>
              </div>
              <div class="item-right">
                <h4>899</h4>
                <p>今日创建器械发票笔数</p>
              </div>
            </div>
            <div class="invoicing">
              <ul class="invoi-ul">
                <li :class="e==1?'active':''" @mouseenter="e=1">药品最新开票情况</li>
                <li :class="e==2?'active':''" @mouseenter="e=2">药械最新开票情况</li>
              </ul>
              <div class="invoicing-content">
                <div class="invoicing-item">
                  <span>发票流水号</span>
                  <span>开票单位</span>
                  <span>区域</span>
                </div>
             <div class="invoicing-item-ul" >
            <vue-seamless-scroll :data="tableHeader" class="warp" :class-option="classOption" >
              <ul>
                <li v-for="(val, index) in tableHeader" :key="index">
                  <span>{{val.Invoice}}</span>
                    <span>{{val.dw}}</span>
                    <span>{{val.title}}</span>
                </li>
              </ul>
            </vue-seamless-scroll>
                </div>
              </div>
            </div>
          </div>
          <div class="four-right">
            <div class="left_item">
              <div class="item-left">
                <h4>899</h4>
                <p>今日支付药品发票笔数</p>
              </div>
              <div class="item-right">
                <h4>899</h4>
                <p>今日支付器械发票笔数</p>
              </div>
            </div>
            <div class="invoicing">
              <ul class="invoi-ul">
                <li :class="n==1?'active':''" @mouseenter ="n=1">药品最新收款情况</li>
                <li :class="n==2?'active':''" @mouseenter ="n=2">药械最新收款情况</li>
              </ul>
              <div class="invoicing-content">
                <div class="invoicing-item">
                  <span>支付流水号</span>
                  <span>收款单位</span>
                  <span>区域</span>
                </div>
             <div class="invoicing-item-ul" >
            <vue-seamless-scroll :data="tableHeader" class="warp" :class-option="classOption" >
              <ul>
                <li v-for="(val, index) in tableHeader1" :key="index">
                  <span>{{val.Invoice}}</span>
                    <span>{{val.dw}}</span>
                    <span>{{val.title}}</span>
                </li>
              </ul>
            </vue-seamless-scroll>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
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
      tableHeight:292,
      n:1,
      e:1,
      tableData:[],
      tableHeader:[
        {
          Invoice:'1245678945',
          dw:'重庆四海医疗设备有限公司',
          title:'重庆市'
        },
        {
          Invoice:'1245678945',
          dw:'重庆四海医疗设备有限公司',
          title:'重庆市'
        },
        {
          Invoice:'1245678945',
          dw:'重庆四海医疗设备有限公司',
          title:'重庆市'
        },
        {
          Invoice:'1245678945',
          dw:'重庆四海医疗设备有限公司',
          title:'重庆市'
        }, {
          Invoice:'1245678945',
          dw:'重庆四海医疗设备有限公司',
          title:'重庆市'
        }, {
          Invoice:'1245678945',
          dw:'重庆四海医疗设备有限公司',
          title:'重庆市'
        }
    ],
    tableHeader1:[
        {
          Invoice:'127475088676',
          dw:'控股重庆国万医药有限公司开...',
          title:''
        },
        {
          Invoice:'124131983710',
          dw:'医药长油医药有限公司',
          title:''
        },
        {
          Invoice:'403294152062',
          dw:'市世欣恒卓医药有限公司',
          title:''
        },
        {
          Invoice:'130121093643',
          dw:'今瑜医药股份有限公司',
          title:''
        }, {
          Invoice:'12635378740',
          dw:'夫赛力君安医药有限公司',
          title:''
        }, {
          Invoice:'1245678945',
          dw:'重庆四海医疗设备有限公司',
          title:'重庆市'
        }
    ]
    };
  },
  mounted() {},
  methods: {
    getapp(val){
      console.log(1111);
   this.$router.push(val);
    },
  },
   // 参数配置
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
};
</script>

<style lang="scss" scoped>
@import "./webFinancialService.scss";
</style>
