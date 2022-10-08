<template>
  <div class="htmlBody">
    <!-- 头部导航栏组件 -->
    <Nav />
    <!-- 下面主体内容组件 -->
    <div class="main">
      <!-- 侧边选项组件 -->
      <Aside style="background: #545c64; width: 220px" v-if="!hiddenAside" />
      <div class="main-content">
        <breadCrumb v-if="!hiddenAside" />
        <div :class="'itemBody ' + (hiddenAside ? ' hiddenAside' : ' showAside')">
          <router-view></router-view>
          <cu-dialog title="完善企业信息" width="1000px" :visible="completeInfoVisible" :center="true" :showClose="false">
            <SupplierEnterpriseInfoComplete type="firstComplete" @close="closeInfoCompleteDialog"></SupplierEnterpriseInfoComplete>
            <template #footer>
              <div></div>
            </template>
          </cu-dialog>
          <!-- <el-radio-group
            class="platform-radios"
            v-model="currentPlatform"
            @change="platformChange()"
          >
            <el-radio label="operation">运营</el-radio>
            <el-radio label="supplier">供应</el-radio>
            <el-radio label="purchaser">采购</el-radio>
          </el-radio-group> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "@/components/Nav.vue";
import Aside from "@/components/Aside.vue";
import breadCrumb from "@/components/BreadCrumb.vue";
import { mapState } from "vuex";
import { getFlag } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import SupplierEnterpriseInfoComplete from "@/views/platformViews/supplierPlatform/supplierAccountManagement/supplierEnterpriseInfoManage/components/supplierEnterpriseInfoComplete.vue";

export default {
  components: {
    Nav,
    Aside,
    breadCrumb,
    SupplierEnterpriseInfoComplete
},
  data() {
    return {
      currentPlatform: "",
      completeInfoVisible: false
    };
  },
  created() {
   },
  mounted() {
    this.UserVerifyApi(); // 用户身份验证-接口
    if(this.vuex_user.sysType === 3){
      this.checkInfoComplete()
    }
    // this.currentPlatform = this.vuex_platform || "operation";
    // this.setRemUnit();
  },
  watch: {},

  methods: {
    // 用户身份验证-接口
    UserVerifyApi() {
      // 获取登录信息-接口
      // GetLoginState()
      //   .then((res) => {
      //     if (res.Code == 1) {
      //       res.Data = this.userDataProcessing(res.Data);
      //       let menuData = this.menuDataProcessing(res.Data.Modules);
      //       this.$store.commit("$uStore", {
      //         name: "vuex_menu",
      //         value: menuData,
      //       });
      //       this.$store.commit("$uStore", {
      //         name: "vuex_user",
      //         value: res.Data.User,
      //       });
      //     } else {
      //       this.$message.error(res.Msg);
      //       // 清楚本地存储,重置路由
      //       localStorage.clear();
      //       window.location.href = `${location.origin}/`;
      //     }
      //   })
      //   .catch((err) => {});
    },
    // 用户信息处理（由于部门和职业和基础信息不在同一层级，后台难改，姑处理后统一存放）
    userDataProcessing(valueData) {
      valueData.User.Department = valueData.Department;
      valueData.User.Position = valueData.Position;
      return valueData;
    },
    // 侧边栏数据处理
    menuDataProcessing(valueData) {
      let arrs = [];
      valueData.forEach((element) => {
        if (element.ParentName == "") {
          let arrItem = {
            name: element.Module.ModuleName,
            iconSvg: element.Module.ModuleIcon,
            iconSvgAction: element.Module.ModuleIconAction,
            state: element.State,
            path: element.Module.ModulePath,
            children: [],
          };
          arrs.push(arrItem);
        } else {
        }
      });
      valueData.forEach((element) => {
        arrs.forEach((elemen, index) => {
          if (element.ParentName == elemen.name) {
            let arrItem = {
              name: element.Module.ModuleName,
              iconSvg: element.Module.ModuleIcon,
              iconSvgAction: element.Module.ModuleIconAction,
              state: element.State,
              path: element.Module.ModulePath,
              children: [],
            };
            arrs[index].children.push(arrItem);
          }
        });
      });
      return arrs;
    },
    platformChange() {
      this.$store.commit("switchPlatform", this.currentPlatform);

      //  currentPlatform: "", //operation(运营)、supplier(供应)、purchaser(采购)
      if (this.currentPlatform == "operation") {
        this.$router.push("/main/operationManage/operationHome");
      } else if (this.currentPlatform == "supplier") {
        this.$router.push("/main/supplierWorkbench/supplierHome");
      } else if (this.currentPlatform == "purchaser") {
        this.$router.push("/main/purchaserHome");
      }
    },
    // 检查企业信息是否需补全
    checkInfoComplete(){
      getFlag().then(res => {
          console.log(res);
          if (res.code == 200) {
            // 0 未完善  1 已完善
            if(res.data === 0){this.completeInfoVisible = true}
          }
          else {
            this.$message.success(res.message);
          }
        }).catch((err) => {
          console.log(err);
        });
    },
    closeInfoCompleteDialog(){
      console.log('ddddd');
      this.completeInfoVisible = false;
    },


  },
  computed: {
    ...mapState(["vuex_platform", "vuex_menu","vuex_user"]),
    hiddenAside() {
      return this.$route.meta.isHeaderNav;
    },
  },
};
</script>
<style lang="scss" scoped>
.htmlBody {
  height: 100vh;
  width: 100vw;
  // background: #f5f5f5;
  background-color: #00032f;
  overflow: hidden;
  background: url("~@/components/image/BG.svg") no-repeat center 0px;
  background-position: center 0px;
  background-size: cover;
}

.main {
  display: flex;
  height: calc(100vh - 111px);
  // padding-top: 14px;

  &-content {
    width: 100%;
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
}


.itemBody {
  // height: calc(100vh - 111px - 14px - 68px - 18px);
  height: calc(100vh - 111px - 54px - 18px);
  overflow-x: auto;
  // background: #ffffff;
  // // overflow-y: hidden;
  // min-height: 7px;
  overflow-y: auto;
}

.showAside {
  width: calc(100vw - 220px - 20px - 20px);
  // min-width: calc(1200px - 220px);
}

.hiddenAside {
  width: calc(100vw - 20px - 20px);
  // min-width: 1200px;
  height: calc(100% - 18px);
}

// ::-webkit-scrollbar {
//   width: 0px;
// }

.platform-radios {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

//滚动条的滑块
::-webkit-scrollbar-thumb {
  background-color: #23aeff;
  border-radius: 3px;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道样式*/
  -webkit-box-shadow: inset 0 0 5px rgba(223, 223, 223, 0.2);
  border-radius: 100px;
  background: rgba(0, 0, 0, 0.1);
}
</style>
