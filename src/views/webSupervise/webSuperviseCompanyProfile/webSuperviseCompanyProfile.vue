<template>
    <div class="seach">
        <div class="seach1">
       <div class="seach-item">当前位置：首页 > <span @click="fhsyiy">企业监管</span> > <span>企业简介</span></div>
       <div class="seach-count">
        <h2>企业简介</h2>
        <div class="seach-title">
            <p v-html="tabList.summary"></p>
            <!-- <p>阿克苏地区药品集散中心为国内独家线下药企集聚基地线下线上无缝粘合采配管运服平台。</p>
            <p>集散中心成立于2017年，由地区食品药品监督管理局的领导主张创立，将地区所有药品药械相关企业集中整合管理运营。阿克苏地域广阔获取资源单一将所有的企业集中在一起去办大事儿，可以获取更多的资源，采购企业也有更多的选择目标，降低中间时间成本，也为行业管理机构提供了很大的便利。</p>
            <p>为提升阿克苏地区药品集散中心整体运营、管理水平，进一步将“服务、管理、运营”迭代提升，运用互联网、大数据等信息化手段，将集散中心现传统大集贸、粗放仓储配送式经营模式精运升级，让集散中心入驻企业与时俱进的适应互联网时代新市场需求，积极转型、孵化新型高精抵御力强劲的中小微特企。</p>
            <p>药品集散中心为入驻药品药械企业在辖区范围医疗机构的政府招标享有政策倾斜优势。强大的国企融资功能，对于辖区公立医疗机构账户超期不能如约付款，中心可依据相关政策转垫支付，保障中心入驻优质企业的更好的经营活动。可对中心与合作银行、个金机构、信贷等，综合业务以中心及中心众企业优势多业务合作共赢。可积极的孵化关联边缘独角兽企业。提供综合直播业务，拓展新业态融聚服务。</p>
            <p>集散中心向入驻企业提供优质的物业服务，面向线下企业的缴费问题，中心创建了网上窗口服务使商户足不出户就可实现网上缴费、网上领取电子回单回执，我们拥有15年互联网自助交易缴费经验，从而保证多合一缴费交易的安全可靠。</p>
            <p>集散中心向对线下企业实行线下入驻线上免入驻待遇，对入驻企业类型资质根据相应的政策法规的审核分类，可由集散中心生成二维码链接的招商专员提供线下详细介绍说明。</p> -->
        </div>
        <h2>企业详情</h2>
        <div class="seach-img">
            <img src="" alt="">
        </div>
        <div class="seach-title">
            <p v-html="tabList.detail"></p>
            <!-- <p>药品集散中心为入驻药品药械企业在辖区范围医疗机构的政府招标享有政策倾斜优势。强大的国企融资功能，对于辖区公立医疗机构账户超期不能如约付款，中心可依据相关政策转垫支付，保障中心入驻优质企业的更好的经营活动。可对中心与合作银行、个金机构、信贷等，综合业务以中心及中心众企业优势多业务合作共赢。可积极的孵化关联边缘独角兽企业。提供综合直播业务，拓展新业态融聚服务。</p> -->
        </div>
       </div>
    </div>
    <webMainFooter></webMainFooter>
    </div>
  
</template>
<script>
import {
    getEnterpriseProfile,
} from "@/api/aksApi/platformApi/supervise.js";
export default {
    data () {
        return {
            tabList:[],
            supplierId:this.$route.query.supplierId,
        }
    },
    created(){
        this.getEnterpriseProfile()
    },
    methods: {
        async getEnterpriseProfile(){
            getEnterpriseProfile({id:this.supplierId}).then(res=>{
                console.log(res);
                if (res.code == 200) {
                    this.tabList = res.data
                }
            })   
        },
        fhsyiy(){
            this.$router.push({
          name: "webSuperviseMedicalEquipment",
          query: {
            supplierType: this.$route.query.supplierType,
            supplierName: this.$route.query.supplierName,
          },
        });
       },
    }
}
</script>
<style lang="scss" scoped>
.seach{
    width: 100%;
    height: calc(100vh - 66px);
    overflow:auto;
    background: #F4F4F4;
}
.seach1{
    margin:0 auto;
    width: 1200px;
    height: 1069px;
    background: #ffffff;
    margin-bottom: 100px;
    .seach-item{
        height: 40px;
        line-height: 40px;
        background: #F4F4F4;
        width: 100%;
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
            font-weight: 400;
            color: #020552;
            span{
                &:nth-child(2){
                    
                font-size: 18px;
                font-weight: bold;
                }
            }
    }
    .seach-count{
        width: 100%;
        padding-top: 28px;
        h2{
            height: 33px;
            font-size: 24px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: bold;
            color: #020552;
            line-height: 28px;
            text-align: center;
            width: 100%;
            margin-bottom: 18px;
        }
        .seach-title{
            width: 100%;
        padding: 0 62px;
        margin-bottom: 30px;
        p{
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
            font-weight: 400;
            color: #020552;
            line-height: 24px;
            text-indent: 2em;
        }
        }
        .seach-img{
            width: 100%;
            height: 358px;
            text-align: center;
            margin-bottom: 29px;
            img{
                height: 100%;
                width: 704px;
            }
        }
    }
}
</style>