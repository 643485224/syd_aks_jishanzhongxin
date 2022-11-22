<template>
  <div class="content">
    <div class="content_one">
      <div class="content_one1">
        <div class="content_one11">
          <div class="content_one111">阿克苏药品集散中心</div>
          <div class="content_one112 mt_10">让民众用药买得起 用得上 用得好</div>
        </div>
        <div class="content_one12"></div>
      </div>
    </div>
    <div class=" content_body">
      <div class="content_two">药品集散中心简介</div>
      <div class="bg_e0edff content_three">
        <div class=" content_three1" v-html="aboutMe.summary">

        </div>
        <!-- <div class="content_three1">
          阿克苏地区药品集散中心为国内独家线下药企集聚基地、线下线上无缝粘合采配管运服平台。
        </div>
        <div class="content_three1">
          集散中心成立于2017年，由地区食品药品监督管理局的领导主张创立，将地区所有药品药械相关企业集中整合管理运营。阿克苏地域广阔获取资源单一将所有的企业集中在一起去办大事儿，可以获取更多的资源，采购企业也有更多的选择目标，降低中间时间成本，也为行业管理机构提供了很大的便利。
        </div>
        <div class="content_three1">
          为提升阿克苏地区药品集散中心整体运营、管理水平，进一步将“服务、管理、运营”迭代提升，运用互联网、大数据等信息化手段，将集散中心现传统大集贸、粗放仓储配送式经营模式精运升级，让集散中心入驻企业与时俱进的适应互联网时代新市场需求，积极转型、孵化新型高精抵御力强劲的中小微特企。
        </div>
        <div class="content_three1">
          药品集散中心为入驻药品药械企业在辖区范围医疗机构的政府招标享有政策倾斜优势。强大的国企融资功能，对于辖区公立医疗机构账户超期不能如约付款，中心可依据相关政策转垫支付，保障中心入驻优质企业的更好的经营活动。可对中心与合作银行、个金机构、信贷等，综合业务以中心及中心众企业优势多业务合作共赢。可积极的孵化关联边缘独角兽企业。提供综合直播业务，拓展新业态融聚服务。
        </div>
        <div class="content_three1">
          集散中心向入驻企业提供优质的物业服务，面向线下企业的缴费问题，中心创建了网上窗口服务使商户足不出户就可实现网上缴费、网上领取电子回单回执，我们拥有15年互联网自助交易缴费经验，从而保证多合一缴费交易的安全可靠。
        </div>
        <div class="content_three1">
          集散中心向对线下企业实行线下入驻线上免入驻待遇，对入驻企业类型资质根据相应的政策法规的审核分类，可由集散中心生成二维码链接的招商专员提供线下详细介绍说明。
        </div>
        <div class="content_three1">
          药品集散中心联合资深专家团队深入对Ｂ、Ｃ端进驻集散中心跟班式细致调研，结合后疫情阶段及行业发展实际情况，确定建立“网数综运服”平台，将现有的线下药企约２００家，医院、药械商店３０００多家，中心物流车辆20多辆，中心内药品种类约6500类，器械总类约8000类的保障产业集群，从线下迁移线上平台，通过数据监管，资源整合利用大数据进行动态管理，切实减少药品药械流通领域中间环节，规范流通秩序，提升监管效率，实现全程监管，园区对入驻企业线上精细服务、配送分类和支付保障。相关企业可通过平台了解相关产品业务详细信息。
        </div>
        <div class="content_three1">
          集散中心可以通过合作银行和国企强强联合，对于辖区公立医疗机构账户超期不能如约付款，中心可依据相关政策转垫支付，保障中心入驻优质企业的更好的经营活动。中心与合作银行、个金机构、信贷等，综合业务以中心及中心众企业优势多业务合作共赢。
        </div>
        <div class="content_three1">
          行业监管单位可以通过集散中心实时数据监管，利用大数据进行动态管理，切实掌握药品药械流通领域数量和流向，规范流通秩序，提升监管效率，实现全程监管。通过平台发布最新政策法规信息。行管单位发布医药药械信息，企业通过中心获取响应信息。
        </div>
        <div class="content_three1">
          集散中心商城拥有多元化、开放的平台理念吸引更多相关行业商家入驻，面对商家的多样化，独立的生活个体中心商城积极拓展企业生态链。
        </div> -->
      </div>

      <div class="content_four">联系我们</div>
      <div class="bg_fde5e5 content_five">
        <div class="content_five1">公司地址:{{aboutMe.address}}</div>
        <div class="content_five2">公司网址:{{aboutMe.webUrl}}</div>
        <div class="content_five3">邮政编码:{{aboutMe.zipCode}}</div>
        <div class="content_five4">客服电话:{{aboutMe.servicePhone}}</div>
        <div class="content_five5">招商热线:{{aboutMe.hotlilne}}</div>
      </div>
      <div class="content_six">
        <cu-gaudMap></cu-gaudMap>
      </div>
      <cu-friendshipLink class="content_seven"></cu-friendshipLink>
    </div>
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import { getAboutMeInfo } from "@/api/aksApi/platformApi/operationPlatformApi.js";
export default {
  data(){
        return {
            aboutMe:{
            id:'',
            address:null,
            webUrl:null,
            zipCode:null,
            servicePhone:null,
            hotlilne:null,
            summary:'',
            }
        }
    },
  created() {
        this.getList();
        
    },
    methods:{
    async getList(){
      getAboutMeInfo().then(res => {
        console.log(res);
        if(res.data.code ==200){
          let data = res.data.data
         this.aboutMe = data
         console.log( this.aboutMe,1111);
        }
      })
      },
    }
};
</script>
<style lang="scss" scoped>
@import "./webNoticeAndAnnouncement.scss";
</style>
