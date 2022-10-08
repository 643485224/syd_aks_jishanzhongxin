<template>
  <!-- 采购商管理 -->
  <div ref="contentBox" class="page-container table-page">
    <div class="supplierGrouping_one mt_20">采购商分组</div>
    <div class="supplierGrouping_two">
      <el-button class="btn_ff480e" type="primary" @click="showDialog('add')">添加分组</el-button>
    </div>
    <div>
      <cu-animation :type="'slideInRight'" :time=".5">
        <cu-table class="sale-table" :loading="tableLoading" :showHeight="false" :showTitle="false"
          :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
          @handleCurrentChange="handleCurrentChange" :total="pages.total">
          <template slot="status" slot-scope="value">
            {{statusType[value.value.status]}}
          </template>
          <template slot="operate" slot-scope="value">
            <el-button type="text" @click="showDialog('edit',value.value.id)"> 修改 </el-button>
            <el-button type="text" class="warning" @click="del(value.value)"> 删除 </el-button>
          </template>
        </cu-table>
      </cu-animation>

    </div>
    <cu-dialog :title="type == 'add'?'创建分组':'编辑分组' " width="50%" :visible="addVisible" :showClose="true"
      @handleClose="addVisible=false" @handleOk="submit" :append-to-body="false">
      <!-- :destroyOnClose="true" @submitForm="submitForm"-->
      <cu-form ref="form" :formData.sync="group" :formRule="formRule" class="form" labelWidth="100px"
        :disabledIgnoreValidate="true" @submitForm="submitForm">
        <template v-slot:buyerList>
          <el-input class="selectInput" @click.native="selectInfo" placeholder="" suffix-icon="el-icon-search">
          </el-input>
          <!-- <el-select class="formSelectRest" v-model="value.form.buyerList" multiple filterable remote reserve-keyword
            :remote-method="remoteMethod" placeholder="请选择">
            <template v-if="value.value.id">
              <el-option v-for="(item, index) in buyerList" :key="index" :value="item.id" :label="item.unitName"
                @focus="selectInfo" suffix-icon="el-icon-search">
              </el-option>
            </template>
            <template v-else>
              <el-option v-for="(item, index) in buyerList" :key="index" :value="item.id" :label="item.unitName"
                @focus="selectInfo" suffix-icon="el-icon-search">
              </el-option>
            </template>
          </el-select> -->
        </template>

        <template v-slot:footer>
          <div>
          </div>
        </template>
      </cu-form>
      <cu-table class="sale-table" :loading="tableLoading2" :showTitle="false" :tableHeader="selectTableHeader"
        :tableData="selectTableData" @handleSizeChange="handleSizeChange2" @handleCurrentChange="handleCurrentChange2"
        :total="pages2.total">
        <template slot="unitType" slot-scope="value">
          {{unitTypes[value.value.unitType]}}
        </template>
        <template slot="operate" slot-scope="value">
          <el-button type="text" @click="toDetails(value.value.buyerId)">详情</el-button>
          <el-button type="text" @click="removePurchaser(value.value)">删除</el-button>
        </template>
      </cu-table>

      <template #footer>

      </template>
    </cu-dialog>
    <select-purchaser :show.sync="selectDialogVisible" @select="select">
    </select-purchaser>

  </div>
