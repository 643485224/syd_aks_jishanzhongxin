<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="search-bar">
      <div class="search-item">
        <div class="label">美食名称:</div>
        <el-input class="selectInput" v-model="mallName" placeholder="请输入商品名称搜索">
        </el-input>
      </div>
      <div class="search-item">
        <div class="label">分类名称:</div>
        <el-cascader class="selectInput" :value="categoryName" :options="categorys" clearable filterable
          @change="handleChangeCate" :props="{ checkStrictly: true, value: 'id', label: 'name', children: 'childList' }">
        </el-cascader>
      </div>
      <div class="search-item">
        <div class="label">审核状态:</div>
        <el-select class="selectInput" placeholder="请选择审核状态" v-model="auditStatus" @change="statusChange" clearable>
          <el-option v-for="(name, value) in statusType" :key="value" :label="name" :value="+value">
          </el-option>
        </el-select>
      </div>
      <div class="search-item">
        <div class="label">是否上架:</div>
        <el-select class="selectInput" placeholder="请选择是否上架" v-model="upload" @change="statusChange" clearable>
          <el-option :label="'已上架'" :value="1"></el-option>
          <el-option :label="'未上架'" :value="0"></el-option>
        </el-select>
      </div>
      <div class="search-item operations">
        <el-button class="operation-btn btn_ff480e" type="primary" @click="search">查询</el-button>
        <el-button class="operation-btn btn_00C514" type="primary" @click="pageToEdit('add')">新增</el-button>
      </div>
    </div>
    <cu-animation :type="'slideInRight'" :time=".5">
      <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
        :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange" :total="total">
        <template slot="expand" slot-scope="value">
          <div class="expand-info">
            <div class="title">美食信息</div>
            <div class="content">
              <div class="item">
                <div class="label">审核状态:</div>
                <div class="value">{{ statusType[value.value.auditStatus] }}</div>
              </div>
              <div class="item">
                <div class="label">分类名称:</div>
                <div class="value">{{ value.value.categoryName }}</div>
              </div>
              <!-- <div class="item"><div class="label">采购价:</div><div class="value">{{value.value.mallPrice}}</div></div>
              <div class="item"><div class="label">库存:</div><div class="value">{{value.value.quantity}}</div></div> -->
              <div class="item">
                <div class="label">上架时间:</div>
                <div class="value">{{ formatDate(value.value.uploadTime, "yyyy-MM-dd") }}</div>
              </div>
            </div>
          </div>
        </template>
        <template slot="name" slot-scope="value">
          {{ value.value.name == 1 ? '基药' : '非基药' }}
        </template>
        <!-- <template slot="auditStatus" slot-scope="value">
          {{ statusType[value.value.auditStatus] }}
        </template> -->
        <template slot="upload" slot-scope="value">
          {{ uploadTypes[value.value.upload] }}
        </template>
        <!-- <template slot="uploadTime" slot-scope="value">
          {{ formatDate(value.value.uploadTime, "yyyy-MM-dd") }}
        </template> -->
        <template slot="operate" slot-scope="value">
          <el-button type="text" class="c_ff480e" v-if="value.value.auditStatus == 1"
            @click="operation('apply', value.value.id)">申报</el-button>
          <el-button type="text" class="c_ff480e" v-if="value.value.auditStatus == 2"
            @click="operation('withdraw', value.value.id)">撤回</el-button>
          <el-button type="text" class="c_ff480e" v-if="value.value.auditStatus == 3 && value.value.upload == 0"
            @click="operation('put', value.value.id)">上架</el-button>
          <el-button type="text" class="c_ff480e" v-if="value.value.auditStatus == 3 && value.value.upload == 1"
            @click="operation('down', value.value.id)">下架</el-button>
          <el-button type="text" @click="pageToEdit('detail', value.value.id)">详情</el-button>
          <el-button type="text" @click="pageToEdit('edit', value.value.id)">编辑</el-button>
        </template>
      </cu-table>
    </cu-animation>

  </div>
</template>
<script>

import { getDeliciousGoodsList, getFyyFoodsMallClassificationList, declareDeliciousGoods, withdrawDelicious, onShelfDelicious, offShelfDelicious, drugListExportXls } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { downloadXls } from "@/utils/exportXls.js";
import dayjs from 'dayjs';
import { mapState } from "vuex";


