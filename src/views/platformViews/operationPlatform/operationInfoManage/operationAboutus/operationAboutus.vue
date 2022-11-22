<template>
    <div class="page-container table-page" ref="contentBox">
     
      <div class="tabliat">
        <ul>
            <li :class="index==1?'active':''" @click="index=1">药品集散中心简介</li>
            <li :class="index==2?'active':''" @click="index=2">联系我们</li>
        </ul>
        <div class="tab-item">
            <div class="item-list" v-if="index==1">
                <div class="item-item">
                  <cu-editor :height="height" v-model="aboutMe.summary" model-events="change keydown blur focus paste"></cu-editor>
                </div>
            </div>
            <div class="item-list" v-else>
                <div class="search-item search-list">
                公司地址:&nbsp;
                 <el-input class="selectInput" v-model="aboutMe.address" placeholder="请输入公司地址">
                </el-input>
                </div>
                <div class="search-item">
                公司网址:&nbsp;
                 <el-input class="selectInput" v-model="aboutMe.webUrl" placeholder="请输入公司网址">
                </el-input>
                </div>
                <div class="search-item">
                邮政编码:&nbsp;
                 <el-input class="selectInput" v-model="aboutMe.zipCode"  placeholder="请输入邮政编码">
                </el-input>
                </div>
                <div class="search-item">
                客服电话:&nbsp;
                 <el-input class="selectInput" v-model="aboutMe.servicePhone" placeholder="请输入客服电话">
                </el-input>
                </div>
                <div class="search-item">
                招商热线:&nbsp;
                 <el-input class="selectInput" v-model="aboutMe.hotlilne" placeholder="请输入招商热线">
                </el-input>
                </div>
            </div>
        </div>
        <div class="botton">
            <el-button type="primary" @click="seach">保存</el-button>
        </div>
      </div>
    </div>
  </template>
  <script>
  import { getAboutMeInfo, modifyAboutMeInfo } from "@/api/aksApi/platformApi/operationPlatformApi.js";
  export default {
    props: {
        height: {
            type: Number,
            default: 300
        },
    },
    data(){
        return {
            index:1,
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
         console.log(data);
        }
      })
      },
     async seach(){
        console.log(111);
        let params ={
          id:this.aboutMe.id,
          address:this.aboutMe.address,
          webUrl:this.aboutMe.webUrl,
          zipCode:this.aboutMe.zipCode,
          servicePhone:this.aboutMe.servicePhone,
          hotlilne:this.aboutMe.hotlilne,
          summary:this.aboutMe.summary,
        }
        this.$confirm('此操作将修改该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(params);
                modifyAboutMeInfo(params).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '修改成功!'
                        });
                        this.getList();
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        type: 'info',
                        message: '修改失败'
                    });
                });

            }).catch(() => {

            });
      }
    }
  }
  </script>
  <style lang="scss" scoped>
    .botton{
        margin-top: 20px;
        width: 100%;
        text-align: center;
    }
    .tabliat{
        padding: 20px 0 0 80px ;
        ul{
            list-style: none;
            width: 100%;
            display: flex;
            width: 720px;
            border: 1px solid #E4E7ED;
            li{
                width: 200px;
                text-align: center;
                line-height: 40px;
                border-right:1px solid #E4E7ED ;
                font-size: 14px;
                color: #000000;
            }
            .active{
                color: #ffffff;
                background: #409eff;
            }
        }
    }
    .tab-item{
        height: 450px;
        width: 720px;
        border: 1px solid #E4E7ED;
        border-top: 0px solid;
        .item-list{
            padding: 20px;
            text-align: center;
            .item-item{
                width: 100%;
                height: 410px;
            }
        }
    }
    .search-list{
      margin-top: 20px;
    }
    .search-item {
        margin-right: 18px;
        margin-bottom: 15px;
        .el-input {
            width: 450px;
        }
        ::v-deep .el-range-editor.el-input__inner {
            width: 250px;
            height: 31px !important;
        }


        ::v-deep .el-input__icon {
            line-height: 1;
        }
    }
  .bgOrange {
    background: #ff480e;
  }
  
  .bgGreen {
    background: #00c514;
  }
  
  .bgBlue {
    background: #156cc2;
  }
  
  .orange {
    color: #ff480e;
  }
  .blue {
    color: #409eff;
  }
  
  .page-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding-bottom: 40px;
    &::-webkit-scrollbar {
      width: 0px;
    }
  }
  
  </style>
  