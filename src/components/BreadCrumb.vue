<template>
    <div class="breadcrumb-bar">
        <div class="breadcrumbs">当前位置：
            <el-breadcrumb :separator="separator">
                <!-- <el-breadcrumb-item v-for="(bread, index) in breadList" :key="index" :to="{ path: bread.path }" >{{ bread.meta.title }}</el-breadcrumb-item> -->
                <el-breadcrumb-item v-for="(bread, index) in breadList" :key="index">{{ bread.title }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="message" v-if="overTimeOrderCount && vuex_user.sysType == 3">消息: 你有 <span class="count">{{overTimeOrderCount}}</span>笔快超付款期限订单，系统提醒采购商付款，请你随时跟进收款 </div>
<!-- <img src="https://ydwsrz-20220710.eos-xinjiang-1.cmecloud.cn/upload/222.jpg" alt="" srcset=""> -->
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { messageNotification } from "@/api/aksApi/platformApi/supplierPlatformApi.js";

export default {
    props: {
        separator: {
            type: String,
            default: '/'
        }
    },
    data() {
        return {
            breadList: [],
            overTimeOrderCount: 0,
            interval:null
        }
    },
    created() {
        this.routerChange()
        // this.interval = setInterval(() =>{
        //   this.getMessage()
        // }, 60000);
    },
    destroyed() {
      // clearInterval(this.interval)
    },
    watch: {
        $route(to, from) {
            this.routerChange()
            console.log(to.path);
            this.getMessage()
        }
    },
    mounted() {
    },
    methods: {
        routerChange() {
            // let matched = this.$route.matched.filter((item) => item.meta && item.meta.title)
            // this.breadList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)
            let currentRoute = this.$route.name;
            let currentMenu = (this.getCurrentMenu(currentRoute))[0]
            this.breadList = this.getMenuList(currentMenu, currentRoute)
        },
        getCurrentMenu(currentRoute) {
            return this.vuex_menu.filter((item, index) => {
                if (item.children && item.children.length) {
                    let index2 = item.children.findIndex((item) => {
                      return item.url == '/' + currentRoute;
                    })
                    if (index2 != -1) {
                        return [index, index2]
                    }
                } else {
                    if (item.url == '/' + currentRoute) {
                        return [index]
                    }
                }
            })
        },
        getMenuList(menu, currentRoute) {
            if (!menu) return []
            if (menu && menu.children && menu.children.length) {
                for (let route of menu.children) {
                    if (route.url == '/' + currentRoute) {
                        return [{
                            title: menu.menuName,
                            path: menu.url
                        }, {
                            title: route.menuName,
                            path: route.url
                        },]
                    }
                }
            } else {
                return [{
                    title: menu.menuName,
                    path: menu.url
                }]
            }
        },
        getMessage() {

            messageNotification().then((res) => {
                console.log(res);
                if (res.code == 200) {
                    this.overTimeOrderCount = res.data;
                } else {
                    this.$message.error(res.message);
                }
            })
                .catch((err) => {
                    console.log(err);
                });
        }
    },
    computed: {
        ...mapState(['vuex_menu','vuex_user'])
    }
}
</script>
<style lang="scss">
.breadcrumb-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #fff !important;

}

.breadcrumbs {
    display: flex;
    align-items: center;

    .el-breadcrumb {
        margin: 20px 0;

        .el-breadcrumb__inner {
            color: #fff !important;
        }
    }
}

.message {
    .count {
        padding: 0 10px;
        font-size: 20px;
        color: red;
    }
}
</style>




<!-- <template>
  <div class="breadcrumb-bar">
    <div class="breadcrumbs">当前位置：
      <el-breadcrumb :separator="separator">
        <el-breadcrumb-item v-for="(bread, index) in breadList" :key="index">{{ bread.menuName }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="message" v-if="overTimeOrderCount && vuex_user.sysType == 3">消息: 你有 <span
        class="count">{{overTimeOrderCount}}</span>笔快超付款期限订单，系统提醒采购商付款，请你随时跟进收款 </div>
  </div>
</template> -->

<!-- <script>
import { mapState } from 'vuex';
import { messageNotification } from "@/api/aksApi/platformApi/supplierPlatformApi.js";

export default {
  props: {
    separator: {
      type: String,
      default: '/'
    }
  },
  data() {
    return {
      breadList: [],
      overTimeOrderCount: 0,
      interval: null
    }
  },
  created() {
    this.routerChange()
    // this.interval = setInterval(() =>{
    //   this.getMessage()
    // }, 60000);
  },
  destroyed() {
    // clearInterval(this.interval)
  },
  watch: {
    $route(to, from) {
      this.routerChange()
      console.log(to.path);
      this.getMessage()
    }
  },
  mounted() {
  },
  methods: {
    routerChange() {
      let matched = this.$route.matched.filter((item) => item.meta && item.name)
      // this.breadList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false)

      matched

      let currentRoute = this.$route.name;
      let currentMenus = this.getCurrentMenu(this.vuex_menu, currentRoute)
      console.log(currentMenus);
      this.breadList = currentMenus;
      // this.breadList = this.getMenuList(currentMenus, currentRoute)
      console.log("awewa:" + this.breadList)
    },
    getCurrentMenu(menus, currentRoute) {
      let arr = []
      menus.map((item, index) => {
        if (item.children && item.children.length) {
          // let index2 = item.children.findIndex((item) => item.path == '/' + currentRoute)
          // if (index2 != -1) {
          //     return [index, index2]
          // }
          console.log(item.url, currentRoute);
          arr.push(item)
          this.getCurrentMenu(item.children, currentRoute)
        } else {
          console.log(item.url, currentRoute);
          if (item.url == '/' + currentRoute) {
            arr.push(item)
          }

        }
      })
      console.log(arr);
      return arr;
    },
    getMenuList(menu, currentRoute) {
      if (!menu) return []
      if (menu && menu.children && menu.children.length) {
        for (let route of menu.children) {
          console.log(route);
          if (route.path == '/' + currentRoute) {
            console.log(menu.name, route);
            return [{
              title: menu.name,
              path: menu.path
            }, {
              title: route.name,
              path: route.path
            },]
          }
        }
      } else {
        return [{
          title: menu.name,
          path: menu.path
        }]
      }
    },
    getMessage() {

      messageNotification().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.overTimeOrderCount = res.data;
        } else {
          this.$message.error(res.message);
        }
      })
        .catch((err) => {
          console.log(err);
        });
    }
  },
  computed: {
    ...mapState(['vuex_menu', 'vuex_user'])
  }
}
</script> -->

