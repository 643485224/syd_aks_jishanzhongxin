<template>
  <div>
    <div class="Title" v-if="showTitle">{{ tableTitle }}</div>
    <div class="elPagination">
      <el-pagination
        v-if="showPagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>

      <slot name="tableTop"></slot>
      <!-- 做一个插槽，方便插入自定义的按钮或文字描述
      外部使用：  <template #tableTop>
                  放置内容
                 </template>-->
    </div>
    <!-- :height="height < 200 ? 200 : height"  :rowKey="rowKey" -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :height="showHeight == true ? (height < 84 ? 84 : height) : null"
      :border="border"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      v-loading="loading"
      :default-expand-all="defaultExpandAll"
      :tree-props="treeProps"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        v-if="selection"
      ></el-table-column>
      <template v-for="(item, index) in tableHeader">
        <el-table-column
          v-if="item['key'] == 'index'"
          :key="index"
          :label="item['title']"
          type="index"
          :width="item['width']"
          :align="item.align"
        ></el-table-column>
        <el-table-column
          v-else
          :key="item.key"
          :prop="item.key ? item.key : item.slot"
          :label="item.title"
          :width="item.width"
          :align="item.align"
          :fixed="item.fixed"
          :type="item.key || item.slot"
        >
          <!-- 头部 -->
          <template #header>
            <slot :name="'H' + [item.slot]">
              {{ item.title }}
            </slot>
          </template>
          <!-- 内容 -->
          <template slot-scope="scope">
            <slot :name="[item.slot]" :value="scope.row" :index="scope.$index">
              {{
                scope.row[item.slot]
                  ? scope.row[item.slot]
                  : scope.row[item.key]
              }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
export default {
  name: "cu-table",

  props: {
    tableTitle: {
      type: String,
      default: "内容列表",
    },
    // 开启关闭自动高度
    showHeight: {
      type: Boolean,
      default: true,
    },
    tableHeader: {
      type: Array,
      default: () => [
        {
          title: "用例1",
          slot: "date",
        },
        {
          title: "用例2",
          slot: "name",
        },
        {
          title: "用例3",
          key: "address",
        },
      ],
    },
    tableData: {
      type: Array,
      default: () => [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    },
    total: {
      type: Number,
      default: 0,
    },
    height: {
      type: Number,
      default: 476,
    },
    showPagination: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    selection: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    treeProps: {
      type: Object,
      default: () =>{},
    },
    // rowKey: {
    //   type: '',
    //   default: '',
    // },
  },
  methods: {
    // 表头单元格样式回调
    headerCellStyle({ row, rowIndex }) {
      return "background-color: #F3F3F3;font-family: 'Microsoft YaHei';font-style: normal;font-weight: 400;font-size: 14px;";
    },
    // 单元格样式回调
    cellStyle({ row, rowIndex }) {
      // return "text-align: center;";
    },
    // 每页条数改变回调
    handleSizeChange(val) {
      this.$emit("handleSizeChange", val);
    },
    // 页码改变回调
    handleCurrentChange(val) {
      this.$emit("handleCurrentChange", val);
    },
    // 选择数据
    handleSelectionChange(val) {
      this.$emit("handleSelectionChange", val);
    },
  },
};
</script>
<style lang="scss" scoped>
.Title {
  margin: 10px 0px;
  font-family: "Microsoft YaHei";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 26px;
  /* 文字主题色 */
  color: rgba(0, 0, 0, 0.85);
}

.elPagination {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

// 滚动条样式
::v-deep .el-table__body-wrapper::-webkit-scrollbar-track {
  background-color: #f3f3f3;
  // border-radius: 8px;
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  width: 10px; // 横向滚动条
  height: 10px; // 纵向滚动条 必写
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  border-radius: 15px;
  background-color: #60626680;
}

::v-deep .el-table {
  color: #00023a;
  border-radius: 8px;
  background-color: #fff !important;

  //去除 table 底部白线

  &::before {
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0px;
  }

  // 数据为空时 显示边框
  .el-table__empty-block {
    border: 1px solid #cbcbcb;
    border-radius: 0 0 8px 8px;
  }

  // loading 样式修改
  .el-loading-mask {
    // background: rgba(2, 26, 63, .7);
  }

  th.el-table__cell.gutter {
    // display: none;
    // background-color: transparent !important;
    background-color: #cbcbcb !important;
  }
  .cell {
    padding: 0px;
  }

  th {
    border: none;
    background-color: #cbcbcb !important;
  }

  tr {
    // background-color: transparent !important;
  }

  thead {
    font-size: 14px;
    font-weight: 500;
    color: #00023a;
    background-color: #cbcbcb !important;

    .el-table__cell {
      line-height: normal;

      &:not(:nth-last-child(2)) {
        // border-right: 1px solid #00023A;
      }

      &:last-child {
        // border-right: 1px solid #FFFFFF;
      }
    }
  }

  .el-table_row {
    height: 42px;
  }

  tbody {
    width: 100%;
    font-size: 14px;
    font-weight: 500;
    // color: #EEEEEE;
  }

  .el-table__cell {
    height: 42px;
    margin: 1px;
    padding: 0;
    text-align: center;
    // border: 1px solid #CBCBCB;
    // background-color: transparent !important;

    .cell {
      line-height: normal;
    }
  }

  // 右侧固定  可滚动时 多出来的一块
  .el-table__fixed-right-patch {
    background-color: #cbcbcb;
  }

  // 选择框
  // .el-checkbox__inner {
  //   width: 13px;
  //   height: 13px;
  //   border-color: #fff;
  //   background-color: transparent;
  // }
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar {
  // display: none;
  width: 4px; // 横向滚动条
  height: 14px; // 纵向滚动条 必写
}

::v-deep .el-table__body-wrapper::-webkit-scrollbar-thumb {
  // display: none;
  border-radius: 15px;
  background-color: #60626680;
}

// 有滚动条时，多出来的一块
::v-deep th.el-table__cell.gutter {
  // display: none;
  // background-color: transparent !important;
  background-color: #cbcbcb !important;
}

.sale-table {
  width: 100%;
  font-weight: 500;

  ::v-deep .el-table {
    background-color: transparent !important;

    .el-table__body-wrapper::-webkit-scrollbar {
      // display: none;
      // width: 4px; // 横向滚动条
      // height: 4px; // 纵向滚动条 必写
    }

    .el-table__body-wrapper::-webkit-scrollbar-thumb {
      display: none;
      // border-radius: 15px;
      // background-color: #60626680;
    }

    // 有滚动条时，多出来的一块

    th.el-table__cell.gutter {
      background: transparent !important;
    }

    th {
      background-color: #cbcbcb !important;
    }

    tr {
      background-color: transparent !important;
    }

    .el-table__expanded-cell {
      background-color: transparent !important;
    }

    thead {
      font-size: 14px;
      font-weight: 500;
      color: #00023a;
      background-color: #cbcbcb !important;

      .el-table__cell {
        height: 42px;
        text-align: center;
        padding: 0;
        line-height: normal;

        // &:not(:nth-last-child(2)) {
        //   border-right: 1px solid #00023a;
        // }

        &:last-child {
          border-right: 1px solid #ffffff;
        }
      }

      .gutter {
        display: none;
        // background-color: transparent !important;
      }
    }

    .el-table_row {
      height: 42px;
    }

    tbody {
      font-size: 14px;
      font-weight: 500;
      color: #00023a;
      background: url(./image/tableBackground.png) !important;

      .el-table__cell {
        background-color: transparent !important;
      }

      .is-hidden + .el-table__cell {
        height: 42px;
        margin: 1px;
        padding: 0;
        text-align: center;
        background-color: #ffffff !important;
        // &:not(:nth-last-child(2)) {
        //   border-right: 1px solid #00023a;
        // }

        &:last-child {
          border-right: 1px solid #ffffff;
        }
      }
      .el-table__expand-colum {

      }
      .cell {
          padding-left: 0 !important;
        }
      .el-table__expand-icon {
        height: 42px;
        font-size: 20px;
      }



    }

    // .el-table__fixed,
    // .el-table__fixed-right {
    //   box-shadow: none;
    // }
  }
}
</style>
