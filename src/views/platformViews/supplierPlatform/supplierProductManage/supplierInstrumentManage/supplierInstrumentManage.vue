<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="search-bar">
      <div class="search-item">
        <div class="label">药械名称:</div>
        <el-input class="selectInput" v-model="productName" placeholder="请输入药械名称搜索">
        </el-input>
      </div>
      <!-- <div class="search-item">
          <div class="label">耗材材质:</div>
          <el-input class="selectInput" v-model="material" placeholder="请输入耗材材质搜索">
          </el-input>
        </div> -->
      <div class="search-item">
        <div class="label">规格:</div>
        <el-input class="selectInput" v-model="specification" placeholder="请输入规格搜索">
        </el-input>
      </div>
      <!-- <div class="search-item">
          <div class="label">货号:</div>
          <el-input class="selectInput" v-model="itemNo" placeholder="请输入货号搜索">
          </el-input>
        </div> -->
      <div class="search-item">
        <div class="label">状态:</div>
        <el-select class="selectInput" placeholder="请选择商品状态" v-model="auditStatus" @change="statusChange" clearable>
          <el-option v-for="(name, value) in statusType" :key="value" :label="name" :value="value">
          </el-option>
        </el-select>
      </div>
      <div class="search-item ">
        <div class="label">上架时间:</div>
        <!--   :default-time="['00:00:00', '23:59:59']" format="yyyy-MM-dd HH:mm:ss" -->
        <el-date-picker v-model="date" @change="pickDate" format="yyyy-MM-dd" type="daterange" range-separator="-"
          start-placeholder="开始时间" end-placeholder="结束时间">
        </el-date-picker>
      </div>
      <div class="search-item operations">
        <el-button class="operation-btn bgGreen" type="primary" @click="toBatchAdd">批量新增商品</el-button>
        <el-button class="operation-btn bgGreen" type="primary" @click="pageToEdit('add')">新增</el-button>
        <el-button class="operation-btn bgOrange" type="primary" @click="search">查询</el-button>
        <el-button class="operation-btn bgBlue" type="primary" @click="exportXls">导出</el-button>
      </div>
    </div>
    <cu-animation :type="'slideInRight'" :time=".5">
      <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
        :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange" :total="total">
        <template slot="expand" slot-scope="value">
          <div class="expand-info">
            <div class="title">药械信息</div>
            <div class="content">
              <div class="item"><div class="label">状态:</div><div class="value">{{statusType[value.value.auditStatus]}}</div></div>
              <div class="item"><div class="label">生产企业:</div><div class="value">{{value.value.manufacturer}}</div></div>
              <div class="item"><div class="label">采购价:</div><div class="value">{{value.value.mallPrice}}</div></div>
              <div class="item"><div class="label">库存:</div><div class="value">{{value.value.quantity}}</div></div>
              <div class="item"><div class="label">上架时间:</div><div class="value">{{formatDate(value.value.uploadTime, "yyyy-MM-dd") }}</div></div>


            </div>
          </div>
        </template>
        <!-- <template slot="auditStatus" slot-scope="value">
          {{ statusType[value.value.auditStatus] }}
        </template> -->
        <template slot="upload" slot-scope="value">
          {{ uploadTypes[value.value.upload]}}
        </template>
        <!-- <template slot="uploadTime" slot-scope="value">
          {{ formatDate(value.value.uploadTime, "yyyy-MM-dd") }}
        </template> -->

        <template slot="operate" slot-scope="value">
          <el-button type="text" class="warning-btn" v-if="value.value.auditStatus == 1"
            @click="operation('apply', value.value.sgId)">申报</el-button>
          <el-button type="text" class="warning-btn" v-if="value.value.auditStatus == 2"
            @click="operation('withdraw', value.value.sgId)">撤回</el-button>
          <el-button type="text" class="warning-btn" v-if="value.value.auditStatus == 3 && value.value.upload == 0"
            @click="operation('put', value.value.sgId)">上架</el-button>
          <el-button type="text" class="warning-btn" v-if="value.value.auditStatus == 3 && value.value.upload == 1"
            @click="operation('down', value.value.sgId)">下架</el-button>
          <el-button type="text" @click="pageToEdit('edit',value.value.sgId)">编辑</el-button>
        </template>
      </cu-table>
    </cu-animation>
    <cu-dialog :title="(formType === 'add' ? '新增' : '修改') + '角色'" width="50vw" :visible="formVisible" :showClose="true"
      @handleClose="formClose">
      <!-- :destroyOnClose="true" @menuListInitData="menuListInitData"-->
      <cu-form ref="form" :formData.sync="role" :formRule="formRule" class="form" @submitForm="submitForm"
        @closeForm="closeForm">
        <template v-slot:menuId="value">
          <cu-tree :treeList="menuData" :propsRule="value.value.propsRule" :defaultCheckedKeys="roleMenuKeys"
            @getCheckedKeys="getCheckedMenuKeys(arguments[0], value.form)" nodeKey="id">
          </cu-tree>
        </template>
      </cu-form>
      <template #footer>
        <div></div>
      </template>
    </cu-dialog>
  </div>
</template>
<script>

