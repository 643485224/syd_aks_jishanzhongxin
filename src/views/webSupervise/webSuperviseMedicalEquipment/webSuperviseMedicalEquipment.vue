<template>
  <div class="equipment ">
    
   
    <img src="../img/bj.png" class="imgs">
    <navigation index="3" class="top70"></navigation>
    <div class="equipment-item">
          <div class="item"> 
            <el-select clearable  clear="item-ect" v-model="supplierType" placeholder="请选择" @change="cheng_der">
          <el-option  v-for="(val,i) in tabList" :key="i" :label="val.title" :value="val.id">
          </el-option>
        </el-select>
        <el-input class="inputPUt"  clearable v-model="supplierName" placeholder="请输入企业名称"></el-input>
        <div class="but" @click="seach">
          <img src="../img/Slice13.png" alt="">
        </div>
          </div>
    </div>
    <div class="seach">
      <ul v-show="flag" class="ul-list">
        <li v-for=" (val,i) in tabList" :key="i" @click="liadd(val.id)"> 
          <i class="el-icon-minus"></i> <i class="el-icon-download"></i> <p>{{val.title}}</p> </li>
        
      </ul>
      <div class="seach-item" v-show="flag1" >
        <div class="item-head">
          <p>
          <span>企业名称</span> 
          <span>企业类型</span> 
          <span>联系人</span>
          <span>手机号</span>
          <span>关联信息</span>
          </p>
        </div>
        <div class="item-but"  v-for="(val,i) in tabDate" :key="i" >
          <p>{{val.unitName}}</p>
          <div class="but-count">
            <div class="count1">
              <img :src="val.logoUrl" alt="">
            </div>
            <div class="count2">
              <p>{{supplierTypes[val.supplierType]}}</p>
            </div>
            <div class="count3">{{val.contactUser}}</div>
            <div class="count4">{{val.phone}}</div>
            <div class="count5">
              <ul>
                <li @click="enterprise(val.id)">企业信息</li>
                <li @click="qualification(val.id)">企业资质</li>
                <li @click="Profile(val.id)">企业简介</li>
                <li @click="information(val.id)">商品信息</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="pagination">
          <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
        </div>
        <el-empty description="暂无数据" v-show="tabDate.length==0"></el-empty>
      </div>
    </div>
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import {
  getEnterprisePage,
} from "@/api/aksApi/platformApi/supervise.js";
import Navigation from '../components/navigation.vue'
import {supplierTypes} from '@/utils/httpDataTypes.js'
export default {
  components:{
    Navigation
  },
  data () {
    return {
      flag:true,
      flag1:false,
      tabDate:[],
      supplierType:null,
      supplierName:null,
      total:1,
      tabList:[
        {
          id:5,
          title:'全部 '
        },
        {
          id:1,
          title:'药品集散中心药企 '
        }, {
          id:2,
          title:'药品集散中心药械企'
        }, {
          id:3,
          title:'药店  '
        }, {
          id:4,
          title:'个人  '
        }
      ],
      supplierTypes,
      pageSize:5,
      currPageNo:1,
    }
  },
  created(){
    console.log(this.$route.query.supplierType);
    if(this.$route.query.supplierType||this.$route.query.supplierName){
      this.supplierType = this.$route.query.supplierType
      this.supplierName = this.$route.query.supplierName
      this.getEnterprisePage()
    }
  },
  methods: {
    handleSizeChange(val){
      this.pageSize = val
      this.getEnterprisePage()
    },
    handleCurrentChange(val){
      this.currPageNo = val
      this.getEnterprisePage()
    },
    //企业信息
    enterprise(val){
      console.log('企业信息');
      this.$router.push({
        name: "webSuperviseEnterpriseInformation",
        query: {
          supplierId: val, 
          spType:3,
          supplierType: this.supplierType,
          supplierName: this.supplierName,
        },
      });
      
      
    },
    //企业资质
    qualification(val){
      console.log('企业资质');
      this.$router.push({
        name: "webSuperviseEnterpriseQualification",
        query: {
          supplierId: val, 
          supplierType: this.supplierType,
          supplierName: this.supplierName,
        },
      });
      // this.$router.push(`/webSuperviseMain/webSuperviseEnterpriseQualification?supplierId=${val}`)
    },
    //企业简介
    Profile(val){
      console.log('企业简介');
      this.$router.push({
        name: "webSuperviseCompanyProfile",
        query: {
          supplierId: val,
          supplierType: this.supplierType,
          supplierName: this.supplierName,
        },
      });
      // this.$router.push(`/webSuperviseMain/webSuperviseCompanyProfile?supplierId=${val}`)
      
    },
    //商品信息
    information(val){
      console.log('商品信息');
      this.$router.push({
        name: "webSuperviseCommodity",
        query: {
          supplierId: val,
          supplierType: this.supplierType,
          supplierName: this.supplierName,
        },
      });
      //spType 1药品 2医疗器械 3监管

    },
    //企业列表查询
   async getEnterprisePage(){
    
    let params = {
      currPageNo:this.currPageNo,
      pageSize:this.pageSize,
      supplierName:this.supplierName,//供应商名字  
      supplierType:this.supplierType //供应商类型id
    }
    if(params.supplierType==5){
      params.supplierType = null
    }else{params.supplierType = this.supplierType
    }
    getEnterprisePage(params).then(res => {
      console.log(res);
      if (res.code == 200) {
        this.tabDate = res.data.list
        this.total= res.data.totalCount
      }
    })
    }, 
    //搜索
    seach(){
      console.log(this.supplierType,this.supplierName);
      if (this.supplierType===null) {
      this.flag1 = false
      this.flag = true
      }else{
      this.flag = false
      this.flag1 = true
      this.getEnterprisePage()
      }
    
     
    },
    liadd(val){
      this.supplierType = val
      this.flag = false
      this.flag1 = true
      this.getEnterprisePage()
    },
    cheng_der(val){
      this.supplierType = val
      this.getEnterprisePage()
      this.flag = false
      this.flag1 = true
    }
  },
  watch: {
    supplierType: {
            // 数据变化时执行的逻辑代码
                  handler(newName, oldName) {
                  console.log(newName,oldName,4454 );
                  if (newName) {
                    this.flag = false
                    this.flag1 = true
                  } else {
                    this.flag1 = false
                    this.flag = true
                  }
                  },
            // 开启深度监听
            deep: true
            }
}
}
</script>
<style lang="scss" scoped>
.equipment {
  height: calc(100vh - 66px );
  overflow: auto;
  width: 100%;
  padding-top: 70px;
  .imgs{
    padding-top: 150px;
    position: fixed;
    left: 0;
    top: 96px;
    width: 100%;
    z-index: -1;
    background:#FB71E8;
  }
  .top70{
    margin-bottom: 70px;
  }
  .equipment-item{
    width: 1200px;
    margin: 0 auto 38px;

    .item{
      width: 100%;
      padding:  0 64px 0 70px;
      box-sizing: border-box;
      display: flex;
      ::v-deep .el-input__inner{
        border: 1px solid #FF480E;
        line-height: 50px;
        height: 50px;
      }
      .inputPUt{
        width: 720px;
      }
      ::v-deep .inputPUt .el-input__inner{
        margin-left: 20px;
        width: 700px;
        border-radius: 5px 0 0 5px;
      }
      .but{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 50px;
        background: #FF480E;
        border-radius: 0px 4px 4px 0px;
        .img{
          width: 24px;
        height: 24px;

        }
      }
    }
  }
  .seach{
    width: 1200px;
    margin:  0 auto;
    min-height: 388px;
    background: #FFFFFF;
    padding: 45px 55px;
    box-sizing: border-box;
    margin-bottom: 35px;
    box-shadow: 0px 8px 4px 0px rgba(0,0,0,0.15);
    .ul-list{
      width: 100%;
      display: flex;
      list-style: none;
      flex-wrap: wrap;
      li{
        width: calc(100% / 3);
        display: flex;
        line-height: 40px;
        align-items: center;
        span{
        width: 2px;
        height: 18px;
        background: #020552;
      }
      i{
        transform:rotate(180deg) ;
        font-size: 22px;
        color: #020552;
        margin-right: 5px;
        &:nth-child(1){
          display: block;
        transform:rotate(90deg);
        font-size: 22px;
        width: 22px;
        height: 100%;
        align-self: center;
        }
      }
      p{
        font-size: 20px;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
        font-weight: 400;
        color: #020552;
      }
      }
     li:hover{
      span{
        background: #0E78F3;
      }
      i,
      p{
        color: #0E78F3;
      }
     }
    }
    .seach-item{
      width: 100%;
      .item-head{
        margin-bottom: 20px;
        p{
          display: flex;
          height: 40px;
          background: #E8F0F8;
          width: 100%;
          line-height: 40px;
          span{
            font-size: 14px;
              font-family: Source Han Sans CN-Regular, Source Han Sans CN;
              font-weight: 400;
              color: #00023A;
            &:nth-child(1){
              width: 195px;
              text-align: left;
              padding-left:10px;
              box-sizing: border-box;
            }
            &:nth-child(2),
             &:nth-child(3),
            &:nth-child(4){
              width: 121px;
              text-align: center;
            }
            &:nth-child(3),
            &:nth-child(4){
              width: 160px;
            }
            &:nth-child(5){
              width: 435px;
              text-align: center;
            }
          }
        }
      }
      .item-but{
        width: 100%;
        p{
          font-size: 20px;
          font-family: Source Han Sans CN-Bold, Source Han Sans CN;
          font-weight: bold;
          color: #020552;
          line-height: 40px;
        }
        .but-count{
          display: flex;
          border: 1px solid #EEEEEE;
          border-top: 2px solid #FF480E;
          padding: 20px 21px 21px 21px ;
          .count1{
            width: 80px;
            height: 80px;
            img{
              width: 100%;
              height: 100%;
            }
          }
          .count2{
            width: 145px;
            margin-left: 85px;
            p{
              font-size: 16px;
              font-family: Source Han Sans CN-Normal, Source Han Sans CN;
              font-weight: 400;
              color: #020552;
              line-height:24px ;
              text-align: center;
              span{
                color: #0E78F3 ;
              }
            }
          }
          .count3{
            width: 107px;
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
            font-weight: 400;
            color: #020552;
            line-height: 24px;
            margin-left: 15px;
            text-align: center;
          }
          .count4{
            width: 203px;
            font-size: 16px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: bold;
            color: #020552;
            text-align: center;
            line-height: 24px;
          }
          .count5{
            ul{
              margin-left: 120px;
              display: flex;
              list-style: none;
              width: 180px;
              justify-content: space-between;
              flex-wrap: wrap;
              li{
                padding: 0 6px;
                cursor:pointer;
                text-decoration:underline;
                color: #0E78F3;
                text-align: center;
                &:nth-child(1),
                &:nth-child(2){
                  margin-bottom: 20px;
                }
                &:nth-child(3),
                &:nth-child(1){
                  margin-right: 15px;
                }
              }
            }
          }
        }
      }
    }
  }
}
.pagination{
  width: 100%;
  text-align: center;
  .el-pagination{
  margin: 48px 0 0 0  ;
  }
}
</style>