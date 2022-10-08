<template>
  <div>
    <el-button type="primary" @click="getCode" :disabled="flag" v-loading="loading"><span v-if="flag">已发送({{ times
    }})</span><span v-else>获取验证码</span></el-button>
  </div>
</template>
<script>
import {
  payCaptcha,
} from "@/api/aksApi/platformApi/loginApi.js";
export default {
  props: {
    phone:String
  },
  data() {
    return {
      flag: false,
      times: 60,
      loading: false
    }
  },

  methods: {
    getCode() {
      this.flag = true;
      this.payCaptchaApi()
    },
    payCaptchaApi() {
      this.loading = true;
      payCaptcha({ phone: this.phone })
        .then((res) => {
          this.loading = false;
          if (res.code == 200) {
            this.times = 60;
            let timer = setInterval(() => {
              if (this.times == 1) {
                this.flag = false;
                clearInterval(timer);
              } else {
                this.flag = true;
                this.times--;
              }
            }, 1000)
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          this.loading = false;
          console.log(err);
          this.$message.error("获取验证码失败")
        });
    },
  },
}
</script>
<style lang="scss" scoped>

</style>
