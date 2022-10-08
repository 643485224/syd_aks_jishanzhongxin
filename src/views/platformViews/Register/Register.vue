<template>
  <div class="login">
    <!--如果有轮播的话: 轮播位置-->
    <cu-animation ref="cu_animation" :type="'flipInY'" :time="0.5">
      <div class="registerLeft">
        <div class="registerLeft_img"></div>
        <div class="registerLeft_body">
          <div class="registerLeft_title">
            阿克苏药品集散中心
            <div class="registerLeft_title_wight">
              网数融综管运服平台
              <span v-if="sfType == '采购商'">采购商注册</span>
              <span v-if="sfType == '供应商'">供应商注册</span>
            </div>
          </div>
          <div class="registerLeft_titleX">欢迎您的加盟！</div>
        </div>
      </div>
    </cu-animation>
    <cu-animation ref="cu_animation" :type="'flipInY'" :time="0.5">
      <div class="registerRight">
        <div class="formTopTitle">
          <div class="formTopTitle_one" @click="clickRuterButton('/login')">
            已有账号，前往登录
          </div>
          <div
            class="formTopTitle_two"
            @click="clickRuterButton('/webHomePage')"
          >
            网站首页
          </div>
        </div>
        <div class="login_form" id="login-form">
          <div class="login-form-body">
            <div
              v-loading="isLogin"
              element-loading-text="加载中，请稍后"
              element-loading-spinner="el-icon-loading"
            >
              <div class="flex formTitle1">注册账户</div>
              <div class="flex formTitle2 mb_20">SOURCEHANSANSCNREGULAR</div>
              <div class="flex_ac mb_20">
                <div class="form_lable">身份选择</div>
                <el-radio-group v-model="sfType" @change="platformChange()">
                  <el-radio label="采购商" class="el_radio">采购商</el-radio>
                  <el-radio label="供应商" class="el_radio">供应商</el-radio>
                </el-radio-group>
              </div>
              <div class="flex_ac mb_20">
                <div class="form_lable">类型选择</div>
                <el-radio-group v-if="sfType == '采购商'" v-model="qyType">
                  <el-radio :label="1" class="el_radio">医院</el-radio>
                  <el-radio :label="2" class="el_radio">药店</el-radio>
                  <el-radio :label="3" class="el_radio">个人</el-radio>
                </el-radio-group>
                <el-radio-group v-if="sfType == '供应商'" v-model="qyType">
                  <el-radio :label="1" class="el_radio">药品企业</el-radio>
                  <el-radio :label="2" class="el_radio">药械企业</el-radio>
                </el-radio-group>
              </div>
              <div v-if="sfType == '采购商'">
                <el-form
                  :label-position="'right'"
                  :model="formCaiGouRenValue"
                  :rules="rulesformCaiGouRenValue"
                  ref="ruleFormCaiGouRen"
                  label-width="120px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="企业/单位名称" prop="unitName">
                    <el-input
                      v-model="formCaiGouRenValue.unitName"
                      placeholder="请输入企业/单位名称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="登录账户" prop="username">
                    <el-input
                      v-model="formCaiGouRenValue.username"
                      placeholder="可使用数字、字母，请谨记账号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="密码" prop="password1">
                    <el-input
                      v-model="formCaiGouRenValue.password1"
                      placeholder="请输入密码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="password2">
                    <el-input
                      v-model="formCaiGouRenValue.password2"
                      placeholder="请输入确认密码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="联系人" prop="contactUser">
                    <el-input
                      v-model="formCaiGouRenValue.contactUser"
                      placeholder="请输入联系人"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="phone">
                    <el-input
                      v-model="formCaiGouRenValue.phone"
                      placeholder="请输入手机号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="验证码" prop="captcha">
                    <div class="flex">
                      <el-input
                        v-model="formCaiGouRenValue.captcha"
                        placeholder="请输入验证码"
                      ></el-input>
                      <el-button
                        type="primary"
                        class="size"
                        @click="useVerify"
                        :disabled="diflag"
                        >{{ titels
                        }}<span v-if="diflag">({{ times }})</span></el-button
                      >
                    </div>
                  </el-form-item>
                  <el-form-item label="职务" prop="post">
                    <el-input
                      v-model="formCaiGouRenValue.post"
                      placeholder="请输入职务"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <div v-if="sfType == '供应商'">
                <el-form
                  :label-position="'right'"
                  :model="formGongYingShangValue"
                  :rules="rulesformGongYingShangValue"
                  ref="ruleFormGongYingShang"
                  label-width="120px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="企业/单位名称" prop="unitName">
                    <el-input
                      v-model="formGongYingShangValue.unitName"
                      placeholder="请输入企业/单位名称"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="登录账户" prop="username">
                    <el-input
                      v-model="formGongYingShangValue.username"
                      placeholder="可使用数字、字母，请谨记账号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="phone">
                    <el-input
                      v-model="formGongYingShangValue.phone"
                      placeholder="请输入手机号"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="验证码" prop="captcha">
                    <div class="flex_ac">
                      <el-input
                        v-model="formGongYingShangValue.captcha"
                        placeholder="请输入验证码"
                      ></el-input>
                      <el-button
                        type="primary"
                        class="size"
                        @click="useVerify"
                        :disabled="diflag"
                        >{{ titels
                        }}<span v-if="diflag">({{ times }})</span></el-button
                      >
                    </div>
                  </el-form-item>
                  <!-- <el-form-item label="手机验证码" prop="value_9">
                  <el-input
                    v-model="formGongYingShangValue.value_9"
                    placeholder="请输入手机验证码"
                  ></el-input>
                </el-form-item> -->
                  <el-form-item label="设置密码" prop="password1">
                    <el-input
                      v-model="formGongYingShangValue.password1"
                      placeholder="请输入密码"
                    ></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码" prop="password2">
                    <el-input
                      v-model="formGongYingShangValue.password2"
                      placeholder="请输入密码"
                    ></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <el-checkbox
                class="flex mb_10"
                v-model="isYuedu"
                label="我已阅读《会员须知》并同意《入市协议》"
                name="type"
              ></el-checkbox>
              <div class="login_form_button">
                <div class="login_form_submit" @click="onSubmit">
                  <div class="login_form_submit_label">注册</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </cu-animation>

    <div class="ver">
      <Verify
        @success="success"
        :mode="pop"
        :captchaType="blockPuzzle"
        :imgSize="{ width: '330px', height: '155px' }"
        ref="verify"
      ></Verify>
    </div>
  </div>
