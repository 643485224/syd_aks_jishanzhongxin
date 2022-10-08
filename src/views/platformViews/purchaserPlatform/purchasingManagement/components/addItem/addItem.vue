<template>
  <!-- 添加商品公共组件 -->
  <cu-dialog
    width="90vw"
    top="8vh"
    title="添加商品"
    :showClose="true"
    :visible="addItemVisible"
    @handleClose="addItemHandleClose()"
    @handleOk="addItemHandleOk()"
  >
    <div class="addItem">
      <div class="search_box mt_20">
        <div class="search_item mr_20 mb_20">
          <span class="mr_10">名称/厂家:</span>
          <el-input
            class="el_input"
            v-model="addItem.keyword"
            placeholder="请输入名称/厂家"
          >
          </el-input>
        </div>

        <div class="search_item mr_20 mb_20">
          <span class="mr_10">类别:</span>
          <el-select
            class="el_select"
            :disabled="ifDisabled"
            v-model="addItem.type"
            placeholder="请选择"
            @change="addItemTypeChange"
          >
            <el-option label="药品" :value="1"></el-option>
            <el-option label="药械" :value="2"></el-option>
          </el-select>
        </div>
        <el-button
          class="btn_ff480e mb_20"
          type="primary"
          @click="cartAddGoodsApi()"
          >查询</el-button
        >
      </div>
      <div>
        <cu-table
          class="sale-table"
          :selection="true"
          :showTitle="false"
          :height="468"
          :loading="tableLoading"
          :tableHeader="addItemtableHeader"
          :tableData="addItemtableData"
          :total="addItempages.total"
          @handleSizeChange="addItemhandleSizeChange"
          @handleCurrentChange="addItemhandleCurrentChange"
          @handleSelectionChange="addItemhandleSelectionChange"
        >
          <template #goodsName="value">
            {{ value.value.goodsName }}
            {{ value.value.productName }}
          </template>
          <template #quantity="value">
            <el-input-number
              v-if="elInputNumberShow"
              :controls="true"
              v-model="value.value.quantity"
              :min="1"
              :precision="0"
              @change="
                quantityChange(
                  value.value.squantity,
                  value.value.quantity,
                  value.index
                )
              "
            ></el-input-number>
          </template>
        </cu-table>
      </div>
    </div>
    <template slot="footer">
      <div class="flex">
        <el-button
          class="mr_20"
          style="height: 32px"
          type="default"
          @click="addItemHandleClose()"
          >取消</el-button
        >
        <el-button
          class="btn_ff480e"
          type="primary"
          :disabled="addItemhandleSelection.length == 0"
          @click="addItemHandleOk()"
          >已选择{{ addItemhandleSelection.length }}件商品，确认添加</el-button
        >
      </div>
    </template>
  </cu-dialog>
</template>
<script>
import { cartAddGoods } from "@/api/aksApi/platformApi/purchaserPlatformApi.js";

