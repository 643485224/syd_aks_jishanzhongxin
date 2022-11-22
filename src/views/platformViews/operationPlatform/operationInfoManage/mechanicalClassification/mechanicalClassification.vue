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
          class="tzhigg"
          size="small"
          v-model="pid"
          @change="getpids"
        >
          <el-option v-for="val in dats" :key="val.id" :label="val.name" :value="val.id"></el-option>
           <el-option label="可用" value="1"></el-option> 
        </el-select> -->
        <el-cascader
        class="tzhiggg"
    v-model="selectdrus"
    :options="options"
    ref="cascaderArr"
    :props="{ checkStrictly: true }"
    @change="handleChan"
    ></el-cascader>
        <!-- <el-select
          placeholder="请选择父级分类"
          class="tzhigg"
          size="small"
          v-if="!flag"
          v-model="pid1"
        >
          <el-option v-for="val in datsse" :key="val.id" :label="val.name" :value="val.id"></el-option>
        </el-select> -->
        <!-- <el-input placeholder="请选择父级分类" v-model="pid"> </el-input> -->
      </div>
      <el-button class="operation-btn search-btn" type="primary" @click="search"
        >查询</el-button
      >
      <el-button
        class="operation-btn export-btn"
        type="primary"
        @click="editCategory('add')"
        >新增</el-button
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
        :total="Total"
      >
      <!-- <template slot="iconUrl" slot-scope="value">
         <img :src="value.value.iconUrl" alt="" style="width:100%;height:100px">
        </template>
        <template slot="picUrl"  slot-scope="value">
         <img :src="value.value.picUrl" alt="" style="width:100%;height:100px">
        </template> -->
        <template slot="pid" slot-scope="value">
          {{ getpid(value.value.pid) }}
        </template>    
         <template slot="createTime" slot-scope="value">
          {{ formatDate(value.value.createTime, "yyyy-MM-dd") }}
        </template>
        <template slot="operate" slot-scope="value">
          <el-button type="text" @click="editCategory('edit', value.value.id)"
            >编辑</el-button
          >
          <el-button type="text" @click="deleteCategory(value.value.id)"
            >删除</el-button
          >
          <el-button type="text" @click="detailsCategory(value.value.id)"
            >详情</el-button
          >
        </template>
      </cu-table>
    </cu-animation>
    <!-- 编辑、新增药械弹窗 -->
    <cu-dialog
      :title="editAddCategoryForm.id ? '编辑器械分类' : '新增器械分类'"
      width="50vw"
      :visible="editAddCategoryVisible"
      :showClose="true"
      @handleClose="handleCloseCategory"
      @handleOk="editAddCategoryOk"
    >
      <el-form
        class="add-form"
        :model="editAddCategoryForm"
        :rules="rules"
        ref="editAddForm"
        label-width="110px"
      >
        <el-form-item class="form-item" label="分类名称:" prop="name">
          <el-input
            class="selectInput"
            v-model="editAddCategoryForm.name"
            placeholder="请输入分类名称"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="父级分类:" 
    prop="pid">
          <el-cascader
        class="tzhigg"
    v-model="editAddCategoryForm.pid"
    :options="options"
    ref="cascaderArr"
    :props="{ checkStrictly: true }"
    @change="handleChan"
    ></el-cascader>
          <!-- <el-select
            v-model="editAddCategoryForm.pid" prop="pid"
            placeholder="请选择父级分类"
          >
            <el-option label="区域一" value="1"></el-option>
            <el-option label="区域二" value="2"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item class="form-item" label="描述:">
          <el-input
            class="selectInput"
            v-model="editAddCategoryForm.description"
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
          <el-input placeholder="序列号" v-model="editAddCategoryForm.sortOrder">
          </el-input>
        </el-form-item>
      </el-form>
      <template #footer> </template>
    </cu-dialog>
    <!-- 药械分类详情弹窗 -->
    <cu-dialog
      title="药械分类详情"
      width="50vw"
      :visible="detailsCategoryVisible"
      :showClose="true"
      @handleClose="handleCloseCategory"
      @handleOk="detailsCategoryOk"
    >
      <el-form
        class="add-form"
        :model="editAddCategoryForm"
        :rules="rules"
        ref="editAddForm"
        label-width="110px"
        disabled
      >
        <el-form-item class="form-item" label="分类名称:" prop="name">
          <el-input class="selectInput" v-model="editAddCategoryForm.name">
          </el-input>
        </el-form-item>
        <el-form-item label="父级分类:" >
          
    <el-input v-model="lsttb"> </el-input>
          <!-- <el-cascader
        class="tzhigg"
    v-model="editAddCategoryForm.pid"
    :options="options"
    ref="cascaderArr"
    @change="handleChan"
    ></el-cascader> -->
          <!-- <el-select v-model="editAddCategoryForm.pd">
            <el-option label="区域一" value="1"></el-option>
            <el-option label="区域二" value="2"></el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item class="form-item" label="描述:">
          <el-input
            class="selectInput"
            v-model="editAddCategoryForm.description"
            type="textarea"
          >
          </el-input>
        </el-form-item>
        <!-- <el-form-item label="图标:">
          <div
            class="images"

          ><img v-lazy :src="editAddCategoryForm.iconUrl" alt="" style="width: 200px; height: 100px; "></div>
        </el-form-item>
        <el-form-item label="照片:">
          <div
            class="images"
          ><img v-lazy :src="editAddCategoryForm.picUrl" alt="" style="width: 200px; height: 100px;"></div> -->
        <!-- </el-form-item> -->
        <el-form-item class="form-item" label="序列号:">
          <el-input v-model="editAddCategoryForm.sortOrder"> </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="描述:">
          <el-input class="selectInput" v-model="editAddCategoryForm.description">
          </el-input>
        </el-form-item>
        <el-form-item class="form-item" label="创建时间:">
          <el-input class="selectInput" v-model="editAddCategoryForm.createTime">
          </el-input>
        </el-form-item>

      </el-form>
      <template #footer> </template>
    </cu-dialog>
  </div>
