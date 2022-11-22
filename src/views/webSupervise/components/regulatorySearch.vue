<template>
  <div class="seachList">
    <!-- 药品列表 -->
    <div v-if="spType == 1" class="seachListDrugs">
      <el-empty v-if="list.length == 0" description="暂无查询数据"></el-empty>
      <template v-if="list.length != 0">
        <el-pagination
          class="mb_10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <div class="seachListDrugs1">
          <div class="seachListDrugs11">商品</div>
          <div class="seachListDrugs12">单价</div>
          <div class="seachListDrugs13">药品本位码</div>
          <div class="seachListDrugs14">批准文号</div>
          <div class="seachListDrugs15">生成企业</div>
          <div class="seachListDrugs16">操作</div>
        </div>
        <div class="seachListDrugs2" v-for="(item, index) in list" :key="index">
          <div class="seachListDrugs21" @click="routerGo(item.id)">
            {{ item.unitName }}
          </div>
          <div class="seachListDrugs22">
            <div class="seachListDrugs221">
              <div class="seachListDrugs2211">
                <img
                  class="seachListDrugs22111"
                  :src="item.mallPicture"
                  alt=""
                />
                <div class="seachListDrugs22112">
                  <div class="seachListDrugs221121">
                    {{ item.goodsName }}
                  </div>
                  <div class="seachListDrugs221122">
                    {{ item.specification }}
                  </div>
                  <div class="seachListDrugs221123">
                    医保编码:{{ item.goodsCode }}
                  </div>
                </div>
              </div>
              <div class="seachListDrugs2212">￥{{ item.buyPrice }}</div>
              <div class="seachListDrugs2213">{{ item.ypbwm }}</div>
              <div class="seachListDrugs2214">{{ item.approvalNumber }}</div>
              <div class="seachListDrugs2215">{{ item.manufacturer }}</div>
              <div class="seachListDrugs2216">
                <a
                  class="seachListDrugs22161"
                  @click="routerClick(item.goodsId)"
                  >相关订单</a
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <!-- 药械列表 -->
    <div v-if="spType == 2" class="seachListMechanics">
      <el-empty v-if="list.length == 0" description="暂无查询数据"></el-empty>
      <template v-if="list.length != 0">
        <el-pagination
          class="mb_10"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
        <div class="seachListMechanics1">
          <div class="seachListMechanics11">商品</div>
          <div class="seachListMechanics12">单价</div>
          <div class="seachListMechanics13">规格型号</div>
          <div class="seachListMechanics14">批准文号</div>
          <div class="seachListMechanics15">生成企业</div>
          <div class="seachListMechanics16">操作</div>
        </div>
        <div
          class="seachListMechanics2"
          v-for="(item, index) in list"
          :key="index"
        >
          <div class="seachListMechanics21" @click="routerGo(item.id)">
            {{ item.unitName }}
          </div>
          <div class="seachListMechanics22">
            <div class="seachListMechanics221">
              <div class="seachListMechanics2211">
                <img
                  class="seachListMechanics22111"
                  :src="item.mallPicture"
                  alt=""
                />
                <div class="seachListMechanics22112">
                  <div class="seachListMechanics221121">
                    {{ item.goodsName }}
                  </div>
                  <div class="seachListMechanics221122">
                    {{ item.specification }}
                  </div>
                  <div class="seachListMechanics221123">
                    医保编码:{{ item.goodsCode }}
                  </div>
                </div>
              </div>
              <div class="seachListMechanics2212">￥{{ item.buyPrice }}</div>
              <div class="seachListMechanics2213">{{ item.specification }}</div>
              <div class="seachListMechanics2214">
                {{ item.approvalNumber }}
              </div>
              <div class="seachListMechanics2215">{{ item.manufacturer }}</div>
              <div class="seachListMechanics2216">
                <a
                  class="seachListMechanics22161"
                  @click="routerClick(item.goodsId)"
                  >相关订单</a
                >
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    spType: {
      type: Number,
      default: 1, //1药品 2药械 3企业
    },
    list: {
      type: Array,
      default: () => [
        {
          goodsId: null, //   "商品id"
          goodsName: null, //   "商品名"
          buyPrice: null, //   "平台采购价"
          goodsCode: null, //   "药品医保编码"
          ypbwm: null, //   "药品本位码"
          approvalNumber: null, //   "批准文号"
          manufacturer: null, //   "生产企业"
          id: null, //   "供应商id"
          specification: null, //规格
          mallPicture: null, //商城索引图
          buyPrice: null, //单价
          unitName: null, //   "采购商名称"
        },
      ],
    },
    elSelectValue: {
      type: String,
      default: "",
    },
    elInputValue: {
      type: String,
      default: "",
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    // 每页条数改变回调
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    // 页码改变回调
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    routerClick(goodsId) {
      // 新页面打开
      // let routeData = this.$router.resolve({
      //   name: "webSuperviseProductInformation",
      //   query: {
      //     spType: 1, //spType 1药品 2医疗器械 3监管},
      //   },
      // });
      // window.open(routeData.href, "_blank");
      // 本页面打开
      this.$router.push({
        name: "webSuperviseProductInformation",
        query: {
          goodsId: goodsId,
          spType: this.spType, //spType 1药品 2医疗器械 3监管},
          elSelectValue: this.elSelectValue,
          elInputValue: this.elInputValue,
        },
      });
    },
    routerGo(val) {
      // this.$message.success("开发中");
      this.$router.push({
        name: "webSuperviseEnterpriseInformation",
        query: {
          supplierId: val,
          spType: this.spType, //spType 1药品 2医疗器械 3监管},
          elSelectValue: this.elSelectValue,
          elInputValue: this.elInputValue,
        },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.seachList {
  width: 1200px;
  margin: 0 auto;
  min-height: 388px;
  background: #ffffff;
  padding: 25px 55px;
  box-sizing: border-box;
  margin-bottom: 35px;
  box-shadow: 0px 8px 4px 0px rgba(0, 0, 0, 0.15);
}
.seachListDrugs {
  .seachListDrugs1 {
    width: 1100px;
    height: 40px;
    background: #e8f0f8;
    padding-left: 17px;
    font-size: 14px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #00023a;
    display: flex;
    align-items: center;
    .seachListDrugs11 {
      width: 317px;
      text-align: left;
    }
    .seachListDrugs12 {
      width: 96px;
      text-align: center;
    }
    .seachListDrugs13 {
      width: 122px;
      text-align: center;
    }
    .seachListDrugs14 {
      width: 160px;
      text-align: center;
    }
    .seachListDrugs15 {
      width: 255px;
      text-align: center;
    }
    .seachListDrugs16 {
      width: 124px;
      text-align: center;
    }
  }
  .seachListDrugs2 {
    margin-top: 22px;
    .seachListDrugs21 {
      cursor: pointer;
      font-size: 20px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #020552;
    }
    .seachListDrugs22 {
      .seachListDrugs221 {
        margin-top: 8px;
        padding-left: 17px;
        padding-top: 18px;
        width: 1100px;
        height: 125px;
        background: #ffffff;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        border: 1px solid #eeeeee;
        border-top: 1px solid #ff480e;
        display: flex;
        .seachListDrugs2211 {
          width: 317px;
          text-align: left;
          display: flex;

          .seachListDrugs22111 {
            width: 80px;
            height: 80px;
          }
          .seachListDrugs22112 {
            padding-left: 16px;
            width: 237px;

            .seachListDrugs221121 {
              height: 24px;
              font-size: 16px;
              font-family: Source Han Sans CN-Normal, Source Han Sans CN;
              font-weight: 400;
              color: #020552;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
            }
            .seachListDrugs221122 {
              height: 24px;
              font-size: 16px;
              font-family: Source Han Sans CN-Normal, Source Han Sans CN;
              font-weight: 400;
              color: #020552;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
            }
            .seachListDrugs221123 {
              margin-top: 12px;
              font-size: 14px;
              font-family: Source Han Sans CN-Normal, Source Han Sans CN;
              font-weight: 400;
              color: #999999;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
            }
          }
        }
        .seachListDrugs2212 {
          width: 96px;
          height: 200px;
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #ff480e;
          /*这两行代码可以解决大部分场景下的换行问题*/
          word-break: break-all;
          word-wrap: break-word;
          /*但在有些场景中，还需要加上下面这行代码*/
          white-space: normal;
        }
        .seachListDrugs2213 {
          width: 141px;
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
          /*这两行代码可以解决大部分场景下的换行问题*/
          word-break: break-all;
          word-wrap: break-word;
          /*但在有些场景中，还需要加上下面这行代码*/
          white-space: normal;
        }
        .seachListDrugs2214 {
          width: 141px;
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
          /*这两行代码可以解决大部分场景下的换行问题*/
          word-break: break-all;
          word-wrap: break-word;
          /*但在有些场景中，还需要加上下面这行代码*/
          white-space: normal;
        }
        .seachListDrugs2215 {
          width: 255px;
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Bold, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
          /*这两行代码可以解决大部分场景下的换行问题*/
          word-break: break-all;
          word-wrap: break-word;
          /*但在有些场景中，还需要加上下面这行代码*/
          white-space: normal;
        }

        .seachListDrugs2216 {
          width: 124px;
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          .seachListDrugs22161 {
            color: #0e78f3;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
.seachListMechanics {
  .seachListMechanics1 {
    width: 1100px;
    height: 40px;
    background: #e8f0f8;
    padding-left: 17px;
    font-size: 14px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #00023a;
    display: flex;
    align-items: center;
    .seachListMechanics11 {
      width: 317px;
      text-align: left;
    }
    .seachListMechanics12 {
      width: 96px;
      text-align: center;
    }
    .seachListMechanics13 {
      width: 122px;
      text-align: center;
    }
    .seachListMechanics14 {
      width: 160px;
      text-align: center;
    }
    .seachListMechanics15 {
      width: 255px;
      text-align: center;
    }
    .seachListMechanics16 {
      width: 124px;
      text-align: center;
    }
  }
  .seachListMechanics2 {
    margin-top: 22px;
    .seachListMechanics21 {
      cursor: pointer;
      font-size: 20px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #020552;
    }
    .seachListMechanics22 {
      .seachListMechanics221 {
        margin-top: 8px;
        padding-left: 17px;
        padding-top: 18px;
        width: 1100px;
        height: 125px;
        background: #ffffff;
        border-radius: 0px 0px 0px 0px;
        opacity: 1;
        border: 1px solid #eeeeee;
        border-top: 1px solid #ff480e;
        display: flex;
        .seachListMechanics2211 {
          width: 317px;
          text-align: left;
          display: flex;

          .seachListMechanics22111 {
            width: 80px;
            height: 80px;
          }
          .seachListMechanics22112 {
            padding-left: 16px;
            width: 237px;

            .seachListMechanics221121 {
              height: 24px;
              font-size: 16px;
              font-family: Source Han Sans CN-Normal, Source Han Sans CN;
              font-weight: 400;
              color: #020552;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
            }
            .seachListMechanics221122 {
              height: 24px;
              font-size: 16px;
              font-family: Source Han Sans CN-Normal, Source Han Sans CN;
              font-weight: 400;
              color: #020552;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
            }
            .seachListMechanics221123 {
              margin-top: 12px;
              font-size: 14px;
              font-family: Source Han Sans CN-Normal, Source Han Sans CN;
              font-weight: 400;
              color: #999999;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
            }
          }
        }
        .seachListMechanics2212 {
          width: 96px;
          height: 200px;
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #ff480e;
          /*这两行代码可以解决大部分场景下的换行问题*/
          word-break: break-all;
          word-wrap: break-word;
          /*但在有些场景中，还需要加上下面这行代码*/
          white-space: normal;
        }
        .seachListMechanics2213 {
          width: 141px;
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
          /*这两行代码可以解决大部分场景下的换行问题*/
          word-break: break-all;
          word-wrap: break-word;
          /*但在有些场景中，还需要加上下面这行代码*/
          white-space: normal;
        }
        .seachListMechanics2214 {
          width: 141px;
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
          /*这两行代码可以解决大部分场景下的换行问题*/
          word-break: break-all;
          word-wrap: break-word;
          /*但在有些场景中，还需要加上下面这行代码*/
          white-space: normal;
        }
        .seachListMechanics2215 {
          width: 255px;
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Bold, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
          /*这两行代码可以解决大部分场景下的换行问题*/
          word-break: break-all;
          word-wrap: break-word;
          /*但在有些场景中，还需要加上下面这行代码*/
          white-space: normal;
        }

        .seachListMechanics2216 {
          width: 124px;
          text-align: center;
          font-size: 16px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          .seachListMechanics22161 {
            color: #0e78f3;
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
