<template>
  <div class="content_bodys">
    <div class="content_one">
      <div class="content_one1">
        <div class="content_one12">
          <div class="content_one121">
            <img v-lazy src="../../assets/images/Logo.png" alt="" />
          </div>
          <div class="content_one122">张静怡</div>
          <div class="content_one123">阿克苏地区销售经理</div>
          <div class="content_one124">哈药集团三精制药有限公司</div>
          <el-button type="default" class="content_one125">完善信息</el-button>
        </div>
      </div>
      <div class="content_one2">
        <div class="content_one21">我的钱包</div>
        <div class="content_one22">
          <div class="content_one221">
            <div class="content_one2211">
              {{ walletReturn.score }}
              <span class="content_one22111">
                {{
                  walletReturn.score &lt; 60
                    ? "差"
                    : walletReturn.score >= 60 && walletReturn.score &lt; 80
                    ? "一般"
                    : walletReturn.score >= 80 && walletReturn.score &lt; 90
                    ? "良好"
                    : "极好"
                }}
              </span>
            </div>
            <div class="content_one2212">信用分</div>
            <div class="content_one2213">
              <a @click="toRouter('creditPayment')">查看</a>
            </div>
          </div>
          <div class="content_one222">
            <div class="content_one2221">{{ walletReturn.amount }}</div>
            <div class="content_one2222">账号余额</div>
            <div class="content_one2223">
              <a @click="toRouter('paymentSettlementCenter')">充值</a>
              <div class="content_one22231">|</div>
              <a @click="toRouter('paymentSettlementCenter')">提现</a>
            </div>
          </div>
          <div class="content_one223">
            <div class="content_one2231">
              {{ walletReturn.credit - walletReturn.usedCredit }}
            </div>
            <div class="content_one2232">信用付（可用额度）</div>
            <div class="content_one2233">
              <a @click="toRouter('creditPayment')">查看</a>
            </div>
          </div>
          <div class="content_one224">
            <div class="content_one2241" style="color: #ff480e">
              {{ walletReturn.dzfAmount }}
            </div>
            <div class="content_one2242">待还金额</div>
            <div class="content_one2243">
              <a @click="toRouter('creditPayment')">查看</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content_two">
      <div class="content_two1">
        <div class="content_two11">
          <div class="content_two11_title">集散中心药企</div>
          <div class="content_two11_body">
            <div class="invoicing-content">
              <div class="invoicing-item">
                <span>排名</span>
                <span>会员名称</span>
                <span>信用分</span>
              </div>
              <div class="invoicing-item-ul">
                <vueSeamlessScroll
                  :data="getSupplierTopNReturn"
                  class="warp"
                  :class-option="classOption"
                >
                  <ul>
                    <li
                      v-for="(item, index) in getSupplierTopNReturn"
                      :key="index"
                      class="invoicing-item-ul-li"
                      @click="scrollClick(item.unitName)"
                    >
                      <span>{{ index + 1 }}</span>
                      <span>{{ item.unitName }}</span>
                      <span>{{ item.score }}</span>
                    </li>
                  </ul>
                </vueSeamlessScroll>
              </div>
            </div>
          </div>
        </div>

        <div class="content_two12">
          <div class="content_two121">
            <div class="content_two121_title">我的关注</div>
            <div class="content_two121_body">
              <div class="content_two1211">
                <div class="content_two12111">98</div>
                <div class="content_two12112">商品关注</div>
              </div>
              <div class="content_two1212">
                <div class="content_two12121">12</div>
                <div class="content_two12122">企业关注</div>
              </div>
            </div>
          </div>
          <div class="content_two122">
            <div class="content_two122_title">
              常购清单
              <span
                class="content_two122_title_GD"
                @click="toRouter('webTradingMall')"
                >更多></span
              >
            </div>
            <div class="content_two122_body">
              <div
                class="content_two1221"
                v-for="(item, index) in frequentlyPurchasedReturn"
                :key="index"
              >
                <img
                  v-lazy
                  :src="item.mallPicture"
                  alt=""
                  @click="toDetail(item.id)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content_three">
      <div class="content_three_title">
        <div>
          <span
            class="content_three_title1"
            :class="type == 'drug' ? 'active' : ''"
            @click="typeClick('drug')"
            >药品采购</span
          >
          <span
            class="content_three_title2"
            :class="type == 'apparatus' ? 'active' : ''"
            @click="typeClick('apparatus')"
            >药械采购</span
          >
        </div>
        <span
          class="content_three_title_HYP"
          @click="toRouter('webTradingMall')"
          >更多></span
        >
      </div>
      <div class="products-cards" v-if="type == 'drug'">
        <div
          class="products-card"
          v-for="(item, index) in duugDetailedListReturn"
          :key="index"
          @click="toDetail(item.id)"
        >
          <img :src="item.mallPicture" alt="" />
          <div class="card-bottom">
            <div class="name">{{ item.mallName }}</div>
            <div class="price">￥{{ item.buyPrice || item.price }}</div>
          </div>
        </div>
      </div>
      <div class="products-cards" v-if="type == 'apparatus'">
        <div
          class="products-card"
          v-for="(item, index) in apparatusDetailedListReturn"
          :key="index"
          @click="toDetail(item.id)"
        >
          <img v-lazy :src="item.mallPicture" alt="" />
          <div class="card-bottom">
            <div class="name">{{ item.mallName }}</div>
            <div class="price">￥{{ item.buyPrice || item.price }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  buyer_coreApparatusDetailedList,
  buyer_coreDuugDetailedList,
  buyer_coreFrequentlyPurchased,
  buyer_coreGetSupplierTopN,
  buyer_coreWallet,
} from "@/api/aksApi/platformApi/personalCenter.js";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      type: "drug", //drug药品 apparatus药械
      apparatusDetailedListReturn: [], // 药械采购清单-接口回参
      duugDetailedListReturn: [], // 药品采购清单-接口回参
      frequentlyPurchasedReturn: [], // 常购清单-接口回参
      getSupplierTopNReturn: [], // 读取集散中心企业-接口回参
      walletReturn: {}, // 我的钱包-接口回参
    };
  },
  // 参数配置
  computed: {
    classOption() {
      return {
        direction: 0,
        step: 0.5, // 数值越大速度滚动越快
        waitTime: 1000,
        //     step: 0.2, // 数值越大速度滚动越快
        //     limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        //     hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        //     openWatch: true, // 开启数据实时监控刷新dom
        //     singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        //     singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        //     waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
  mounted() {
    this.buyer_coreApparatusDetailedListApi(); // 药械采购清单-接口
    this.buyer_coreDuugDetailedListApi(); // 药品采购清单-接口
    this.buyer_coreFrequentlyPurchasedApi(); // 常购清单-接口
    this.buyer_coreGetSupplierTopNApi(); // 读取集散中心企业-接口
    this.buyer_coreWalletApi(); // 我的钱包-接口
  },
  methods: {
    // 药械采购清单-接口
    async buyer_coreApparatusDetailedListApi() {
      await buyer_coreApparatusDetailedList()
        .then((res) => {
          if (res.code == 200) {
            this.apparatusDetailedListReturn = res.data.records;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 药品采购清单-接口
    buyer_coreDuugDetailedListApi() {
      buyer_coreDuugDetailedList()
        .then((res) => {
          if (res.code == 200) {
            console.log(res);
            this.duugDetailedListReturn = res.data.records;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 常购清单-接口
    buyer_coreFrequentlyPurchasedApi() {
      let top = 4; //top是根据界面位置，展示几张图片就传几；这个参数是留给前端控制的
      buyer_coreFrequentlyPurchased(top)
        .then((res) => {
          if (res.code == 200) {
            this.frequentlyPurchasedReturn = res.data.filter((element) => {
              return element != null;
            });
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 读取集散中心企业-接口
    buyer_coreGetSupplierTopNApi() {
      let top = 20; //top是根据界面位置，展示几张图片就传几；这个参数是留给前端控制的
      buyer_coreGetSupplierTopN(top)
        .then((res) => {
          if (res.code == 200) {
            this.getSupplierTopNReturn = res.data;
            console.log(
              "this.getSupplierTopNReturn:",
              this.getSupplierTopNReturn
            );
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 我的钱包-接口
    buyer_coreWalletApi() {
      buyer_coreWallet()
        .then((res) => {
          if (res.code == 200) {
            this.walletReturn = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 1药品采购  2药械采购 点击切换
    typeClick(value) {
      this.type = value;
    },
    // 点击商品跳转详情页
    toDetail(id) {
      switch (this.type) {
        case "foods":
          // 新页面打开
          return window.open(
            this.$router.resolve({
              path: "/webTradingMall/webFoodDetail",
              query: { type: this.type, id },
            }).href,
            "_blank"
          );
        default:
          // 新页面打开
          return window.open(
            this.$router.resolve({
              path: "/webTradingMall/webGoodsDetail",
              query: { type: this.type, id },
            }).href,
            "_blank"
          );
      }
    },
    // 点击进行跳转
    toRouter(name) {
      // 新页面打开
      let routeData = this.$router.resolve({
        name: name,
        params: {},
      });
      window.open(routeData.href, "_blank");
      // 本页面打开
      // this.$router.push({
      //   name: name,
      //   params: {},
      // });
    },
    // 点击集散中心药企
    scrollClick(value) {
      this.$message.success(value);
    },
  },
};
</script>
<style lang="scss" scoped>
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
        margin-top: 15px;
        width: 91px;
        height: 84px;
        border-radius: 50%;
        background: red;
        img {
          width: 91px;
          height: 84px;
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
    width: 750px;
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
      width: 750px;
      height: 170px;
      padding: 30px 25px;
      display: flex;
      .content_one221 {
        width: 150px;
        .content_one2211 {
          font-size: 28px;
          font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
          font-weight: 800;
          color: #020552;
          .content_one22111 {
            font-size: 14px;
            color: #ff480e;
          }
        }
        .content_one2212 {
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
        }
        .content_one2213 {
          margin-top: 20px;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #0f6fff;
        }
      }
      .content_one222 {
        width: 200px;
        .content_one2221 {
          font-size: 28px;
          font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
          font-weight: 800;
          color: #020552;
          .content_one22211 {
            font-size: 14px;
            color: #ff480e;
          }
        }
        .content_one2222 {
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
        }
        .content_one2223 {
          margin-top: 20px;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #0f6fff;
          display: flex;
          .content_one22231 {
            margin: 0px 10px;
          }
        }
      }
      .content_one223 {
        width: 200px;
        .content_one2231 {
          font-size: 28px;
          font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
          font-weight: 800;
          color: #020552;
          .content_one22311 {
            font-size: 14px;
            color: #ff480e;
          }
        }
        .content_one2232 {
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
        }
        .content_one2233 {
          margin-top: 20px;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #0f6fff;
        }
      }
      .content_one224 {
        width: 200px;
        .content_one2241 {
          font-size: 28px;
          font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
          font-weight: 800;
          color: #020552;
          .content_one22411 {
            font-size: 14px;
            color: #ff480e;
          }
        }
        .content_one2242 {
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
        }
        .content_one2243 {
          margin-top: 20px;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #0f6fff;
        }
      }
    }
  }
}

.content_two {
  margin-top: 15px;
  .content_two1 {
    display: flex;
    align-items: center;
    .content_two11 {
      width: 680px;
      background: #ffffff;
      .content_two11_title {
        height: 50px;
        line-height: 50px;
        padding-left: 25px;
        font-size: 20px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: bold;
        color: #020552;
        border-bottom: 1px solid #eeeeee;
      }
      .content_two11_body {
        height: 270px;
        display: flex;
        .invoicing-content {
          height: 270px;
          width: 680px;
          border-width: 1px 1px 1px 1px;
          border-style: solid;
          border-color: #ededed;

          .invoicing-item {
            display: flex;
            height: 40px;
            background: #fde5e5;
            line-height: 40px;

            span {
              font-size: 18px;
              font-family: Source Han Sans CN-Regular, Source Han Sans CN;
              font-weight: 400;
              color: #020552;
              width: 25%;
              text-align: center;
              border-bottom: 1px solid #ededed;
            }

            span:nth-child(2) {
              width: 80%;
              text-align: left;
              padding-left: 20px;
              border-width: 0px 1px 0px 1px;
              border-style: solid;
              border-color: #ededed;
            }
          }

          .invoicing-item-ul {
            width: 100%;

            .warp {
              width: 100%;
              height: 225px;
              overflow: hidden;

              ul {
                width: 100%;

                li {
                  line-height: 39.5px;
                  display: flex;

                  span {
                    font-size: 18px;
                    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                    font-weight: 400;
                    color: #020552;
                    width: 25%;
                    text-align: center;
                    border-bottom: 1px solid #ededed;
                  }

                  span:nth-child(2) {
                    width: 80%;
                    text-align: left;
                    padding-left: 20px;
                    border-width: 0px 0px 1px 0px;
                    border-style: solid;
                    border-color: #ededed;
                  }
                }
              }
            }
          }
        }
      }
    }
    .content_two12 {
      margin-left: 20px;
      .content_two121 {
        width: 300px;
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
          height: 100px;
          display: flex;
          padding: 14px 25px;
          .content_two1211 {
            width: 138px;
            .content_two12111 {
              font-size: 28px;
              font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
              font-weight: 800;
              color: #020552;
            }
            .content_two12112 {
              font-size: 16px;
              font-family: Source Han Sans CN-Regular, Source Han Sans CN;
              font-weight: 400;
              color: #020552;
            }
          }
          .content_two1212 {
            width: 138px;
            .content_two12121 {
              font-size: 28px;
              font-family: Source Han Sans CN-Heavy, Source Han Sans CN;
              font-weight: 800;
              color: #020552;
            }
            .content_two12122 {
              font-size: 16px;
              font-family: Source Han Sans CN-Regular, Source Han Sans CN;
              font-weight: 400;
              color: #020552;
            }
          }
        }
      }
      .content_two122 {
        margin-top: 20px;
        width: 300px;
        height: 150px;
        background: #ffffff;
        .content_two122_title {
          display: flex;
          justify-content: space-between;
          height: 50px;
          line-height: 50px;
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
          height: 101px;
          display: flex;
          align-items: center;
          margin: 0px 20px;
          .content_two1221 {
            margin-right: 7px;
            width: 60px;
            height: 60px;
            img {
              width: 60px;
              height: 60px;
            }
          }
          .content_two1221:nth-last-child(1) {
            width: 60px;
            height: 60px;
            img {
              width: 60px;
              height: 60px;
            }
          }
        }
      }
    }
  }
}

.content_three {
  margin-top: 15px;
  width: 1000px;
  background: #ffffff;
  margin-bottom: 20px;
  .content_three_title {
    height: 50px;
    line-height: 50px;
    padding: 0px 25px;
    font-size: 20px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #020552;
    // color: #ff480e;
    border-bottom: 1px solid #eeeeee;
    display: flex;
    justify-content: space-between;
    .content_three_title1 {
      cursor: pointer;
    }
    .content_three_title2 {
      cursor: pointer;
      margin-left: 30px;
    }
    .content_three_title_HYP {
      cursor: pointer;
      font-size: 16px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }
  }
  .products-cards {
    display: flex;
    flex-wrap: wrap;
    border-left: 1px solid #eee;
    padding-bottom: 10px;
    .products-card {
      display: flex;
      flex-direction: column;
      padding: 10px 10px;
      margin: 14px 0px 0px 14px;
      background-color: #fff;
      border: 1px solid #eee;

      img {
        width: 200px;
        height: 200px;
        margin: 0 auto;
      }

      .card-bottom {
        margin-top: 10px;
        margin-left: 10px;
      }

      .name {
        width: 200px;
        margin: 0 auto;
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
        width: 200px;
        margin: 0 auto;
        color: #ff480e;
      }
    }
  }
}

.active {
  color: #ff480e;
}

.invoicing-item-ul-li:hover {
  background: #ff480e;
  span {
    color: #ffffff !important;
  }
}
</style>
