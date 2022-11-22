<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="search-bar">
      <div class="search-item">
        分类名称：
        <el-input placeholder="请输入分类名称" v-model="name"> </el-input>
      </div>
      <div class="search-item">
        父级分类：
        <!-- <el-select
          placeholder="请选择父级分类"
          
          size="small"
          v-model="pid"
          @change="gseseley"11
        >
          <el-option v-for=" val in selectdrug" :key="val.id" :value="val.id" :label="val.name"></el-option> -->
          <!-- <el-option label="可用" value="2"></el-option> -->
        <!-- </el-select>111 -->
        <!-- <el-select
        v-if="!flag"
          placeholder="请选择父级分类"
          class="tzhigg"
          size="small"
          v-model="pid1"
        >
          <el-option v-for=" val in selectdrus" :key="val.id" :value="val.id" :label="val.name"></el-option>
        </el-select> -->
        <!-- <el-input placeholder="请选择父级分类" v-model="pid"> </el-input> -->
        <el-cascader
        class="tzhiggg"
    v-model="selectdrus"
    :options="options"
    ref="cascaderArr"
    :props="{ checkStrictly: true }"
    @change="handleChan"
    ></el-cascader>
      </div>
      <el-button class="operation-btn search-btn" type="primary" @click="search"
        >查询</el-button
      >
      <el-button
        class="operation-btn export-btn"
        type="primary"
        @click="editAddDrug('add')"
        >新增</el-button
      >
    </div>
    <cu-animation :type="'slideInRight'" :time="0.5">
      <cu-table
        class="sale-table"
        :loading="tableLoading"
        :height="tableHeight"
        :showTitle="false"
        :tableHeader="tableHeader"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :total="Total"
      > 
      <template slot="pid" slot-scope="value">
    {{getpid(value.value.pid)}}
        </template>
        <template slot="iconUrl" slot-scope="value">
         <img v-lazy :src="value.value.iconUrl" alt="" style="width:100%;height:100px">
        </template>
        <template slot="operate" slot-scope="value">
          <el-button type="text" @click="editAddDrug('edit', value.value.id)"
            >编辑</el-button
          >
          <el-button type="text" @click="deleteDrug(value.value.id)"
            >删除</el-button
          >
          <el-button type="text" @click="detailsDrugs(value.value.id)"
            >详情</el-button
          >
        </template>
      </cu-table>
    </cu-animation>
    <!-- 编辑、新增药品分类弹窗 -->
    <cu-dialog
      :title="editAddDrugForm.id ? '编辑药品分类' : '新增药品分类'"
      width="50vw"
      :visible="editAddDrugVisible"
      :showClose="true"
      @handleClose="handleCloseDrug"
      @handleOk="editAddDrugOk"
    >
      <el-form
        class="add-form"
        :model="editAddDrugForm"
        :rules="rules"
        ref="editAddForm"
        label-width="110px"
      >
        <el-form-item class="form-item" label="分类名称:" prop="name">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.name"
            placeholder="请输入分类名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="父级分类:" prop="pid">
          <el-cascader
          class="tzhigg"
    v-model="editAddDrugForm.pid"
    :options="options"
    ref="cascaderArr"
    :props="{ checkStrictly: true }"
    @change="handleChan1"
    ></el-cascader>
          <!-- <el-select v-model="editAddDrugForm.pid" placeholder="请选择父级分类">
            <el-option label="区域一" value="1"></el-option>
            <el-option label="区域二" value="2"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item class="form-item" label="描述:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.description"
            type="textarea"
            placeholder="请输入描述"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item class="form-item" label="图标:">
          <div class="images">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <img v-lazy v-if="iconUrl" :src="iconUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
               <div class="el-upload__text">添加图标</div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item class="form-item" label="图片:">
          <div class="images">
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess2"
              :before-upload="beforeAvatarUpload"
            >
              <img v-lazy v-if="picUrl" :src="picUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
             <div class="el-upload__text">添加图片</div>
            </el-upload>
          </div>
        </el-form-item> -->
        <el-form-item class="form-item" label="序列号:">
          <el-input placeholder="序列号" v-model="editAddDrugForm.sortOrder">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer> </template>
    </cu-dialog>
    <!-- 药品分类详情弹窗 -->
    <cu-dialog
      title="药品分类详情"
      width="50vw"
      :visible="detailsDrugVisible"
      :showClose="true"
      @handleClose="handleCloseDrug"
      @handleOk="detailsDrugOk"
    >
      <el-form
        class="add-form"
        :model="editAddDrugForm"
        :rules="rules"
        ref="editAddForm"
        label-width="110px"
        disabled
      >
        <el-form-item class="form-item" label="分类名称:">
          <el-input class="selectInput" v-model="editAddDrugForm.name">
          </el-input>
        </el-form-item>
        <el-form-item label="父级分类:">
          <!-- <el-cascader
    v-model="editAddDrugForm.pid"
    :options="options"
    ref="cascaderArr"
    @change="handleChan"
    class="tzhigg"
    ></el-cascader> -->
    <el-input v-model="lsttb"> </el-input>
          <!-- <el-select v-model="editAddDrugForm.pid">
            <el-option label="区域一" value="1"></el-option>
            <el-option label="区域二" value="2"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item class="form-item" label="描述:">
          <el-input
            class="selectInput"
            v-model="editAddDrugForm.description"
            type="textarea"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="图标:">
          <div
            class="images"

          ><img v-lazy :src="editAddDrugForm.iconUrl" alt="" style="width: 200px; height: 100px; "></div>
        </el-form-item>
        <el-form-item label="照片:">
          <div
            class="images"
          ><img v-lazy :src="editAddDrugForm.picUrl" alt="" style="width: 200px; height: 100px;"></div>
        </el-form-item> -->
        <el-form-item class="form-item" label="序列号:">
          <el-input v-model="editAddDrugForm.sortOrder"> </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="描述:">
          <el-input class="selectInput" v-model="editAddDrugForm.createTime">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer> </template>
    </cu-dialog>
  </div>