import { getApparatusList, declareGoods, withdraw, onShelf, offShelf,apparatusListExportXls} from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { getAllMenuList } from "@/api/aksApi/platformApi/loginApi.js";
import { downloadXls } from "@/utils/exportXls.js";
import dayjs from 'dayjs';
import { mapState } from "vuex";


export default {
  data() {
    return {
      sysId: null,
      sysType: null,// 系统类型@ 1 运营平台  2  采购商  3  供应商
      productName: '',
      material: '',
      specification: '',
      auditStatus: '',
      // itemNo: '',
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
          title: "药械编号",
          key: "sgId",
        },
        {
          title: "药械名称",
          key: "productName",
          width: 140,
        },

        {
          title: "耗材材质",
          key: "material",
        },
        {
          title: "规格型号",
          key: "specification",
        },
        // {
        //   title: "库存",
        //   key: "quantity",
        // },
        // {
        //   title: "状态",// 审核状态@ 1  待审核  2  审核通过   3  审核不通过
        //   slot: "auditStatus",
        // },
        // {
        //   title: "生产企业",
        //   key: "manufacturer",
        //   width: 140,
        // },
        // {
        //   title: "采购价",
        //   key: "mallPrice",
        // },
        {
          title: "是否上架",
          slot: "upload",
          width: 120,
        },
        // {
        //   title: "上架时间",
        //   slot: "uploadTime",
        // },
        {
          title: "操作",
          slot: "operate",
        },
      ],
      tableData: [],
      pageNum: 1,
      pageSize: 10,
      pageCount: 1,
      total: 1,
      tableLoading: false,
      tableHeight: 0,
      role: {
        name: "",
        roleName: "",
        menuId: [],
        description: "",
      },
      formVisible: false,
      formRule: [],
      formType: '',
      menuData: [],
      roleMenuKeys: []
    }
  },
  created() {
    console.log(this.vuex_user);
    let { sysId, sysType } = this.vuex_user;
    this.sysId = sysId;
    this.sysType = sysType;
    this.getApparatusList();
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
      this.getApparatusList();
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getApparatusList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.getApparatusList();
    },
    statusChange(event) {
      console.log(event)
    },
    getApparatusList() {
      this.tableLoading = true;
      if (this.date && this.date.length) {
        this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
      }else {
        this.date = []
      }
      let params = {
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
        product_name: this.productName,
        audit_status: this.auditStatus,
        // itemNo: this.itemNo,
        // material: this.material,
        specification: this.specification,
        beginDate: this.date[0],
        endDate: this.date[1]

      };
      console.log(params);
      this.tableData = [];
      getApparatusList(params).then(res => {
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
    pageToEdit(type, sgId) {
      if (type == 'edit') {
        this.$router.push({ name: 'supplierInstrumentEdit', params: { sgId } })
        return
      }
      this.$router.push({ name: 'supplierInstrumentAdd' })

    },

    getCheckedMenuKeys(checkedMenuKeys, form) {
      form['menuId'] = checkedMenuKeys;
    },
    formClose() {
      this.$refs.form.$refs.cuForm.resetFields()
      this.formVisible = false
    },
    // 获取菜单权限数据
    getMenuData(roleId) {
      if (roleId) {
        return getMenuIdsByRoleId(roleId)

      } else {

        return getAllMenuList(params);
      }

    },

    nodeClick(data) {
      console.log(data);
    },
    async submitForm(formData, formRef) {
      let params = formData;
      params.sysId = this.sysId;
      params.sysType = this.sysType;
      if (this.formType == 'edit') {// 编辑司机
        updateRole(params).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("操作成功")
            this.getApparatusList()
            this.formVisible = false;

          } else {
            this.$message.error(res.message)
          }
        }).catch((err) => {
          console.log(err);
        });
      } else {
        params.createBy = this.vuex_user.id + '';
        params.status = 1;
        console.log(params);
        let res = await saveRole(params)
        console.log(res);
        if (res.code == 200) {
          this.$message.success("角色新增成功")
          formRef.resetFields();
          this.getApparatusList()
          this.formVisible = false;

        } else {
          this.$message.error(res.message)
        }
      }


    },
    closeForm(formRef) {
      formRef.resetFields();
      this.formVisible = false;
    },
    operation(type, sgId) {
      console.log(sgId);
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
            func = declareGoods({ sgId });
            break;
          case 'withdraw':
            func = withdraw({ id: sgId });
            break;
          case 'put':
            func = onShelf({ sgId });
            break;
          case 'down':
            func = offShelf({ sgId });
            break;
          default:
            break;
        }
        func.then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("操作成功")
            this.getApparatusList()
          }
        }).catch((err) => {
          console.log(err);
        });


      }).catch((err) => {
        console.log(err);
      });

    },
    exportXls() {
      if (this.date && this.date.length) {
        this.date[0] = dayjs(this.date[0]).format("YYYY-MM-DD 00:00:00");
        this.date[1] = dayjs(this.date[1]).format("YYYY-MM-DD 23:59:59");
      }else {
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
      apparatusListExportXls(params).then(res => {
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
    toBatchAdd(){
      this.$router.push({name:'supplierInstrumentBatchAdd',params:{ypqxType:2}})
    }
  },
}
</script>
<style lang="scss" src="./supplierInstrumentManage.scss" scoped>

</style>
