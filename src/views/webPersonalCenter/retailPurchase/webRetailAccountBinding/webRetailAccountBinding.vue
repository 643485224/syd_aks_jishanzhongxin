<template>
    <div class="content_bodys">
        <h2>账号绑定</h2>
        <div class="content_item">
            <div class="item_cont">
                <div class="item_left">
                <img src="./img/dlzc_qq.png" alt=""> <p>绑定QQ账号<span>未绑定</span></p>
            </div>
            <div class="item_right" @click="tabqh">
                {{tabList[index]}}
            </div>
            </div>
          <div class="item_cont1" v-if="flag">
            <div class="item_left">
                <h3>绑定后,可以使用QQ账号登录京东购物</h3>
                <div class="but">立即绑定</div>
            </div>
            <div class="item_right">
                <img src="" alt="">
                <i class="el-icon-sort"></i>
                <img src="" alt="">
            </div>
          </div>
        </div>
        <div class="content_item">
            <div class="item_cont">
                <div class="item_left">
                <img src="./img/dlzc_wx.png" alt=""> <p>绑定微信账号<span>未绑定</span></p>
            </div>
            <div class="item_right" @click="tabqh1">
                {{tabList[index1]}}
            </div>
            </div>
          <div class="item_cont1" v-if="flag1">
            <div class="item_left">
                <h3>绑定后,可以使用微信账号登录京东购物</h3>
                <div class="but">立即绑定</div>
            </div>
            <div class="item_right">
                <img src="" alt="">
                <i class="el-icon-sort"></i>
                <img src="" alt="">
            </div>
          </div>
        </div>
        <div class="content_item">
            <div class="item_cont">
                <div class="item_left">
                <img src="./img/dlzc_wb.png" alt=""> <p>绑定微博账号<span>未绑定</span></p>
            </div>
            <div class="item_right" @click="tabqh2">
                {{tabList[index2]}}
            </div>
            </div>
          <div class="item_cont1" v-if="flag2">
            <div class="item_left">
                <h3>绑定后,可以使用微博账号登录京东购物</h3>
                <div class="but">立即绑定</div>
            </div>
            <div class="item_right">
                <img src="" alt="">
                <i class="el-icon-sort"></i>
                <img src="" alt="">
            </div>
          </div>
        </div>
        <div class="content_item">
            <div class="item_cont">
                <div class="item_left">
                <img src="./img/dlzc_zfb.png" alt=""> <p>绑定支付宝账号<span>未绑定</span></p>
            </div>
            <div class="item_right" @click="tabqh3">
                {{tabList[index3]}}
            </div>
            </div>
          <div class="item_cont1" v-if="flag3">
            <div class="item_left">
                <h3>绑定后,可以使用支付宝账号登录京东购物</h3>
                <div class="but">立即绑定</div>
            </div>
            <div class="item_right">
                <img src="" alt="">
                <i class="el-icon-sort"></i>
                <img src="" alt="">
            </div>
          </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            tabList:{
                1:'绑定',
                2:'收起',
                3:'解绑'
            },
            flag:false,//QQ
            flag1:false,//微信
            flag2:false,//微博
            flag3:false,//支付宝
            index:1,//QQ
            index1:1,//微信
            index2:1,//微博
            index3:1,//支付宝
        }
    },
    methods: {
        //QQ的切换
        tabqh(){
            if (this.index==1) {
                this.flag = true;
                this.index=2
            }else if(this.index==2){
                this.flag = false
                this.index=1
            }
        },
        //微信的切换
        tabqh1(){
            if (this.index1==1) {
                this.flag1 = true;
                this.index1=2
            }else if(this.index1==2){
                this.flag1 = false
                this.index1=1
            }
        },
        //微博的切换
         tabqh2(){
            if (this.index2==1) {
                this.flag2 = true;
                this.index2=2
            }else if(this.index2==2){
                this.flag2= false
                this.index2=1
            }
        },
        //支付宝的切换
        tabqh3(){
            if (this.index3==1) {
                this.flag3 = true;
                this.index3=2
            }else if(this.index3==2){
                this.flag3= false
                this.index3=1
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.content_bodys{
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    overflow: auto;
    padding: 25px;
    box-sizing: border-box;
    h2{
        text-align: center;
        width: 100%;
        font-weight: bold;
        font-size: 20px;
        color: #020552;
        line-height: 45px;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
        
    }
}
.content_item{
   background: #eeeeee;
  margin-bottom: 20px;
    .item_cont{
        padding: 20px 20px;
        box-sizing: border-box;
        width: 100%;
        height: 56px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item_left{
            display: flex;
            align-items: center;

            img{
                width: 30px;
                height: 30px;
                margin-right: 5px;
            }
            p{
                font-size: 16px;
                font-weight: 400;
                font-family: Source Han Sans CN-Normal, Source Han Sans CN;
                color: #999999;
                display: flex;
                align-items: center;
                span{
                    font-size: 14px;
                    margin-left: 5px;
                    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
                color: orange;
                line-height: 56px;
                }
            }
        }
        .item_right{
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
                color: #409EFF;
                cursor: pointer;
        }
    }
    .item_cont1{
        padding: 20px 20px;
        box-sizing: border-box;
        display: flex;
        .item_left{
            width: 60%;
            border-right: 1px solid #999999;
            h3{
                margin-top: 10px;
                font-size: 24px;
                font-weight:bold;
                font-family: Source Han Sans CN-Normal, Source Han Sans CN;
                color: #67C23A;
            }
            .but{
                cursor: pointer;
                margin-top: 28px;
                width: 100px;
                line-height: 34px;
                font-size: 16px;
                text-align: center;
                font-family: Source Han Sans CN-Normal, Source Han Sans CN;
                border: 1px solid #67C23A;
                background: rgb(225, 243, 216);
                color: #999999;
            }
        }
        .item_right{
            padding: 0 10px;
            box-sizing: border-box;
            width: 40%;
            display: flex;
            align-items: center;
            img{
                    width: 140px;
                    height: 70px;
            }
            i{
                margin: 0 15px;
                transform: rotate(90deg);
                font-size: 46px;
                font-weight: bold;
            }
        }
    }
}
</style>