</template>
<script>
import {
  getDrugClassification,
  addDrug,
  editDrug,
  deletDrug,
  getDetailsDrug,
  selectdrugClass,
} from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { upload } from "@/api/aksApi/platformApi/commonApi.js";
export default {
  data() {
    return {
      value: "",
      abroadt:{
        1:'国产',
        2:'进口'
      },
      name:'',
      pid: "",
      pid1:'',
      lsttb:"",
      flag:true,
      iconUrl: "",
      picUrl: "",
      tableLoading: false,
      editAddDrugVisible: false,
      detailsDrugVisible: false,
      tableHeight: 0,
      tableData: [],
      Total: 1,
      options:null,
      listrow:null,
      editAddDrugForm: {
        deleteFlag: 0,
        description: "",
        iconUrl: "",
        id: 0,
        level: "",
        name: "",
        picUrl: "",
        pid: 0,
        sortOrder: null,
      },
      rules: {
        name: [
          { required: true, message: "请输入分类名称", trigger: "change" },
          {
            min: 2,
            max: 20,
            message: "分类名称不得少于2个字符",
            trigger: "blur",
          },
        ],
        pid: [
          { required: true, message: "请选择父级分类", trigger: "change" },
        ],
      },
      tableHeader: [
        {
          title: "id",
          slot: "id",
          width: 100,
        },

        {
          title: "分类名称",
          slot: "name",
        },
        {
          title: "父级分类",
          slot: "pid",
        },
        {
          title: "描述",
          slot: "description",
        },
        {
          title: "排序号",
          slot: "sortOrder",
        },
        {
          title: "创建时间",
          slot: "createTime",
        },
        {
          title: "操作",
          slot: "operate",
        },
      ],
      selectdrug:[],
      selectdrus:[], 
      options:[],
      rulename:''
    };
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  created(){
    this.selectdrugClass()
  },
  mounted() {
    // 一般渲染过慢导致无法算出高度问题，加定时器
    setTimeout(() => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    }, 800);
    window.onresize = () => {
      this.handleHeight(); // 根据浏览器大小计算表格高度
    };
    this.getDrugClassificationList();
  },
  methods: {
    handleChan(row){
      console.log(row);
      if(row.length==1){
        this.pid = row[0]
        
      } else{ 
        this.pid =row[row.length-1]
      }
    },
    handleChan1(row){
      this.editAddDrugForm.pid =row[row.length-1]
    },
    //图片上传
    handleAvatarSuccess1(res, file) {
      console.log(file);
      upload(file.raw).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.iconUrl =res.data
          console.log( this.editAddDrugForm.iconUrl)
          this.$message.success("上传图片成功!");
        } else {
          this.$message.error("上传图片失败!");
        }
      });
    },
    handleAvatarSuccess2(res, file) {
      console.log(file);
      upload(file.raw).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.picUrl =res.data
          this.$message.success("上传图片成功!");
        } else {
          this.$message.error("上传图片失败!");
        }
      });

    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    formatDate(time, format) {
      return time ? new Date(time).Format(format) : "";
    },
    handleHeight() {
      this.tableHeight = this.$refs.contentBox.offsetHeight - 55 - 82 - 42 - 40;
    },
   async selectdrugClass(){
     let res = await selectdrugClass()
        console.log(res);
        // this.selectdrug = ''
        if (res.data.code ==200) {
          console.log(res);
      let datas = res.data.data

      let datens = datas => datas.map(({id,name,childList})=> childList.length>0 ?{
        value :id,
        label: name,
        children:datens(childList)
      } :{
        value :id,
        label: name,
      }) 
      this.options= datens(datas)
      console.log(this.options);
        }
    },
    //按需搜索
    search() {
      this.getDrugClassificationList();
    },
    getpid(id){
      console.log(id);
    let arr =this.options.filter(val => val.value ==id)
    console.log(arr,456);
    for(var i =0;i<arr.length;i++){
      console.log(arr[i].label);
      this.lsttb =arr[i].label
      return arr[i].label
    }
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getDrugClassificationList();
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.getDrugClassificationList();
    },
    async getDrugClassificationList() {
      this.tableLoading = true;
    
      let params = {
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
        name: this.name,
        pid:this.pid
      };
      // if(this.flag == false){
      //   params.pid = this.pid1
      // } else{
      //   params.pid = this.pid
      // }
      this.tableData = [];
      await getDrugClassification(params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.tableData = res.data.data.records;
            this.pageNum = res.data.data.current;
            this.pageSize = res.data.data.size;
            this.Total = res.data.data.total;
            this.pageCount = res.data.data.pages;
            this.tableLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //编辑、新增药品分类
    async editAddDrug(type, id) {
      this.editAddDrugForm = {
        deleteFlag: 0,
        id: 0,
        pid: null,
        iconUrl:null,
        picUrl:null
      };
      if (type == "edit") {
        this.editAddDrugForm = this.tableData.filter(
          (item) => item.id == id
        )[0];
        this.iconUrl =this.editAddDrugForm.iconUrl;
        this.picUrl = this.editAddDrugForm.picUrl
      }
      this.editAddDrugVisible = true;
    },

    handleCloseDrug() {
      this.editAddDrugVisible = false;
      this.detailsDrugVisible = false;
      this.getDrugClassificationList();
    },
    async editAddDrugOk() {
      this.$refs["editAddForm"].validate((valid) => {
        if (valid) {
          let params = {};
          (params.deleteFlag = this.editAddDrugForm.deleteFlag),
            (params.description = this.editAddDrugForm.description),
            (params.id = this.editAddDrugForm.id),
            (params.iconUrl = this.iconUrl),
            (params.level = this.editAddDrugForm.level),
            (params.name = this.editAddDrugForm.name),
            (params.picUrl = this.picUrl),
            (params.pid = this.editAddDrugForm.pid),
            (params.sortOrder = this.editAddDrugForm.sortOrder),
            console.log(params);
          if (params.id) {
            // 编辑信息
            editDrug(params)
              .then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$message.success("药品分类编辑成功");

                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            addDrug(params)
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message.success("药品分类新增成功");

                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
          this.$refs["editAddForm"].resetFields();
          this.editAddDrugVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
        this.getDrugClassificationList();
      });
      this.selectdrugClass()
    },
    //删除药品分类
    deleteDrug(id) {
      console.log(id);
      let params = { id: id };
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletDrug(params)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else{
                this.$message({
                  type: "success",
                  message: res.message,
                });
              }
            })
            .catch((err) => {
              console.log(err);
              this.$message({
                type: "info",
                message: "删除失败",
              });
            });
          this.getDrugClassificationList();
        })
        .catch(() => {});
    },
    //药品分类详情弹窗
    async detailsDrugs(id) {
      console.log(id);
      this.detailsDrugVisible = true;
      this.tableLoading = true;
      let params = {
        id: id,
      };
      await getDetailsDrug(params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.tableLoading = false;
            this.editAddDrugForm = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    detailsDrugOk() {
      this.detailsDrugVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.page-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 40px;
  &::-webkit-scrollbar {
    width: 0px;
  }
}
.tzhiggg{
  line-height: 25px;
::v-deep .el-input__inner{
    height: 31px !important;
line-height: 31px !important;
}
}
.search-bar {
  display: flex;
  align-items: flex-end;
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

  .operation-btn {
    height: 32px;
    border: none;
    border-radius: 4px 4px 4px 4px;
  }

  .search-btn {
    background: #ff480e;
  }
}
.add-form {
  margin: 40px auto;
  width: 60%;

  .el-form-item__content {
    flex: 1;
  }
  .tzhigg{
    width:100%;
}
  .el-input,
  .el-select,
  .el-input__inner {
    width: 100%;
  }
  &-images {
    margin-top: 20px;
    .images {
      display: flex;
      margin-left: 100px;
    }
  }
}
.label {
  margin-left: 30px;
}
.avatar-uploader ::v-deep .el-upload {
  margin-top: 10px;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-left: 10px;
}
.avatar-uploader ::v-deep .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 250px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.el-upload__text {
  width: 100%;
  position: absolute;
  top: 74%;
  transform: translateY(-74%);
  color: #cbcbcb;
  font-size: 12px;
}
.avatar {
  width: 250px;
  height: 110px;
  display: block;
}
</style>
