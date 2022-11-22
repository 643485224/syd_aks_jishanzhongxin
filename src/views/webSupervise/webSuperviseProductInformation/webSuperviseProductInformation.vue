<template>
  <div class="seach" ref="contentBox">
    <div class="seach1">
      <div class="seach-item">
        当前位置:
        <span @click="routeJump1()"> 首页 </span>
        ><span @click="routeJump2()">
          {{ types[$route.query.spType] }}
        </span>
        ><span>相关订单</span>
      </div>
      <div class="seach-count">
        <div class="search-bar">
          <div class="search-item">
            订单编号:
            <el-input
              v-model="queryObject.orderNo"
              class="selectInput"
              placeholder="请输入订单编号"
            >
            </el-input>
          </div>
          <div class="search-item">
            交易时间:
            <el-date-picker
              class="el_date_picker"
              v-model="queryObject.pickDate"
              @change="pickDateChange"
              format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="交易开始日期"
              end-placeholder="交易结束日期"
            >
            </el-date-picker>
          </div>
          <el-button
            class="operation-btn bgGreen"
            type="primary"
            @click="queryObjectClick"
            >查询</el-button
          >
        </div>
        <cu-animation :type="'slideInRight'" :time="0.5">
          <cu-table
            class="sale-table"
            :loading="tableLoading"
            :showTitle="false"
            :tableHeader="tableHeader"
            :tableData="tableData"
            @handleSizeChange="handleSizeChange"
            @handleCurrentChange="handleCurrentChange"
            :total="queryObject.total"
          >
            <template slot="expand" slot-scope="value">
              <div class="expand-info">
                <div class="title">订单信息</div>
                <div class="content">
                  <div class="item">
                    <div class="label">订单编号:</div>
                    <div class="value">{{ value.value.orderNo }}</div>
                  </div>
                  <div class="item">
                    <div class="label">客户名称:</div>
                    <div class="value">{{ value.value.buyerName }}</div>
                  </div>

                  <div class="item">
                    <div class="label">收货人:</div>
                    <div class="value">{{ value.value.consignee }}</div>
                  </div>

                  <div class="item">
                    <div class="label">收件地址:</div>
                    <div class="value">{{ value.value.consigneeAddress }}</div>
                  </div>
                  <div class="item">
                    <div class="label">数量:</div>
                    <div class="value">{{ value.value.quantity }}</div>
                  </div>
                  <div class="item">
                    <div class="label">收货人手机号:</div>
                    <div class="value">{{ value.value.consigneePhone }}</div>
                  </div>
                  <div class="item">
                    <div class="label">供应商名称:</div>
                    <div class="value">{{ value.value.supplierName }}</div>
                  </div>
                  <div class="item">
                    <div class="label">收货时间:</div>
                    <div class="value">{{ value.value.receiveGoodsTime }}</div>
                  </div>
                </div>
              </div>
            </template>
            <template slot="operate" slot-scope="value">
              <el-button
                type="text"
                class="green"
                @click="routeJump3(value.value)"
                >详情</el-button
              >
              <el-button
                type="text"
                class="orange"
                @click="routeJump4(value.value)"
                >物流</el-button
              >
            </template>
          </cu-table>
        </cu-animation>
      </div>
    </div>
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import {
  superviseDrugManageSelectOrderByDrug,
  superviseApparatusManageSelectOrderByApparatus,
} from "@/api/aksApi/platformApi/supervise.js";
export default {
  data() {
    return {
      types: {
        1: "药品搜索",
        2: "药械搜索",
        3: "企业监管",
      },

      tableLoading: false,
      tableHeader: [
        {
          slot: "expand",
          align: "center",
        },
        {
          title: "订单编号",
          key: "orderNo",
        },
        {
          title: "商品名称",
          key: "goodsName",
        },
        {
          title: "交易时间",
          key: "orderTime",
        },
        {
          title: "收货时间",
          key: "receiveGoodsTime",
        },
        {
          title: "客户名称",
          key: "buyerName",
        },
        {
          title: "收货人",
          key: "consignee",
        },
        {
          title: "操作",
          slot: "operate",
          fixed: "right",
        },
      ],
      tableData: [],
      queryObject: {
        orderNo: null, //订单名称
        beginDate: null, //开始时间
        endDate: null, //结束时间
        total: 1, //总条数
        currPageNo: 1, //页码
        pageSize: 10, //页大小
        pickDate: [], //时间
      },
    };
  },
  mounted() {
    if (this.$route.query.spType == 1) {
      this.superviseDrugManageSelectOrderByDrugApi(); // 查询药品关联订单-接口
    } else if (this.$route.query.spType == 2) {
      this.superviseApparatusManageSelectOrderByApparatusApi(); // 查询药械关联订单-接口
    }
  },

  methods: {
    // 查询药品关联订单-接口
    superviseDrugManageSelectOrderByDrugApi() {
      this.tableLoading = true;
      let valueData = {
        goodsId: this.$route.query.goodsId,
        beginDate: this.queryObject.beginDate,
        endDate: this.queryObject.endDate,
        currPageNo: this.queryObject.currPageNo,
        orderNo: this.queryObject.orderNo,
        pageSize: this.queryObject.pageSize,
      };
      superviseDrugManageSelectOrderByDrug(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.tableData = res.data.records;
            this.queryObject.total = res.data.total;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 查询药械关联订单-接口
    superviseApparatusManageSelectOrderByApparatusApi() {
      this.tableLoading = true;
      let valueData = {
        goodsId: this.$route.query.goodsId,
        beginDate: this.queryObject.beginDate,
        endDate: this.queryObject.endDate,
        currPageNo: this.queryObject.currPageNo,
        orderNo: this.queryObject.orderNo,
        pageSize: this.queryObject.pageSize,
      };
      superviseApparatusManageSelectOrderByApparatus(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.tableData = res.data.records;
            this.queryObject.total = res.data.total;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },

    // 跳转回首页
    // spType:1药品首页 2药械首页 3企业首页
    routeJump1() {
      if (this.$route.query.spType == 1) {
        //药品
        this.$router.push({
          name: "webSuperviseDrugs",
        });
      } else if (this.$route.query.spType == 2) {
        //药械
        this.$router.push({
          name: "webSuperviseEnterprise",
        });
      } else if (this.$route.query.spType == 3) {
        //企业
        this.$router.push({
          name: "webSuperviseMedicalEquipment",
        });
      }
    },
    // 跳转回搜索页
    // spType:1药品搜索页 2药械搜索页 3企业搜索页
    routeJump2() {
      if (this.$route.query.spType == 1) {
        this.$router.push({
          name: "webSuperviseDrugs",
          query: {
            spType: this.$route.query.spType, //spType 1药品 2医疗器械 3监管},
            elSelectValue: this.$route.query.elSelectValue,
            elInputValue: this.$route.query.elInputValue,
          },
        });
      } else if (this.$route.query.spType == 2) {
        this.$router.push({
          name: "webSuperviseEnterprise",
          query: {
            spType: this.$route.query.spType, //spType 1药品 2医疗器械 3监管},
            elSelectValue: this.$route.query.elSelectValue,
            elInputValue: this.$route.query.elInputValue,
          },
        });
      } else if (this.$route.query.spType == 3) {
        //企业
        this.$router.push({
          name: "webSuperviseMedicalEquipment",
        });
      }
    },
    // 跳转去详情页
    routeJump3(tableItemData) {
      this.$router.push({
        name: "webSuperviseProductInformationDetails",
        query: {
          goodsId: this.$route.query.goodsId,
          spType: this.$route.query.spType, //spType 1药品 2医疗器械 3监管},
          elSelectValue: this.$route.query.elSelectValue,
          elInputValue: this.$route.query.elInputValue,
          tableItemData: JSON.stringify(tableItemData),
        },
      });
    },
    // 跳转去物流页
    routeJump4(tableItemData) {
      this.$router.push({
        name: "webSuperviseProductInformationLogistics",
        query: {
          goodsId: this.$route.query.goodsId,
          spType: this.$route.query.spType, //spType 1药品 2医疗器械 3监管},
          elSelectValue: this.$route.query.elSelectValue,
          elInputValue: this.$route.query.elInputValue,
          tableItemData: JSON.stringify(tableItemData),
        },
      });
    },
    // 时间改变回调
    pickDateChange() {
      if (this.queryObject.pickDate) {
        //开始时间
        this.queryObject.beginDate = new Date(
          this.queryObject.pickDate[0]
        ).Format("yyyy-MM-dd");
        //结束时间
        this.queryObject.endDate = new Date(
          this.queryObject.pickDate[1]
        ).Format("yyyy-MM-dd");
      } else {
        this.queryObject.beginDate = "";
        this.queryObject.endDate = "";
      }
    },
    handleHeight() {
      this.$nextTick(() => {
        this.tableHeight =
          this.$refs.contentBox.offsetHeight - 40 - 46 - 62 - 42 - 170;
      });
    },
    // 页大小改变回调
    handleSizeChange(val) {
      this.queryObject.pageSize = val;
      if (this.$route.query.spType == 1) {
        this.superviseDrugManageSelectOrderByDrugApi(); // 查询药品关联订单-接口
      } else if (this.$route.query.spType == 2) {
        this.superviseApparatusManageSelectOrderByApparatusApi(); // 查询药械关联订单-接口
      }
    },
    // 页码改变回调
    handleCurrentChange(val) {
      this.queryObject.currPageNo = val;
      if (this.$route.query.spType == 1) {
        this.superviseDrugManageSelectOrderByDrugApi(); // 查询药品关联订单-接口
      } else if (this.$route.query.spType == 2) {
        this.superviseApparatusManageSelectOrderByApparatusApi(); // 查询药械关联订单-接口
      }
    },
    // 查询按钮
    queryObjectClick() {
      this.queryObject.currPageNo = 1;
      if (this.$route.query.spType == 1) {
        this.superviseDrugManageSelectOrderByDrugApi(); // 查询药品关联订单-接口
      } else if (this.$route.query.spType == 2) {
        this.superviseApparatusManageSelectOrderByApparatusApi(); // 查询药械关联订单-接口
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.seach {
  width: 100%;
  height: calc(100vh - 66px);
  overflow: auto;
  background: #f4f4f4;
}

.seach1 {
  margin: 0 auto;
  width: 1200px;
  background: #ffffff;
  margin-bottom: 52px;
  .seach-item {
    height: 40px;
    line-height: 40px;
    background: #f4f4f4;
    width: 100%;
    font-size: 16px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #020552;
    span {
      cursor: pointer;

      &:nth-child(3) {
        font-size: 18px;
        font-weight: bold;
      }
    }
  }
  .seach-count {
    width: 100%;
    padding: 40px 40px;
    box-sizing: border-box;
    .search-bar {
      color: #020552;
      display: flex;
      align-items: flex-end;
      margin: 0px 0 30px;
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
        background: #ff480e;
      }
    }
    //扩展信息
    .expand-info {
      padding: 20px;
      .title {
        margin-bottom: 20px;
        text-align: left;
        font-size: 20px;
        font-weight: bold;
      }
      .content {
        display: flex;
        flex-wrap: wrap;

        .item {
          display: flex;
          width: 50%;
          font-size: 16px;
          margin: 4px 0;
          .label {
            color: #999999;
          }
          .value {
            margin-left: 5px;
          }
        }
      }
    }
  }
}
</style>