export default {
  name: 'supplierProductManage',
  data() {
    return {
      sysId: null,
      sysType: null,// 系统类型@ 1 运营平台  2  采购商  3  供应商
      categoryName: '',
      mallName: '',
      auditStatus: '',
      upload: '',
      date: [],
      statusType: {// 审核状态@  1 待申报 2  待审核  3  审核通过   4  审核不通过
        1: "待申报",
        2: "待审核",
        3: "审核通过",
        4: "审核不通过",
      },
      uploadTypes: {
        0: '已下架',
        1: '已上架'
      },
      tableHeader: [
        {
          slot: "expand",
          align: "center",
        },
        {
          title: "商品编号",
          key: "id",
        },
        {
          title: "名称",
          key: "mallName",
          width: 120,
        },

        {
          title: "单位",
          key: "unit",
        },
        {
          title: "价格",
          key: "price",
        },
        // {
        //   title: "分类名称",
        //   key: "categoryName",
        // },
        // {
        //   title: "审核状态",// 审核状态@ 1  待审核  2  审核通过   3  审核不通过
        //   slot: "auditStatus",
        // },
        {
          title: "是否上架",
          slot: "upload",
          width: 120,
        },
        // {
        //   title: "上架时间",
        //   slot: "uploadTime",
        //   width: 120,
        // },
        {
          title: "操作",
          slot: "operate",
          width: 140,
          fixed: 'right'
        },
      ],
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      pageCount: 1,
      total: 1,
      tableLoading: false,
      tableHeight: 0,
      categorys: [],// 美食分类
    }
  },
  created() {
    console.log(this.vuex_user);
    let { sysId, sysType } = this.vuex_user;
    this.sysId = sysId;
    this.sysType = sysType;
    this.getDeliciousGoodsList();
    this.getMallClassificationList()
  },
  mounted() {
    // 一般渲染过慢导致无法算出高度问题，加定时器
    setTimeout(() => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    }, 800);
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };
  },
  computed: {
    ...mapState(['vuex_user'])
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
    },
    pickDate(val) {
      console.log(val);
    },
    formatDate(time, format) {
      return time ? new Date(time).Format(format) : "";
    },
    search() {
      this.getDeliciousGoodsList();
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getDeliciousGoodsList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.getDeliciousGoodsList();
    },
    statusChange(event) {
      console.log(event)
    },
    getDeliciousGoodsList() {
      this.tableLoading = true;
      if (this.date && this.date.length) {
        this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
      } else {
        this.date = []
      }
      let params = {
        auditStatus: this.auditStatus,
        categoryName: this.categoryName,
        mallName: this.mallName,
        upload: this.upload,
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
      };
      console.log(params);
      this.tableData = [];
      getDeliciousGoodsList(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          let data = res.data;
          this.tableData = data.records;
          this.total = data.total;
          this.tableLoading = false;
          console.log(this.tableData);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    getMallClassificationList() {
      getFyyFoodsMallClassificationList().then(res => {
        console.log(res);
        if (res.code == 200) {
          let data = res.data;
          const deep = (data) => {
            return data.map(item => {
              if (item.childList && item.childList.length) {
                return deep(item.childList)
              } else {
                item.childList = undefined
                return item;
              }
            })
          }
          this.categorys = deep(data);
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    pageToEdit(type, sgId) {
      switch (type) {
        case 'detail':
          return this.$router.push({ name: 'supplierFoodDetail', params: { type: 'detail', sgId } });
        case 'edit':
          return this.$router.push({ name: 'supplierFoodEdit', params: { sgId } });
        default:
          this.$router.push({ name: 'supplierFoodAdd' })
          break;
      }


    },
    operation(type, id) {
      console.log(id);
      let types = {
        'apply': '申报',
        'withdraw': '撤回',
        'put': '上架',
        'down': '下架'
      }
      let func = null;

      this.$confirm(`确认${types[type]}该商品? `, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        switch (type) {
          case 'apply':
            func = declareDeliciousGoods({ id });
            break;
          case 'withdraw':
            func = withdrawDelicious({ id });
            break;
          case 'put':
            func = onShelfDelicious({ id });
            break;
          case 'down':
            func = offShelfDelicious({ id });
            break;
          default:
            break;
        }
        func.then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("操作成功")
            this.getDeliciousGoodsList()
          }
        }).catch((err) => {
          console.log(err);
        });


      }).catch((err) => {
        console.log(err);
      });

    },
    // 选择商城分类
    handleChangeCate(row) {
      console.log(row);
      if (row) {
        this.categoryName = row[row.length - 1]
      }
      console.log(this.categoryName);
    },
    exportXls() {
      if (this.date && this.date.length) {
        this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
      } else {
        this.date = []
      }
      let params = {
        currPageNo: 1,
        pageSize: 10000,
        goodsName: this.goodsName,
        auditStatus: this.auditStatus,
        itemNo: this.itemNo,
        jx: this.jx,
        commonName: this.commonName,
        specification: this.specification,
        beginMonth: this.date[0],
        endMonth: this.date[1]
      };
      console.log(params);
      drugListExportXls(params).then(res => {
        console.log(res, res.headers);
        if (res.status == 200) {
          this.$message.success("获取数据成功，等待导出...")
          // var value = new FormData()
          if (!res.data) {
            this.$message.warning("文件下载失败")
          }
          console.log(res);
          downloadXls(res.headers, res.data)
        } else {
          this.$message.error(res.message)
        }

      }).catch(err => {
        console.log(err);
      })
    },
    toBatchAdd() {
      this.$router.push({ name: 'supplierInstrumentBatchAdd', params: { ypqxType: 1 } })
    }
  },
}
</script>
<style lang="scss" src="./supplierFoodManage.scss" scoped>

</style>
