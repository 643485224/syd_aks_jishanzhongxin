<template>
    <div class="page-container table-page" ref="contentBox">
      <div class="search-bar">
        <div class="search-item">   
            类目名称：
          <el-input placeholder="请输入类目名称" v-model="name"> </el-input>
        </div>
        <div class="search-item">
          父级名称:
          <!-- <el-input placeholder="请输入父级id" v-model="type1"> </el-input> -->
          <!-- <el-select placeholder="请选择父级id" v-model="type1" class="tzhiggs" size="small" @change="ckTypes(type1)">
            <el-option v-for="val in type" :key="val.index" :label="val.name" :value="val.id"></el-option>
          </el-select> -->
          <el-cascader
        class="tzhiggg"
    v-model="selectdrus"
    :options="options"
    ref="cascaderArr"
    @change="handleChan"
    ></el-cascader>
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
        <!-- <template slot="description" slot-scope="value">
                    {{ getinfoTags(value.value.description)}}
                </template> -->
          <template slot="operate" slot-scope="value">
            <el-button type="text" @click="getadd('edit', value.value)" class="green">编辑</el-button>
            <el-button type="text" class="orange" @click="showOpsition(value.value.id)" 
              >删除</el-button>
              <el-button type="text" class="blue" @click="getshowinfo(value.value.id)">详情</el-button>
          </template>
        </cu-table>
      </cu-animation>
      <cu-dialog :title="titles" width="60vw"  :visible="dialogVisible" :showClose="true"
              @handleClose="handleClose" @handleOk="getinformationedits">
              <el-form class="add-form" :model="dict"  label-width="110px">
              <el-form-item class="form-item" label="排序号:">
                      <el-input class="selectInput" v-model="dict.sortOrder" placeholder="请输入排序号">
                      </el-input>
                  </el-form-item>
              <el-form-item class="form-item" label="父级名称:">
                      <el-input class="selectInput" v-model="dict.pid" placeholder="请输入父级名称">
                      </el-input>
                  </el-form-item>
                  <el-form-item class="form-item" label="类目名称:">
                    <el-select placeholder="请选择类目名称" v-model="dict.name" class="tzhigg" size="small" @change="ckTypes(dict.name)">
            <el-option v-for="(val,i) in type" :key="i" :label="val.name" :value="val.name"></el-option>
          </el-select>
                      <!-- <el-input class="selectInput" v-model="dict.type" placeholder="请输入字典类型">
                      </el-input> -->
                  </el-form-item>
                  <el-form-item class="form-item" label="说明:">
                    <!-- <cu-editor  :height="height" v-model="dict.description" @input="getsets(dict.description)" ></cu-editor> -->
                    <textarea name="" id="" cols="30" rows="10" v-model="dict.description" class="textt"></textarea>
                  </el-form-item>
                  
              </el-form>
      </cu-dialog>
      <cu-dialog title="详情" width="60vw"  :visible="dialogVisible1"
              @handleClose="handleClose1" @handleOk="handleClose1">
                <div class="info">
                    <div class="info-title">
                        <span class="title-iocn1">排序号:</span>
                        <span class="title-iocn2">{{getinfo.sortOrder}}</span>
                    </div>
                    <div class="info-title">
                        <span class="title-iocn1">类目名称:</span>
                        <span class="title-iocn2">{{getinfo.name}}</span>
                    </div>
                    <div class="info-title">
                        <span class="title-iocn1">父级名称:</span>
                        <span class="title-iocn2">{{getinfo.pid}}</span>
                    </div>
                    <div class="info-title">
                        <span class="title-iocn1">说明:</span>
                        <span class="title-iocn2">{{getinfo.description}}</span>
                    </div>
                    <div class="info-title">
                        <span class="title-iocn1">创建人:</span>
                        <span class="title-iocn2">{{getinfo.createBy}}</span>
                    </div>
                    <div class="info-title">
                        <span class="title-iocn1">创建时间:</span>
                        <span class="title-iocn2">{{getinfo.createTime}}</span>
                    </div>
                </div>
      </cu-dialog>
    </div>
  </template>
  <script>
  import { getsaleCategoryquery, getsaleCategorydelete, getselect, getsaleCategoryadd, getsaleCategoryedit, getsaleCategoryinfo } from "@/api/aksApi/platformApi/operationPlatformApi.js";
  import { mapState } from "vuex";
  
  export default {
    props:{
      height: {
            type: Number,
            default: 250
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
        type1:null,
        row: 10,
        name:'',
        type:[],
        titles:'',
        dialogVisible: false,
        dialogVisible1: false,
        getinfo:[],
        tableHeader: [
          {
            title: "排序号",
            key: "sortOrder",
          },
          {
            title: "类目名称",
            key: "name",
          },
          {
            title: "父级名称",
            key: "pid",
          },
          {
            title: "说明",
            slot: "description",
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
        deleteFlag: '',
          createTime : '',
          description: '',
          id: 1,
          name:'',
          sortOrder:null,
          pid: null,
        },
      selectdrus:[], 
      options:[],
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
        handleClose1(){
            this.dialogVisible1 = false
        },
        getsets(val){
        console.log(val)
        this.dict.description=val
      },
      handleChan(row){
      console.log(row);
      if(row.length==1){
        this.type1 = row[0]
      } else{ 
        this.type1 =row[row.length-1]
      }
    },
        getinfoTags(val){

        },
     async  getshowinfo(id){ //详情
        console.log(id);
        this.getinfo = []
        let params = {
          id: id}
        getsaleCategoryinfo(params).then(res => {
            console.log(res);
            if(res.data.code == 200) {
            this.dialogVisible1 = true
            this.getinfo = res.data.data
        console.log(this.getinfo);
            
            }
        }).then(err => {
        })
        },
      ckTypes(id){
        console.log(id);
        this.dict.name = id
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
                getsaleCategorydelete(params).then(res => {
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
      getsech(){
        this.getquery()
      },
      async gettype(){ //字典类型
       let res = await getselect()
       console.log(res,1111);
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
        }
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
          this.dict.deleteFlag= ''
          this.dict.createTime= ''
          this.dict.description= ''
          this.dict.id= 1
          this.dict.name=''
          this.dict.sortOrder=null
          this.dict.pid= null
      },
     async getinformationedits(){
        let params = this.dict
         params.createTime=this.dict.createTime || ''
         params.description= this.dict.description || ''
         params.id= this.dict.id || ''
         params.name= this.dict.name || ''
         params.pid=this.dict.pid || ''
         params.sortOrder= this.dict.sortOrder || '' 
         if(this.titles === '新增数据') {
            getsaleCategoryadd(params).then(res => {
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
          getsaleCategoryedit(params).then(res => {
            console.log(params);
                     console.log(res);
                     if (res.data.code == 200) {
                         this.$message.success("编辑商城分类信息成功")
                         this.getquery()
                         this.dialogVisible = false
                        }
                          }).catch((err) => {
                              console.log(err);
                          });
         }
         this.dict.deleteFlag= ''
          this.dict.createTime= ''
          this.dict.description= ''
          this.dict.id= 1
          this.dict.name=''
          this.dict.sortOrder=null
          this.dict.pid= null
       
      },
      getquery(){
        let params = {
                  currPageNo: this.pageNum,
                  pageSize: this.pageSize,
                  name: this.name || "",
                  pid: this.type1 || ""
              }
              console.log(params);
              getsaleCategoryquery(params).then(res => {
                  console.log(res);
                  if (res.data.code == 200) {
                      let data = res.data.data;
                      console.log(data,2222);
                      this.tableData = data.records;
                      this.row = data.records.length;
                      this.pageNum = data.current;
                      this.pageSize = data.size;
                      this.Total = data.total;
                      this.pageCount = data.pages;
                      this.tableLoading = false;
                      console.log(this.tableData,2222);
                  }
              }).catch((err) => {
                  console.log(err);
              });
      }
    },
  }
  </script>
  <style lang="scss" scoped>
    .tzhiggg{
  line-height: 25px;
::v-deep .el-input__inner{
    height: 31px !important;
line-height: 31px !important;
}
}
    .info{
        padding: 20px 20px 0px 220px;
        .info-title{
            display: flex;
            .title-iocn1{
                width: 100px;
                text-align: right;
                font-size: 15px;
                font-family: Source Han Sans CN-Regular, Source Han Sans CN;
                font-weight: 400;
                color: #999999;
                line-height: 32px;
            }
            .title-iocn2{
                margin-left: 15px;
                font-size: 15px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #00023A;
            line-height: 32px;
            }
        }
    }
.blue{
    color: #409EFF;
}
.tzhiggs{
  height: 31px !important;
    line-height: 31px !important;
  ::v-deep .el-input__inner{
        height: 31px !important;
    line-height: 31px !important;
  }
}
.green {
    color: #00c514;
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
  .tzhigg{
      height: 40px !important;
      line-height: 40px !important;
      ::v-deep .el-input__inner{
          height: 40px !important;
      line-height: 40px !important;
      }
  }
  .textt{
    width: 100%;
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
  