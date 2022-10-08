<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="search-bar">
      <div class="search-item">   
字典名称：
        <el-input placeholder="请输入字典名称" v-model="name"> </el-input>
      </div>
      <div class="search-item">
        字典类型:
        <!-- <el-input placeholder="请输入字典类型" v-model="type1"> </el-input> -->
        <el-select placeholder="请选择字典类型" v-model="typeid" class="tzhiggg" size="small">
          <el-option v-for="val in type" :key="val.index" :label="val" :value="val"></el-option>
        </el-select>
      </div>
      <el-button class="operation-btn search-btn" type="primary"
        @click="getsech">查询</el-button
      >
      <el-button class="operation-btn export-btn" type="primary"
        @click="getadd('add')">新增</el-button
      >
    </div>
    <cu-animation :type="'slideInRight'" :time="0.5">
      <cu-table
        class="sale-table"
        :loading="tableLoading"
        :height="handleHeight"
        :showTitle="false"
        :tableHeader="tableHeader"
        :tableData="tableData"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :total="Total"
      >
      <template slot="description" slot-scope="value">
                    {{ getinfoTagb(value.value.description)}}
                </template>
        <template slot="operate" slot-scope="value">
          <el-button type="text" @click="getadd('edit', value.value)">编辑</el-button>
          <el-button type="text" class="orange" @click="showOpsition(value.value.id)" 
            >删除</el-button>
        </template>
      </cu-table>
    </cu-animation>
    <cu-dialog :title="titles" width="60vw"  :visible="dialogVisible" :showClose="true"
            @handleClose="handleClose" @handleOk="getinformationedits">
            <el-form class="add-form" :model="dict"  label-width="110px">
            <el-form-item class="form-item" label="字典名称:">
                    <el-input class="selectInput" v-model="dict.name" placeholder="请输入字典名称">
                    </el-input>
                </el-form-item>
            <el-form-item class="form-item" label="字典值:">
                    <el-input class="selectInput" v-model="dict.value" placeholder="请输入字典值">
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item" label="字典类型:">
                  <el-select placeholder="请选择字典类型" v-model="dict.type" class="tzhigg" size="small" @change="ckTypes(dict.type)">
          <el-option v-for="(val,i) in type" :key="i" :label="val" :value="val"></el-option>
        </el-select>
                    <!-- <el-input class="selectInput" v-model="dict.type" placeholder="请输入字典类型">
                    </el-input> -->
                </el-form-item>
                <el-form-item class="form-item" label="说明:">
                  <!-- <cu-editor :height="height" v-model="dict.description" @input="getset" model-events="change keydown blur focus paste" ></cu-editor> -->
                  <textarea name="" id="" cols="30" rows="10" v-model="dict.description" class="textt"></textarea>
                </el-form-item>
                
            </el-form>
    </cu-dialog>
  </div>
</template>
<script>
import { getquery, getdelete, getqueryType, getdictadd, getdictedit } from "@/api/aksApi/platformApi/operationPlatformApi.js";
import { mapState } from "vuex";

