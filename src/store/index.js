import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from 'vuex'
// import app from './module/app'
import app from './module/app'
import user from './module/user'
import navTagData from './module/navTagData'
import {
  operation_menu
} from './operation.js'
import {
  supplier_menu
} from './supplier.js'
import {
  purchaser_menu
} from './purchaser'
Vue.use(Vuex)

let lifeData = {};

try {
  // 尝试获取本地是否存在lifeData变量，第一次启动APP时是不存在的
  lifeData = localStorage.getItem('lifeData') ? JSON.parse(localStorage.getItem('lifeData')) : {}
} catch (e) {}

// 需要永久存储，且下次APP启动需要取出的，在state中的变量名
let saveStateKeys = ['vuex_user', 'vuex_menu', 'vuex_token', 'vuex_platform', 'vuex_navmenu'];

// 保存变量到本地存储中
const saveLifeData = function (key, value) {
  // 判断变量名是否在需要存储的数组中
  if (saveStateKeys.indexOf(key) != -1) {
    // 获取本地存储的lifeData对象，将变量添加到对象中
    let tmp = localStorage.getItem('lifeData') ? JSON.parse(localStorage.getItem('lifeData')) : {};
    // 第一次打开APP，不存在lifeData变量，故放一个{}空对象
    tmp = tmp ? tmp : {};
    tmp[key] = value;
    // 执行这一步后，所有需要存储的变量，都挂载在本地的lifeData对象中
    localStorage.setItem('lifeData', JSON.stringify(tmp));
  }
}

const store = new Vuex.Store({
  strict: true, //是否开启严格模式:在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。
  // namespaced: true, //开启namespace:true，该模块就成为命名空间模块了
  // 下面这些值仅为示例，使用过程中请删除
  state: {
    // 如果上面从本地获取的lifeData对象下有对应的属性，就赋值给state中对应的变量
    // 加上vuex_前缀，是防止变量名冲突，也让人一目了然
    vuex_user: lifeData.vuex_user ? lifeData.vuex_user : {},
    vuex_menu: lifeData.vuex_menu ? lifeData.vuex_menu : {},
    vuex_token: lifeData.vuex_token ? lifeData.vuex_token : {},
    router_name: '',
    vuex_platform: lifeData.vuex_platform ? lifeData.vuex_platform : 'operation', //operation(运营) supplier(供应) purchaser(采购)
    vuex_navmenu: lifeData.vuex_navmenu ? lifeData.vuex_navmenu : {},
    vuex_operationMenu: operation_menu,
    vuex_operationNavMenu: [{
        name: "运营统计",
        path: "main/operationStatistics"
      },
      {
        name: "库房统计",
        path: "main/warehouseStatistics"
      },
      {
        name: "综合管理",
        path: "main/operationManage"
      },
    ],
    vuex_supplierMenu: supplier_menu,
    vuex_supplierNavMenu: [{
      name: "工作台",
      path: "main/supplierWorkbench"
    }, ],
    vuex_purchaserMenu: purchaser_menu,
    vuex_purchaserNavMenu: []
  },
  mutations: {
    $uStore(state, payload) {
      // 判断是否多层级调用，state中为对象存在的情况，诸如user.info.score = 1
      let nameArr = payload.name.split('.');
      let saveKey = '';
      let len = nameArr.length;
      if (nameArr.length >= 2) {
        let obj = state[nameArr[0]];
        for (let i = 1; i < len - 1; i++) {
          obj = obj[nameArr[i]];
        }
        obj[nameArr[len - 1]] = payload.value;
        saveKey = nameArr[0];
      } else {
        // 单层级变量，在state就是一个普通变量的情况
        state[payload.name] = payload.value;
        saveKey = payload.name;
      }

      // 保存变量到本地，见顶部函数定义
      saveLifeData(saveKey, state[saveKey])
    },
    saveLoginInfo(state,menus){
      state.vuex_menu = menus;
      state.vuex_navmenu =  state['vuex_' + state.vuex_platform + 'NavMenu'];
      console.log(state.vuex_platform,state['vuex_' + state.vuex_platform + 'NavMenu'],state.vuex_navmenu);
      saveLifeData('vuex_platform', state.currentPlatform)
      saveLifeData('vuex_menu', state.vuex_menu)
      saveLifeData('vuex_navmenu', state.vuex_navmenu)
    },

    switchPlatform(state, payload) {
      state.vuex_platform = payload;
      // state.vuex_menu = state['vuex_' + payload + 'Menu']
      // state.vuex_navmenu = state['vuex_' + payload + 'NavMenu']
      saveLifeData('vuex_platform', state.vuex_platform)
      // saveLifeData('vuex_menu', state.vuex_menu)
      // saveLifeData('vuex_navmenu', state.vuex_navmenu)
    }
  },
  modules: {
    app,
    user,
    navTagData
  }
})

export default store
