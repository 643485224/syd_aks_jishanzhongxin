<template>
  <div class="content_bodys">
    <div class="content_one">
      <h2>个人信息</h2>
      <div class="tabl">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="昵称:" prop="name" class="tabl-name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性别:" prop="resource">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
              <el-radio :label="3">保密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生日:" class="list">
            <!-- <el-select v-model="ruleForm.value3" placeholder="请选择">
      <el-option v-for="(val,i) in yearsLis" :key="i" :label="val.label" :value="val.value"></el-option>
    </el-select>
    &nbsp;年&nbsp;
    <el-select v-model="ruleForm.value2" placeholder="请选择">
      <el-option v-for="(val,i) in 12" :key="i" :label="val" :value="'0'+val"></el-option>
    </el-select>
    &nbsp;月&nbsp;
    <el-select v-model="ruleForm.value1" placeholder="请选择">
      <el-option v-for="(val,i) in 30" :key="i" :label="val" :value="val"></el-option>
    </el-select> -->
            <!-- &nbsp;日 -->
            <el-date-picker
              v-model="ruleForm.value1"
              type="date"
              format="yyyy-MM-dd"
              placeholder="选择日期"
            >
            </el-date-picker>
            &nbsp;&nbsp;<span>填生日有惊喜哦~</span>
          </el-form-item>
          <el-form-item label="上传图像:" prop="desc">
            <template>
              <cu-upload-image
                @uploadSuccess="upSuccess()"
                @remove="remove()"
                :files.sync="ruleForm.formItem5"
                @submit="submitFile(arguments, 'legalIdBackUrl')"
                width="163px"
                height="163px"
              ></cu-upload-image>
            </template>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getPersonalDetails,
  editPersonalDetails,
} from "@/api/aksApi/platformApi/retailPurchaseApi";
export default {
  data() {
    return {
      urlReturn: "",
      yearsLis: [],
      ruleForm: {
        name: "",
        value1: "", //日
        resource: "",
        desc: "",
        formItem5: [
          {
            name: "",
            url: "",
          },
        ],
      },
      imageUrl: "",
      rules: {
        name: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 3, max: 30, message: "长度在 30个字符", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getPersonalDetails();
  },
  methods: {
    remove(file, filelist) {
      this.ruleForm.formItem5 = [];
      this.urlReturn = "";
    },
    submitFile(args, type) {
      let res = args[0];
      if (res.code == 200) {
        this.urlReturn = res.data;
        this.$message.success("上传图片成功！");
        console.log(this.urlReturn, 54445);
      } else {
        this.$message.success("上传图片失败，请重试！");
      }
    },
    upSuccess(response, file, formItem5) {
      this.ruleForm.formItem5.push(file);
      console.log(this.ruleForm.formItem5, 9989);
      this.ruleForm.formItem5 = this.ruleForm.formItem5.slice(-1);
      console.log(this.ruleForm.formItem5, 9999);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editPersonalDetails();
        } else {
          console.log("error submit!!");
          return false;
          // this.$refs[formName].resetFields(); resource//清空
        }
      });
    },
    //获取
    async getPersonalDetails() {
      this.ruleForm.formItem5 = [];
      getPersonalDetails().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.tablsit = res.data;
          this.ruleForm.name = res.data.name;
          this.ruleForm.resource = res.data.sex;
          this.ruleForm.value1 = new Date(res.data.birthday).Format(
            "yyyy-MM-dd"
          );
          this.urlReturn = res.data.avator;
          this.ruleForm.formItem5 = [
            {
              name: "",
              url: this.urlReturn,
            },
          ];
          // var end = this.ruleForm.formItem5.slice(-1);
          // console.log(end);
          // this.ruleForm.formItem5 = end;
          // console.log(this.ruleForm.formItem5);
        }
      });
    },
    // 修改
    async editPersonalDetails() {
      let params = {

        id: this.tablsit.id,
    name: this.ruleForm.name,
    phone: this.tablsit.phone,
    username:null,
    password: null,
    avator: this.urlReturn,
    sex: this.ruleForm.resource,
    sysType: 5,
    birthday:new Date(this.ruleForm.value1).Format("yyyy-MM-dd ss:hh:mm"),
    status: true,
    regTime: this.tablsit.regTime,
    amount: 0,
    code: null
      };
      console.log(this.ruleForm.resource, 888);
      editPersonalDetails(params)
        .then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: "success",
              duration: 2000,
            });
            // this.getPersonalDetails();
          } else {
            this.getPersonalDetails();
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.getPersonalDetails();
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.avatar-uploader ::v-deep .el-upload {
  width: 140px;
  height: 140px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border: 1px dashed #d9d9d9;
  img {
    width: 100%;
    height: 100%;
  }
}
.avatar-uploader ::v-deep .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px;
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
.content_bodys {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  overflow: auto;
}
.content_one {
  width: 100%;
  background: #ffffff;
  padding: 20px 40px;
  h2 {
    padding-left: 40px;
    line-height: 56px;
    border-bottom: 1px solid #eeeeee;
    font-size: 20px;
    font-weight: bold;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    color: #00023a;
  }
  .tabl {
    width: 100%;
    padding-top: 20px;
    .tabl-name {
      ::v-deep .el-input__inner {
        width: 350px;
        line-height: 31px;
      }
    }
    .tabl-sr {
      ::v-deep .el-input__inner {
        width: 90px;
        line-height: 31px;
      }
    }

    ::v-deep .el-form-item__label {
      color: #00023a;
      font-size: 16px;
    }
    img {
      width: 140px;
      height: 140px;
    }
  }
}
.demo-ruleForm {
  span {
    font-size: 14px;
    font-family: Source Han Sans CN-Normal, Source Han Sans CN;
    font-weight: 400;
    color: #999999;
  }
}
.list {
  ::v-deep .el-input__inner {
    width: 220px;
    line-height: 31px;
  }
}
</style>