</template>
<script>
import {
  getCategoryClass,
  addCategoryClass,
  editCategoryClass,
  getDetailsCategoryClass,
  deletCategoryClass,
  selectCategoryClass
} from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { upload } from "@/api/aksApi/platformApi/commonApi.js";
export default {
  data() {
    return {
      selectdrus:[], 
      options:[],
      iconUrl: "",
      picUrl: "",
      name: "",
      pid: null,
      pid1: null,
      flag:true,
      tableLoading: false,
      editAddCategoryVisible: false,
      detailsCategoryVisible: false,
      tableData: [],
      Total: 1,
      tableHeader: [
        {
          title: "id",
          slot: "id",
        },
        {
          title: "分类名称",
          slot: "name",
        },
        {
          title: "父级分类",
          slot: "pid",
        },
        // {
        //   title: "图标",
        //   slot: "iconUrl",
        // },
        // {
        //   title: "图片",
        //   slot: "picUrl",
        // },
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
      lsttb:null,
      dats:[],
      datss:[],
      datsse:[],
        arr:[],
      editAddCategoryForm: {
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
    };
  },
  created() {
    this.getCategoryClassList();
    this.selectCategoryClass()
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
    formatDate(time, format) {
      return time ? new Date(time).Format(format) : "";
    },
     //图片上传
     handleAvatarSuccess1(res, file) {
      console.log(file);
      upload(file.raw).then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.iconUrl =res.data
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
   async selectCategoryClass(){
   let res= await selectCategoryClass()
   console.log(res);
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
   getpid(id){
    console.log(id,1212);
    let arr =this.options.filter(val => val.value ==id)
    console.log(arr,456);
    console.log(this.dats);
    for(var i =0;i<arr.length;i++){
      return arr[i].label
    }
      // for(let k in this.dats){
      //   if(this.dats[k].id == id){
      //     return this.dats[k].name
      //   }
      // } 
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
    //关键字搜索
    search() {
      this.getCategoryClassList();
    },
    //器械列表查询
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCategoryClassList();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.getCategoryClassList();
    },
    //器械列表查询
    async getCategoryClassList() {
      this.tableLoading = true;
      let params = {
        currPageNo: this.pageNum,
        pageSize: this.pageSize,
        name:this.name || '',
        pid:this.pid
      };
      // if (this.flag) {
      //   console.log(this.pid);
      //   params. || ''
      // } else{
      //   console.log(this.pid1);
      //   params.pid =this.pid1 || ''
      // }
      console.log(params);
      this.tableData = [];
      await getCategoryClass(params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            let data = res.data.data
            this.tableData = data.records;
            this.pageNum = data.current;
            this.pageSize =data.size;
            this.Total = data.total;
            this.pageCount = data.pages;
            this.tableLoading = false;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //编辑、新增器械分类
    async editCategory(type, id) {
      this.editAddCategoryForm = {
        deleteFlag: 0,
        id: 0,
        pid: null,
      };
      if (type == "edit") {
        this.editAddCategoryForm = this.tableData.filter(
          (item) => item.id == id
        )[0];
        console.log(this.editAddCategoryForm);
        this.iconUrl =this.editAddCategoryForm.iconUrl;
        this.picUrl = this.editAddCategoryForm.picUrl
      }
      this.editAddCategoryVisible = true;
      
    },
    handleCloseCategory() {
      this.editAddCategoryVisible = false;
      this.detailsCategoryVisible = false;
    },
    async editAddCategoryOk() {
      this.$refs["editAddForm"].validate((valid) => {
        if (valid) {
          let params = {};
          (params.deleteFlag = this.editAddCategoryForm.deleteFlag),
            (params.description = this.editAddCategoryForm.description),
            (params.id = this.editAddCategoryForm.id),
            (params.iconUrl = this.iconUrl),
            (params.level = this.editAddCategoryForm.level),
            (params.name = this.editAddCategoryForm.name),
            (params.picUrl = this.picUrl),
            (params.pid = this.editAddCategoryForm.pid),
            (params.sortOrder = this.editAddCategoryForm.sortOrder),
            console.log(params);
          if (params.id) {
            // 编辑信息
            editCategoryClass(params)
              .then((res) => {
                console.log(res);
                if (res.data.code == 200) {
                  this.$message.success("药械分类编辑成功");
                  this.getCategoryClassList();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            addCategoryClass(params)
              .then((res) => {
                if (res.data.code == 200) {
                  this.$message.success("药械分类新增成功");
                  this.getCategoryClassList();
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }
          this.$refs["editAddForm"].resetFields();
          this.editAddCategoryVisible = false;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
      this.selectCategoryClass()
    },
        //删除药械分类列表
      deleteCategory(id) {
      console.log(id);
      let params = { id: id };
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          deletCategoryClass(params)
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
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
          this.getCategoryClassList();
        })
        .catch(() => {});
    },
    //药械分类详情列表
    async detailsCategory(id) {
      console.log(id);
      this.detailsCategoryVisible = true;
      this.tableLoading = true;
      let params = {
        id: id,
      };
      await getDetailsCategoryClass(params)
        .then((res) => {
          console.log(res);
          if (res.data.code == 200) {
            this.tableLoading = false;
            this.editAddCategoryForm = res.data.data;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    detailsCategoryOk() {
      this.detailsCategoryVisible = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.tzhiggg{
  line-height: 31px;
  ::v-deep .el-input__inner {
        height: 32px;
  line-height: 31px;
      }
}

.page-container {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-bottom: 40px;
  &::-webkit-scrollbar {
    width: 0px;
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
.avatar-uploader-icon[data-v-385e0ca7] {
    font-size: 28px;
    color: #8c939d;
    width: 250px;
    height: 110px;
    line-height: 110px;
    text-align: center;
}
</style>
