<template>
  <div class="Password">
    <cu-animation
      ref="cu_animation"
      :type="'flipInY'"
      :time="0.5"
      v-if="phonflag"
    >
      <div class="head">
        <div class="head-logo">
          <img v-lazy src="./image/LoginLogo.png" alt="" />
          <p>阿克苏药品集散中心 网数融综管运服平台</p>
        </div>
        <div class="head-index" @click="getinde('webHomePage')">
          <p class="wz">网站首页</p>
        </div>
      </div>

      <div class="content-pass">
        <div class="padd-wzhi">当前位置：找回密码</div>
        <div class="pass-input">
          <el-form
            class="add-form"
            :model="logisticsDriver"
            ref="editForm1"
            :rules="rules"
            label-width="110px"
          >
            <el-form-item class="form-item" label="手机号:" prop="phone">
              <el-input
                class="selectInput"
                type="tel"
                maxlength="11"
                v-model="logisticsDriver.phone"
                placeholder="请输入11位手机号"
              >
              </el-input>
            </el-form-item>
            <el-form-item
              class="form-item"
              label="手机验证码:"
              prop="verification"
            >
              <el-input
                class="selectInput add-input"
                type="tel"
                maxlength="6"
                v-model="logisticsDriver.verification"
                placeholder="请输入手机验证码"
              >
              </el-input
              ><el-button
                type="info"
                class="size"
                @click="useVerify"
                :disabled="diflag"
                >{{ titels }}<span v-if="diflag">({{ times }})</span></el-button
              >
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                class="pass-xyb"
                @click="submitForm('editForm1')"
                >下一步</el-button
              >
            </el-form-item>
          </el-form>
        </div>
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
    </cu-animation>
    <cu-animation ref="cu_animation" :type="'flipInY'" :time="0.5" v-else>
      <div class="head">
        <div class="head-logo">
          <img v-lazy src="./image/LoginLogo.png" alt="" />
          <p>阿克苏药品集散中心 网数融综管运服平台</p>
        </div>
        <div class="head-index" @click="getinde">
          <p class="wz">网站首页</p>
        </div>
      </div>

      <div class="content-pass">
        <div class="padd-wzhi">当前位置：找回密码</div>
        <div class="pass-input">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            :show-message="true"
          >
            <el-form-item label="密码" class="lades" prop="pass">
              <span class="iocs1">*</span>
              <el-input
                type="password"
                v-model="ruleForm.pass"
                minlength="6"
                maxlength="10"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" class="lades" prop="checkPass">
              <span class="iocs2">*</span>
              <el-input
                type="password"
                v-model="ruleForm.checkPass"
                minlength="6"
                maxlength="10"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                class="pass-xyb"
                @click="submitForm('ruleForm')"
                >完成</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </cu-animation>
  </div>
