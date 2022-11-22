<template>
  <div class="page-container table-page" ref="contentBox">
    <div class="search-bar">
    <div class="page-container table-page">
        <div class="search-bar">
            <div class="search-item">
                信息类型:&nbsp;
                <!-- <el-input class="selectInput" v-model="name">
                </el-input> -->
                <el-select v-model="name" placeholder="请选择信息类型" class="tzhigg">
                        <el-option label="通知公告" value="1"></el-option>
                        <el-option label="政策法规" value="2"></el-option>
                        <el-option label="友情链接" value="3"></el-option>
                    </el-select>
            </div>
            <div class="search-item">
                信息标题:&nbsp;
                 <el-input class="selectInput" v-model="phone" placeholder="请选择信息标题">
                </el-input>
                <!-- <el-select v-model="phone" placeholder="请选择信息标题" class="tzhigg">
                        <el-option label="通知公告-通知公告" value="1"></el-option>
                        <el-option label="通知公告-中标公告" value="2"></el-option>
                        <el-option label="通知公告-招标公告" value="3"></el-option>
                        <el-option label="政策法规-国家政策" value="4"></el-option>
                        <el-option label="政策法规-地方政策" value="5"></el-option>
                        <el-option label="政策法规-交易规则" value="6"></el-option>
                        <el-option label="友情链接-国家部委" value="7"></el-option>
                        <el-option label="友情链接-本地网站" value="8"></el-option>
                        <el-option label="友情链接-县政府" value="9"></el-option>
                    </el-select> -->
            </div>
            <el-button class="operation-btn search-btn" type="primary" @click="search">查询</el-button>
            <el-button class="operation-btn bgGreen" type="primary" @click="showDialog('add')">新增</el-button>
        </div>
        <cu-animation :type="'slideInRight'" :time=".5">
            <cu-table class="sale-table" :loading="tableLoading" :height="tableHeight" :showTitle="false"
                :tableHeader="tableHeader" :tableData="tableData" @handleSizeChange="handleSizeChange"
                @handleCurrentChange="handleCurrentChange" :total="total">
                <template slot="infoType" slot-scope="value">
                    {{ getinfoType(value.value.infoType)}}
                </template>
                <template slot="infoTag" slot-scope="value">
                    {{ getinfoTag(value.value.infoTag)}} <br/> {{value.value.title}}
                </template>
                <template slot="operate" slot-scope="value">
                    <el-button type="text" class="green" @click="showDialog('edit', value.value.id)">编辑</el-button>
                    <el-button v-if="value.value.status == 0" type="text" class="blue" @click="getinformationreleases(value.value.id)">发布</el-button>
                    <el-button type="text" class="orange" @click="getinformationdel(value.value)">删除</el-button>
                </template>
            </cu-table>
        </cu-animation>
        <cu-dialog :title="logisticsDriver.id ? '信息编辑' : '新增信息'" width="60vw" :visible="dialogVisible" :showClose="true" :rules="rules"
            @handleClose="handleClose" @handleOk="getinformationedits">
            <el-form class="add-form" :model="logisticsDriver" ref="editForm"  label-width="110px">
                <!-- <--:rules="rules" -->
                <el-form-item class="form-item" label="标题:" prop="title">
                    <el-input class="selectInput" v-model="logisticsDriver.title" placeholder="请输入标题">
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item" label="信息类型:" prop="infoType" >
                    <el-select v-model="getinfo[logisticsDriver.infoType]" placeholder="请选择信息类型" @change="getaddflag" >
                        <el-option label="通知公告" value="1"></el-option>
                        <el-option label="政策法规" value="2"></el-option>
                        <el-option label="友情链接" value="3"></el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item class="form-item" label="信息标记:" >
                       <el-select v-model=" getinfos[logisticsDriver.infoTag]" placeholder="请输入信息标记">
                        <el-option label="通知公告" value="1"></el-option>
                        <el-option label="中标公告" value="2"></el-option>
                        <el-option label="招标公告" value="3"></el-option>
                        <el-option label="国家政策" value="4"></el-option>
                        <el-option label="地方政策" value="5"></el-option>
                        <el-option label="交易规则" value="6"></el-option>
                        <el-option label="国家部委" value="7"></el-option>
                        <el-option label="本地网站" value="8"></el-option>
                        <el-option label="县政府" value="9"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form-item" label="信息来源:" >
                  <el-input class="selectInput" v-model="logisticsDriver.infoSource" placeholder="请输入信息来源">
                    </el-input>
                </el-form-item>
                <el-form-item class="form-item" label="跳转链接:" prop="linkUrl" v-if="addflag">
                    <el-input class="selectInput" type="tel" maxlength="11" v-model="logisticsDriver.linkUrl"
                        placeholder="请输入跳转链接">
                    </el-input>
                </el-form-item>
                <div class="add-form-images" v-if="!addflag">
                    <div class="label">上传图片:</div><!--<span class="require">*</span> -->
                    <div class="images">
                    <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-lazy v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-camera avatar-uploader-icon"> </i>
                    <div class="el-upload__text">添加照片</div>
                    </el-upload>
                    </div>
                </div>
                <div class="add-form-textarea" v-if="!addflag">
                     <div class="label labeltext">详情:</div> <!--<span class="require">*</span> -->
                   
                        <!-- <editor  api-key="cwn8p05pajn0e4lqcsdebji3pi1avzufrmc669o15pb1f58w" :disabled="disabled" :initial-value="initVal"
            :init="init()" v-model="logisticsDriver.detail" @change="getsts(logisticsDriver.detail)" model-events="change keydown blur focus paste"
            :output-format="outputFormat"></editor> -->
            <cu-editor :height="height" v-model="detail" @input="getset(logisticsDriver.detail)"  model-events="change keydown blur focus paste"></cu-editor>
            <!-- <cu-editor :height="height" v-model="dict.description" @input="getset" model-events="change keydown blur focus paste" ></cu-editor> -->
                        <!-- <textarea name="" id="" cols="30" rows="10" placeholder="这是文本框" class="textarea" v-model="logisticsDriver.detail"></textarea> -->
                
                </div>
            </el-form>
            <template #footer>
            </template>
        </cu-dialog>
    </div>
    </div>
  </div>