</template>

<script>
// 自适应
(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }

  setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    var docEl = document.documentElement;
    var rem = docEl.clientWidth / 10;
    if (document.getElementById("login-form")) {
      if (
        rem > docEl.style.fontSize.split("px")[0] &&
        document.body.clientHeight -
          document.getElementById("login-form").offsetHeight <
          150
      ) {
        return;
      }
    }
    docEl.style.fontSize = (rem > 180 ? 180 : rem) + "px";
  }

  setRemUnit();
  window.setRemUnit = setRemUnit;

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
import {
  captcha,
  payCaptcha,
  buyerRegister,
  verify,
} from "../../../api/aksApi/platformApi/loginApi";
import Verify from "./components/verifition/Verify.vue";
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

      sfType: "采购商", //采购商 或 供应商
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
        password1: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password2: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
        ],
        contactUser: [
          { required: true, message: "请输入联系人", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        post: [{ required: true, message: "请输入职务", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
      },

      //   供应商注册
      formGongYingShangValue: {
        unitName: "", // 企业/单位名称
        username: "", // 登录账户
        phone: "", // 手机号
        captcha: "", // 验证码
        // value_9: "", // 手机验证码
        password1: "", // 设置密码
        password2: "", // 确认密码
      },
      rulesformGongYingShangValue: {
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
        phone: [{ required: true, message: "请输入手机号", trigger: "blur" }],
        captcha: [{ required: true, message: "请输入验证码", trigger: "blur" }],
        // value_9: [
        //   { required: true, message: "请输入手机验证码", trigger: "blur" },
        // ],
        password1: [{ required: true, message: "请设置密码", trigger: "blur" }],
        password2: [{ required: true, message: "请确认密码", trigger: "blur" }],
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
  mounted() {
    this.setRemUnit(); //自适应

    this.captchaApi(); // 获取验证码
  },
  created() {
    console.log(this.$route.query.sysType); //判断是否是3供应2采购商
    if (this.$route.query.sysType == 3) {
      this.sfType = "供应商";
    } else if (this.$route.query.sysType == 2) {
      this.sfType = "采购商";
    }
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
        };
        console.log("valueData:", valueData);
        buyerRegister(valueData)
          .then((res) => {
            if (res.code == 200) {
              this.$message.success(
                res.message + ";将为您自动跳转到登录界面！请稍后..."
              );
              setTimeout(() => {
                this.$store.commit("switchPlatform", "purchaser");
                this.$router.push("/login");
              }, 2000);
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
          password: this.formGongYingShangValue.password2, //密码
          phone: this.formGongYingShangValue.phone, //手机号
          qyType: this.qyType, //类型@ 1 药品企业 2 器械企业
          sfType: this.sfType == "供应商" ? 1 : 2, //身份@ 1 供应商 2 采购商
          unitName: this.formGongYingShangValue.unitName, //单位名称
          username: this.formGongYingShangValue.username, //登录账号
          captcha: this.formGongYingShangValue.captcha,
        };
        console.log("valueData:", valueData);
        buyerRegister(valueData)
          .then((res) => {
            if (res.code == 200) {
              this.$message.success(
                res.message + ";将为您自动为您跳转到登录界面！请稍后..."
              );
              setTimeout(() => {
                this.$store.commit("switchPlatform", "supplier");
                this.$router.push("/login");
              }, 2000);
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

      //   供应商注册-重置
      this.formGongYingShangValue.unitName = ""; // 单位名称
      this.formGongYingShangValue.username = ""; // 登录账户
      this.formGongYingShangValue.phone = ""; // 手机号
      this.formGongYingShangValue.captcha = ""; // 验证码
      //   this.formGongYingShangValue.value_9 = ""; // 手机验证码
      this.formGongYingShangValue.password1 = ""; // 设置密码
      this.formGongYingShangValue.password2 = ""; // 确认密码
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

.login::-webkit-scrollbar {
  display: none;
}

.login {
  background: url("./image/LoginBg.png") no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}
.registerLeft {
  display: flex;
  margin-right: rpxToRem(40);
  .registerLeft_img {
    width: rpxToRem(56.64);
    height: rpxToRem(56.64);
    background: url("./image/LoginLogo.png");
    margin-right: rpxToRem(10);
    background-size: 100% 100%;
  }
  .registerLeft_body {
    .registerLeft_title {
      font-size: rpxToRem(14.32);
      margin-bottom: rpxToRem(10);
      .registerLeft_title_wight {
        font-size: rpxToRem(22.3502);
        font-weight: 600;
      }
    }

    .registerLeft_titleX {
      font-size: rpxToRem(10.32);
    }

    color: #ffffff;

    img {
      width: rpxToRem(421.88);
      height: rpxToRem(307.81);
    }
  }
}

.registerRight {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
}
/* （宽度为 414px） 或者更大尺寸的屏幕 */
@media only screen and (max-height: 840px) {
  .registerRight {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    // align-items: center;
  }
}
.formTopTitle {
  display: flex;
  justify-content: space-between;
  color: #ffffff;
  margin-bottom: rpxToRem(8);
  .formTopTitle_one {
    font-size: rpxToRem(6);
    margin-right: rpxToRem(8);
  }

  .formTopTitle_one:hover {
    text-decoration: underline;
  }

  .formTopTitle_two {
    font-size: rpxToRem(6);
  }

  .formTopTitle_two:hover {
    text-decoration: underline;
  }
}
.login_form {
  // width: rpxToRem(200);
  // height: rpxToRem(340);
  background: #ffffff;
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.25);
  // border-radius: rpxToRem(10.75);
  padding: rpxToRem(8) rpxToRem(30) rpxToRem(16) rpxToRem(30);
  .formTitle1 {
    font-size: 36px;
    font-family: Source Han Sans CN-Bold, Source Han Sans CN;
    font-weight: bold;
    color: #00023a;
  }
  .formTitle2 {
    font-size: 12px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #999999;
  }
}
.form_lable {
  color: #00023a;
  width: 120px;
  font-size: rpxToRem(6);
  text-align: right;
  padding-right: 10px;
  margin-right: 20px;
}
.el_radio {
  width: 80px;
}

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
  height: rpxToRem(15.47);
  background: #00c1de;
  .login_form_submit_label {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: rpxToRem(7);
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