</template>
<script>
import test from "@/cuview-ui/function/test.js";
import Verify from "./components/verifition/Verify.vue";
import {
  forgetPassword,
  payCaptcha,
  changePassword,
  verify,
} from "../../../api/aksApi/platformApi/loginApi";
export default {
  components: {
    Verify,
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
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      blockPuzzle: "blockPuzzle",
      pop: "pop",
      falgs: false,
      titels: "获取验证码",
      diflag: false,
      times: 60,
      phonflag: true,
      phoneflag1: true,
      logisticsDriver: {
        phone: "",
        verification: "",
      },
      ruleForm: {
        pass: "",
        checkPass: "",
      },
      forgetPassword: {
        phone: "",
        sysType: null,
        captcha: "",
      },
      rules: {
        pass: [{ trigger: "blur", validator: validatePass }],
        checkPass: [{ trigger: "blur", validator: validatePass2 }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          {
            min: 11,
            max: 11,
            message: "请输入正确的手机号",
            trigger: "blur",
            validator: checkMobile,
          },
        ],
        verification: [
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          {
            min: 4,
            max: 6,
            message: "请输入正确的手机验证码",
            trigger: "blur",
          },
        ],
      },
    };
  },
  created() {
    console.log(this.$route.query.ksysType);
    this.forgetPassword.sysType = this.$route.query.ksysType;
  },
  methods: {
    async success(params) {
      console.log(params);
      console.log(11111);

      verify(params).then((res) => {
        console.log(res);
        if (res.repMsg == "成功") {
          this.times = 60;
          let tims = setInterval(() => {
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
            let params={
              phone: this.logisticsDriver.phone
            }
          payCaptcha(params).then((res) => {
            if ((res.code = 200)) {

            }
          });
        }
      });
      // params 返回的二次验证参数, 和登录参数一起回传给登录接口，方便后台进行二次验证
    },
    useVerify() {
      if (this.logisticsDriver.phone == "") {
        this.falgs = false;
      } else {
        this.falgs = true;
      }

      if (this.falgs) {
        this.$refs.verify.show();
      } else {
        this.$message.error("请输入手机号后再获取验证码！");
      }
    },
    getinde() {
      this.$router.push("/webHomePage");
    },
    submitForm(formName) {
      console.log(this.$refs[formName]);
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('正确之后!');
          let params = this.forgetPassword;
          params.sysType = parseInt(this.forgetPassword.sysType);
          params.phone = this.logisticsDriver.phone;
          params.captcha = this.logisticsDriver.verification;
          console.log(params.phone,this.logisticsDriver.verification);
          if (this.phoneflag1) {
            forgetPassword(params)
              .then((res) => {
                console.log(res);
                if (res.code == 200) {
                  this.phonflag = false;
                  this.phoneflag1 = false;

                  this.$refs.cu_animation.again();
                } else {
                  this.$message.error(res.message + "！");
                  setTimeout(() => {
                    this.$router.push("/Register?sysType=" + params.sysType);
                  }, 2000);
                }
              })
              .catch((err) => {
                // console.log(err);
                // if (err) {
                //     this.$message.success('！');
                //  this.$router.push('/Register');
                // }
              });
          } else {
            let forgetPasswor = {
              newPwd: this.ruleForm.checkPass,
              phone: this.logisticsDriver.phone,
              sysType: parseInt(this.forgetPassword.sysType),
            };
            changePassword(forgetPasswor).then((res) => {
              console.log(res);
              if (res.code == 200) {
                this.$message.success("修改密码成功！");
                setTimeout(() => {
                  this.phoneflag1 = true;
                  this.$router.push("/login");
                }, 1500);
              }
            });
          }
          console.log(this.$refs[formName]);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
.size {
  color: #00023a;
  padding: 12px 8px;
  span {
    color: #00023a;
    font-size: 14px;
    display: inline-block;
  }
}
.selectInput {
  width: 397px;
}
.lades {
  position: relative;
  .iocs2,
  .iocs1 {
    position: absolute;
    left: -76px;
    top: 0;
    color: red;
    z-index: 88;
    font-size: 4px;
  }
  .iocs1 {
    left: -48px;
  }
}
.pass-xyb {
  background: #ff480e;
  width: 397px;
  height: 48px;
  color: #ffffff;
  margin-top: 26px;
}
.pass-input {
  .add-input {
    width: 274px;
    margin-right: 12px;
  }
}
.Password {
  background: url("./image/LoginBg.png") no-repeat;
  width: 100vw;
  height: 100vh;
  background-size: cover;
  //   overflow: scroll;

  .head {
    width: 1200px;
    display: flex;
    margin: 0 auto;
    justify-content: space-between;
    .head-logo {
      display: flex;
      height: 134px;
      align-items: center;

      img {
        width: 71.43px;
        height: 69.61px;
      }
      p {
        margin-left: 10px;
        width: 227px;
        height: 74px;
        font-size: 24px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #018944;
        line-height: 32px;
        -webkit-text-stroke: 1px #ffffff;
        text-stroke: 1px #ffffff;
      }
    }
  }
  .head-index {
    height: 134px;
    display: flex;
    align-items: center;
    .wz {
      height: 26px;
      width: 100%;
      font-size: 18px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #ffffff;
      text-align: center;
    }
    .wz:hover {
      border-bottom: 1px solid #ffffff;
    }
  }
  .content-pass {
    margin: 0 auto;
    width: 1200px;
    height: 528px;
    padding: 33px 58px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 0.9);
    .padd-wzhi {
      width: 100%;
      border-bottom: 1px solid #999999;
      font-size: 16px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 500;
      color: #00023a;
      height: 44px;
      line-height: 44px;
    }
  }
  .pass-input {
    width: 100%;
    padding-top: 95px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
