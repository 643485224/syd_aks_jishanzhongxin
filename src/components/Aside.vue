<template>
  <div>
    <el-menu
      :default-active="defaultRoute"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#0B0F58"
      text-color="#FFFFFF"
      active-text-color="#FFFFFF"
      :unique-opened="true"
    >
      <!-- 遍历菜单 -->
      <template v-for="item in vuex_menu">
        <template v-if="!item.hiddenMenu">
          <!-- 第一层 含有子菜单 -->
          <template v-if="item.children && item.children.length > 0">
            <!-- 第一层 含有子菜单菜单 进行遍历输出 -->
            <el-submenu :index="item.menuName" :key="item.menuName">
              <template slot="title">
                <!-- <img class="icon-svg" :src="item.iconSvg" /> -->
                <i :class="item.icon"></i>
                <span slot="title">{{ item.menuName }}</span>
              </template>
              <!-- 第二层 子菜单遍历 -->
              <template v-for="items in item.children">
                <template v-if="!items.hiddenMenu">
                  <!-- 第二层 子菜单含有子菜单 -->
                  <el-submenu
                    v-if="items.children && items.children.length > 0"
                    :index="items.menuName"
                    :key="items.menuName"
                  >
                    <template slot="title">
                      <!-- <img class="icon-svg" :src="
                      $store.state.navTagData.tagStatusName == items.menuName
                        ? items.iconSvgAction
                        : items.icon
                    " /> -->

                      <i :class="items.icon"></i>
                      <span slot="title">{{ items.menuName }}</span>
                    </template>
                    <el-menu-item
                      v-for="itemss in items.children"
                      :key="itemss.menuName"
                      :index="itemss.menuName"
                      @click="goTo(itemss)"
                    >
                      <img class="icon-svg" :src="itemss.icon" />
                      <span slot="title">{{ itemss.menuName }}</span>
                    </el-menu-item>
                  </el-submenu>
                  <!-- 第二层 子菜单不含子菜单 -->
                  <el-menu-item
                    v-else
                    :index="items.menuName"
                    :key="items.menuName"
                    @click="goTo(items)"
                  >
                    <!-- <img
                  class="icon-svg"
                  :src="
                    $store.state.navTagData.tagStatusName == items.name
                      ? items.iconSvgAction
                      : items.iconSvg
                  "
                /> -->
                    <span slot="title" class="ml_30">{{ items.menuName }}</span>
                  </el-menu-item>
                </template>
              </template>
            </el-submenu>
          </template>
          <!-- 第一层 不含子菜单 该样式需使用最高优先级标签样式才能生效 -->
          <template v-else>
            <el-menu-item
              style="
                height: 60px !important;
                line-height: 60px !important;
                font-size: 14px !important;
                padding-left: 24px !important;
                padding-right: 20px !important;
              "
              :index="item.menuName"
              :key="item.menuName"
              @click="goTo(item)"
            >
              <!-- <img class="icon-svg" :src="
                $store.state.navTagData.tagStatusName == item.menuName
                  ? item.iconSvgAction
                  : item.icon
              " /> -->
              <i :class="item.icon"></i>

              <span slot="title">{{ item.menuName }}</span>
            </el-menu-item>
          </template>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      ishomeNav: false,
      isAction: "工作台", //根据名字判断是否选中当前的，加选中状态
      // vuex_menu: [], ////获取当前登录菜单信息
      q: "",
      defaultRoute: "",
    };
  },

  mounted() {
    this.setDefaultRoute();
  },
  methods: {
    goTo(body) {
      console.log(body);
      // this.isAction = body.name;
      // this.$store.commit("clickTagItem", body);
      if (body.url) {
        // console.log(
        //   body.menuName +
        //   "的权限为（0禁止，1查看，2修改）:" +
        //   this.$cu.menuHandle(body.menuName)
        // );
        console.log(body, body.url);
        this.$router.push({
          name: body.url.substring(1),
          params: { menu: body },
        });
        this.$store.commit("addTagItem", body);
      }
    },
    menuDealWith() {
      this.vuex_menu.forEach((element) => {
        let a = element.iconSvg.substr(
          element.iconSvg.indexOf("../assets/images/aside") + 22
        );
        let b = element.iconSvgAction.substr(
          element.iconSvgAction.indexOf("../assets/images/aside") + 22
        );
        element.iconSvg = require("../assets/images/aside" + a);
        element.iconSvgAction = require("../assets/images/aside" + b);
        if (element.children.length > 0) {
          element.children.forEach((elemen) => {
            let a = elemen.iconSvg.substr(
              elemen.iconSvg.indexOf("../assets/images/aside") + 22
            );
            let b = elemen.iconSvgAction.substr(
              elemen.iconSvgAction.indexOf("../assets/images/aside") + 22
            );
            elemen.iconSvg = require("../assets/images/aside" + a);
            elemen.iconSvgAction = require("../assets/images/aside" + b);
          });
        }
      });
    },

    //说明: sub-menu 展开的回调		参数:	index: 打开的 sub-menu 的 index， indexPath: 打开的 sub-menu 的 index path
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    //说明: sub-menu 收起的回调		参数:	index: 收起的 sub-menu 的 index， indexPath: 收起的 sub-menu 的 index path
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    setDefaultRoute() {
      let firstMenu = this.vuex_menu[0];
      let route = this.$route;
      this.vuex_menu.forEach((item) => {
        let path = item.url.substring(1);
        if (item.children && item.children.length) {
          let childs = item.children;
          childs.forEach((item2) => {
            let path2 = item2.url.substring(1);
            if (path2 == route.name) {
              this.defaultRoute = item2.menuName;
            }
          });
        } else {
          if (path == route.name) {
            this.defaultRoute = item.menuName;
          }
        }
      });
    },
  },
  computed: {
    ...mapState(["vuex_menu", "vuex_platform"]),
  },
  watch: {
    // vuex_platform(newVal) {
    //   this.setDefaultRoute()
    // },
    $route(to, from) {
      if (to.path === "/") {
      } else {
        this.setDefaultRoute();
      }
    },
  },
  // watch: {
  //   $route(to, from) {
  // console.log(to.path); //到这里去
  // console.log(from.path); //从该处出发
  // if (to.path === "/") {
  // } else {
  // }
  //   },
  // },
};
</script>

<style lang="scss" scoped>
// ::-webkit-scrollbar {
//   width: 0px;
// }

/* 这是针对缺省样式 (必须的) */
.icon-svg {
  width: 14px;
  height: 14px;
  margin-right: 20px;
}

::v-deep.el-menu {
  width: 220px;
  height: 100%;
  overflow: auto;
  font-size: 14px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
  font-weight: 400;
  border-right: none;

  // 第一层级 有子元素 padding
  .el-submenu__title {
    height: 60px;
    line-height: 60px;
    // font-size: 20px;
    padding-left: 24px !important;
    padding-right: 20px !important;
  }

  .el-menu-item-group__title {
    padding: 0;
  }

  // 第二层级 有子元素 padding
  .el-menu-item {
    height: 60px !important;
    line-height: 60px !important;
    // font-size: 20px;
    padding-left: 40px !important;
    padding-right: 20px !important;
  }

  .el-menu-item.is-active {
    opacity: 1;
    color: #fff;
    background: #0e78f3 !important;
    border-left: 4px solid #ff480e;
  }
}

// 第一层 padding
// .oneMenu {
// }
</style>
