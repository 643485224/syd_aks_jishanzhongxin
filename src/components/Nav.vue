<template>
  <!-- 头部导航栏 -->
  <div class="nav">
    <div class="nav-left">
      <div class="nav-title-wrapper">
        <div class="nav-title">
          阿克苏药品集散中心{{ platformName }}服务平台
        </div>
      </div>
      <div class="nav-menu">
        <router-link
          :to="'/' + item.path"
          v-for="(item, index) in vuex_navmenu"
          :key="index"
          active-class="active-link"
          @click="routerAction('')"
          >{{ item.name }}</router-link
        >
      </div>
    </div>
    <div class="nav-right">
      <div class="nav-right-item">
        <div class="avatar">
          <img
            :src="vuex_user.operation.logoUrl"
            v-if="vuex_user.operation"
            alt=""
            srcset=""
          />
          <img
            :src="vuex_user.supplier.logoUrl"
            v-else-if="vuex_user.supplier"
            alt=""
            srcset=""
          />
          <img
            :src="vuex_user.purchaser.logoUrl"
            v-else-if="vuex_user.purchaser"
            alt=""
            srcset=""
          />
        </div>
        <span>{{ vuex_user.username }} </span>
      </div>
      <div class="nav-right-item cursor_p" @click="LoginOutApi">
        <img
          src="@/components/image/Offline.png"
          class="setting-icon"
          alt=""
          srcset=""
        /><span>退出</span>
      </div>
      <div class="nav-right-item">
        <cuFullScreen :value="true" />
      </div>
      <div class="nav-right-item date">
        <span
          >{{ dateSource.date }}&nbsp; 星期{{ dateSource.week }}<br />
          {{ dateSource.time }}</span
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import dayjs from "dayjs";
import { logout } from "@/api/aksApi/platformApi/loginApi";
export default {
  data() {
    return {
      dateSource: {
        date: "",
        time: "",
      },
      timer: null,
      currentPlatform: "",
      platforms: {
        operation: "运营",
        supplier: "供应",
        purchaser: "采购",
      },
      platformName: "",
    };
  },
  methods: {
    getTime() {
      let time = dayjs(new Date());
      this.dateSource.date = time.format("YYYY-MM-DD");
      this.dateSource.time = time.format("HH:mm:ss");
      this.dateSource.week = this.toCapital(time.day());
    },
    toCapital(num) {
      switch (num) {
        case 0:
          return "天";
        case 1:
          return "一";
        case 2:
          return "二";
        case 3:
          return "三";
        case 4:
          return "四";
        case 5:
          return "五";
        case 6:
          return "六";
        default:
          break;
      }
    },
    goLogin() {},
    LoginOutApi() {
      this.$confirm(`确定退出登录？`)
        .then(() => {
          logout()
            .then((res) => {
              console.log(res);
              if (res.code == 200) {
                let message = res.message + ",清除登录数据...";
                this.$message.success(message);
                this.$store.commit("$uStore", {
                  name: "vuex_token.tokenHead",
                  value: "",
                });
                this.$store.commit("$uStore", {
                  name: "vuex_user",
                  value: {},
                });
                // 清楚本地存储,重置路由
                setTimeout(() => {
                  window.location.href = `${location.origin}/`;
                  localStorage.clear();
                }, 800);
              } else {
                this.$message.error(res.message);
              }
            })
            .catch((err) => {});
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 点击路由跳转
    routerAction(router) {
      console.log(router);
      this.$router.push("/" + router);
    },
  },
  mounted() {
    let that = this;
    this.timer = setInterval(() => that.getTime(), 1000);
    this.getTime();
    console.log(this.vuex_user.sysType);
    switch (this.vuex_user.sysType) {
      case 3:
        this.platformName = "供应";
        break;
      case 2:
        this.platformName = "采购";
        break;
      case 1:
        this.platformName = "运营";
        break;
      default:
        break;
    }
  },
  watch: {},
  beforeDestroy() {
    if (this.timer) {
      // 清除定时器
      clearInterval(this.timer);
    }
  },

  computed: {
    ...mapState([
      "vuex_user",
      "vuex_token",
      "vuex_platform",
      "vuex_navmenu",
      "vuex_menu",
    ]),
  },
};
</script>

<style lang="scss" scoped>
$navHeight: 111px;

::v-deep.nav-right {
  .el-menu-item {
    border-bottom: none;
    background: #515a6e !important;
  }

  .el-menu-item:hover {
    color: #ffffff !important;
    background: #515a6e !important;
    border-bottom: none;
  }

  .el-menu-item.is-active {
    color: #ffffff !important;
    background: #515a6e !important;
    border-bottom: none;
  }

  .el-submenu__title:focus,
  .el-submenu__title:hover {
    outline: 0 !important;
    color: #ffffff !important;
    background: #515a6e !important;
    border-bottom: none;
  }

  // 下方的线条
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }

  .is-active {
    border-bottom: none;

    .el-submenu__title {
      border-bottom: none;
    }
  }
}

.titless {
  line-height: 20px !important;
  padding: 4px 20px !important;
  height: 38px !important;

  img {
    margin-right: 4px;
    width: 30px;
    height: 30px;
  }
}

.iconImg {
  width: 30px;
  height: 30px;
}

.nav {
  width: 100%;
  min-width: 1200px;
  height: $navHeight;
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-family: Source Han Sans CN-Heavy, Source Han Sans CN;

  &-left {
    flex: 1;
    font-size: 26px;
    padding-left: 20px;
    display: flex;
    // justify-content: space-between;
    height: 111px;
    background: url("~@/components/image/navLeft.png") no-repeat;
    background-position: 0 0;
    background-size: 100% 100%;
    font-weight: 800;

    .nav-title-wrapper {
      display: flex;
      align-items: center;
      max-width: 49%;
      font-size: 30px;
      line-height: 32px;
      height: $navHeight;
      background: linear-gradient(180deg, #b0d7ff 0%, #ffffff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .nav-menu {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      height: calc($navHeight - 40px);
      font-size: 24px;
      font-weight: 500;
      // padding: 10px 60px 10px 140px;
      padding: 0px 10px 0px 80px;

      font-family: Source Han Sans CN-Medium, Source Han Sans CN;

      a {
        // flex: 1;
        text-align: center;
        color: rgb(62, 127, 277);
      }

      .active-link {
        color: #00d8ff;
      }
    }
  }

  &-right {
    width: 472px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: calc($navHeight - 40px);
    // margin-left:5%;
    margin-left: 90px;
    padding-left: 90px;
    padding-right: 24px;
    list-style: none;
    font-size: 16px;
    background: url("~@/components/image/navRight.png") no-repeat;
    background-position: center;
    background-size: 100% 100%;

    &-item {
      display: flex;
      align-items: center;
      height: calc($navHeight - 40px);
      font-size: 16px;

      .avatar {
        width: 30px;
        height: 30px;
        margin-right: 10px;
        border: 2px solid #1aabff;
        border-radius: 50%;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }

      .setting-icon {
        width: 17px;
        height: 17px;
        margin-right: 4px;
      }

      // &:not(:last-child){
      //   margin-right: 30px;
      // }
    }

    .date {
      text-align: right;
      font-size: 12px;
    }
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: #ffffff;
}

.el-icon-arrow-down {
  font-size: 12px;
}
</style>