export default {
  props:{
      height: {
            type: Number,
            default: 200
        },
        data:{
          type: String,
            default: ''
        }
    },
  data() {
    return {
      value: 1,
      tableLoading: false,
      tableData: [],
      Total: 1,
      pageNum: 1,
      pageSize: 10,
      pageCount: 1,
      type1:'',
      row: 10,
      name:'',
      type:[],
      typeid:null,
      titles:'',
      dialogVisible: false,
      tableHeader: [
        {
          title: "id",
          key: "id",
        },
        {
          title: "字典名称",
          key: "name",
        },
        {
          title: "字典值",
          key: "value",
        },
        {
          title: "字典类型",
          key: "type",
        },
        {
          title: "说明",
          slot: "description",
        },
        {
          title: "创建人",
          key: "createBy",
        },
        {
          title: "创建时间",
          key: "createTime",
        },
        {
          title: "操作",
          slot: "operate",
        },
      ],
      dict:{
        createBy : '',
        createTime : '',
        description: '',
        id: 1,
        name:'',
        type:'',
        value: '',
      }
    };
  },
  created(){
    this.getquery()
    this.gettype()
  },
  computed:{
    handleHeight() {
      return this.row ? ((this.row + 1) * 42) + 1 : (11 * 42);
    },
    ...mapState(["vuex_user"])
  },
  methods: {
    ckTypes(id){
      this.type1 =''
      console.log(id);
      this.dict.type = id
    },
  async showOpsition(id){ //删除
      console.log(id);
      let params = {
        id: id
            }
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                getdelete(params).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getquery();
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        type: 'info',
                        message: '删除失败'
                    });
                });

            }).catch(() => {

            });
    },
    getset(val){
        console.log(val)
        this.dict.description=val
      },
      getinfoTagb(val){
        console.log(val)
        return val=val.replace(/\<[a-zA-Z]+\>|\<\/[a-zA-Z]+\>/ig, '')
      },
    getsech(){
      this.getquery()
    },
    async gettype(){ //字典类型
            getqueryType().then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                      console.log(res.data.data);
                      let data = res.data.data
                      this.type = res.data.data
                      console.log(this.type);
                    }
                })
    },
    handleSizeChange(val) {
      console.log(val);
      this.pageSize = val;
      this.getquery()
    },
    handleCurrentChange(val) {
      console.log(val);
      this.pageNum = val;
      this.getquery()
    },
    getadd(id,vlue){
      this.titles = ''
      console.log(id,vlue);
      this.dialogVisible = true
      if(id === 'add'){
        //添加
       this.titles ='新增数据'
       
      } else{
        this.titles ="编辑数据"
        this.dict = vlue
      }
    },
    getsetadd(id){

    },
    handleClose(){
      this.dialogVisible = false
    setTimeout(()=>{
          this.getquery()
        },0.1)
        this.dict.createBy = ''
        this.dict.createTime = ''
        this.dict.description=''
        this.dict.id=null
        this.dict.name=''
        this.dict.type=''
        this.dict.value= ''
    },
   async getinformationedits(){
      let params = this.dict
       params.createBy= this.vuex_user.id + ''
       params.createTime=this.dict.createTime || ''
       params.description= this.dict.description || ''
       params.id= this.dict.id || ''
       params.name= this.dict.name || ''
       params.type=this.dict.type || ''
       params.value= this.dict.value || '' 
       if(this.titles === '新增数据') {
        getdictadd(params).then(res => {
                   console.log(res);
                   if (res.data.code == 200) {
                       this.$message.success("新增信息成功")
                       this.getquery()
                       this.dialogVisible = false
                      }
                        }).catch((err) => {
                            console.log(err);
                        });
       } else{

        console.log(params);
        params.createTime=  ''
        getdictedit(params).then(res => {
          console.log(params);
                   console.log(res);
                   if (res.data.code == 200) {
                       this.$message.success("编辑信息成功")
                       this.getquery()
                       this.dialogVisible = false
                      }
                        }).catch((err) => {
                            console.log(err);
                        });
       }
       this.dict.createBy = ''
        this.dict.createTime = ''
        this.dict.description=''
        this.dict.id=null
        this.dict.name=''
        this.dict.type=''
        this.dict.value= ''
    },
    getquery(){
      let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                name: this.name || "",
                type: this.type1 || this.typeid 
            }
            console.log(params);
            this.tableData = []
            getquery(params).then(res => {
                console.log(res);
                if (res.data.code == 200) {
                    let data = res.data.data;
                    this.tableData = data.records;
                    this.row = data.records.length;
                    this.pageNum = data.current;
                    this.pageSize = data.size;
                    this.Total = data.total;
                    this.pageCount = data.pages;
                    this.tableLoading = false;
                    console.log(this.tableData);
                }
            }).catch((err) => {
                console.log(err);
            });
    }
  },
}
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
.add-form {
  margin: 40px auto;
  width: 60%;

  .el-form-item__content {
    flex: 1;
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
.tzhiggg{

    ::v-deep .el-input__inner{
        height: 31px !important;
    line-height: 31px !important;
}
}
.tzhigg{
    height: 40px !important;
    line-height: 40px !important;
    ::v-deep .el-input__inner{
        height: 40px !important;
    line-height: 40px !important;
    }
}
.textt{
  width: 418px;
  resize:none;
  border: 1px solid #DCDFE6 ;
  height: 200px;
  outline-color:#156cc2,
}
.orange {
  color: #ff480e !important;
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
// 按钮背景色

.bgGreen {
  background: #00c514;
}

.bgBlue {
  background: #156cc2;
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
</style>
