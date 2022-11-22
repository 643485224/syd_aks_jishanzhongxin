<template>
    <div class="seach">
      <div class="seach-item">当前位置：首页 > <span @click="fhsyiy">企业监管</span> > <span>商品信息</span></div>
        <div class="seach1">
  
       <div class="seach-img">
        <div class="img-left">
            <div class="img-img">
                <img :src="info.logoUrl" alt="">
            </div>
        </div>
        <div class="img-right">
            <p>{{info.unitName}}</p>
            <ul>
                <li><span>{{info.sgCount}}</span><br><span>商品总数</span></li>
                <li><span>{{info.dcount}}</span><br><span>药品总数</span></li>
                <li><span>{{info.acount}}</span><br><span>药械总数</span></li>
            </ul>
        </div>
       </div>
      
       <div class="seach-item1" >
        <div class="item-ul">
            <ul>
                <li :class="index==1?'ative':''" @click="qh(1)">药品信息</li>
                <li :class="index==2?'ative':''" @click="qh(2)">药械信息</li>
            </ul>
        </div>
        <div class="inputs">
        <span>关键字:</span> <el-input v-model="keyword" placeholder="请输入"></el-input>
        <el-button type="success" @click="seach">搜索</el-button>
       </div>
        <div class="item-head">
          <p>
          <span>商品</span> 
          <span>单价</span> 
          <span>{{index ==1 ?'药品本位码':'规格型号'}}</span>
          <span>批准文号</span>
          <span>生产企业</span>
          </p>
        </div>
        <div class="item-but"  v-show="tabDate.length!=0">
          <p class="xinj">{{info.unitName}}</p>
          <div class="but-count" v-for="(val,i) in this.tabDate" :key="i">
            <div class="count1">
              <img :src="val.mallPicture" alt="">
              <div class="img-tile">
                <p>{{val.commonName}}</p>
                <p>{{val.specification}}</p>
              </div>
            </div>
            <div class="count2">
              <p>￥{{val.buyPrice}}</p>
            </div>
            <div class="count3">{{index==1?val.ypbwm:val.specification}}</div>
            <div class="count4">{{val.approvalNumber}}</div>
            <div class="count5">{{val.manufacturer}}</div>
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
  genterpriseGoodsSumInfo, 
  getEnterpriseGoodsInfo
} from "@/api/aksApi/platformApi/supervise.js";
export default {
    data () {
        return {
          total:1,
            index:1,
            supplierId:this.$route.query.supplierId,
            info:[],
            keyword:null,
            tabDate:[],
            pageSize:5,
            currPageNo:1,
        }
    },
    created () {
      this.genterpriseGoodsSumInfo()
      this.getEnterpriseGoodsInfo()
    },
    methods: {
      handleSizeChange(val){
        this.pageSize = val
        this.getEnterpriseGoodsInfo()
      },
      handleCurrentChange(val){
        this.currPageNo=val
        this.getEnterpriseGoodsInfo()
      },
      qh(val){
        this.index = val
        this.getEnterpriseGoodsInfo()
      },
      seach(){
        this.getEnterpriseGoodsInfo()
      },
      async getEnterpriseGoodsInfo(){ //列表
        let params = {
          goodsType:this.index,
          id:parseFloat(this.supplierId),
          currPageNo:this.currPageNo,
          pageSize:this.pageSize,
          keyword:this.keyword
        }
        console.log(params);
        
        getEnterpriseGoodsInfo(params).then(res => {
          console.log(res);

          if (res.code == 200) {
            this.tabDate = res.data.list
            this.total=res.data.totalCount
          }
        })
      },
     async genterpriseGoodsSumInfo(){//总数
      genterpriseGoodsSumInfo({id:this.supplierId}).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.info = res.data
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
   width: 100%;;
    height: calc(100vh - 66px);
    overflow:auto;
    background: #F4F4F4;
}
.seach-item{
        height: 40px;
        line-height: 40px;
        background: #F4F4F4;
        width: 1200px;
        margin:  0 auto;
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
.seach1{
    margin:0 auto;
    width: 1200px;
    background: #ffffff;
    margin-bottom: 100px;
    box-sizing: border-box;
   padding: 45px 55px;
    .seach-item1{
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
            width: 317px;
              text-align: left;
              padding-left:10px;
              box-sizing: border-box;
            }
            &:nth-child(2),
             &:nth-child(3),
            &:nth-child(4){
                width: 96px;
              text-align: center;
            }
            &:nth-child(3),
            &:nth-child(4){
              width: 160px;
            }
            &:nth-child(5){
              width: 277px;
              text-align: center;
            }
          }
        }
      }
      .item-but{
        width: 100%;
        .xinj{
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
          padding: 10px 0 29px 17px ;
          margin-bottom: 10px;
          .count1{
            display: flex;
            img{
             margin-right: 16px;
            width: 80px;
            height: 80px;
            }
            .img-tile{
                width: 147px;
                p{
                    font-size: 16px;
                    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
                    font-weight: 400;
                    color: #020552;
                    line-height: 20px;
                    &:nth-child(2){
                        margin-top: 12px;
                        font-size: 14px;
                        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
                        font-weight: 400;
                        color: #999999;
                    }
                }
            }
          }
          .count2{
            width: 140px;
            margin-left: 29px;
            p{
                text-align: center;
                font-size: 16px;
                font-family: Source Han Sans CN-Normal, Source Han Sans CN;
                font-weight: 400;
                color: #FF480E;
              
            }
          }
          .count3{
            width: 120px;
            text-align: center;
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
            font-weight: 400;
            color: #020552;
            margin-right: 24px;
          }
          .count4{
            text-align: center;
            width: 155px;
            margin-right: 24px;
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
            font-weight: 400;
            color: #020552;
          }
          .count5{
            width: 250px;
            font-size: 16px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: bold;
            color: #020552;
            text-align: center;
          }
        }
      }
      .item-ul{
        width: 100%;
        margin-bottom: 16px;
        ul{
            display: flex;
            list-style: none;
            border-bottom:1px solid #EEEEEE;
            li{
                width: 120px;
                text-align: center;
                line-height: 40px;
                font-size: 20px;
                font-family: Source Han Sans CN-Medium, Source Han Sans CN;
                font-weight: 500;
                color: #020552;
            }
            .ative{
                font-weight: bold;
                color: #FF480E;
            }
        }
      }
      .inputs{
        display: flex;
        margin-bottom: 15px;
        align-items: center;
        span{
          width: 70px;
          text-align: right;
          height: 24px;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #00023A;
          margin-right: 15px;
        }
         .el-input{
          width: 240px;
          margin-right: 45px;
          ::v-deep .el-input__inner{
            line-height: 31px !important;
          }
        }
        .el-button{
          padding: 12px 15px;
        }
      }

    }
    .seach-img{
        background: #0E78F3;
        height: 220px;
        width: 100%;
        margin-bottom: 40px;
        display: flex;
        .img-left{
            width: 220px;
            height: 100%;
            text-align: center;
            border-right: 1px solid #EEEEEE;
            box-sizing: border-box;
            display: flex;
            justify-content: center;
            align-items: center;
            .img-img{
                width: 139px;
                height: 139px;
                border-radius: 50%;
                border: 2px solid #FFFFFF;
                overflow: hidden;
                img{
                    width: 100%;
                    height: 100%;
                }
            }
        }
        .img-right{
            width: 100%;
            p{
                padding-left: 36px;
                font-size: 20px;
                font-family: Source Han Sans CN-Bold, Source Han Sans CN;
                font-weight: bold;
                color: #FFFFFF;
                line-height: 59px;
                border-bottom: 1px solid #EEEEEE;
            }
            ul{
                list-style: none;
                display: flex;
                width: 100%;
                justify-content: center;
                height: calc(100% - 60px);
                align-items: center;
                li{
                    text-align: center;
                    width: 160px;
                    span{
                        font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
                        color: #FFFFFF;
                        font-size: 16px;
                        &:nth-child(1){
                            line-height: 33px;
                            font-weight: 800;
                        font-size: 28px;
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