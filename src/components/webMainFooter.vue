<template>
  <div class="bottom">
    <div class="bottomContent">
      <div class="bottomContentItem">
        <img src="../assets/images/webMainImage/webMain-1.png" alt="" />
        <span class="ml_10">地址：新疆阿克苏地区温宿县阿克苏药品集散中心</span>
      </div>
      <div class="bottomContentItem">
        <img src="../assets/images/webMainImage/webMain-2.png" alt="" />
        <span class="ml_10">电话：0755-9876577</span>
      </div>
      <div class="bottomContentItem">
        <img src="../assets/images/webMainImage/webMain-3.png" alt="" />
        <span class="ml_10">邮箱：549446926@qq.com</span>
      </div>
    </div>
    <div class="bottomContentTwo">
      Copyright © 2022 阿克苏药品集散中心 ICP备17005284号-1
    </div>
  </div>
</template>

<script>
export default {
  name: "webMainFooter",
};
</script>
<style lang="scss" scoped>
.bottom {
  height: 170px;
  width: 100%;
  background: #001d4f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .bottomContent {
    display: flex;
    align-items: center;
    justify-content: center;
    .bottomContentItem {
      display: flex;
      align-items: center;
    }
    .bottomContentItem:nth-child(2) {
      display: flex;
      align-items: center;
      margin: 0px 80px;
    }
  }
  .bottomContentTwo {
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
