<template>
  <div class="content">
    <div v-if="sfType == '供应商'">
      <el-form class="login_form demo-ruleForm" status-icon :label-position="'right'" :model="formGongYingShangValue"
        :rules="rulesformGongYingShangValue" ref="ruleFormGongYingShang" label-width="190px">
        <el-form-item label="企业类别" prop="qyType">
          <el-radio-group v-if="sfType == '供应商'" v-model="formGongYingShangValue.qyType">
            <el-radio :label="+value" class="el_radio" v-for="label,value in supplierTypes" :key="value">{{label}}
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="企业/单位名称" prop="unitName">
          <el-input v-model="formGongYingShangValue.unitName" placeholder="请输入企业/单位名称"></el-input>
        </el-form-item>
        <el-form-item label="企业统一编码" prop="unifiedCode">
          <el-input v-model="formGongYingShangValue.unifiedCode" placeholder="请输入企业统一编码"></el-input>
        </el-form-item>
        <el-form-item label="登录账户" prop="username">
          <el-input v-model="formGongYingShangValue.username" placeholder="可使用数字、字母，请谨记账号"></el-input>
        </el-form-item>
        <el-form-item label="联系人" prop="contactUser">
          <el-input v-model="formGongYingShangValue.contactUser" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="formGongYingShangValue.phone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
          <div class="flex_ac">
            <el-input v-model="formGongYingShangValue.captcha" placeholder="请输入验证码"></el-input>
            <el-button type="primary" class="size" @click="useVerify" :disabled="diflag">{{ titels }}<span
                v-if="diflag">({{ times }})</span></el-button>
          </div>
        </el-form-item>
        <el-form-item label="密码" prop="password1">
          <el-input show-password v-model="formGongYingShangValue.password1" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="password2">
          <el-input show-password v-model="formGongYingShangValue.password2" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="即时通" prop="msn">
          <el-input v-model="formGongYingShangValue.msn" placeholder="请输入即时通（qq或微信）"></el-input>
        </el-form-item>
        <el-form-item label="上传资格证书" prop="settleAnnexList">
          <el-upload action :http-request="httpRequestFunction" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <!-- 上传资格证书 -->
    </div>
    <el-checkbox class="flex mb_10" v-model="isYuedu" label="我已阅读《会员须知》并同意《入市协议》" name="type"></el-checkbox>
    <div class="login_form_button">
      <div class="login_form_submit" @click="onSubmit">
        <div class="login_form_submit_label">注册</div>
      </div>
    </div>

    <div class="ver">
      <Verify @success="success" :mode="pop" :captchaType="blockPuzzle" :imgSize="{ width: '330px', height: '155px' }"
        ref="verify"></Verify>
    </div>

    <el-dialog :visible.sync="dialogVisible">
      <img v-lazy width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>
  </div>
