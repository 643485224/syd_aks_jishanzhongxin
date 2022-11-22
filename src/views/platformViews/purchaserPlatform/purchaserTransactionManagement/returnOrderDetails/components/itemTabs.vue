<template>
  <div>
    <div class="search-bar">
      <div class="search-item">
        订单编号：
        <el-input
          clearable
          class="selectInput"
          v-model="orderNum"
          placeholder="请输入订单编号"
        >
        </el-input>
      </div>
      <div class="search-item">
        交易时间：
        <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
        <el-date-picker
          v-model="date"
          @change="pickDate"
          format="yyyy-MM-dd"
          type="daterange"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </div>
      <el-button class="search-btn" type="primary" @click="search"
        >查询</el-button
      >
    </div>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pages.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="pages.total"
    >
    </el-pagination>
    <!-- <cu-table
      class="sale-table"
      :loading="tableLoading"
      :height="height"
      :showTitle="false"
      :tableHeader="tableHeader"
      :tableData="tableData"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="pages.total"
    >
      <template slot="orderType" slot-scope="value">
        {{ orderTypeList[value.value.orderType] }}
      </template>
      <template slot="fkType" slot-scope="value">
        {{ fkTypeList[value.value.fkType] }}
      </template>
      <template slot="fpStatus" slot-scope="value">
        {{ fpStatusTypeList[value.value.fpStatus] }}
      </template>
      <template slot="backState" slot-scope="value">
        {{ backStateList[value.value.backState] }}
      </template>
      <template slot="backType" slot-scope="value">
        {{ backTypeList[value.value.backType] }}
      </template>

      <template slot="orderTime" slot-scope="value">
        {{
          value.value.orderTime
            ? new Date(value.value.orderTime).Format("yyyy-MM-dd")
            : ""
        }}
      </template>
      <template slot="operate" slot-scope="value">
        <el-button type="text" @click="detailsButton(value.value)"
          >详情</el-button
        >
        <a
                  v-if="value.value.backState == 1"

          type="text"
          class="ml_20"
          style="color: #ff480e"
          @click="
            cancellationOfOrderButton(value.value.id, value.value.orderNo)
          "
          >撤回</a
        >
         <el-tooltip
          v-else
          class="item ml_20"
          effect="dark"
          content="退货状态为(待审核)才可撤回订单"
          placement="left"
        >
          <a style="color: #ff480e" class="aDisabled">撤回</a>
        </el-tooltip> -->
    <!-- </template>
    </cu-table> -->
    <cu-dialog
      :title="cancellationOfOrderTitle"
      :showClose="true"
      :visible="cancellationOfOrderVisible"
      @handleClose="cancellationOfOrderClose()"
      @handleOk="cancellationOfOrderOk()"
    >
      <div class="flex mt_20">
        <span class="mr_10">撤回原因:</span>
        <textarea
          type="textarea"
          style="
            width: 650px;
            outline: none;
            border: 1px solid #dcdfe6;
            border-radius: 6px;
            height: 90px;
            font-size: 18px;
            padding: 10px;
          "
          v-model="canceRemark"
        />
      </div>
    </cu-dialog>
    <div class="tab-list">
      <div class="tab-head">
        <div class="tab-head-item">
          <div class="item-left">
            <!-- <el-checkbox  v-model="checkedAll" @change="handleCheckAllChange">商品</el-checkbox> -->
            <input
              type="checkbox"
              class="chebox"
              name="check"
              v-model="checkedAll"
              @change="handleCheckAllChange"
            />
            <span>商品</span>
          </div>
          <div class="item-right">
            <ul>
              <li>订单金额</li>
              <li>数量</li>
              <li>商品操作</li>
              <li>实付款</li>
              <li>交易状态</li>
              <li>操作</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="tab-conter">
        <div class="tab-cont" v-for="(val, i) in tableData" :key="i">
          <div class="cont-list">
            <input
              class="chebox"
              type="checkbox"
              name="check"
              v-model="checkModel"
              :value="val.id"
            />
            <!-- <el-checkbox :value="val.id" @change="handleCheck"  v-model="checkModel"></el-checkbox> -->
            <div class="list-right">
              <p>{{ val.orderTime }}</p>
              <p>订单号: {{ val.orderNo }}</p>
              <p>{{ val.buyerName }}</p>
            </div>
          </div>
          <div class="cont-bod">
            <div class="cont-left">
              <div class="cont-item">
                <!-- 关于公布2022年第九批议价药品（自费药）挂网采购清单 -->
                {{ val.supplierName }}
              </div>
              <div class="cont-rmb">￥{{ val.amount }}</div>
              <div class="cont-rmb">{{ val.goodsCategoryCount }}</div>
              <div class="cont-rmb cont-rm1">
                {{ backTypeList[val.backType] }}
              </div>
            </div>
            <div class="cont-right">
              <div class="right-item">
                <span class="rmb"
                  >￥{{ val.amount * val.goodsCategoryCount }}</span
                ><br /><span>（{{ fkTypeList[val.fkType] }}）</span>
              </div>
              <div class="right-item">
                <span>{{ backStateList[val.backState] }} </span><br />
                <div class="ck" @click="detailsButton(val)">查看详情</div>
              </div>
              <div class="right-item">
                <div
                  class="chui"
                  @click="cancellationOfOrderButton(val.id, val.orderNo)"
                >
                  撤回
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
import {
  buyerTranManagerReturnOrderList,
  buyerTranManagerCancelReturnOrder,
} from "@/api/aksApi/platformApi/purchaserPlatformApi.js";
import dayjs from "dayjs";
export default {
  props: {
    backState: {
      type: String,
      default: null,
    },
    height: {
      type: Number,
      default: null,
    },
    tableLoading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      checkedAll: false, //是否是全选
      tableList: [], //所有数据
      checkModel: [], //批量选择id
      fpStatusTypeList: {
        1: "待开票",
        2: "待收票",
        3: "待付款（已收票）",
        4: "待结算（采购商已付款）",
        5: "完成收款",
        6: "拒绝收票",
      },
      fkTypeList: {
        1: "在线支付",
        2: "货到付款",
      },
      orderTypeList: {
        1: "药品",
        2: "器械",
      },
      backStateList: {
        1: "无退货",
        2: "退货中",
        3: "退货成功",
        3: "退货失败",
      },
      backTypeList: {
        1: "全部退",
        2: "部分退",
      },
      tableHeader: [
        {
          title: "订单编号",
          key: "orderNo",
          width: "200",
        },
        {
          title: "采购商名称",
          key: "buyerName",
          width: "200",
        },
        {
          title: "订单类型",
          slot: "orderType", // 1 药品  2  器械
        },
        {
          title: "关联合同编号",
          key: "contractNo",
          width: "120",
        },
        {
          title: "商品种类(个)",
          key: "goodsCategoryCount",
          width: "100",
        },
        {
          title: "商品数量",
          key: "goodsCount",
        },
        {
          title: "供应商名称",
          key: "supplierName",
          width: "200",
        },
        {
          title: "支付方式",
          slot: "fkType", //  1 在线支付  2 货到付款
        },
        {
          title: "退货类型",
          slot: "backType", //退货类型@ 1  全部退   2  部分退
        },
        {
          title: "退货状态",
          slot: "backState", //退货状态@ 1  无退货  2  退货中  3  退货成功  4  退货失败
        },
        {
          title: "结算状态",
          slot: "fpStatus", //1  待开票  2  待收票  3 待付款（已收票）  4    待结算（采购商已付款）   5  完成收款   6  拒绝收票
        },
        {
          title: "交易时间",
          slot: "orderTime",
          width: "120",
        },
        {
          title: "订单金额",
          key: "amount",
        },
        {
          title: "操作",
          slot: "operate",
          fixed: "right",
          width: "120",
        },
      ],

      tableData: [],
      orderId: null, //订单id
      cancellationOfOrderVisible: false, //撤回
      cancellationOfOrderTitle: "", //撤回弹框title
      canceRemark: "", //撤回原因
      pages: {
        total: 0,
        current: 1,
        size: 5,
      },
      orderNum: "",
      date: [],
    };
  },
  created() {
    this.buyerTranManagerReturnOrderListApi();
  },
  watch: {
    checkModel: {
      handler() {
        if (this.checkModel.length == this.tableList.length) {
          this.checkedAll = true;
        } else {
          this.checkedAll = false;
        }
      },
      deep: true,
    },
  },

  methods: {
    handleCheckAllChange(val) {
      this.tableList = this.tableData;
      this.checkModel = [];
      if (this.checkedAll) {
        for (var i in this.tableList) {
          this.checkModel.push(this.tableList[i].id);
        }
      }
      console.log(this.checkModel);
    },
    handleCheck(value) {
      console.log(value);
      this.checkModel.push(value);
      if (this.checkModel.length == this.tableData.length) {
        this.checkedAll = true;
      }
      // let checkedCount = value.length;
      // this.checkAll = checkedCount === this.cities.length;
      // this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    },
    // 退货订单明细(查询)-接口
    buyerTranManagerReturnOrderListApi() {
      this.$emit("chosetableLoading", true);
      if (this.date.length) {
        this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
      }
      let params = {
        buyerId: this.$store.state.vuex_token.buyer.id, //采购商ID(登录人id)
        sort: "desc",
        currPageNo: this.pages.current,
        endTime: this.date && this.date[1],
        orderNo: this.orderNum, //订单编号
        pageSize: this.pages.size,
        startTime: this.date && this.date[0],
        backState: this.backState, //退货状态@ 1  无退货  2  退货中  3  退货成功  4  退货失败
      };
      this.tableData = [];
      buyerTranManagerReturnOrderList(params)
        .then((res) => {
          this.$emit("chosetableLoading", false);
          console.log(res);
          if (res.code == 200) {
            let data = res.data;
            this.tableData = data.list;
            this.pages.total = data.totalCount;

            console.log(this.tableData);
          }
        })
        .catch((err) => {
          this.$emit("chosetableLoading", false);
          console.log(err);
        });
    },

    // 采购商申请撤回-接口
    buyerTranManagerCancelReturnOrderApi() {
      buyerTranManagerCancelReturnOrder(this.orderId)
        .then((res) => {
          this.cancellationOfOrderVisible = false; //关闭撤回弹框
          if (res.code == 200) {
            this.buyerTranManagerReturnOrderListApi(); // 查询交易信息列表(采购商)-接口
            this.$message.success(res.message);
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.cancellationOfOrderVisible = false; //关闭撤回弹框
          console.log(err);
        });
    },

    pickDate(val) {
      console.log(val);
    },
    search() {
      this.buyerTranManagerReturnOrderListApi();
    },
    handleSizeChange(val) {
      console.log(val);
      this.pages.size = val;
      this.buyerTranManagerReturnOrderListApi();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pages.current = val;
      this.buyerTranManagerReturnOrderListApi();
    },
    // 订单详情按钮
    detailsButton(valueData) {
      console.log(valueData);
      this.$emit("detailsButton", valueData);
    },
    // 撤回按钮
    cancellationOfOrderButton(id, orderNo) {
      this.canceRemark = ""; //撤回原因
      this.orderId = id;
      this.cancellationOfOrderTitle = "是否撤回（订单编号：" + orderNo + "）";
      this.cancellationOfOrderVisible = true;
    },
    // 撤回弹框-取消按钮
    cancellationOfOrderClose() {
      this.cancellationOfOrderVisible = false;
    },
    // 撤回弹框-确定按钮
    cancellationOfOrderOk() {
      this.buyerTranManagerCancelReturnOrderApi();
    },
  },
};
</script>
<style lang="scss" scoped>
.tab-list {
  width: 100%;
  .tab-head-item {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    height: 40px;
    padding: 0 0px 0 24px;

    background: #e8f0f8;
    font-size: 14px;
    color: #00023a;
    .item-left {
      display: flex;
      align-items: center;
      width: 30%;
      line-height: 40px;
      height: 40px;
      input {
        margin: 0;
        margin-right: 12px;
      }
    }
    .item-right {
      width: 64%;
      ul {
        display: flex;
        list-style: none;
        li {
          width: 100px;
          text-align: center;
          font-size: 14px;
          color: #00023a;
        }
      }
    }
  }
  .tab-conter {
    width: 100%;
    .tab-cont {
      margin-top: 14px;
      width: 100%;
      border: 1px solid #999999;
      box-sizing: border-box;
      .cont-list {
        line-height: 40px;
        height: 40px;
        padding: 0 30px 0 24px;
        background: #e8f0f8;
        font-size: 14px;
        color: #00023a;
        display: flex;
        .list-right {
          margin-left: 12px;
          display: flex;
          p {
            font-size: 16px;
            color: #020552;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            &:nth-child(1) {
              font-weight: 600;
              margin-right: 20px;
            }
            &:nth-child(2) {
              margin-right: 110px;
            }
            &:nth-child(3) {
              // display: flex;
              width: 230px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .cont-bod {
        height: 124px;
        width: 100%;
        display: flex;
        .cont-left {
          padding: 19px 0 0 47px;
          display: flex;
          .cont-item {
            width: 262px;
            height: 70px;
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
            font-weight: 400;
            color: #020552;
            line-height: 19px;
            margin-right: 77px;
          }
          .cont-rmb {
            text-align: center;
            width: 69px;
            height: 24px;
            font-size: 16px;
            font-family: Source Han Sans CN-Normal, Source Han Sans CN;
            font-weight: 400;
            color: #020552;
            line-height: 19px;
            margin-right: 19px;
          }
          .cont-rm1 {
            margin-right: 0;
            width: 100px;
          }
        }
        .cont-right {
          height: 100%;
          display: flex;
          .right-item {
            padding-top: 17px;
            box-sizing: border-box;
            width: 100px;
            text-align: center;
            height: 100%;
            border-left: 1px solid #eeeeee;
            span {
              color: #020552;
              font-size: 16px;
            }
            .rmb {
              display: inline-block;
              font-weight: 600;
              font-size: 16px;
            }
            .ck {
              font-size: 16px;
              color: #0e78f3;
              position: relative;
              &::after {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 80%;
                background: #0e78f3;
                height: 1px;
                content: "";
              }
            }
            .chui {
              font-size: 16px;
              font-family: Source Han Sans CN-Normal, Source Han Sans CN;
              font-weight: 400;
              color: #ff480e;
            }
          }
        }
      }
    }
  }
}

.search-bar {
  display: flex;
  align-items: center;
  margin: 20px 0 30px;
  font-size: 14px;
  .search-item {
    margin-right: 18px;

    .el-input {
      width: 230px;

      ::v-deep .el-input__inner {
        height: 31px;
      }
    }

    ::v-deep .el-range-editor.el-input__inner {
      width: 250px;
      height: 31px !important;
    }

    ::v-deep .el-input__icon {
      line-height: 1;
    }
  }

  .search-btn {
    height: 32px;
    background: #ff480e;
    border: none;
    border-radius: 4px 4px 4px 4px;
  }
}

.sale-table {
  // width: 100%;
  font-weight: 500;
}
::v-deep.el-pagination {
  margin-bottom: 10px;
}

input[type="checkbox"] {
  margin-top: 12px;
  width: 18px;
  height: 18px;
  -webkit-appearance: none;
  background-color: transparent;
  border: 0;
  outline: 0 !important;
  color: #409eff;
  position: relative;
}
input[type="checkbox"]:before {
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  border: 1px solid #ddd;
  background-color: #fff;
  box-sizing: border-box;
  position: absolute;
}

input[type="checkbox"]:disabled:before {
  content: "";
  display: block;
  width: 18px;
  height: 18px;
  background-color: #409eff;
  box-sizing: border-box; // 可控制调整背景色。
  position: absolute;
}
input[type="checkbox"]:checked:after {
  content: "\2714";
  display: block;
  /*width: .15rem;*/
  /*height: .3rem;*/
  /*border-radius:  .06rem;*/
  width: 18px; // 此处是控制获取checked=true 后的颜色，请注意宽高比约1:2 。 原理是通过伪类去控制样式。
  height: 18px;
  /*border-radius:3px;*/
  box-sizing: border-box;
  position: absolute;
  top: -12px;
  left: 4px;
  color: #409eff;
  // transform: rotate(-135deg) translate(-70%, 25%);
}
</style>
