<template>
  <div class="nav-content-box">
    <div class="elTag">
      <el-tag
        v-for="(tag, index) in $store.state.navTagData.arrays"
        :key="tag.path"
        closable
        :effect="
          tag.path == $store.state.navTagData.tagStatus ? 'light' : 'plain'
        "
        :type="tag.path == $store.state.navTagData.tagStatus ? '' : 'info'"
        :disable-transitions="false"
        @close="DeleteRoleApi(tag)"
        @click="clickTag(tag, index)"
      >
        {{ tag.name }}
      </el-tag>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    DeleteRoleApi(tag) {
      this.$store.commit("reduceTagItem", tag);
      this.$store.state.navTagData.arrays.forEach((element) => {
        if (element.path == this.$store.state.navTagData.tagStatus) {
          this.$router.push({
            name: this.$store.state.navTagData.tagStatus.substring(1),
            params: { menu: element },
          });
        }
      });
    },
    clickTag(tag, index) {
      console.log(
        "点击顶部导航：" +
          this.$store.state.navTagData.arrays[index].name +
          "的权限为（0禁止，1查看，2修改）:" +
          this.$store.state.navTagData.arrays[index].state
      );
      this.$store.commit("clickTagItem", tag);
      this.$router.push({
        name: tag.path.substring(1),
        params: { menu: tag },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
// 滚动条样式
// ::-webkit-scrollbar {
//   width: 0px;
// } /* 这是针对缺省样式 (必须的) */
.nav-content-box {
  width: calc(100vw - 220px - 20px - 20px);
  height: 50px;
  overflow: auto;
  background: #ffffff;
  margin-bottom: 18px;
  display: flex;
}
.elTag {
  //   margin-left: 13px;
  display: flex;
  align-items: center;
}
// 未选中状态
::v-deep .el-tag--plain {
  margin-left: 15px !important;
  border-radius: 6px;
  font-size: 16px;
  color: black;
}
// 选中状态
::v-deep .el-tag--light {
  margin-left: 15px !important;
  border-radius: 6px;
  background: #109af9;
  border-color: #109af9;
  font-size: 16px;
  color: #ffffff;
  .el-tag__close {
    color: #ffffff;
  }
}
.is-active:before {
  border-top-color: #4b515e;
  border-bottom-color: #4b515e;
}

.is-active:after {
  border-left: 15px solid #4b515e;
}
</style>
