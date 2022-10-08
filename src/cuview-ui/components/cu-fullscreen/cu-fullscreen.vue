<template>
  <div v-if="showFullScreenBtn" class="tooltip">
    <!-- 全屏组件 -->
    <el-tooltip
      class="item"
      effect="dark"
      content="全屏/退出全屏"
      placement="bottom"
    >
      <img
        v-if="value"
        @click="handleChange"
        src="./image/QuanPing.svg"
        alt=""
        style="width: 30px; height: 30px"
      />
    </el-tooltip>
  </div>
</template>

<script>
import ScreenFull from "screenfull/dist/screenfull";
export default {
  name: "cuFullScreen",
  computed: {
    showFullScreenBtn() {
      return window.navigator.userAgent.indexOf("MSIE") < 0;
    },
  },
  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleFullscreen() {
      let main = document.body;
      if (this.value) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (main.requestFullscreen) {
          main.requestFullscreen();
        } else if (main.mozRequestFullScreen) {
          main.mozRequestFullScreen();
        } else if (main.webkitRequestFullScreen) {
          main.webkitRequestFullScreen();
        } else if (main.msRequestFullscreen) {
          main.msRequestFullscreen();
        }
      }
    },
    handleChange() {
      // screenfull.isFullscreen; // 布尔值——当前页面是否全屏
      // screenfull.isEnabled; // 布尔值——当前浏览器是否支持全屏
      // screenfull.request(); // 全屏
      // screenfull.exit(); // 退出全屏
      // screenfull.toggle(); // 全屏切换
      //   if (!ScreenFull.isEnabled) {
      ScreenFull.toggle(); // 全屏切换
      // if (!screenfull.isFullscreen) {
      //   this.value = true;
      // } else {
      //   this.value = false;
      // }
      //   } else {
      //     this.$message.error("当前浏览器不支持全屏");
      //   }
    },
  },
  mounted() {
    // if (!screenfull.isFullscreen) {
    //   this.value = true;
    // } else {
    //   this.value = false;
    // }
    let isFullscreen =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.fullScreen ||
      document.mozFullScreen ||
      document.webkitIsFullScreen;
    isFullscreen = !!isFullscreen;
    document.addEventListener("fullscreenchange", () => {
      this.$emit("input", !this.value);
      this.$emit("on-change", !this.value);
    });
    document.addEventListener("mozfullscreenchange", () => {
      this.$emit("input", !this.value);
      this.$emit("on-change", !this.value);
    });
    document.addEventListener("webkitfullscreenchange", () => {
      this.$emit("input", !this.value);
      this.$emit("on-change", !this.value);
    });
    document.addEventListener("msfullscreenchange", () => {
      this.$emit("input", !this.value);
      this.$emit("on-change", !this.value);
    });
    this.$emit("input", isFullscreen);
  },
};
</script>

<style lang="less">
// .full-screen-btn-con .ivu-tooltip-rel {
//   height: 64px;
//   display: flex;
//   align-items: center;
//   i {
//     cursor: pointer;
//   }
// }

/* Tooltip 容器 */
.tooltip {
  position: relative;
  display: inline-block;
  height: 30px;
  //   border-bottom: 1px dotted black; /* 悬停元素上显示点线 */
}

/* Tooltip 文本 */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;

  /* 定位 */
  position: absolute;
  z-index: 1;
}

/* 鼠标移动上去后显示提示框 */
.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
