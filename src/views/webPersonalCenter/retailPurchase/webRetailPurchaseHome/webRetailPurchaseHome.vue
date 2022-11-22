<template>
  <div class="content_bodys">
    <div class="content_one">
      <div class="content_one1">
        <div class="content_one12">
          <div class="content_one121">
            <img v-lazy v-if="!tabInfo.avatar" src="./img/success.png" alt="" />
            <img v-lazy v-else :src="tabInfo.avatar" alt="" />
          </div>
          <div class="content_one122">{{ tabInfo.buyerName }}</div>
          <el-button
            type="default"
            class="content_one125"
            @click="Concerned('webRetailLnformation')"
            >完善信息</el-button
          >
        </div>
      </div>
      <div class="content_one2">
        <div class="content_one21">我的钱包</div>
        <div class="content_one22">
          <div class="content_one23">{{ tabInfo.amount }}</div>
          <div class="content_one24">账号余额</div>
        </div>
      </div>
      <div class="content_two121">
        <div class="content_two121_title">我的关注</div>
        <div class="content_two121_body">
          <div
            class="content_two1211"
            @click="Concerned('webRetailProductsConcerned')"
          >
            <div class="content_two12111">{{ tabFollow.goodCount }}</div>
            <div class="content_two12112">商品关注</div>
          </div>
          <div
            class="content_two1212"
            @click="Concerned('webRetailShopsConcerned')"
          >
            <div class="content_two12121">{{ tabFollow.shopCount }}</div>
            <div class="content_two12122">企业关注</div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_two">
      <div class="content_two_left">
        <h2>我的订单</h2>
        <div class="content_two_left_img">
          <ul>
            <li @click="Concerned('webRetailMyOrder')">
              <img src="./img/Slice67.png" alt="" />
              <span v-if="tabDDain.dfkCount > 0">{{ tabDDain.dfkCount }}</span>
              <p>待付款</p>
            </li>
            <li @click="Concerned('webRetailMyOrder')">
              <img src="./img/Slice68.png" alt="" />
              <!-- <span>2</span> -->
              <span v-if="tabDDain.dshCount > 0">{{ tabDDain.dshCount }}</span>
              <p>待收货</p>
            </li>
            <li @click="Concerned('webRetailMyOrder')">
              <img src="./img/Slice69.png" alt="" />
              <!-- <span>2</span> -->
              <p>退货</p>
            </li>
            <li @click="Concerned('webRetailMyOrder')">
              <img src="./img/Slice70.png" alt="" />
              <!-- <span>2</span> -->
              <p>待评价</p>
            </li>
            <li @click="Concerned('webRetailMyOrder')">
              <img src="./img/Slice71.png" alt="" />
              <!-- <span>2</span> -->
              <p>全部订单</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="content_two_right">
        <div class="content_two122_title">
          常购清单
          <span class="content_two122_title_GD">更多></span>
        </div>
        <div class="content_two122_body">
          <div
            class="content_two1221"
            v-for="(val, i) in tabPurcha"
            :key="i"
            @click="toDetail(val.goodsId)"
          >
            <img v-lazy :src="val.mainPicture" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="content_three">
      <div class="content_two122_title">
        猜你喜欢
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[8, 16, 24]"
          :page-size="100"
          :current-page="currentPage4"
          layout="total, sizes, prev, pager, next, jumper"
          :total="title"
        >
        </el-pagination>
      </div>
      <div class="content_three_ul">
        <ul>
          <li
            v-for="(val, i) in tabGoods"
            :key="i"
            @click="toDetail(val.goodsId)"
          >
            <img :src="val.mainPicture" alt="" />
            <p>{{ val.mallName }}</p>
            <div class="list">￥{{ val.price }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getBuyerBaseInfo,
  getAgencyOrderQuantity,
  getBuyerFollow,
  recommendGoods,
  frequentlyPurcha,
} from "@/api/aksApi/platformApi/retailPurchaseApi";
export default {
  data() {
    return {
      type: "drug",
      tabInfo: [],
      tabDDain: [],
      tabFollow: [],
      tabGoods: [],
      tabPurcha: [],
      currPageNo: 1,
      pageSize: 8,
      flag: true,
      title: 0,
      currentPage4: 4,
    };
  },
  created() {
    this.getBuyerBaseInfo();
    this.getAgencyOrderQuantity();
    this.getBuyerFollow();
    this.recommendGoods();
    this.frequentlyPurcha();
  },
  methods: {
    async getBuyerBaseInfo() {
      getBuyerBaseInfo().then((res) => {
        if (res.code == 200) {
          this.tabInfo = res.data;
        }
      });
    },
    toDetail(id) {
      console.log(id);
      return window.open(
        this.$router.resolve({
          path: "/webTradingMall/webFoodDetail",
          query: { type: this.type, id },
        }).href,
        "_blank"
      );
    },
    async getAgencyOrderQuantity() {
      getAgencyOrderQuantity().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.tabDDain = res.data;
        }
      });
    },
    async getBuyerFollow() {
      getBuyerFollow().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.tabFollow = res.data;
        }
      });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.recommendGoods();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currPageNo = val;
      this.recommendGoods();
    },
    //推荐
    async recommendGoods() {
      let params = {
        currPageNo: this.currPageNo,
        pageSize: this.pageSize,
      };
      recommendGoods(params).then((res) => {
        if (res.code == 200) {
          this.tabGoods = res.data.records;
          console.log(this.tabGoods);
          this.title = res.data.total;
        }
      });
    },
    Concerned(value) {
      // this.$router.push(`/webPersonalMain/${value}`)
      let routeData = this.$router.resolve({
        name: value,
        params: {},
      });
      window.open(routeData.href, "_blank");
    },
    async frequentlyPurcha() {
      let params = {
        currPageNo: 1,
        pageSize: 3,
      };
      frequentlyPurcha(params).then((res) => {
        if (res.code == 200) {
          this.tabPurcha = res.data.records;
          console.log(this.tabPurcha);
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-pagination {
  padding: 15px 5px 2px 5px;
}
.content_bodys {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  overflow: auto;
}
.content_one {
  display: flex;
  align-items: center;

  .content_one1 {
    width: 250px;
    height: 250px;
    background: #ff5b27;
    box-shadow: 4px 4px 4px 0px rgba(255, 91, 39, 0.4);
    border-radius: 10px 10px 10px 10px;
    z-index: 2;
    .content_one12 {
      display: flex;
      flex-direction: column;
      justify-items: center;
      align-items: center;
      .content_one121 {
        margin-top: 35px;
        width: 96px;
        height: 94px;
        border-radius: 50%;
        background: red;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .content_one122 {
        font-size: 20px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #ffffff;
      }
      .content_one123 {
        font-size: 14px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #ffffff;
      }
      .content_one124 {
        margin-top: 10px;
        font-size: 16px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        color: #ffffff;
      }
      .content_one125 {
        margin-top: 14px;
        width: 94px;
        height: 34px;
        border-radius: 100px 100px 100px 100px;
        border: 1px solid #ffffff;
        background: #ff5b27;
        color: #ffffff;
      }
    }
  }
  .content_one2 {
    width: 429px;
    height: 220px;
    background: #ffffff;
    z-index: 1;
    .content_one21 {
      height: 50px;
      line-height: 50px;
      padding-left: 25px;
      font-size: 20px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #020552;
      border-bottom: 1px solid #eeeeee;
    }
    .content_one22 {
      width: 429px;
      height: 170px;
      padding: 30px 25px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .content_one23 {
        font-size: 28px;
        font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
        font-weight: 800;
        color: #020552;
        line-height: 33px;
      }
      .content_one24 {
        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #020552;
        line-height: 19px;
      }
    }
  }
  .content_two121 {
    margin-left: 20px;
    width: 300px;
    height: 220px;
    background: #ffffff;
    .content_two121_title {
      height: 50px;
      line-height: 50px;
      padding-left: 25px;
      font-size: 20px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #020552;
      border-bottom: 1px solid #eeeeee;
    }
    .content_two121_body {
      height: 150px;
      display: flex;
      padding: 0 0;
      justify-content: center;
      align-items: center;
      .content_two1211 {
        width: 138px;
        cursor: pointer;
        .content_two12111 {
          text-align: center;
          font-size: 28px;
          font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
          font-weight: 800;
          color: #020552;
        }
        .content_two12112 {
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
        }
      }
      .content_two1212 {
        cursor: pointer;
        width: 138px;
        .content_two12121 {
          text-align: center;
          font-size: 28px;
          font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
          font-weight: 800;
          color: #020552;
        }
        .content_two12122 {
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
        }
      }
    }
  }
}
.content_two {
  width: 100%;
  height: 220px;
  justify-content: space-between;
  margin-top: 10px;
  display: flex;
  .content_two_left {
    width: 680px;
    height: 220px;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    h2 {
      font-size: 20px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #020552;
      width: 100%;
      padding-left: 31px;
      box-sizing: border-box;
      line-height: 56px;
      height: 56px;
      border-bottom: 1px solid #eeeeee;
    }
    .content_two_left_img {
      width: 100%;
      height: 163px;
      padding: 41px 40px 21px 40px;
      box-sizing: border-box;
      ul {
        width: 100%;
        list-style: none;
        display: flex;
        justify-content: space-between;
        li {
          position: relative;
          height: 101px;
          width: 80px;
          display: flex;
          align-items: center;
          flex-direction: column;
          img {
            width: 60px;
            height: 60px;
            display: block;
          }
          span {
            position: absolute;
            right: 4px;
            top: 0;
            padding: 2px;
            background: #ff480e;
            border-radius: 50%;
            text-align: center;
            font-size: 12px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #ffffff;
            line-height: 18px;
          }
          p {
            margin-top: 10px;
            line-height: 30px;
            font-size: 16px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #020552;
          }
        }
      }
    }
  }
  .content_two_right {
    width: 300px;
    height: 100%;
    background: #ffffff;
    .content_two122_title {
      display: flex;
      justify-content: space-between;
      height: 56px;
      line-height: 56px;
      padding: 0px 25px;
      font-size: 20px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #020552;
      border-bottom: 1px solid #eeeeee;
      .content_two122_title_GD {
        cursor: pointer;
        font-size: 16px;
        font-family: Source Han Sans CN-Regular, Source Han Sans CN;
        font-weight: 400;
        color: #999999;
      }
    }
    .content_two122_body {
      height: 160px;
      display: flex;
      align-items: center;
      margin: 0px 9px;
      .content_two1221 {
        margin-right: 3px;
        width: 92px;
        height: 92px;
        img {
          width: 92px;
          height: 92px;
        }
      }
      .content_two1221:nth-last-child(1) {
        width: 92px;
        height: 92px;
        img {
          width: 92px;
          height: 92px;
        }
      }
    }
  }
}
.content_three {
  margin-top: 20px;
  width: 100%;
  background: #ffffff;
  .content_two122_title {
    display: flex;
    justify-content: space-between;
    height: 56px;
    line-height: 56px;
    padding: 0px 25px;
    font-size: 20px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: bold;
    color: #020552;
    border-bottom: 1px solid #eeeeee;
    .content_two122_title_GD {
      cursor: pointer;
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }
  }
  .content_three_ul {
    width: 100%;
    padding: 24px 24px 0 24px;
    box-sizing: border-box;
    ul {
      width: 100%;
      flex-wrap: wrap;
      display: flex;
      list-style: none;
      li {
        margin-right: 20px;
        border: 1px solid #eeeeee;
        width: 223px;
        height: 318px;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        margin-bottom: 20px;
        &:nth-child(4n) {
          margin-right: 0;
        }
        img {
          margin-top: 10px;
          width: 200px;
          height: 200px;
          display: block;
        }
        p {
          height: 60px;
          width: 100%;
          padding: 0 10px;
          margin: 5px 0;
          box-sizing: border-box;
          font-size: 20px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #00023a;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
        .list {
          width: 100%;
          padding: 0 10px;
          box-sizing: border-box;
          font-size: 20px;
          font-family: Source Han Sans CN-Bold, Source Han Sans CN;
          font-weight: bold;
          color: #ff480e;
          line-height: 24px;
        }
      }
    }
  }
}
</style>
