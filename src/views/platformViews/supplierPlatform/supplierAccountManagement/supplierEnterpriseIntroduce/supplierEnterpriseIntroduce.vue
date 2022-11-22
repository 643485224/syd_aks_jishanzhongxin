<template>
<div class="page-container table-page">
  <div class="content">
    <div class="section">
    <div class="section-title">企业简介：</div>
    <el-input type="textarea" rows="6"  v-model="introduce.summary"  v-if="isEdit"/>
    <div  v-else >
      <div v-if="introduce.summary">{{introduce.summary}}</div>
      <div v-else class="notext">暂无简介</div>
    </div>
  </div>
  <div class="section">
    <div class="section-title">企业详情：</div>

    <cu-editor class="cu-editor" width="100%" v-model="introduce.detail" v-if="isEdit"></cu-editor>
    <template v-else >
      <div v-if="introduce.detail" v-html="introduce.detail"></div>
      <div v-else class="notext">暂无详情</div>
    </template>
  </div>
  <div v-if="isEdit">
    <el-button type="primary" class="float_r" @click="saveIntroduce" >保存</el-button>
    <el-button type="primary" class="float_r mr_10" @click="cancel" >取消</el-button>

  </div>
  <el-button type="primary" class="float_r" @click="isEdit=true" v-else>编辑</el-button>
  </div>
</div>
</template>
<script>
import { getSupplierShow,saveSupplierShow } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import { catchAwait } from "@/utils/catchAwait";

export default {
  data(){
    return{
      introduce: {
        summary:'',
        detail: ''
      },
      isEdit:false
    }
  },
   mounted() {
    this.getIntroduce()
  },
  methods: {
      async getIntroduce(){
        let [err,res] = await catchAwait(getSupplierShow())
        if(err){
          return this.$message.error("网络错误")
        }
        console.log(res);
        if (res.code != 200) {
          return this.$message.error(res.message)
        }
        this.introduce = res.data || {};
    },
    saveIntroduce(){

      saveSupplierShow(this.introduce).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("编辑成功")
          this.isEdit = false;
          this.getIntroduce();
        }else{
          this.$message.error(res.message)

        }

      }).catch(err => {
        console.log(err);
      })
    },
    async cancel(){
      await this.getIntroduce();
      this.isEdit = false;

    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  height: 100%;
  padding: 20px;
  overflow: auto;
  font-size: 16px;
  font-family: Source Han Sans CN-Regular, Source Han Sans CN;
}

.content {
  width: 900px;
  margin: 40px auto 60px;
}
.section {
  display: flex;
  margin: 20px auto;
  &-title {
    width: 100px;
    font-size:18px;
    font-weight: bold;
  }
  .notext {
    color: #a8a8a8;
  }

}
</style>
