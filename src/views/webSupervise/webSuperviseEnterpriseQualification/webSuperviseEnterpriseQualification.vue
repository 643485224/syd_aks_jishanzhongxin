<template>
    <div class="seach">
        <div class="seach1">
       <div class="seach-item">当前位置：首页 > <span @click="fhsyiy">企业搜索</span> > <span>企业资质</span></div>
       <div class="seach-count">
        <h2>企业资质</h2>
        <div class="seach-img"  v-show="tabList.length!=0">
        <el-carousel trigger="click" height="850px" indicator-position="none" >
      <el-carousel-item v-for="(val,i) in tabList" :key="i">
        <img :src="val.annexUrl" alt="">
         <h3>{{val.annexName}}</h3>
      </el-carousel-item>
            </el-carousel>
           
        </div>
        <el-empty description="暂无数据" v-show="tabList.length==0"></el-empty>
       </div>
    </div>
    <webMainFooter></webMainFooter>
    </div>
  
</template>
<script>
import {
  getEnterpriseAnnex,
} from "@/api/aksApi/platformApi/supervise.js";
export default {
    data () {
        return {
            tabList:[],
            id:this.$route.query.supplierId,
        }
    },
    created () {
        this.getEnterpriseAnnex()
        console.log(this.$route.query.supplierType,this.$route.query.supplierName,2122);
    },
    methods: {
        click(){
            console.log('012');
        },
       async getEnterpriseAnnex(){
        
        getEnterpriseAnnex({id:this.id}).then(res => {
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
       }
    }
}
</script>
<style lang="scss" scoped>
 .el-carousel__item {
     
    img{
    width: 100%;
    height: 800px;
}
}
    ::v-deep .el-carousel__arrow{
        width: 50px !important;
        height: 50px !important;
        font-size: 16px !important;
    }
.seach{
    width: 100%;
    height: calc(100vh - 66px);
    overflow:auto;
    background:#F4F4F4 ;
}
.seach1{
    margin:0 auto;
    width: 1200px;
    background: #FFFFFF;
    margin-bottom: 100px;
    padding-bottom: 40px;
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
        .seach-img{
            padding:40px  80px;
            text-align: center;
            
            h3{
                height: 33px;
                font-size: 20px;
                font-family: Source Han Sans CN-Normal, Source Han Sans CN;
                font-weight: 400;
                color: #020552;
                text-align: center;
                line-height: 33px;
                margin-top: 18px;
                margin-bottom: 44px;
            }
        }
    }
}
</style>