<template>
<div class="page-container table-page">
    <div class="search-bar">
          <div class="search-item">
            关键字：
              <el-input class="selectInput" v-model="keyword" placeholder="请输入账户名称/姓名/手机号">
              </el-input>
          </div>
          <el-button class="operation-btn search-btn" type="primary" @click="search">查询</el-button>
          <el-button class="operation-btn" type="primary" @click="add('add')">新增</el-button>
      </div>
      <cu-animation :type="'slideInRight'" :time=".5">
        <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
                :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange" :total="orderTotal">
                <template slot="operate" slot-scope="value">
                    <el-button type="text" class="green" @click="add('edit',value.value)">编辑</el-button>
                    <el-button type="text" class="orange" @click="deletes(value.value.id)">删除</el-button>
                    <el-button type="text" v-if="!value.value.status == true" class="blue" @click="disable(value.value.id,true)">启用</el-button>
                    <el-button type="text" v-else class="blue" @click="disable(value.value.id,false)">禁用</el-button>
                </template>
                <template slot="watchType" slot-scope="value">
                    {{watch_type[value.value.watchType] }}
                </template>
                <template slot="status" slot-scope="value">
                    {{value.value.status?'可用':'禁用' }}
                </template>
            </cu-table>
        </cu-animation>
        <cu-dialog :title="titles" width="60vw"  :visible="visFalse" :showClose="true"
              @handleClose="handleClose" @handleOk="getinformationedits">
              <el-form class="add-form" :model="sysUserVo" :rules="rules"  ref="editAddForm"   label-width="110px">
              <el-form-item class="form-item" label="账号名称:"  prop="username">
                      <el-input class="selectInput" v-model="sysUserVo.username"  placeholder="请输入账号名称">
                      </el-input>
                  </el-form-item>
                  <el-form-item class="form-item"  label="监管部门类型:"  prop="watchType">
                    <el-select  v-model="sysUserVo.watchType" placeholder="请选择监管部门">
                    <el-option label="卫生健康部门 " value="1"></el-option>
                    <el-option label="医疗保障部门" value="2"></el-option>
                    <el-option label="药监部门" value="3"></el-option>
                    <el-option label="其他监管部门" value="4"></el-option>
                </el-select>
                  </el-form-item>
                  <el-form-item class="form-item"  label="手机号:"  prop="phone">
                      <el-input class="selectInput"  v-model="sysUserVo.phone"  placeholder="请输入手机号">
                      </el-input>
                  </el-form-item>
                  <el-form-item class="form-item" label="姓名:" prop="name" >
                      <el-input class="selectInput" v-model="sysUserVo.name"  placeholder="请输入姓名">
                      </el-input>
                  </el-form-item>
                  <el-form-item class="form-item" label="密码:" prop="password"   v-if="titles==='新增界面'" >
                      <el-input class="selectInput" v-model="sysUserVo.password"  placeholder="请输入密码">
                      </el-input>
                  </el-form-item>


              </el-form>
              <template #footer> </template>
      </cu-dialog>
    </div>
