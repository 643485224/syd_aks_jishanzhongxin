import timeAllFounctioncu from './function/timeAllFounction'
import dealTree from './function/dealTree'
import deepClone from './function/deepClone'
import debounce from "./function/debounce";
import throttle from "./function/throttle";
import test from "./function/test";
import simulationClick from './function/simulationClick'
import menuHandle from './function/menuHandle'
import randomColor from './function/randomColor'
import crypt from './function/jsencrypt'
let $cu = {
  timeAllFounctioncu,
  dealTree,
  deepClone,
  debounce,
  throttle,
  test,
  simulationClick,
  menuHandle,
  randomColor,
  crypt
};

import cuFullScreen from './components/cu-fullscreen/cu-fullscreen.vue'
import cuEchartPie from './components/cu-echart/cu-echart-pie.vue'
import cuTable from './components/cu-table/cu-table.vue'
import cuRequisition from './components/cu-requisition/cu-requisition.vue'
import cuAnimation from './components/cu-animation/cu-animation.vue'
import cuDialog from './components/cu-dialog/cu-dialog.vue'
import cuWaveItem from './components/cu-waveItem/cu-waveItem.vue'
import cuHoverItem from './components/cu-hoverItem/cu-hoverItem.vue'
import cuClickBone from './components/cu-clickBone/cu-clickBone.vue'
import cuHoverItemX from './components/cu-hoverItemX/cu-hoverItemX.vue'
import cuCalendar from './components/cu-calendar/cu-calendar.vue'
import cuDraggable from './components/cu-draggable/cu-draggable.vue'
import cuConstruction from './components/cu-construction/cu-construction.vue'
import webMainFooter from '../components/webMainFooter.vue'
import cuMap from './components/cu-map/cu-map.vue'
import cuFriendshipLink from './components/cu-friendshipLink/cu-friendshipLink.vue'
import cuCountup from './components/cu-countup/cu-countup.vue'
import cuAmap from './components/cu-amap/cu-amap.vue'
import cuEchart3dPie from './components/cu-echart/cu-echart-3dPie.vue'
import cuGaudMap from './components/cu-map/cu-gaudMap.vue'
import cuUpload from './components/cu-upload/cu-upload.vue'
import cuEchartLine from './components/cu-echart/cu-echart-line.vue'
import cuForm from './components/cu-form/cu-form.vue'
import cuTree from './components/cu-tree/cu-tree.vue'
import cuEditor from './components/cu-editor/cu-editor.vue'
import cuUploadImage from './components/cu-upload/cu-upload-image.vue'
import cuUploadFile from './components/cu-upload/cu-upload-file.vue'
let components = {
  cuFullScreen,
  cuEchartPie,
  cuTable,
  cuRequisition,
  cuAnimation,
  cuDialog,
  cuWaveItem,
  cuHoverItem,
  cuClickBone,
  cuHoverItemX,
  cuCalendar,
  cuDraggable,
  cuConstruction,
  webMainFooter,
  cuMap,
  cuFriendshipLink,
  cuCountup,
  cuAmap,
  cuEchart3dPie,
  cuGaudMap,
  cuUpload,
  cuEchartLine,
  cuForm,
  cuTree,
  cuEditor,
  cuUploadImage,
  cuUploadFile,
}



const install = Vue => {

  Object.keys(components).forEach(val => {
    Vue.component(val, components[val]);
  })

  Vue.prototype.$cu = $cu;
  Vue.prototype.$cu.eventBus = new Vue();
}

export default {
  install,
}
