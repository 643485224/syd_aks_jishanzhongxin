<template>
  <!-- 零购平台=>评价晒单列表=>追评页面 -->
  <div class="contentBox" ref="contentBox">
    <div class="contentBox1">
      <div class="contentBox11">
        <img src="" alt="" />
      </div>
      <div class="contentBox12">
        旧街场（OLDTOWN）马来西亚进口白咖啡三合一速溶咖啡 原味684g+榛果味684g
      </div>
      <div class="contentBox13">168.00</div>
      <div class="contentBox14">原味684g+榛果味684g</div>
    </div>
    <div class="contentBox2">
      <div class="contentBoxTop1">2022-11-08 13:30</div>
      <div class="contentBoxTop2">
        <el-rate
          v-model="formData.formItem1"
          :colors="['#99A9BF', '#ff480ebf', '#FF480E']"
          :show-text="false"
          :texts="['非常差', '差', '一般', '好', '非常好']"
          @change="elRateChange($event, 'formItem1')"
        >
        </el-rate>
      </div>
      <el-form
        class="phoneDialogClass"
        :label-position="'right'"
        :model="formData"
        :rules="rulesformData"
        ref="refformData"
        label-width="110px"
      >
        <el-form-item label="其他描述">
          <el-input
            type="textarea"
            style="width: 336px"
            placeholder="请输入其他描述"
            v-model="formData.formItem2"
            :autosize="{ minRows: 5, maxRows: 5 }"
          ></el-input>
        </el-form-item>

        <el-form-item label="上传照片">
          <template>
            <cu-upload-image
              @uploadSuccess="upSuccess()"
              :files.sync="formData.formItem3"
              @submit="submitFile(arguments, 'legalIdBackUrl')"
              width="163px"
              height="163px"
            ></cu-upload-image>
          </template>
        </el-form-item>
      </el-form>

      <div class="contentBox21">
        <el-button class="contentBox211" type="default" @click="handleClose()"
          >取消</el-button
        >
        <el-button class="contentBox212" type="primary" @click="handleOk()"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      urlReturn: "", //上传图片后 接口返回的路径
      // 表单数据
      formData: {
        formItem1: null,
        formItem2: "",
        formItem3: [
          //   {
          //     name: "",
          //     url: "https://ydwsrz-20220710.eos-xinjiang-1.cmecloud.cn/upload/202211/marker.png",
          //   },
        ],
      },
      // 表单验证
      rulesformData: {
        formItem1: [],
        formItem2: [],
        formItem3: [],
      },
    };
  },
  mounted() {
    this.resetForm("refformData");
  },
  methods: {
    submitFile(args, type) {
      let res = args[0];
      if (res.code == 200) {
        this.urlReturn = res.data;
        this.$message.success("上传图片成功！");
      } else {
        this.$message.success("上传图片失败，请重试！");
      }
    },
    // 评分改变回调
    elRateChange(value, name) {
      this.formData[name] = value;
      this.$refs.refformData.validateField(name); //重置表单
    },
    // 上传成功钩子函数
    upSuccess(response, file, formItem3) {
      this.formData.formItem3.push(file);
      this.$refs.refformData.validateField("formItem3"); //重置表单
    },

    // 取消按钮
    handleClose() {
      this.$router.go(-1);
    },
    // 确定按钮
    handleOk() {
      this.submitForm("refformData");
    },
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 成功
          if (formName == "refformData") {
            console.log("this.formData:", this.formData);
          }
        } else {
          // 失败
        }
      });
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.formData.formItem1 = null;
      this.formData.formItem2 = "";
      this.formData.formItem3 = [];
    },
  },
};
</script>
<style lang="scss" scoped>
.contentBox {
  width: 100%;
  height: calc(100% - 59px);
  overflow: auto;
  background: #ffffff;
  display: flex;
  .contentBox1 {
    width: 550px;
    .contentBox11 {
      margin: 64px auto 0px;
      width: 143px;
      height: 143px;
      img {
        width: 143px;
        height: 143px;
      }
    }
    .contentBox12 {
      margin: 24px auto 0px;
      width: 180px;
      text-align: center;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #020552;
    }
    .contentBox13 {
      margin: 21px 0px 0px 0px;
      text-align: center;
      font-size: 14px;
      font-family: Source Han Sans CN-Bold, Source Han Sans CN;
      font-weight: bold;
      color: #020552;
    }
    .contentBox14 {
      margin: 5px auto 0px;
      width: 180px;
      text-align: center;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }
  }
  .contentBox2 {
    margin-top: 64px;
    width: 650px;
    .contentBoxTop1 {
      margin-left: 42px;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }
    .contentBoxTop2 {
      margin: 21px 0px 36px 42px;
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }
    .contentBox21 {
      display: flex;
      justify-content: flex-end;
      margin: 80px 105px 0px 0px;
      .contentBox211 {
        width: 120px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .contentBox212 {
        margin-left: 45px;
        width: 120px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}

// 表单标签样式
::v-deep .el-form-item__label {
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  color: #00023a;
}
// 评分样式
::v-deep .el-rate {
  height: 35px;
}
::v-deep .el-rate__icon {
  font-size: 35px;
}
</style>