export default {
  name: "addItem",
  props: {
    addItemVisible: {
      type: Boolean,
      default: false,
    },
    ifDisabled: {
      type: Boolean,
      default: false,
    },
    typeSelcet: {
      //外部传入值，默认一进来查类别:1药品，2药械
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      addItemtableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "通用名",
          slot: "commonName",
        },
        {
          title: "商品名称",
          slot: "goodsName",
        },
        {
          title: "规格",
          key: "specification",
        },
        {
          title: "批准文号",
          key: "approvalNumber",
        },
        {
          title: "供应商名称",
          key: "supplierName",
        },
        {
          title: "生产企业",
          key: "manufacturer",
        },
        {
          title: "采购价",
          key: "buyPrice",
        },
        {
          title: "剩余库存",
          key: "squantity",
        },
        {
          title: "数量",
          slot: "quantity", //  1  待响应  2  待发货  3  待收货  4  已收货  5  待付款  6  已完成（待评价）  7  已取消 8 已拒绝   9 已评价
          width: "180",
        },
      ], // 添加商品弹框-表格表头
      addItemtableData: [], // 添加商品弹框-表格内容
      // 添加商品弹框分页
      addItempages: {
        total: 0,
        current: 1,
        size: 10,
      },
      addItem: {
        keyword: "",
        type: null,
      },
      tableLoading: false,
      addItemhandleSelection: [],

      elInputNumberShow: true, //重新渲染数字输入框使用
    };
  },
  mounted() {
    this.addItem.type = this.typeSelcet;
    this.cartAddGoodsApi();
  },
  methods: {
    // 查询采购单商品-接口
    cartAddGoodsApi() {
      this.tableLoading = true;
      let valueData = {
        currPageNo: this.addItempages.current,
        keyword: this.addItem.keyword,
        pageSize: this.addItempages.size,
        goodsType: this.addItem.type,
      };
      cartAddGoods(valueData)
        .then((res) => {
          this.tableLoading = false;
          if (res.code == 200) {
            this.addItemtableData = res.data.list;
            this.addItemtableData.forEach((element) => {
              element.goodsType = this.addItem.type;
              element.quantity = 1;
            });
            this.addItempages.total = res.data.totalCount;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 添加商品弹框-取消按钮
    addItemHandleClose() {
      this.$emit("addItemHandleClose", this.addItem.type);
      this.cartAddGoodsApi();
    },
    // 添加商品弹框-确定按钮
    addItemHandleOk() {
      let isTrueFalse = false;
      this.addItemhandleSelection.forEach((element) => {
        if (element.squantity == 0) {
          isTrueFalse = true;
        }
      });
      if (isTrueFalse) {
        this.$message.error(
          "选中的商品存在剩余库存为0的情况，请先取消该项选择"
        );
        return;
      }
      this.$emit(
        "addItemHandleOk",
        this.addItemhandleSelection,
        this.addItem.type
      );
      this.cartAddGoodsApi();
    },
    // 添加商品弹框-表选择
    addItemhandleSelectionChange(value) {
      this.addItemhandleSelection = value;
    },
    addItemhandleSizeChange(value) {
      this.addItempages.current = 1;
      this.addItempages.size = value;
      this.addItemhandleSelection = []; //重置
      this.cartAddGoodsApi();
    },
    addItemhandleCurrentChange(value) {
      this.addItempages.current = value;
      this.addItemhandleSelection = []; //重置
      this.cartAddGoodsApi();
    },
    addItemTypeChange() {
      this.addItempages.current = 1;
      this.addItemhandleSelection = []; //重置
      this.cartAddGoodsApi();
    },
    quantityChange(squantity, quantity, index) {
      if (!squantity) {
        this.elInputNumberShow = false;
        this.$message.error("剩余库存不足，请重新输入！", squantity);
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          this.elInputNumberShow = true;
          this.addItemtableData[index].quantity = 1;
        });
      } else {
        if (quantity > squantity) {
          this.elInputNumberShow = false;
          this.$message.error("剩余库存不足，请重新输入！", squantity);
          //赋值太快导致渲染不及时，加入定时器解决
          this.$nextTick(() => {
            this.elInputNumberShow = true;
            this.addItemtableData[index].quantity = 1;
          });
        } else {
        }
      }
      if (
        quantity == null ||
        quantity == undefined ||
        quantity == 0 ||
        quantity == ""
      ) {
        //赋值太快导致渲染不及时，加入定时器解决
        this.$nextTick(() => {
          this.elInputNumberShow = true;
          this.addItemtableData[index].quantity = 1;
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// 搜索功能
.search_box {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;

  .search_item {
    display: flex;
    align-items: center;

    .el_input {
      width: 200px;
      height: 32px;

      ::v-deep .el-input__inner {
        height: 32px;
      }
    }

    ::v-deep .el_date_picker.el-input__inner {
      width: 250px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    ::v-deep .el-input__icon {
      line-height: 24px;
    }

    ::v-deep .el-range-separator {
      line-height: 24px;
    }

    .el_select {
      width: 200px;

      ::v-deep .el-input__inner {
        height: 32px;
      }
    }
  }
}
// 添加商品弹框
.addItem {
  height: 68vh;
  width: 100%;
  overflow: auto;
}
</style>
