<template>
  <div>
    <div class="content-body">
      <div class="content_body_item">
        <div class="content_one">
          <div class="content_one1">简介</div>
          <div class="content_one2">
            <div class="content_one21" v-html="jianjie"></div>
            <div class="content_one22"></div>
          </div>
        </div>
        <div class="content_two">
          <div class="content_two1">商品列表</div>
          <div class="products-cards">
            <div
              class="products-card"
              v-for="(item, index) in drugProducts"
              :key="index"
              @click="toDetail(item.id)"
            >
              <img v-lazy :src="item.url" alt="" />
              <div class="card-bottom">
                <div class="name">{{ item.title }}</div>
                <!-- <div class="desc">50mgx12粒x3板/盒</div> -->
                <div class="price">￥12.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 最底部组件 -->
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      drugProducts: [
        {
          url: "https://img.alicdn.com/imgextra/i2/2928278102/O1CN01qoJ3hh29ilhe5sOyA_!!0-item_pic.jpg_430x430q90.jpg",
          title: "哈药朴雪牌铁维生素b12口服液缺铁补铁女人葡萄糖酸亚铁孕妇气色",
        },
        {
          url: "https://img.alicdn.com/imgextra/i4/2928278102/O1CN01nHyOXD29ilhWgl1Jt_!!0-item_pic.jpg_430x430q90.jpg",
          title: "仲景杞菊地黄口服液12支中药缓解明目眼疲劳肝火旺盛养肝护肝",
        },
        {
          url: "https://img.alicdn.com/imgextra/i2/2256729251/O1CN015B1FUR2ID0jboWEr8_!!2256729251.jpg_430x430q90.jpg",
          title: "修正阿胶黄芪当归铁胶囊补血补铁气虚贫血亏月经女人调理量少口液",
        },
        {
          url: "https://gd1.alicdn.com/imgextra/i4/2213189146744/O1CN01A9XgvF1zgnpVCivVp_!!2213189146744.jpg",
          title: "聪康柠婴幼儿维生素ad国家标准宝宝天然维C粉补铁锌元素提高免疫",
        },
        {
          url: "https://img.alicdn.com/imgextra/i2/1659703297/O1CN019Ynz961aE4bpo4DlN_!!1659703297-0-picasso.jpg",
          title: "诺特兰德维生素c+维生素e+烟酸多种复合维生素ce组合VE片VC咀嚼片",
        },
        {
          url: "https://img.alicdn.com/imgextra/https://img.alicdn.com/imgextra/i2/3166937179/O1CN01JNdTiI22u23vRcHen_!!3166937179.jpg_430x430q90.jpg",
          title: "【3口味】维生素C咀嚼片VC片维C含片儿童成人维他命非泡腾胶囊",
        },
        {
          url: "https://img.alicdn.com/imgextra/i2/692420117/O1CN01MvvFrc1Cjd5P9PA1O_!!0-item_pic.jpg_430x430q90.jpg",
          title: "康恩贝维生素K2软胶囊正品中老年成年孕妇儿童补钙骨片搭档VK2",
        },
        {
          url: "https://img.alicdn.com/imgextra/i2/2200779643602/O1CN01gjTxoY1cTlNp0oCdc_!!0-item_pic.jpg_430x430q90.jpg",
          title: "北京同仁堂二陈丸平胃丸咳嗽化痰中药天猫医药馆旗舰店官网的药品",
        },
      ],

      jianjie:
        '<p>&nbsp;&nbsp;&nbsp;&nbsp; 阿克苏地区药品集散中心为国内独家线下药企集聚基地线下线上无缝粘合采配管运服平台。</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp; 集散中心成立于2017年，由地区食品药品监督管理局的领导主张创立，将地区所有药品药械相关企业集中整合管理运营。阿克苏地域广阔获取资源单一将所有的企业集中在一起去办大事儿，可以获取更多的资源，采购企业也有更多的选择目标，降低中间时间成本，也为行业管理机构提供了很大的便利。</p>\n<p style="text-align: left;">&nbsp;为提升阿克苏地区药品集散中心整体运营、管理水平，进一步将&ldquo;服务、管理、运营&rdquo;迭代提升，运用互联网、大数据等信息化手段，将集散中心现传统大集贸、粗放仓储配送式经营模式精运升级，让集散中心入驻企业与时俱进的适应互联网时代新市场需求，积极转型、孵化新型高精抵御力强劲的中小微特企。</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;药品集散中心为入驻药品药械企业在辖区范围医疗机构的政府招标享有政策倾斜优势。强大的国企融资功能，对于辖区公立医疗机构账户超期不能如约付款，中心可依据相关政策转垫支付，保障中心入驻优质企业的更好的经营活动。可对中心与合作银行、个金机构、信贷等，综合业务以中心及中心众企业优势多业务合作共赢。可积极的孵化关联边缘独角兽企业。提供综合直播业务，拓展新业态融聚服务。</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;集散中心向入驻企业提供优质的物业服务，面向线下企业的缴费问题，中心创建了网上窗口服务使商户足不出户就可实现网上缴费、网上领取电子回单回执，我们拥有15年互联网自助交易缴费经验，从而保证多合一缴费交易的安全可靠。</p>\n<p>&nbsp;&nbsp;&nbsp;&nbsp;集散中心向对线下企业实行线下入驻线上免入驻待遇，对入驻企业类型资质根据相应的政策法规的审核分类，可由集散中心生成二维码链接的招商专员提供线下详细介绍说明。</p>',
    };
  },
};
</script>
<style lang="scss" scoped>
.content-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 166px - 170px);
}
.content_body_item {
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;
  width: 1200px;
  background: #ffffff;
}
.content_one {
  .content_one1 {
    font-size: 44px;
    font-weight: 700;
    color: #020552;
    line-height: 44px;
    text-align: center;
  }
  .content_one2 {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    .content_one21 {
      height: 300px;
      width: 800px;
      font-size: 14px;
      font-weight: 600;
      color: #020552;
    }
    .content_one22 {
      height: 300px;
      width: 300px;
      background: url("../../../assets/images/jingyingzheng.png");
      background-size: 100% 100%;
    }
  }
}

.content_two {
  margin-top: 20px;
  background: #ffffff;
  .content_two1 {
    font-size: 44px;
    font-weight: 700;
    color: #020552;
    line-height: 44px;
    text-align: center;
  }
  .products-cards {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid #eee;

    .products-card {
      display: flex;
      flex-direction: column;

      width: 25%;
      padding: 40px 10px 20px;
      background-color: #fff;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;

      img {
        width: 258px;
        height: 200px;
        margin: 0 auto;
      }

      .card-bottom {
        margin-top: 10px;
        margin-left: 10px;
      }

      .name {
        font-size: 18px;
        color: #020552;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; //控制行数
        overflow: hidden;
      }

      .desc {
        font-size: 16px;
        color: #999999;
      }

      .price {
        font-size: 20px;
        color: #ff480e;
      }
    }
  }
}
</style>
