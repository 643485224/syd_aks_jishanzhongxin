<template>
  <div>
    <div class="content">
      <div class="content1">
        <div class="content11">
          <div class="content111">
            <div class="content1111">
              <i class="el-icon-circle-check"></i>商品已成功加入购物车！
            </div>
            <div class="content1112">
              <div class="content11121">
                <img src="" alt="" />
              </div>
              <div class="content11122">
                <div class="content111221">
                  999三九感冒灵颗粒10g*9袋解热镇痛用于感冒引起的头痛发热鼻塞流涕咽痛
                </div>
                <div class="content111222">10g*9袋 /数量：1</div>
              </div>
            </div>
          </div>
          <div class="content112">
            <div class="content1121">
              <el-button class="content11211" type="primary"
                >查看商品详情</el-button
              >
              <el-button class="content11212" type="primary"
                >去购物车结算></el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="content2">
        <div class="content21">
          <div class="content211">购买了该商品的用户还购买了</div>
          <div class="fenye mt_20">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-sizes="[6, 9, 12, 18, 24, 30]"
              :page-size="12"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pages.total"
            >
            </el-pagination>
          </div>
          <div class="content212">
            <div class="content2121" v-for="item in pages.size" :key="item">
              <div class="content21211">
                <img src="" alt="" />
              </div>
              <div class="content21212">
                <div class="content212121">
                  elevit/爱乐维复合维生素片100片艾爱乐维复合维生素片100片艾乐…
                </div>

                <div class="content212122">
                  <div class="content2121221">￥ 276.00</div>
                  <div class="content2121222">
                    <el-button
                      class="content21212221"
                      type="primary"
                      @click="addToCart(item)"
                    >
                      <img
                        class="content212122211"
                        src="./image/gouWuChe.png"
                        alt=""
                      />加入购物车</el-button
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pages: {
        total: 12,
        current: 1,
        size: 12,
      },
    };
  },
  methods: {
    addToCart(vasdfa) {},
    handleSizeChange(value) {
      this.pages.size = value;
    },
    handleCurrentChange(value) {
      this.pages.current = value;
    },
  },
};
</script>
<style lang="less" scoped>
.content {
  height: calc(100vh - 166px);
  width: 100%;
  background: #ffffff;
}
.content1 {
  width: 100%;
  height: 228px;
  background: #eeeeee;
  display: flex;
  align-items: center;
  justify-content: center;
  .content11 {
    width: 1200px;
    height: 228px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .content111 {
      height: 228px;
      .content1111 {
        margin-top: 27px;
        font-size: 20px;
        font-family: Source Han Sans CN-Normal, Source Han Sans CN;
        font-weight: 400;
        color: #00b712;
        i {
          margin-right: 10px;
        }
      }
      .content1112 {
        margin-top: 36px;
        display: flex;

        .content11121 {
          width: 80px;
          height: 80px;
          img {
            width: 80px;
            height: 80px;
          }
        }
        .content11122 {
          margin-left: 10px;
          .content111221 {
            width: 463px;
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
            font-weight: 400;
            color: #020552;
          }
          .content111222 {
            margin-top: 10px;
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
            font-weight: 400;
            color: #999999;
          }
        }
      }
    }
    .content112 {
      height: 228px;
      .content1121 {
        margin-top: 141px;
        height: 40px;
        .content11211 {
          border: 1px solid #ffffff;
          background: #ffffff;
          color: #ff480e;
        }
        .content11212 {
          border: 1px solid #ff480e;
          background: #ff480e;
          color: #ffffff;
        }
      }
    }
  }
}

.content2 {
  width: 100%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  .content21 {
    width: 1200px;
    .content211 {
      margin-top: 28px;
      font-size: 20px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #020552;
    }
    .content212 {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .content2121:nth-child(3n-1) {
        width: 390px;
        height: 130px;
        display: flex;
        margin: 0px 10px;
      }
      .content2121 {
        width: 390px;
        height: 130px;
        display: flex;

        .content21211 {
          width: 100px;
          height: 100px;
          img {
            width: 100px;
            height: 100px;
          }
        }
        .content21212 {
          height: 100px;
          margin-left: 10px;
          font-size: 16px;
          font-family: Source Han Sans CN-Regular, Source Han Sans CN;
          font-weight: 400;
          color: #00023a;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .content212121 {
          }
          .content212122 {
            .content2121221 {
              color: #ff480e;
            }
            .content2121222 {
              .content21212221 {
                height: 28px;
                width: 120px;
                background: #ffffff;
                color: #00023a;
                border: 1px solid #999999;
                ::v-deep span {
                  display: flex;
                  align-items: center;
                  justify-content: center;
                }
                .content212122211 {
                  margin-right: 10px;
                  width: 20px;
                  height: 20px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
