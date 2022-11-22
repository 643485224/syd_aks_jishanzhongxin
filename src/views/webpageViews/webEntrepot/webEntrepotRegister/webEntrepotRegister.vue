<template>
  <div class="register">
    <div class="register-form" v-if="!registerEnd">
      <div class="title">
        <span class="zn">中心招商入驻</span>
        <span class="en">Investment center settled</span>
      </div>
      <RegisterForm @registerSuccess="registerEnd = true"></RegisterForm>
    </div>
    <div class="end" v-else>
      <div class="info">
        <img v-lazy class="icon" src="../image/success.png" alt="" />
        <div class="info-title">申请提交成功</div>
        <div class="info-desc">感谢您的光临，我们会尽快与您联系</div>
      </div>
    </div>
  </div>
</template>
<script>
import RegisterForm from "../components/registerForm.vue";
export default {
  components: {
    RegisterForm,
  },
  data() {
    return {
      registerEnd: false, // 注册完成显示
    };
  },
};
</script>
<style lang="scss" scoped>
.register {
  position: relative;
  width: 1200px;
  min-height: calc(100% - 100px);
  margin: 50px auto 50px;
  padding: 18px 60px 60px;
  color: #00023a;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  background-color: #bfe8f7;

  .title {
    display: flex;
    flex-direction: column;
    padding: 6px 0;
    margin-bottom: 40px;
    text-align: center;
    font-size: 36px;
    font-weight: 600;
    color: #00023a;

    .en {
      display: inline-block;
      font-size: 16px;
      font-weight: 400;
      color: #02076F;
    }
  }

  &-item {
    width: 50%;
    padding: 6px 0;
    font-size: 14px;
    color: #999999;
  }

  .end {
    width: 100%;
    height: 100%;

    .info {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -70%);
      text-align: center;
      color: #00023a;

      .icon {
        width: 106px;
        height: 106px;
      }

      .info-title {
        margin-bottom: 10px;
        font-size: 36px;
        font-weight: bold;
        letter-spacing: 8px;
      }

      .info-desc {
        font-size: 22px;
      }
    }
  }
}
</style>