</template>
<script>
import { getBuyerGroupList, getBuyerList, editSupplierBuyerGroup, saveSupplierBuyerGroup, getBuyerGroupInfo, groupDelete } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import SelectPurchaser from "./components/selectPurchaser.vue";
export default {
  data() {
    return {
      // 查询功能
      query: {
        supplierCode: "",
        unitName: "",
      },
      statusType: {
        0: "禁用",
        1: "正常"
      },
      types: {
        1: '医疗机构', 2: '药店', 3: '个人'
      },
      tableHeader: [
        {
          title: "序号",
          key: "index",
          width: "80",
          align: "center",
        },
        {
          title: "分组名称",
          key: "groupName",
        },
        {
          title: "采购商数量",
          key: "buyerCount",
        },
        {
          title: "状态",
          slot: "status",
        },
        {
          title: "操作人",
          slot: "createBy",
        },
        {
          title: "创建时间",
          key: "createTime",
        },
        {
          title: "操作",
          slot: "operate",
          fixed: "right",
          width: "180",
        },
      ],
      tableData: [],
      pages: {
        total: 0,
        current: 1,
        size: 10,
      },
      pages2: {
        total: 0,
        current: 1,
        size: 10,
      },
      tableLoading: false,
      addVisible: false,
      group: {
        groupName: "",
        buyerList: []
      },
      selectTableData: [],
      selectTableHeader: [
        {
          title: "采购商名称",
          key: "unitName",
        },
        {
          title: "采购商分类",
          slot: "unitType",
        },
        {
          title: "操作",
          slot: "operate",
          // width: 140,
          fixed: "right"
        },
      ],
      unitTypes: {
        1: '医疗机构',
        2: '药店',
        3: '个人'
      },
      selectDialogVisible: false,
      dialogVisible: false,
      tableLoading2: false,
      formRule: [
        {
          key: "groupName",
          view: "input",
          label: "分组名称",
          placeholder: "请输入分组名称",
          rules: [
            { required: true, message: "请输入分组名称", trigger: "blur" },
            { min: 2, max: 20, message: "名称长度不得少于2个字符", trigger: "blur" },
            // { trigger: "blur", validator: validateUserName }
          ],
        },
        {
          key: "buyerList",
          view: "select",
          label: "添加采购商",
          placeholder: "搜索采购商",
          rules: [
            // { required: true, message: "请添加采购商", trigger: "blur" },
          ],
          data: [],
          multiple: true,
          filterable: true,
          remote: true,
          dynamicEnable: true,
          realTimeDynamic: false,
        },
      ],
      type: "", // 弹窗类型 新增/编辑   add/edit
    };
  },
  created() {
    this.getBuyerGroupList(); //获取我的采购单列表
  },
  watch: {
    selectDialogVisible(val) {
      console.log(val);
    }
  },
  methods: {
    //获取我的采购单列表
    getBuyerGroupList() {
      this.tableLoading = true;
      // let valueData = {
      //   sort: "desc",
      //   currPageNo: this.pages.current,
      //   pageSize: this.pages.size,
      //   supplierCode: this.query.supplierCode,
      //   unitName: this.query.unitName,
      // };
      getBuyerGroupList()
        .then((res) => {
          this.tableLoading = false;
          console.log(res);
          if (res.code == 200) {
            this.tableData = res.data;
            this.pages.total = res.data.length;
            // this.pages.total = res.data.totalCount;
          }
          else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.tableLoading = false;
          console.log(err);
        });
    },
    // 每页条数改变回调
    handleSizeChange(value) {
      this.pages.size = value;
      this.getBuyerGroupList();
    },
    // 页码改变回调
    handleCurrentChange(value) {
      this.pages.current = value;
      this.getBuyerGroupList();
    },
    // 每页条数改变回调
    handleSizeChange2(value) {
      this.pages2.size = value;
      let start = (this.pages2.current - 1) * this.pages2.size;
      let end = (this.pages2.current - 1) * this.pages2.size + this.pages2.size;
      console.log(start, end);
      this.selectTableData = this.group.buyerList.slice(start, end)
    },
    // 页码改变回调
    handleCurrentChange2(value) {
      console.log(this.group.buyerList.filter(item => item.unitName));
      this.pages2.current = value;
      let start = (this.pages2.current - 1) * this.pages2.size;
      let end = (this.pages2.current - 1) * this.pages2.size + this.pages2.size;
      console.log(start, end);
      this.selectTableData = this.group.buyerList.slice(start, end)
      console.log(this.selectTableData);

    },
    edit(value) {
      this.$router.push({ name: "supplierPurchaserEdit", params: { id: value.id } });
    },
    del(value) {
      this.$confirm(`确认删除该分组? `, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let params = {
          id: value.id,
        };
        groupDelete(params).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("删除成功");
            this.getBuyerGroupList();
          }
          else {
            this.$message.success(res.message);
          }
        }).catch((err) => {
          console.log(err);
        });
      }).catch((err) => {
        console.log(err);
      });
    },
    async showDialog(type, id) {
      this.type = type;
      this.group = {};
      this.group['groupName'] = '';
      this.group['buyerList'] = [];
      this.selectTableData = []
      if (type == "edit") {
        await this.getBuyerGroupDetails(id);
        // await this.remoteMethod("");
      }
      console.log(this.group);
      this.addVisible = true;
    },
    async getBuyerGroupDetails(id) {
      let res = await getBuyerGroupInfo({ id });
      if (res.code == 200) {
        let data = res.data;
        console.log(typeof data.buyerList);
        data.buyerList = data.buyerList.length ? data.buyerList : [];
        this.pages2.total = data.buyerList.length;
        this.selectTableData = data.buyerList.length > 10 ? data.buyerList.slice(0, 10) : data.buyerList;
        this.group = data;
      }
      else {
        this.$message.warning(res.message);
      }
    },

    submit() {
      this.$refs.form.submitForm()
    },
    // 提交表单
    submitForm(formData, formRef) {
      console.log(formData, formRef)
      let params = formData;
      console.log(params);
      if (!params.groupName || params.groupName.trim() == '') { return this.$message.warning("请填写分组名称") }
      // if (!this.group.buyerList.length) { return this.$message.warning("请选择分组内采购商") }
      console.log(this.group.buyerList);
      params.buyerList = this.group.buyerList.map(item => {
        return {
          buyerId: item.id,
          buyerName: item.unitName,
          unitType: item.unitType
        }
      });
      console.log(this.group.buyerList);
      console.log(params);
      if (this.type == 'edit') { // 编辑
        editSupplierBuyerGroup(params).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("操作成功");
            this.addVisible = false;
            this.getBuyerGroupList();
          } else {
            this.$message.warning(res.message);

          }
        }).catch((err) => {
          console.log(err);
        });
      } else {
        console.log(this.vuex_user);
        console.log(params);
        saveSupplierBuyerGroup(params).then(res => {
          console.log(res);
          if (res.code == 200) {
            this.$message.success("采购商分组新增成功");
            this.addVisible = false;
            this.getBuyerGroupList();
          } else {
            this.$message.warning(res.message);

          }
        });
      }
      this.formVisible = false;
    },
    closeForm(formRef) {
      formRef.resetFields();
      this.addVisible = false;
    },
    selectInfo() {
      console.log("ddd");

      this.selectDialogVisible = true;
    },
    // 选择采购商
    select(buyerList) {
      console.log(this.group.buyerList, buyerList);
      // 选择数组 与已选数组 去重
      let selectList = buyerList.map(item => {
        return {
          buyerId: item.id,
          buyerName: item.unitName,
          unitName: item.unitName,
          unitType: item.unitType
        }
      })
      // let list = [...new Set([...this.group.buyerList, ...selectList])]
      let list = this.unique([...this.group.buyerList, ...selectList])
      this.group.buyerList = list
      console.log(list);
      this.selectTableData = this.getCurrentData()
      this.pages2.total = this.group.buyerList.length;
    },
    removePurchaser(data) {
      console.log(data);
      this.group.buyerList = this.group.buyerList.filter(item => item.id == data.id ? false : true)
      console.log(this.group.buyerList);

      this.selectTableData = this.getCurrentData()
      this.pages2.total = this.group.buyerList.length;
    },
    getCurrentData() {
      let buyerList = this.group.buyerList;
      return buyerList.length > 10 ? buyerList.slice(0, 10) : buyerList
    },
    toDetails(id) {
      console.log(id);
      this.$router.push({ name: 'supplierPurchaserInfo', params: { id } })
    },
    unique(arr) {
      const res = new Map();
      return arr.filter((arr) => !res.has(arr.buyerId) && res.set(arr.buyerId, 1))
    }

  },

  components: { SelectPurchaser }
};
</script>
<style lang="scss" src="./supplierPurchaserManage.scss" scoped>

</style>