</template>
<script>
import { getuserquery, delUserById , updateUser, saveSysUser, signUser } from "@/api/aksApi/platformApi/operationPlatformApi.js";
export default {
    data () {
        return {
            tableLoading:false,
            keyword:null,
            titles:'',
            row: 10,
            pageNum: 1,
            pageSize: 10,
            visFalse:false,
            orderTotal:1,
            tableData: [],
            tableHeader: [
                {
                    title: "账号名称",
                    key: "username",
                },
                {
                    title: "监管部门类型",
                    slot: "watchType",
                },

                {
                    title: "姓名",
                    key: "name",
                },
                {
                    title: "手机号",
                    key: "phone",
                },
                {
                    title: "状态",
                    slot: "status",
                },
                {
                    title: "创建人",
                    key: "createBy",
                },
                {
                    title: "创建时间",
                    key:"createTime",
                },
                {
                    title: "操作",
                    slot: "operate",
                }
            ],
            watch_type:{
                1: '卫生健康部门',
                2: '医疗保障部门',
                3:'药监部门' ,
                4: '其他监管部门'
            },
            sysUserVo:{
                id:null,
                name:null,
                password:null,
                phone:null,
                username:'',
                watchType:null,
            },
            rules: {
             username: [
            { required: true, message: '请输入账号名称', trigger: 'blur' },
          ],
          watchType: [
            { required: true, message: '请选择监管部门类型', trigger: 'change' }
          ],
          name:[
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          phone:[
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          password:[
            { required: true, message: '请输入密码', trigger: 'blur' },
          ]
            }
        }
    },
    created(){
        this.getuserquery()
    },
    computed: {
        tableHeight() {
            return this.row ? ((this.row + 1) * 42) + 1 : (11 * 42);
        }
    },
    methods:{
        search(){
            this.getuserquery()
        },
        validate(val){
            console.log(val);
        },
        //禁用/启用
      async disable(id,status){
        let params = {
            id:id,
            status:status
        }
        console.log({id:id,status:status});
            signUser(params).then(res => {
                console.log(res);
                if(res.data.code == 200){
                    this.$message({
                            type: 'success',
                        message: res.data.message

                    });
                } else{
                    this.$message.error(res.data.message);
                }
                this.getuserquery()
            })
        },
        // 删除
       async deletes(id){
            console.log(id);

           await delUserById({id:parseInt(id)}).then(res => {
                console.log(res);
                if(res.data.code==200){
                    this.$message({
                            type: 'success',
                        message: res.data.message

                    });
                    this.getuserquery()
                }
            })
        },
        add(val,id){
            this.visFalse = true
            console.log(val,id);
            if (val=='add') {
                this.titles ='新增界面'
            } else {
                this.titles ='编辑'
            this.sysUserVo.id = id.id
            this.sysUserVo.name = id.name
            this.sysUserVo.password = id.password
            this.sysUserVo.phone = id.phone
            this.sysUserVo.username = id.username
            this.sysUserVo.watchType = id.watchType

            }
        },
        handleSizeChange(val){
            this.pageSize = val;
            this.getuserquery()
        },
        handleCurrentChange(val){
            this.pageNum = val;
            this.getuserquery()
        },
        handleClose(){
            this.visFalse = false
            this.sysUserVo.id = null
            this.sysUserVo.name = null
            this.sysUserVo.password = null
            this.sysUserVo.phone = null
            this.sysUserVo.username = null
            this.sysUserVo.watchType = null
            console.log(this.sysUserVo);

        },
        getinformationedits(){
            this.$refs["editAddForm"].validate((valid) => {
          if (valid) {
            if(this.titles == '编辑' ){
                updateUser(this.sysUserVo).then(res =>{
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                        message: res.data.message

                    });
                    this.getuserquery()
                    } else{
                        this.$message.error('编辑用户失败');
                    }

                }).catch(err => {
                console.log(err);
            })
            } else {
                let id = 100
                id++
                this.sysUserVo.id = id
                saveSysUser(this.sysUserVo).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                        message: '新增成功'
                    });
                    this.getuserquery()
                    } else{
                        this.$message.error('新增失败');
                    }
                })
            }
            this.$refs["editAddForm"].resetFields();
            this.visFalse = false
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        // this.getuserquery()
        },
        //查询
       async getuserquery(){
        this.tableLoading = true;
        console.log(this.pageNum,this.pageSize);
            let params={
                currPageNo: this.pageNum,
                pageSize:this.pageSize,
                keyword:this.keyword
            }
            getuserquery(params).then(res => {
                console.log(res);
                if(res.data.code == 200){
                    let data = res.data.data;
                    console.log(data);
                    this.tableData = data.records;
                    this.row = data.records.length;
                    this.pageNum = data.current;
                    this.pageSize = data.size;
                    this.orderTotal = data.total;
                    // this.pageCount = data.pages;
                    console.log(this.tableData);
                    this.tableLoading = false;
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.orange {
    color: #ff480e;
}

.green {
    color: #00c514;
}

.blue {
    color: #156cc2;
}
.operation-btn {
    height: 32px;
    border: none;
    border-radius: 4px 4px 4px 4px;
} .search-bar {
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

    .search-btn {
        background: #FF480E;

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
</style>