</template>
<script>
import {
  captcha,
  payCaptcha,
  buyerRegister,
  verify,
} from "@/api/aksApi/platformApi/loginApi";
import { upload } from "@/api/aksApi/platformApi/commonApi.js";
import Verify from "@/views/platformViews/Register/components/verifition/Verify.vue";
import test from "@/cuview-ui/function/test";
import { supplierTypes } from "@/utils/httpDataTypes.js";
export default {
  components: {
    Verify,
  },
  data() {
    var validateUserName = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入登录账户"));
      }
      if (!this.$cu.test.enOrNum(value)) {
        return callback(new Error("使用数字、字母组合，请谨记账号"));
      }
      return callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!test.password(value)) {
        return callback(new Error("密码需6-12位数字、字母组合"));
      } else {
        if (this.formCaiGouRenValue.password2 !== "") {
          this.$refs.ruleFormCaiGouRen.validateField("password2");
        }
        if (this.formGongYingShangValue.password2 !== "") {
          this.$refs.ruleFormGongYingShang.validateField("password2");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (
        value !== this.formCaiGouRenValue.password1 &&
        value !== this.formGongYingShangValue.password1
      ) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!test.mobile(value)) {
        return callback(new Error("手机格式不正确"));
      } else {
        callback();
      }
    };
    return {
      imageUrl: "", //验证码图片
      isLogin: false, //开启关闭加载中
      select: {
        username: false, //用户名
        password: false, //密码
        eyes: false, //密码眼睛
        code: false, //验证码
      },
      form: {
        username: "", //用户名
        password: "", //密码
        code: "", //验证码
      },
      supplierTypes,// 供应商类型
      sfType: "供应商", //采购商 或 供应商
      qyType: 1, //药品企业 或 药械企业
      isYuedu: false, // 我已阅读《会员须知》并同意《《入市协议》
      //   采购商注册
      formCaiGouRenValue: {
        unitName: "", // 企业/单位名称
        username: "", // 登录账户
        password1: "", // 设置密码
        password2: "", // 确认密码
        contactUser: "", // 联系人
        phone: "", // 手机号
        post: "", // 职务
        captcha: "", // 验证码
        unifiedCode: "", //企业统一编码
        msn: "", //即时通
      },
      rulesformCaiGouRenValue: {
        unitName: [
          { required: true, message: "请输入企业/单位名称", trigger: "blur" },
        ],
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUserName,
          },
        ],
        contactUser: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        phone: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
          },
        ],
        password1: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
        password2: [
          { required: true, trigger: "blur", validator: validatePass2 },
        ],
        post: [{ required: true, message: "请输入职务", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        unifiedCode: [
          { required: true, message: "请输入企业统一编码", trigger: "blur" },
        ], //企业统一编码
        msn: [{ required: false, message: "请输入即时通", trigger: "blur" }], //即时通
      },

      //   供应商注册
      formGongYingShangValue: {
        qyType: 1, // 企业类别
        unitName: "", // 企业/单位名称
        username: "", // 登录账户
        contactUser: "", // 联系人
        phone: "", // 手机号
        captcha: "", // 验证码
        password1: "", // 设置密码
        password2: "", // 确认密码
        unifiedCode: "", //企业统一编码
        msn: "", //即时通
        settleAnnexList: [], //上传附件
      },
      dialogVisible: false,
      dialogImageUrl: "",
      rulesformGongYingShangValue: {
        qyType: [
          { required: true, message: "请选择企业类别", trigger: "blur" },
        ],
        unitName: [
          { required: true, message: "请输入企业/单位名称", trigger: "blur" },
        ],
        username: [
          {
            required: true,
            trigger: "blur",
            validator: validateUserName,
          },
        ],
        contactUser: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        phone: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
          },
        ],
        password1: [
          { required: true, trigger: "blur", validator: validatePass },
        ],
        password2: [
          { required: true, trigger: "blur", validator: validatePass2 },
        ],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        unifiedCode: [
          { required: true, message: "请输入企业统一编码", trigger: "blur" },
        ],
        msn: [{ required: false, message: "请输入即时通", trigger: "blur" }],
        settleAnnexList: [
          {
            type: "array",
            required: true,
            message: "最少上传一张资格证书",
            trigger: "change",
          },
        ], //上传资格证书
      },

      blockPuzzle: "blockPuzzle",
      pop: "pop",
      falgs: false,
      titels: "获取验证码",
      diflag: false,
      times: 60,
      phonflag: true,
      phoneflag1: true,
    };
  },

  methods: {
    //自适应
    setRemUnit() {
      var docEl = document.documentElement;
      var rem = docEl.clientWidth / 10;
      let fontSize = docEl.style.fontSize.split("px")[0];
      let abs =
        document.body.clientHeight -
        document.getElementById("login-form").offsetHeight;
      if (document.getElementById("login-form")) {
        if (rem > (fontSize ? fontSize : 0) && abs < 100) {
          docEl.style.fontSize = (abs < 0 ? 180 : rem) - Math.abs(abs) + "px";
          return;
        }
      }
      docEl.style.fontSize = (rem > 180 ? 180 : rem) + "px";
    },
    // 获取验证码-接口
    captchaApi() {
      captcha()
        .then((res) => {
          this.imageUrl = URL.createObjectURL(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 通用-用户注册-接口
    buyerRegisterApi() {
      if (this.sfType == "采购商") {
        if (
          this.formCaiGouRenValue.password1 != this.formCaiGouRenValue.password2
        ) {
          this.$message.error("两次输入密码不一致，请重新输入！");
          return;
        }
        let valueData = {
          contactUser: this.formCaiGouRenValue.contactUser, //联系人
          password: this.formCaiGouRenValue.password2, //密码
          phone: this.formCaiGouRenValue.phone, //手机号
          post: this.formCaiGouRenValue.post, //职务
          qyType: this.qyType, //类型@ 1 医院   2  药店   3   个人
          sfType: this.sfType == "供应商" ? 1 : 2, //身份@ 1 供应商 2 采购商
          unitName: this.formCaiGouRenValue.unitName, //单位名称
          username: this.formCaiGouRenValue.username, //登录账号
          captcha: this.formCaiGouRenValue.captcha, //验证码
          unifiedCode: this.formCaiGouRenValue.unifiedCode, //企业统一编码
          msn: this.formCaiGouRenValue.msn, //即时通
        };
        console.log("valueData:", valueData);
        buyerRegister(valueData)
          .then((res) => {
            if (res.code == 200) {
              if (res.code == 200) {
                this.$emit("registerSuccess");
              } else {
                this.$message.error(res.message);
              }
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else if (this.sfType == "供应商") {
        if (
          this.formGongYingShangValue.password1 !=
          this.formGongYingShangValue.password2
        ) {
          this.$message.error("两次输入密码不一致，请重新输入！");
          return;
        }
        let valueData = {
          contactUser: this.formGongYingShangValue.contactUser, //联系人
          password: this.formGongYingShangValue.password2, //密码
          phone: this.formGongYingShangValue.phone, //手机号
          qyType: this.qyType, //类型@ 1 药品企业 2 器械企业
          sfType: this.sfType == "供应商" ? 1 : 2, //身份@ 1 供应商 2 采购商
          unitName: this.formGongYingShangValue.unitName, //单位名称
          username: this.formGongYingShangValue.username, //登录账号
          captcha: this.formGongYingShangValue.captcha,
          unifiedCode: this.formGongYingShangValue.unifiedCode, //企业统一编码
          msn: this.formGongYingShangValue.msn, //即时通
          settleAnnexList: this.formGongYingShangValue.settleAnnexList, //上传资格证书
        };
        console.log("valueData:", valueData);
        buyerRegister(valueData)
          .then((res) => {
            if (res.code == 200) {
              this.$emit("registerSuccess");
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    // 点击跳转
    clickRuterButton(value) {
      if (value == "/login") {
        if (this.sfType == "供应商") {
          this.$store.commit("switchPlatform", "supplier");
          this.$router.push("/login");
        } else if (this.sfType == "采购商") {
          this.$store.commit("switchPlatform", "purchaser");
          this.$router.push("/login");
        }
      } else {
        this.$router.push(value);
      }
    },
    // 动画重置
    platformChange() {
      if (this.sfType == "采购商") {
        this.resetForm("ruleFormCaiGouRen"); // 表单重置
      } else if (this.sfType == "供应商") {
        this.resetForm("ruleFormGongYingShang"); // 表单重置
      }
      this.$refs.verify.closeBox(); //刷新
      this.times = 0;
      console.log("1:", this.times);
      this.$refs.cu_animation.again();
      this.$store.commit("switchPlatform", this.currentPlatform);
    },
    // 表单重置
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.qyType = 1;
      this.isYuedu = false;
      //   采购商注册-重置
      this.formCaiGouRenValue.unitName = ""; // 单位名称
      this.formCaiGouRenValue.username = ""; // 登录账户
      this.formCaiGouRenValue.password1 = ""; // 设置密码
      this.formCaiGouRenValue.password2 = ""; // 确认密码
      this.formCaiGouRenValue.contactUser = ""; // 联系人
      this.formCaiGouRenValue.phone = ""; // 手机号
      this.formCaiGouRenValue.post = ""; // 职务
      this.formCaiGouRenValue.captcha = ""; // 验证码
      this.formCaiGouRenValue.value9 = false; // 我已阅读《会员须知》并同意《《入市协议》
      this.formCaiGouRenValue.unifiedCode = ""; //企业统一编码
      this.formCaiGouRenValue.msn = ""; //即时通
      //   供应商注册-重置
      this.formGongYingShangValue.unitName = ""; // 单位名称
      this.formGongYingShangValue.username = ""; // 登录账户
      this.formGongYingShangValue.phone = ""; // 手机号
      this.formGongYingShangValue.captcha = ""; // 验证码
      this.formGongYingShangValue.password1 = ""; // 设置密码
      this.formGongYingShangValue.password2 = ""; // 确认密码
      this.formGongYingShangValue.unifiedCode = ""; //企业统一编码
      this.formGongYingShangValue.msn = ""; //即时通
      this.formGongYingShangValue.settleAnnexList = []; //上传资格证书
    },
    // 登录按钮
    onSubmit() {
      if (this.sfType == "采购商") {
        this.submitForm("ruleFormCaiGouRen"); // 表单重置
      } else if (this.sfType == "供应商") {
        this.submitForm("ruleFormGongYingShang"); // 表单重置
      }
    },
    // 表单验证
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isYuedu) {
            this.buyerRegisterApi();
          } else {
            this.$message.info(
              "请先勾选我已阅读《会员须知》并同意《《入市协议》"
            );
          }
        } else {
        }
      });
    },

    useVerify() {
      if (this.sfType == "采购商") {
        if (this.formCaiGouRenValue.phone == "") {
          this.falgs = false;
        } else {
          this.falgs = true;
        }
      } else if (this.sfType == "供应商") {
        if (this.formGongYingShangValue.phone == "") {
          this.falgs = false;
        } else {
          this.falgs = true;
        }
      }

      if (this.falgs) {
        this.$refs.verify.show();
      } else {
        this.$message.error("请输入手机号后再获取验证码！");
      }
    },
    success(params) {
      verify(params).then((res) => {
        if (res.repMsg == "成功") {
          this.times = 60;
          let tims = setInterval(() => {
            console.log("2:", this.times);

            if (this.times == 0) {
              this.diflag = false;
              clearInterval(tims);
              this.titels = "获取验证码";
            } else {
              this.diflag = true;
              this.titels = "已发送验证码";
              this.times--;
            }
          }, 1000);
          let phone = "";
          if (this.sfType == "采购商") {
            phone = this.formCaiGouRenValue.phone;
          } else if (this.sfType == "供应商") {
            phone = this.formGongYingShangValue.phone;
          }

          let params = {
            phone: phone,
          };
          payCaptcha(params).then((res) => {
            if ((res.code = 200)) {
              if (this.sfType == "采购商") {
                this.formCaiGouRenValue.captcha = "";
              } else if (this.sfType == "供应商") {
                this.formGongYingShangValue.captcha = "";
              }
            }
          });
        }
      });
      // params 返回的二次验证参数, 和登录参数一起回传给登录接口，方便后台进行二次验证
    },

    handleRemove(file, fileList) {
      this.formGongYingShangValue.settleAnnexList.forEach(
        (value, index, array) => {
          //value为遍历的当前元素，index为当前索引，array为正在操作的数组
          if (value.annexName == file.name) {
            array.splice(index, 1);
          }
        }
      );
      this.onSubmit(); //表单验证
    },

    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    async httpRequestFunction(itemData) {
      console.log("itemData:", itemData);
      let objectsss = {
        annexName: "",
        annexUrl: "",
      };
      objectsss.annexName = itemData.file.name;
      await upload(itemData.file).then((res) => {
        console.log(res);
        if (res.code == 200) {
          objectsss.annexUrl = res.data;
          this.formGongYingShangValue.settleAnnexList.push(objectsss);
          this.$message.success("上传图片成功!");
        } else {
          this.$message.error("上传图片失败!");
        }
      });
      await this.onSubmit(); //表单验证
    },
  },
};
</script>
<style lang="scss" scoped>
$baseRem: 75;

/*@function double($n) {
    　　　　@return $n / $baseRem;　　}*/
// 1920*1080 状态下 rpxToRem(1) == 2.3266px
@function rpxToRem($args) {
  @return calc($args/$baseRem) * 1rem;
}

//隐藏滚动条
// .login::-webkit-scrollbar {
//   display: none;
// }

/* （宽度为 414px） 或者更大尺寸的屏幕 */
@media only screen and (max-height: 1840px) {
  .registerRight {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // align-items: center;
  }
}

.content {
  width: 760px;
  margin: 0 auto;

  ::v-deep .el-input__inner {
    height: 46px;
  }
}

.login_form {
  color: #020552;

  .formTitle1 {
    font-size: 36px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }

  .formTitle2 {
    font-size: 16px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #02076F;
  }


  ::v-deep .el-form-item__label,
  ::v-deep .el-form-item__content,
  .el-input,
  ::v-deep .el-radio__label,
  ::v-deep .el-checkbox__label {
    font-size: rpxToRem(10);
    color: #020552;

  }

  ::v-deep .el-input__inner {
    color: #020552;
  }

  ::v-deep .el-radio {
    margin-top: rpxToRem(4);
    margin-bottom: rpxToRem(4);
  }

  ::v-deep.el-radio__inner {
    width: 20px;
    height: 20px;
  }

  ::v-deep.el-radio__input {
    vertical-align: inherit;
  }

}


// .el_radio {
//   width: 120px;
// }

.login_form_button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login_form_submit {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: rpxToRem(22.47);
  background: #ff480e;

  .login_form_submit_label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: rpxToRem(10);
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    z-index: 2;
  }
}

.login_form_submit:hover {
  transform: scale(1.01);
}
</style>