</template>
<script>
import {
  getinformationlist,
  getinformationadd,
  getinformationedit,
  getinformationdelete,
  getinformationrelease,
} from "@/api/aksApi/platformApi/operationPlatformApi.js";
import test from "@/cuview-ui/function/test.js";
import { mapState } from "vuex";
import { upload } from "@/api/aksApi/platformApi/commonApi.js"
export default {
   
    props: {
        height: {
            type: Number,
            default: 200
        },
    },
  data() {
    var checkMobile = (rule, value, callback) => {
      console.log(rule, value, callback, test.mobile);
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      if (!test.mobile(value)) {
        return callback(new Error("手机号码格式不正确"));
      }
      return callback();
    };
    return {
      getinfo:{
        1:'通知公告',
        2:'政策法规',
        3:'友情链接'
      },
      getinfos:{
        1:'通知公告',
        2:'中标公告',
        3:'招标公告',
        4:'国家政策',
        5:'地方政策',
        6:'交易规则',
        7:'国家部委',
        8:'本地网站',
        9:'县政府',
      },
      tableHeader: [
        {
          title: "信息类型",
          slot: "infoType",
        },
        {
          title: "信息标题",
          slot: "infoTag",
        },
        {
          title: "信息来源",
          key: "infoSource",
        },
        {           title: "发布时间",
                    key: "releaseTime",
            },
            {
                    title: "操作人",
                    key: "createBy",
            },
            {
                    title: "操作",
                    slot: "operate",
                },
            ],
            imageUrl: '',
            tableData: [],
            pageNum: 1,
            pageSize: 10,
            pageCount: 1,
            total: 1,
            name: "",
            phone: "",
            logisticsNo: null,
            row: 10,
            tableLoading: false,
            dialogVisible: false,
            editVisible: false,
            addflag:false,
            detail:null,
            logisticsDriver: {
                createBy: "1",
                hits: 0,
                id: 1,
                infoTag: 1,
                releaseTime: "",
                status: 1,
                title: "",//标题
                linkUrl: "",//链接
                infoType:null, // 类型
                detail:null,//文本框
                infoSource:''//信息来源
            },

            rules: {
                title: [
                    { required: true, message: '请输入标题', trigger: 'change' },
                    {min: 2, max: 20, message: '标题长度不得少于2个字符', trigger: 'blur',validator: checkMobile }
                ],
                linkUrl: [
                    { required: true, message: '请输入链接', trigger: 'blur' },
                ],
            }
        };
    },
    created() {
        this.getList();
        
    },
    mounted() {
    },
  
    computed: {
        tableHeight() {
            return this.row ? ((this.row + 1) * 42) + 1 : (11 * 42);
        },
        ...mapState(["vuex_user"])
    },
    
    methods: {
        handleAvatarSuccess(res, file) {
          upload(file.raw).then(res => {
                console.log(res);
                if(res.code ==200){
                    this.$message.success('上传图片成功!')
                } else{
                    this.$message.error('上传图片失败!')
                }
            })
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      
        getinfoType(time){
            console.log(time);
           if(time == 1){
            return '通知公告'
           } else if(time == 2){
            return '政策法规'
           } else if(time == 3){
            return '友情链接'
           }

        },
        getset(val){

        },
        // getRdito(value,id){
        //     console.log(value);
        //     console.log(id);
        //     this.logisticsDriver.detail = value
        //     console.log(this.logisticsDriver);
        // },
        getaddflag(id){
            console.log(id);
            this.addflag = false
            if(id==3){
                this.addflag = true
            } else {
                this.addflag = false
            }
        },
        getinfoTag(time){
            if(time == 1){
            return '通知公告'
           } else if(time == 2){
            return '中标公告'
           } else if(time == 3){
            return '招标公告'
           } else if(time == 4){
            return '国家政策'
           } else if(time == 5){
            return '地方政策'
           } else if(time == 6){
            return '交易规则'
           } else if(time == 7){
            return '国家部委'
           } else if(time == 8){
            return '本地网站'
           } else if(time == 9){
            return '县政府'
           }
        },
        search() {
            this.getList();
        },
        handleSizeChange(val) {
            console.log(val);
            this.pageSize = val;
            this.getList();
        },
        handleCurrentChange(val) {
            console.log(val);
            this.pageNum = val;
            this.getList();
        },
        async getList() {
            this.tableLoading = true;
            let params = {
                currPageNo: this.pageNum,
                pageSize: this.pageSize,
                title: this.phone || '',
                infoTag: this.name || ''
            };
            this.tableData = [];
            getinformationlist(params).then(res => {
                console.log(res);
                if (res.data.code == 200) {
                    let data = res.data.data;
                    this.tableData = data.records;
                    this.row = data.records.length;
                    this.pageNum = data.current;
                    this.pageSize = data.size;
                    this.total = data.total;
                    this.pageCount = data.pages;
                    this.tableLoading = false;
                    console.log(this.tableData);
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        async showDialog(type, id) {
            this.logisticsDriver = {}
            console.log(type, id);
            if (type == 'edit') {
                console.log(111);
                this.logisticsDriver = this.tableData.filter(item => item.id == id)[0];
                console.log(this.logisticsDriver);
                console.log(this.logisticsDriver.detail);
                this.detail = this.logisticsDriver.detail
                console.log(this.detail);
            }
            console.log('dialog');
            console.log(this.logisticsDriver);
            this.dialogVisible = true;
            if(this.logisticsDriver.infoType==3){
                                this.addflag = true
                            } else {
                                this.addflag = false
                            }
        },
        getinformationdel(Information) {
            let params =  Information
            params.releaseTime = ""
            this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                console.log(params);
                getinformationdelete(params).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.getList();
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
        getinformationreleases(information,status) {
            console.log(information);
            let params = {
                 id:information
            }
            if(status == 1){
                this.$message({
                        type: 'info',
                        message: '已经发布'
                    });
                    return
            }
            console.log(params);
            this.$confirm('此操作将发布该数据, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                getinformationrelease(params).then(res => {
                    console.log(res);
                    if (res.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '发布成功!'
                        });
                        this.getList();
                    }
                }).catch((err) => {
                    console.log(err);
                    this.$message({
                        type: 'info',
                        message: '发布失败'
                    });
                });

            }).catch(() => {

            });

        },
        handleClose() {
            this.$refs['editForm'].resetFields();
            this.dialogVisible = false;
            this.logisticsDriver.detail =''
        },
        getinformationedits() {
            console.log(this.$refs['editForm']);
            this.$refs['editForm'].validate((valid) => {
                console.log(valid);
                if (valid) {
                    let information = this.logisticsDriver
                    information.createBy = this.logisticsDriver.createBy,
                    information.detail = this.detail,
                    information.hits = this.logisticsDriver.hits,
                    information.id = this.logisticsDriver.id,
                    information.infoTag = this.logisticsDriver.infoTag,
                    information.infoType = this.logisticsDriver.infoType,
                    information.linkUrl = this.logisticsDriver.linkUrl,
                    information.releaseTime = " ",
                    information.status = this.logisticsDriver.status,
                    information.title = this.logisticsDriver.title,
                    information.infoSource = this.logisticsDriver.infoSource
                   console.log(information);
                    if ( information.id) {// 编辑信息
                        console.log(information);
                        getinformationedit(information).then(res => {
                            console.log(res);
                            if (res.data.code == 200) {
                                this.$message.success("编辑信息成功")
                                this.getList()
                        this.logisticsDriver.detail =''
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    } else {
                        console.log(information);
                        getinformationadd(information).then(res => {
                            console.log(res);
                            if (res.data.code == 200) {
                                this.$message.success("新增信息成功")
                                this.logisticsDriver.detail =''
                                this.getList()
                            }
                        }).catch((err) => {
                            console.log(err);
                        });
                    }
                    this.$refs['editForm'].resetFields();
                    this.dialogVisible = false;
                } else {
                    console.log('error submit!!');
                    return false;
                }

            });



        },
        exportData() {
        }
    },

}
</script>
<style lang="scss" scoped>
    .avatar-uploader ::v-deep .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border: 1px dashed #d9d9d9;
  }
  .avatar-uploader ::v-deep .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .el-upload__text{
    width: 100%;
    position: absolute;
    top: 74%;
    transform: translateY(-74%);
    color: #CBCBCB;
    font-size: 12px;
  }
  .avatar {
    width: 128px;
    height: 128px;
    display: block;
  }
.operation-btn {
    height: 32px;
    border: none;
    border-radius: 4px 4px 4px 4px;
}

// 按钮背景色
.bgOrange {
  background: #ff480e;
}

.bgGreen {
  background: #00c514;
}

.bgBlue {
  background: #156cc2;
}

.orange {
  color: #ff480e;
}
.blue {
  color: #409eff;
}
.tzhigg {
  height: 31px !important;
  line-height: 31px !important;
  ::v-deep .el-input__inner {
    height: 31px !important;
    line-height: 31px !important;
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
        height: 31px !important;
        line-height: 31px !important;
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
  .el-input--suffix {
    height: 31px !important;
    line-height: 31px !important;
  }
  .search-btn {
    background: #ff480e;
  }
    background: #ff480e;
}

.bgGreen {
    background: #00c514;
}

.bgBlue {
    background: #156cc2;
}

.orange {
    color: #ff480e;
}
.blue{
    color: #409EFF;
}
.green {
    color: #00c514;
}
.tzhigg{
    height: 31px !important;
    line-height: 31px !important;
    ::v-deep .el-input__inner{
        height: 31px !important;
    line-height: 31px !important;
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
    background: transparent;
    .search-item {
        margin-right: 18px;

        .el-input {
            width: 230px;

            ::v-deep .el-input__inner {
                height: 31px !important;
    line-height: 31px !important;
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
.el-input--suffix{
    height: 31px !important;
    line-height: 31px !important;
}
    .search-btn {
        background: #FF480E;

    }



}

.add-form {
  margin: 40px auto;
  width: 80%;

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
.label {
  margin-left: 30px;
}
.dispatch-details {
  display: flex;
  flex-wrap: wrap;
  padding: 50px;
  font-size: 16px;
  font-family: Source Han Sans CN-Medium, Source Han Sans CN;
  font-weight: 500;

  .dispatch-item {
    display: flex;
    align-items: center;
    width: calc((100% - 80px) / 2);
    margin: 20px 20px;

    .label {
      width: 90px;
      text-align: right;
      margin-right: 20px;
    }

    .require {
      color: red;
      vertical-align: sub;
    }

    .el-input,
    .el-select {
      flex: 1;
    }
  }

  .operation-row {
    display: flex;
    flex-flow: row-reverse;
    width: 100%;
    margin-right: 20px;
  }
}
.add-form-textarea {
  display: flex;
  margin-top: 10px;
  .labeltext {
    margin: 0 15px 0 44px;
    width: 47px;
    text-align: right;
  }
  .textarea {
    resize: none;
    width: 100%;;
    height: 200px;
     .tox-tinymce{
        height: 100% !important;
     }
    }
}
</style>
