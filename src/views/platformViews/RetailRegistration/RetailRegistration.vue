<template>
    <div class="register">
        <cu-animation ref="cu_animation" :type="'flipInY'" :time="0.5">
      <div class="register_one">
        <div class="register_one_img"></div>
        <div class="register_one_text">
          <div
            class="register_one_text1"
            @click="clickRuterButton('/webHomePage')"
          >
            网站首页
          </div>
        </div>
      </div>
    </cu-animation>
    <cu-animation ref="cu_animation" :type="'flipInY'" :time="0.5">
        <div class="register_two">
            <h2>注册账号</h2>
            <p>Registered account</p>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item label="登录账号" prop="name">
                <el-input  v-model="ruleForm.name" clearable placeholder="请输入您的登陆账号：字母、数字"></el-input>
            </el-form-item>
                <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm.pass"  show-password clearable placeholder="6-12位字符、数字、字母、符号至少两种"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password"  show-password v-model="ruleForm.checkPass" clearable placeholder="请再次输入密码 "></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input  v-model="ruleForm.phone" clearable placeholder="请输入手机号 "></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code">
                <div
            class="login-form-section"
            :style="
              select.code ? 'border-bottom: 0.0133333333rem solid #1990ff' : ''
            "
          >
            <div class="section-input">
                
                <el-input  v-model="ruleForm.code" placeholder="请输入验证码 "></el-input>
            </div>
            <div class="section-icon" @click="captchaApi">
              <img :src="imageUrl" style="width: 100px; height: 40px" />
            </div>
          </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即注册</el-button>
            </el-form-item>
            </el-form>
        </div>
    </cu-animation>
    <div class="login-footer">
      <p>Copyright © 2022 阿克苏药品集散中心 ICP备17005284号-1</p>
    </div>
    </div>
</template>
<script>
import {
  captcha,
  userRegister
} from "../../../api/aksApi/platformApi/loginApi";
import test from "../../../cuview-ui/function/test";
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
export default {
    data () {
        var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
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
            ruleForm: {
            name:'',
          pass: '',
          checkPass: '',
          phone:'',
          code: "", //验证码
        },
        select: {
        code: false, //验证码
      },
        imageUrl: "", //验证码图片
        rules: {
            name:[
                { required: true, message: '请输入登录账号', trigger: 'blur' },
            ],
            code:[
                { required: true, message: '请输入验证码', trigger: 'blur' },
            ],
          pass: [
            {required: true, validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            {required: true, validator: validatePass2, trigger: 'blur' }
          ],
          phone: [
          {
            required: true,
            trigger: "blur",
            validator: validatePhone,
          },
        ],
        }
      };
    },
    mounted(){
        this.captchaApi(); // 获取验证码
    },
    methods:{
        clickRuterButton(value){
            this.$router.push(value);
        },
          // 获取验证码
    captchaApi() {
      captcha()
        .then((res) => {
          this.imageUrl = URL.createObjectURL(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
                amount:null,//余额
                avator:'',//头像
                birthday:'',//生日
                code:this.ruleForm.code,//验证码
                id:null,//id
                name:this.ruleForm.name,//客户名称
                password:this.ruleForm.pass,//密码
                phone:this.ruleForm.phone,//手机号
                regTime:null,
                sex:3,//性别
                status:1,//状态
                sysType:5,
                username:this.ruleForm.name

            }
            console.log(params);
            userRegister(params).then(res => {
                console.log(res);
                if(res.code == 200){
                    this.$message({
                    message: res.message+"将为您自动为您跳转到登录界面！请稍后...",
                    type: 'success'
                    });  
                    setTimeout(() => {
                this.$store.commit("switchPlatform", "RetailPurchase");
                this.$router.push("/login");
              }, 2000);
              // this.$refs[formName].resetFields();
                }else {
                    this.$message.error(res.message);
                }
              
            })
          } else {
            // this.$refs[formName].resetFields();
            return false;
          }
        });
       
    },
    }
}
</script>
<style lang="scss" scoped>
.register {
  background: url("./img/Slice69.png") no-repeat;
  background-size: cover;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
}
.register_one {
  margin-top: 40px;
  width: 1200px;
  display: flex;
  justify-content: space-between;

  .register_one_img {
    width: 607px;
    height: 61px;
    background: url("./img/Slice68.png");
    background-size: 100% 100%;
  }

  .register_one_text {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #ffffff;

    .register_one_text1 {
      text-align: right;
      cursor: pointer;
      font-size: 20px;
    }

    .register_one_text1:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
}
.register_two{
    margin-top: 53px;
    padding:80px 0 140px 0 ;
    width: 1200px;
    height: 750px;
    background: #ffffff;
    box-sizing: border-box;
    h2{
        text-align: center;
        font-size: 36px;
            font-family: Source Han Sans CN-Bold, Source Han Sans CN;
            font-weight: bold;
            color: #020662;
            line-height: 42px;
    }
    p{
        font-size: 20px;
            font-family: Source Han Sans CN-Regular, Source Han Sans CN;
            font-weight: 400;
            color: #999999;
            text-align: center;
            text-transform:uppercase;
    }
}
.demo-ruleForm{
    flex-wrap: wrap;
    margin-top: 38px;
    display: flex;
    justify-content: center;
}
.el-form-item{
    width: 657px;
}
::v-deep .el-form-item__label{
        color: #020662;
        font-size: 20px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        line-height: 52px;
     }
 ::v-deep  .el-input__inner{
    font-size: 20px;
        font-family: Source Han Sans CN-Medium, Source Han Sans CN;
        font-weight: 500;
        height: 52px;
 }
.login-form-section {
    margin-top: 5px;
      display: flex;
      align-items: center;
     height: 40px;
     position: relative;
    .section-input{
        width: 538px;
    }
     .section-icon{
        position: absolute;
        top: 0;
        right: 5px;
     }
    }
    .login-footer {
    padding: 34px;
    text-align: center;
    font-size: rpxToRem(6);
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #00023a;
  }
  .el-button{
    margin-top: 40px;
    width: 100%;
    height: 52px;
background: #FF480E;
line-height: 52px;
border: 1px solid #FF480E;
  }
</style>