<template>
  <div>
    <div class="content-body">
      <div class="content-top">
        <ul class="content-top-nav">
          <li>
            <div class="left"><img src="./image/webTradingMall-navIcon1.png" alt="">
              <div class="text">药品</div>
            </div>
            <div class="right">
              <div class="row">
                <div v-for="(item,index) in drugCates" :key="index" v-if="index < 3"
                  :class="'cate-item ' + (index ==0?'active':'')">
                  <span>{{item.name}}</span>
                </div>
              </div>
              <div class="row">
                <div v-for="(item,index) in drugCates" :key="index" v-if="index > 3"
                  :class="'cate-item ' + (index ==0?'active':'')">
                  <span>{{item.name}}</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="left"><img src="./image/webTradingMall-icon2.png" alt="">
              <div class="text">药械</div>
            </div>
            <div class="right">
              <div class="row">
                <div v-for="(item,index) in insdrugmentCates" :key="index" v-if="index < 3"
                  :class="'cate-item ' + (index ==0?'active':'')">
                  <span>{{item.name}}</span>
                </div>
              </div>
              <div class="row">
                <div v-for="(item,index) in insdrugmentCates" :key="index" v-if="index > 3"
                  :class="'cate-item ' + (index ==0?'active':'')">
                  <span>{{item.name}}</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="left"><img src="./image/webTradingMall-navIcon3.png" alt="">
              <div class="text">美食</div>
            </div>
            <div class="right">
              <div class="row">
                <div v-for="(item,index) in foodCates" :key="index" v-if="index < 3"
                  :class="'cate-item ' + (index ==0?'active':'')">
                  <span>{{item.name}}</span>
                </div>
              </div>
              <div class="row">
                <div v-for="(item,index) in foodCates" :key="index" v-if="index > 3"
                  :class="'cate-item ' + (index ==0?'active':'')">
                  <span>{{item.name}}</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="left"><img src="./image/webTradingMall-navIcon4.png" alt="">
              <div class="text">温宿好礼</div>
            </div>
            <div class="right">
              <div class="row">
                <div v-for="(item,index) in goodsCates" :key="index" v-if="index < 3"
                  :class="'cate-item ' + (index ==0?'active':'')">
                  <span>{{item.name}}</span>
                </div>
              </div>
              <div class="row">
                <div v-for="(item,index) in goodsCates" :key="index" v-if="index > 3"
                  :class="'cate-item ' + (index ==0?'active':'')">
                  <span>{{item.name}}</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <div class="left"><img src="./image/webTradingMall-navIcon5.png" alt="">
              <div class="text">二手车</div>
            </div>
            <div class="right">
              <div class="row">
                <div v-for="(item,index) in carCates" :key="index" v-if="index < 3"
                  :class="'cate-item ' + (index ==0?'active':'')">
                  <span>{{item.name}}</span>
                </div>
              </div>
              <div class="row">
                <div v-for="(item,index) in carCates" :key="index" v-if="index > 3"
                  :class="'cate-item ' + (index ==0?'active':'')">
                  <span>{{item.name}}</span>
                </div>
              </div>
            </div>
          </li>
          <li>
            <p class="more">查看全部</p>
          </li>
        </ul>
        <!-- <img class="content-top-mainimg" src="./image/webTradingMall-topimg.png" alt=""> -->
        <div class="content-top-right">
          <el-carousel height="520px">
            <el-carousel-item v-for="item in 4" :key="item">
              <div class="carouse-item">
                <div class="inner">
                  <div class="title">生产企业&nbsp;配送企业&nbsp;医疗机构</div>
                  <div class="desc">互联互通药械数据全流程智能追溯</div>
                  <el-button type="primary" class="btn">我要采购商品</el-button>
                </div>
                <img src="./image/navRightImg.png" alt="">
              </div>

            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
      <div class="content-btn mt_20">
        <div class="content_btnItem btnItem_three" @click="clickButton('申请入驻')">
          <div class="itemBox">
            <div class="itemTitle">申请入驻</div>
            <div class="itemTitlePY">APPLICATION IN</div>
          </div>
          <img class="itemImage" :src="gifSrc3" alt="" />
        </div>
        <div class="content_btnItem btnItem_four" @click="clickButton('我是采购商')">
          <div class="itemBox">
            <div class="itemTitle">我是采购商</div>
            <div class="itemTitlePY">PURCHASER</div>
          </div>
          <img class="itemImage" :src="gifSrc1" alt="" />
        </div>

        <div class="content_btnItem btnItem_two" @click="clickButton('我是供应商')">
          <div class="itemBox">
            <div class="itemTitle">我是供应商</div>
            <div class="itemTitlePY">SUPPLIER</div>
          </div>
          <img class="itemImage mr_10" :src="gifSrc2" alt="" />
        </div>

        <div class="content_btnItem btnItem_one" @click="clickButton('我是采购商')">
          <div class="itemBox">
            <div class="itemTitle">我是监管机构</div>
            <div class="itemTitlePY">I'M THE REGULATOR</div>
          </div>
          <img class="itemImage" :src="gifSrc4" alt="" />
        </div>
      </div>
      <!-- <div class="content-nav">
        <ul>
          <li class="active">西药</li>
          <li>中成药</li>
          <li>中药饮片</li>
          <li>医疗器械</li>
          <li>计生用品</li>
          <li>保健片</li>
        </ul>
      </div> -->
      <div class="content-products">
        <div class="content-products-nav">
          <div class="products-cate-title">药品索引</div>
          <div class="navbar">
            <div v-for="(item,index) in drugCates" :key="index" :class="'cate-item ' + (index ==0?'active':'')">
              <span>{{item.name}}</span>
            </div>
              <div :class="'cate-item '">
                <span>其它</span>
              </div>
          </div>
        </div>
        <div class="products-cards">
          <div class="products-card" v-for="item in drugProducts" :key="item">
            <img :src="item.url" alt="">
            <div class="card-bottom">
              <div class="name">{{item.title}}</div>
              <!-- <div class="desc">50mgx12粒x3板/盒</div> -->
              <div class="price">￥12.00</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-products">
        <div class="content-products-nav">
          <div class="products-cate-title">药械索引</div>
          <div class="navbar">
            <div v-for="(item,index) in insdrugmentCates" :key="index" :class="'cate-item ' + (index ==0?'active':'')">
              <span>{{item.name}}</span>
            </div>
              <div :class="'cate-item '">
                <span>其它</span>
              </div>
          </div>
        </div>
        <div class="products-cards">
          <div class="products-card" v-for="item in instrumentProducts" :key="item">
            <img :src="item.url" alt="">
            <div class="card-bottom">
              <div class="name">{{item.title}}</div>
              <!-- <div class="desc">50mgx12粒x3板/盒</div> -->
              <div class="price">￥12.00</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-products">
        <div class="content-products-nav">
          <div class="products-cate-title">美食索引</div>
          <div class="navbar">
            <div v-for="(item,index) in foodCates" :key="index" :class="'cate-item ' + (index ==0?'active':'')">
              <span>{{item.name}}</span>
            </div>
              <div :class="'cate-item '">
                <span>其它</span>
              </div>
          </div>
        </div>
        <div class="products-cards">
          <div class="products-card" v-for="item in foodProducts" :key="item">
            <img :src="item.url" alt="">
            <div class="card-bottom">
              <div class="name">{{item.title}}</div>
              <!-- <div class="desc">50mgx12粒x3板/盒</div> -->
              <div class="price">￥12.00</div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="content-bottom">
        <div class="friend-shops">
          <div class="shops-top">
            <div class="title">合作商城</div>
            <div class="subtitle">Cooperation mall</div>
          </div>
          <div class="shops-content">
            <div class="shop-item">
              <img class="logo" src="./image/logo-jindong.png" alt="">
              <div class="name">京东健康</div>
            </div>
            <div class="shop-item">
              <img class="logo" src="./image/logo-bank.png" alt="">
              <div class="name">工商银行融e购</div>
            </div>
          </div>
        </div>
        <div class="friend-shops">
          <div class="shops-top">
            <div class="title">商旅酒店</div>
            <div class="subtitle">Business travel hotel</div>
          </div>
          <div class="shops-content">
            <div class="shop-item">
              <img class="logo" src="./image/logo-feizhu.png" alt="">
              <div class="name">飞猪</div>
            </div>
            <div class="shop-item">
              <img class="logo" src="./image/logo-qunaer.png" alt="">
              <div class="name">去哪儿</div>
            </div>
            <div class="shop-item">
              <img class="logo" src="./image/logo-meituan.png" alt="">
              <div class="name">美团</div>
            </div>
          </div>
        </div>
      </div> -->

      <!-- 友情链接组件 -->
      <cu-friendshipLink></cu-friendshipLink>
    </div>
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import {
  mallHomepageGetDrugSalesList,
  mallHomepageGetEquipmentSales,
  mallHomepageGetMemberInfo,
  mallHomepageGetPessGoldInfo,
  mallHomepageGetProductOverviewInfo,
  mallHomepagePageAnnouncementList,
} from "@/api/aksApi/webApi/webApi.js";
export default {
  data() {
    return {
      //商品概述数据
      productOverviewList: {
        drugSale: 0, //药品在售数
        drugDeclare: 0, //药品申报数
        drugCount: 0, //药品销售量
        apparatusSale: 0, //器械在售数
        apparatusDeclare: 0, //器械申报数
        apparatusCount: 0, //器械销售量
      },
      goldMedalEnterpriseList: [], //月度金牌企业数据
      memberDirectoryList: [], // 会员目录数据
      // 会员目录分页
      memberDirectoryListPages: {
        total: 0,
        current: 1,
        size: 10,
      },

      tabsName: "抗新冠药物目录", //商品目录el-tabs控件值
      antiCoronavirusDrugsList: [], //抗新冠药物目录1
      antiCoronavirusDeviceList: [], //抗新冠药物目录目录2
      drugTradeList: [], //药品交易目录3
      equipmenttradingList: [], //器械交易目录4

      seeMore: "", // 通知公告使用查看更多
      noticely: 1, //noticely 1外部 2从更多列表过来
      // 通知公告列表
      jiashuju: [
        {
          id: 1,
          infoType: null,
          infoTag: null,
          title: "重庆药品交易所股份有限公司关于开展打击假冒国企专项行动的公告",
          releaseTime: "2022-07-14 17:28:15",
          createBy: null,
          linkUrl: null,
          detail: null,
          hits: null,
          status: null,
        },
        {
          id: 2,
          infoType: null,
          infoTag: null,
          title: "重庆药品交易所股份有限公司关于开展打击假冒国企专项行动的公告",
          releaseTime: "2022-07-14 17:28:15",
          createBy: null,
          linkUrl: null,
          detail: null,
          hits: null,
          status: null,
        },
        {
          id: 3,
          infoType: null,
          infoTag: null,
          title: "重庆药品交易所股份有限公司关于开展打击假冒国企专项行动的公告",
          releaseTime: "2022-07-14 17:28:15",
          createBy: null,
          linkUrl: null,
          detail: null,
          hits: null,
          status: null,
        },
        {
          id: 1,
          infoType: null,
          infoTag: null,
          title: "重庆药品交易所股份有限公司关于开展打击假冒国企专项行动的公告",
          releaseTime: "2022-07-14 17:28:15",
          createBy: null,
          linkUrl: null,
          detail: null,
          hits: null,
          status: null,
        },
        {
          id: 3,
          infoType: null,
          infoTag: null,
          title: "重庆药品交易所股份有限公司关于开展打击假冒国企专项行动的公告",
          releaseTime: "2022-07-14 17:28:15",
          createBy: null,
          linkUrl: null,
          detail: null,
          hits: null,
          status: null,
        },
        {
          id: 1,
          infoType: null,
          infoTag: null,
          title: "重庆药品交易所股份有限公司关于开展打击假冒国企专项行动的公告",
          releaseTime: "2022-07-14 17:28:15",
          createBy: null,
          linkUrl: null,
          detail: null,
          hits: null,
          status: null,
        },
      ],
      // 通知公告-点了详情出来
      jiashuju2: {
        id: 5,
        infoType: 2,
        infoTag: 5,
        title: "药交所党总支召开专题学习会传达学习贯彻党的十九届六中全会精神",
        releaseTime: "2022-07-14 17:34:21",
        createBy: "1",
        linkUrl: "http://www.yjsds.com/20211202/26926.html",
        detail:
          "在前期药交所全体干部员工广泛自学的基础上，11月19日，药交所党总支召开专题学习会，传达学习贯彻党的十九届六中全会精神。党总支书记、董事长朱刚令主持会议并讲话。党总支委员、非党员领导班子成员以及党总支办、综合办负责人参加了会议，并就学习体会和贯彻打算逐一进行了交流发言。\r\n\r\n    会议指出，党的十九届六中全会是在重大历史关头召开的一次具有重大历史意义的会议，全会审议通过的《中共中央关于党的百年奋斗重大成就和历史经验的决议》，为我们奋进新时代、开启新征程提供了方向指引和根本遵循。\r\n\r\n   会议强调，一是全所干部员工要提高政治站位，把学习贯彻党的十九届六中全会精神作为当前及今后一个时期的重大政治任务，迅速掀起学习宣传贯彻热潮；二是要从我们党百年奋斗形成的“十个坚持”历史经验中汲取智慧和力量，做好药交所十年奋斗历程的经验总结，思考下一个十年的发展目标和路径；三是要以学习贯彻全会精神为动力，全力做好年末各项目标任务收官工作，同时精心谋划明年工作思路，以优异成绩迎接党的二十大召开。 ",
        hits: 0,
        status: 0,
      },
      bannerHeight: "",
      setActiveItem: 1,
      gifSrc1: require("./image/webTradingMall-btnItem1.gif"),
      gifSrc2: require("./image/webTradingMall-btnItem2.gif"),
      gifSrc3: require("./image/webTradingMall-btnItem3.gif"),
      gifSrc4: require("./image/webTradingMall-btnItem4.gif"),






      drugCates: [
        { name: '西药' },
        { name: '中成药' },
        { name: '中药' },
        { name: '中药饮片' },
        { name: '抗病毒药' },
        { name: '抗菌药物' },
        { name: '抗胃酸分泌' },
      ],
      insdrugmentCates: [
        { name: '第一类' },
        { name: '第二类' },
        { name: '第三类' },
        { name: '仪器' },
        { name: '设备' },
        { name: '器具' },
        { name: '体外诊断试剂' },
      ],
      foodCates: [
        { name: '核桃' },
        { name: '食品' },
        { name: '牛肉干' },
        { name: '奶粉' },
        { name: '干果' },
        { name: '白酒' },
        { name: '粮油' },
        { name: '休闲食品' },
      ],
      goodsCates: [
        { name: '苹果' },
        { name: '鹰嘴豆' },
        { name: '薄皮核桃' },
        { name: '野生沙棘' },
        { name: '红枣' },
        { name: '小白杏' },
        { name: '和田玉' },
        { name: '巴旦木' },
      ],
      carCates: [
        { name: '第一类' },
        { name: '第二类' },
        { name: '第三类' },
        { name: '仪器' },
        { name: '设备' },
        { name: '器具' },
        { name: '体外诊断试剂' },
      ],
      drugProducts: [
        {url:'https://img.alicdn.com/imgextra/i2/2928278102/O1CN01qoJ3hh29ilhe5sOyA_!!0-item_pic.jpg_430x430q90.jpg',title:'哈药朴雪牌铁维生素b12口服液缺铁补铁女人葡萄糖酸亚铁孕妇气色'},
        {url:'https://img.alicdn.com/imgextra/i4/2928278102/O1CN01nHyOXD29ilhWgl1Jt_!!0-item_pic.jpg_430x430q90.jpg',title:'仲景杞菊地黄口服液12支中药缓解明目眼疲劳肝火旺盛养肝护肝'},
        {url:'https://img.alicdn.com/imgextra/i2/2256729251/O1CN015B1FUR2ID0jboWEr8_!!2256729251.jpg_430x430q90.jpg',title:'修正阿胶黄芪当归铁胶囊补血补铁气虚贫血亏月经女人调理量少口液'},
        {url:'https://gd1.alicdn.com/imgextra/i4/2213189146744/O1CN01A9XgvF1zgnpVCivVp_!!2213189146744.jpg',title:'聪康柠婴幼儿维生素ad国家标准宝宝天然维C粉补铁锌元素提高免疫'},
        {url:'https://img.alicdn.com/imgextra/i2/1659703297/O1CN019Ynz961aE4bpo4DlN_!!1659703297-0-picasso.jpg',title:'诺特兰德维生素c+维生素e+烟酸多种复合维生素ce组合VE片VC咀嚼片'},
        {url:'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/3166937179/O1CN01JNdTiI22u23vRcHen_!!3166937179.jpg_430x430q90.jpg',title:'【3口味】维生素C咀嚼片VC片维C含片儿童成人维他命非泡腾胶囊'},
        {url:'https://img.alicdn.com/imgextra/i2/692420117/O1CN01MvvFrc1Cjd5P9PA1O_!!0-item_pic.jpg_430x430q90.jpg',title:'康恩贝维生素K2软胶囊正品中老年成年孕妇儿童补钙骨片搭档VK2'},
        {url:'https://img.alicdn.com/imgextra/i2/2200779643602/O1CN01gjTxoY1cTlNp0oCdc_!!0-item_pic.jpg_430x430q90.jpg',title:'北京同仁堂二陈丸平胃丸咳嗽化痰中药天猫医药馆旗舰店官网的药品'},
      ],
      instrumentProducts: [
        {url:'https://gd2.alicdn.com/imgextra/i2/1704874743/O1CN01WM4KfL1kuLIas6oer_!!1704874743.jpg_400x400.jpg',title:'产后访视包医用便携家庭医生签约出诊包护理医疗包医院专用急救包'},
        {url:'https://gd1.alicdn.com/imgextra/i4/2576348801/O1CN01Xphs3m2EsuTWBGvbC_!!2576348801.jpg',title:'硅胶医疗器械消毒盒不锈钢铝合金制牙科眼外科美容手术工具收纳盒'},
        {url:'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2074722020/O1CN01nS2EaI1QnCnZOAHWf_!!2074722020.jpg_430x430q90.jpg',title:'医用无菌1/5/20ml10毫升一次性注射器针带针头针筒针管注器打针用'},
        {url:'https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/2206588897838/O1CN01jgYppF27lr8tcnrfB_!!2206588897838-0-scmitem8000.jpg_430x430q90.jpg',title:'医用不锈钢小镊子夹子医疗器械手术有齿圆头多肉防滑敷料家用加厚'},
        {url:'https://img.alicdn.com/imgextra/i2/552228974/O1CN01YPDIFK2GA94NZLBhT_!!0-item_pic.jpg_430x430q90.jpg',title:'医用镊子一次性医疗器械器材夹药用敷料消毒塑料小夹子独立包装'},
        {url:'https://gd2.alicdn.com/imgextra/i2/3142518690/O1CN01gMmcvc2E44W1bXu72_!!3142518690.jpg_400x400.jpg',title:'医用高压水枪牙科气水枪供应室喷枪口腔清洗器械手术消毒冲洗内镜'},
        {url:'https://img.alicdn.com/imgextra/i3/3247102314/O1CN01wcazr81SxrCj0tP9n_!!0-item_pic.jpg_430x430q90.jpg',title:'仙鹤近红外线理疗灯医用治疗器妇科烤灯月子产后腰病调理医疗器械'},
        {url:'https://img.alicdn.com/imgextra/i2/2928278102/O1CN01qoJ3hh29ilhe5sOyA_!!0-item_pic.jpg_430x430q90.jpg',title:'产后访视包医用便携家庭医生签约出诊包护理医疗包医院专用急救包'},
      ],
      foodProducts: [
        {url:'https://gd4.alicdn.com/imgextra/i4/48911075/O1CN01qvtAWO1JoONBOv5t2_!!48911075.jpg_400x400.jpg',title:'顺丰包邮新疆沙湾大盘鸡正宗真空3斤 新疆特产美食清餐现宰做山鸡'},
        {url:'https://img.alicdn.com/imgextra/i4/35278176/O1CN01VNOy3C2AGexNZhyNa_!!35278176.jpg',title:'正宗新疆馕饼烤馕手工囊饼大芝麻牛奶馕皮牙子馕油馕特产美食小吃'},
        {url:'https://gw.alicdn.com/imgextra/i3/2207381183020/O1CN01emES5q1YBCoZI3Sqj_!!2207381183020.jpg_Q75.jpg_.webp',title:'新疆特产美食牛肉干耗牛风干手撕正宗真牛肉小包装小零食比内蒙古'},
        {url:'https://img.alicdn.com/imgextra/i3/297616671/O1CN01SgYCK31z9Ms69K4vX_!!297616671.jpg',title:'10月底发正宗新疆阿克苏冰糖心苹果新鲜水果包邮当季整箱斤农产品'},
        {url:'https://gw.alicdn.com/imgextra/i4/2209955631280/O1CN01oEQFoo1LKHjTlKAT4_!!2209955631280.jpg_Q75.jpg_.webp',title:'185新疆纸皮核桃2022新货阿克苏草本味大核桃孕妇专用薄皮礼盒'},
        {url:'https://gd2.alicdn.com/imgextra/i1/2213928678039/O1CN01pXuamT29FujmFJDuf_!!2213928678039.jpg_400x400.jpg',title:'新疆切糕纯手工无添加零食传统糕点坚果营养饱腹美食特产代餐正宗'},
        {url:'https://gw.alicdn.com/imgextra/i1/2211616533717/O1CN01PhhwVM1dKQry6AsGs_!!2211616533717.jpg_Q75.jpg_.webp',title:'牧民人家新疆特产美食网红奶枣巴旦木夹心巴达木奶酪枣爆款小零食'},
        {url:'https://img.alicdn.com/imgextra/i3/2207926881627/O1CN01feEzxF1NtD27f7JCH_!!2207926881627.jpg_400x400.jpg',title:'新疆爆辣炒米粉正宗美食小吃网红袋装干粗粉炒米粉专用酱香特产'},
      ],
    };
  },
  mounted() {
    // this.mallHomepageGetProductOverviewInfoApi(); // 商品概览信息-接口
    // this.mallHomepageGetPessGoldInfoApi(); //月度金牌企业信息-接口
    // this.mallHomepagePageAnnouncementListApi(); // 查询采购商表中会员目录分页列表信息-接口
    // this.tabsClick(this.tabsName); //
    // this.imgLoad();
    // window.onresize = () => {
    //   this.bannerHeight = (540 / 1920) * window.innerWidth;
    //   this.imgLoad();
    // };
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    imgLoad() {
      this.$nextTick(() => {
        this.bannerHeight = (540 / 1920) * window.innerWidth;
        console.log(
          "this.$refs.bannerHeight[0].bannerHeight:",
          this.$refs.bannerHeight[0].bannerHeight
        );
      });
    },
    elCarouselChange(value) {
      this.$refs.cu_animation.again();
      this.setActiveItem = value;
      console.log("setActiveItem:", this.setActiveItem);
    },
    // 商品概览信息-接口
    mallHomepageGetProductOverviewInfoApi() {
      mallHomepageGetProductOverviewInfo()
        .then((res) => {
          if (res.code == 200) {
            //商品概述数据
            this.productOverviewList = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 月度金牌企业信息-接口
    mallHomepageGetPessGoldInfoApi() {
      mallHomepageGetPessGoldInfo()
        .then((res) => {
          if (res.code == 200) {
            this.goldMedalEnterpriseList = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询采购商表中会员目录分页列表信息-接口
    mallHomepagePageAnnouncementListApi() {
      let valueData = {
        sort: "desc",
        currPageNo: this.memberDirectoryListPages.current,
        pageSize: this.memberDirectoryListPages.size,
      };
      mallHomepagePageAnnouncementList(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.memberDirectoryList = res.data.list;
            this.memberDirectoryListPages.total = res.data.totalCount;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 药品销售top20 /*mall_category = 1:3 抗新冠药物目录:药品目录*/-接口
    mallHomepageGetDrugSalesListApi(mallCategory) {
      this.antiCoronavirusDrugsList = [];
      this.drugTradeList = [];
      mallHomepageGetDrugSalesList(mallCategory)
        .then((res) => {
          if (res.code == 200) {
            if (mallCategory == 1) {
              this.antiCoronavirusDrugsList = res.data; //抗新冠药物目录1
            } else {
              this.drugTradeList = res.data; //药品交易目录3
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 器械销售top20 /*mall_category = 2:4 抗新冠器械目录:器械目录*/-接口
    mallHomepageGetEquipmentSalesApi(mallCategory) {
      this.antiCoronavirusDeviceList = [];
      this.equipmenttradingList = [];
      mallHomepageGetEquipmentSales(mallCategory)
        .then((res) => {
          if (res.code == 200) {
            if (mallCategory == 2) {
              this.antiCoronavirusDeviceList = res.data; //抗新冠药物目录目录2
            } else {
            }
            this.equipmenttradingList = res.data; //器械交易目录4
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 会员分布信息-接口
    mallHomepageGetMemberInfoApi() {
      mallHomepageGetMemberInfo()
        .then((res) => {
          if (res.code == 200) {
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 判断过万，并且用'万'结尾，保留两位小数
    numberDataProcessing(value) {
      if (value > 10000) {
        value = Math.floor((value / 10000) * 100) / 100; //保留小数点两位
        //n = parseInt((n /10000) * 100 / 100); //取整
        value = value;
        return value;
      } else {
        return value;
      }
    },

    // 会员目录分页改变回调
    memberDirectoryListCurrentChange(value) {
      this.memberDirectoryListPages.current = value;
      this.mallHomepagePageAnnouncementListApi();
    },
    // 各平台入口点击回调
    clickButton(value) {
      if (value == "我是采购商") {
        this.$store.commit("switchPlatform", "purchaser");
        this.$router.push("/login");
      } else if (value == "我是供应商") {
        this.$store.commit("switchPlatform", "supplier");
        this.$router.push("/login");
      } else if (value == "申请入驻") {
        this.$store.commit("switchPlatform", "operation");
        this.$router.push("/Register");
      }
    },

    // 查询信息表中通知公告分页列表信息（ 1 通知公告 2 中标公告 3 招标公告）
    pagePoliciesListApi(valueId) {
      let valueData = {
        sort: "desc",
        announcementId: valueId,
        currPageNo: 1,
        pageSize: 6,
      };
      pagePoliciesList(valueData)
        .then((res) => { })
        .catch((err) => {
          console.log(err);
        });
    },
    // 通过信息ID查询通知公告详情列表
    getAnnouncementByIdApi(valueId) {
      let valueData = {
        id: valueId,
      };
      getAnnouncementById(valueData)
        .then((res) => { })
        .catch((err) => {
          console.log(err);
        });
    },
    // 通知公告-tab-点击回调
    tabsClick(value) {
      if (value == "抗新冠药物目录") {
        this.mallHomepageGetDrugSalesListApi(1); //药品销售top20 /*mall_category = 1:3 抗新冠药物目录:药品目录*/
      } else if (value == "抗新冠器械目录") {
        this.mallHomepageGetEquipmentSalesApi(2); //器械销售top20 /*mall_category = 2:4 抗新冠器械目录:器械目录*/
      } else if (value == "药品交易目录") {
        this.mallHomepageGetDrugSalesListApi(3); //药品销售top20 /*mall_category = 1:3 抗新冠药物目录:药品目录*/
      } else if (value == "器械交易目录") {
        this.mallHomepageGetEquipmentSalesApi(4); //器械销售top20 /*mall_category = 2:4 抗新冠器械目录:器械目录*/
      }
    },
    // 通知公告-条信息点击回调
    tabsListClick(value, noticely) {
      this.noticely = noticely; //noticely 1外部 2从更多列表过来
      this.seeMore = "通知公告详情";

      // this.getAnnouncementByIdApi(value);
    },
    // 建设中跳转
    underConstructionButton() {
      let routeData = this.$router.resolve({
        name: "webUnderConstruction",
        // query: { species: "Brassica rapa" },
      });
      window.open(routeData.href, "_blank");
      // this.$router.push("/webUnderConstruction");
      // this.$store.commit("$uStore", {
      //   name: "vuex_webName",
      //   value: "webUnderConstruction",
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./webTradingMall.scss";
</style>
