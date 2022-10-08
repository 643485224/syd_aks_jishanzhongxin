<template>
  <div id="app">
    <!-- 全局鼠标移动-彩色拖尾 -->
    <!-- <cu-hoverItem></cu-hoverItem> -->
    <!-- 全局鼠标移动-星星拖尾 -->
    <!-- <cu-hoverItemX></cu-hoverItemX> -->
    <!-- 全局鼠标 点击爆炸波纹 -->
    <!-- <cu-clickBone></cu-clickBone> -->
    <router-view> </router-view>
  </div>
</template>
<script></script>
<style lang="less">
html,
body {
  overflow: hidden;
  margin: 0;
  padding: 0;
  height: 100vh;
  width: 100vw;
}
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
body {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", Arial, sans-serif;
  font-size: 12px;
  line-height: 1.5;
  color: #fff;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
// 顶部右上方退出登录弹框的大小解除原有的最小为200限制
.el-menu--horizontal {
  // left: 1734px;
  .el-menu--popup {
    min-width: 0 !important;
  }
}
</style>
