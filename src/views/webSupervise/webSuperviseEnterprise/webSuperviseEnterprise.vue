<template>
  <div class="equipment">
    <img src="../img/bj.png" class="imgs" />
    <navigation index="2" class="top70"></navigation>
    <div class="equipment-item">
      <div class="item">
        <el-select
          clearable
          placeholder="请选择查询类型"
          v-model="elSelectValue"
          @change="selectClick"
          @visible-change="visibleChange"
        >
          <el-option
            v-for="item in superviseApparatusManageSelectReturn"
            :key="item.index"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
        <el-input
          class="inputPUt"
          v-model="elInputValue"
          placeholder="药品名称/医保编号"
        ></el-input>
        <div class="but" @click="searchFunction">
          <img src="../img/Slice13.png" alt="" />
        </div>
      </div>
    </div>
    <div
      v-show="!ifTrueFalse"
      class="seach"
      v-loading="typeLoading"
      element-loading-text="数据加载中..."
      element-loading-spinner="el-icon-loading"
    >
      <ul>
        <li
          v-for="(item, index) in superviseApparatusManageSelectReturn"
          :key="index"
          :class="elSelectValue == item.id ? 'selectAction' : null"
          @click="selectClick(item.id)"
        >
          <i class="el-icon-minus"></i> <i class="el-icon-download"></i>
          <p>{{ item.name }}</p>
        </li>
      </ul>
    </div>
    <RegulatorySearch
      v-loading="listLoading"
      element-loading-text="数据加载中..."
      element-loading-spinner="el-icon-loading"
      v-show="ifTrueFalse"
      :spType="2"
      :list="superviseApparatusManageSelectApparatusListReturn"
      :elSelectValue="elSelectValue"
      :elInputValue="elInputValue"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
      :total="total"
    ></RegulatorySearch>

    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import {
  superviseApparatusManageSelect,
  superviseApparatusManageSelectApparatusList,
} from "@/api/aksApi/platformApi/supervise.js";
import Navigation from "../components/navigation.vue";
import RegulatorySearch from "../components/regulatorySearch.vue";
export default {
  components: {
    Navigation,
    RegulatorySearch,
  },
  data() {
    return {
      elSelectValue: "",
      ifTrueFalse: false,
      elInputValue: "",
      superviseApparatusManageSelectReturn: [], // 获取药械分类-接口回参
      superviseApparatusManageSelectApparatusListReturn: [], // 获取药械列表-接口回参
      currPageNo: 1,
      pageSize: 10,
      total: 0,
      typeLoading: false,
      listLoading: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.superviseApparatusManageSelectApi(); // 获取药械分类-接口
    });
  },
  methods: {
    // 获取药械分类-接口
    superviseApparatusManageSelectApi() {
      this.typeLoading = true;
      superviseApparatusManageSelect()
        .then((res) => {
          this.typeLoading = false;
          if (res.code == 200) {
            res.data.forEach((element) => {
              element.id = element.id + "";
            });
            this.superviseApparatusManageSelectReturn = res.data; // 获取药械分类-接口回参
            let object = {
              id: "-1",
              name: "全部",
            };
            this.superviseApparatusManageSelectReturn.unshift(object);
            if (
              this.$route.query.elSelectValue ||
              this.$route.query.elInputValue
            ) {
              this.ifTrueFalse = true;
              this.elSelectValue = this.$route.query.elSelectValue;
              this.elInputValue = this.$route.query.elInputValue;
              this.superviseApparatusManageSelectApparatusListApi(); // 获取药械列表-接口
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.typeLoading = false;
          console.log(err);
        });
    },
    // 获取药械列表-接口
    superviseApparatusManageSelectApparatusListApi() {
      let elSelectValue = this.elSelectValue;
      if (this.elSelectValue == "-1") {
        elSelectValue = "";
      }
      this.listLoading = true;
      let valueData = {
        currPageNo: this.currPageNo,
        id: elSelectValue,
        keyword: this.elInputValue,
        pageSize: this.pageSize,
      };
      superviseApparatusManageSelectApparatusList(valueData)
        .then((res) => {
          this.listLoading = false;
          if (res.code == 200) {
            this.superviseApparatusManageSelectApparatusListReturn =
              res.data.records; // 获取药械列表-接口回参
            this.total = res.data.total;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.listLoading = false;
          console.log(err);
        });
    },
    // 每页条数改变回调
    handleSizeChange(val) {
      this.currPageNo = 1;
      this.pageSize = val;
      this.superviseApparatusManageSelectApparatusListApi();
    },
    // 页码改变回调
    handleCurrentChange(val) {
      this.currPageNo = val;
      this.superviseApparatusManageSelectApparatusListApi();
    },
    selectClick(value) {
      if (value) {
        this.elSelectValue = value;
        this.superviseApparatusManageSelectApparatusListReturn = [];
        this.ifTrueFalse = true;
        this.superviseApparatusManageSelectApparatusListApi(); // 获取药械列表-接口
      } else {
        this.ifTrueFalse = false;
      }
    },
    searchFunction() {
      this.superviseApparatusManageSelectApparatusListReturn = [];
      this.ifTrueFalse = true;
      this.superviseApparatusManageSelectApparatusListApi(); // 获取药械列表-接口
    },
    visibleChange(value) {
      if (value) {
        // this.ifTrueFalse = false;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.equipment {
  height: calc(100vh - 66px);
  overflow: auto;
  width: 100%;
  padding-top: 70px;
  position: relative;
  .imgs {
    padding-top: 150px;
    position: fixed;
    left: 0;
    top: 96px;
    width: 100%;
    z-index: -1;
    background: #04b440;
    // 04b440
  }
  .top70 {
    margin-bottom: 70px;
  }
  .equipment-item {
    width: 1200px;
    margin: 0 auto 38px;

    .item {
      width: 100%;
      padding: 0 64px 0 70px;
      box-sizing: border-box;
      display: flex;
      ::v-deep .el-input__inner {
        border: 1px solid #ff480e;
        line-height: 50px;
        height: 50px;
      }
      .inputPUt {
        width: 720px;
      }
      ::v-deep .inputPUt .el-input__inner {
        margin-left: 20px;
        width: 700px;
        border-radius: 5px 0 0 5px;
      }
      .but {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70px;
        height: 50px;
        background: #ff480e;
        border-radius: 0px 4px 4px 0px;
        .img {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
  .seach {
    width: 1200px;
    margin: 0 auto;
    background: #ffffff;
    min-height: 388px;
    padding: 45px 55px;
    box-sizing: border-box;
    margin-bottom: 35px;
    box-shadow: 0px 8px 4px 0px rgba(0, 0, 0, 0.15);
    ul {
      width: 100%;
      display: flex;
      list-style: none;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: calc(100% / 3);
        display: flex;
        line-height: 40px;
        align-items: center;
        cursor: pointer;
        span {
          width: 2px;
          height: 18px;
          background: #020552;
        }
        i {
          transform: rotate(180deg);
          font-size: 22px;
          color: #020552;
          margin-right: 5px;
          &:nth-child(1) {
            display: block;
            transform: rotate(90deg);
            font-size: 22px;
            width: 22px;
            height: 100%;
            align-self: center;
          }
        }
        p {
          font-size: 20px;
          font-family: Source Han Sans CN-Normal, Source Han Sans CN;
          font-weight: 400;
          color: #020552;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }
      }
      li:hover {
        span {
          background: #0e78f3;
        }
        i,
        p {
          color: #0e78f3;
        }
      }
    }
  }
}

.selectAction {
  span {
    background: #0e78f3 !important;
  }
  i,
  p {
    color: #0e78f3 !important;
  }
}
</style>
