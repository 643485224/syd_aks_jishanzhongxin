<template>
  <div class="page-container table-page">
    <el-button class="back-btn" type="info" size="mini" @click="back">返回上一页</el-button>
    <div class="header">
      <h2 class="header-title">商品批量新增</h2>
    </div>
    <div class="content">
      <div class="info">
        <div class="info-title">批量导入商品清单</div>
        <div class="info-content" :class="checkVisible?'noshow':''">
          <cu-upload-file ref="upload" :files.sync="excelData" :drag="true" accept=".xls,.xlsx,.csv" width="110px"
            height="110px" :customRequest="true" @customSubmit="customSubmit"></cu-upload-file>
          <div class="info-content-right">
            <div class="title">填写导入数据信息</div>
            <div class="desc">请按照数据模板的格式准备导入数据，模板中的表头名称不可更改，表头行不能删除</div>
            <el-button type="text" class="down" @click="exportXls">下载模板</el-button>
            <!-- <el-popover placement="bottom"  trigger="click">
              <el-button type="text" class="down"  >药品下载模板</el-button>
              <el-button type="text" class="down"  >药械下载模板</el-button>
              <el-button type="text" class="down"  slot="reference">下载模板</el-button>
            </el-popover> -->
          </div>
        </div>
        <div class="info-check" v-if="checkVisible">
          <div class="content-item">
            <div class="item-left ">
              <i class="el-icon-circle-check success"></i>
            </div>
            <div class="item-right">
              <div class="title">正常数量条数</div>
              <div class="count">{{right}}条</div>
            </div>
          </div>
          <div class="content-item">
            <div class="item-left">
              <i class="el-icon-warning-outline warning"></i>
            </div>
            <div class="item-right">
              <div class="title">异常数量条数</div>
              <div class="count">{{wrong}}条</div>
            </div>
          </div>
          <div class="check-box">
            <div class="check-list" v-if="wrong">
              <div class="check-item " v-for="(item,index) in checkList" :key="index">
                <template v-if="!expand">
                  <div v-if="index < 7 || index > wrong - 3"> 【第{{item.row}}行】{{item.info}}</div>
                  <div v-else-if="index == 7" class="tooltip" @click="expand=true">&emsp;...... <span
                      class="tooltiptext">点击展开</span></div>
                </template>
                <template v-else>
                  <div>【{{item.row}}】{{item.info}}</div>
                </template>
              </div>
            </div>
            <div class="expands" v-if="wrong > 10" @click="expand=!expand">
              <span v-if="expand">收起</span>
              <span v-else @click="expand=false">展开</span>
            </div>
          </div>
          <!-- <div class="check-box">
            <div class="check-list" v-if="checkList.length">
              <div class="check-item " v-for="(item,index) in checkList" :key="index">
                <template v-if="!expand">
                  <div v-if="index < 7 || index > checkList.length - 3"> {{item.message}}</div>
                  <div v-else-if="index == 7" class="tooltip" @click="expand=true">&emsp;...... <span
                      class="tooltiptext">点击展开</span></div>
                </template>
                <template v-else>
                  <div>{{item.message}}</div>
                </template>
              </div>
            </div>
            <div class="expands" v-if="checkList.length > 10" @click="expand=!expand">
              <span v-if="expand">收起</span>
              <span v-else @click="expand=false">展开</span>
            </div>
          </div> -->
        </div>
      </div>
      <div class="footer" v-if="checkVisible">
        <el-button @click="again">重新上传</el-button>
        <el-button type="primary" @click="batchImport">确定导入</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { importDrugSupplierGoods,importApparatusSupplierGoods, saveSupplierGoods, downloadGoods } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import * as  XLSX from 'xlsx';
import { downloadXls } from "@/utils/exportXls.js";
import { catchAwait } from "../../../../../utils/catchAwait";
export default {
  data() {
    return {
      ypqxType:null,
      excelData: [],
      checkVisible: false,
      xlsxData: [],
      checkList: [],
      // checkFields: {
      //   '范围': true,
      //   '单位': true,
      //   '库存': true,
      //   '采购价': true,
      //   '用法用量': true,
      //   '功能主治': true,
      //   '有效期': true,
      //   '商品通用名': true,
      // },
      expand: false,
      right: 0,
      wrong: 0,
      rightList: []// 上传数据
    }
  },
  created() {


  },
  mounted(){
    console.log(this.$route.params);
    this.ypqxType = this.$route.params.ypqxType;
  },
  watch: {
    excelData(val) {
      console.log(val);
      if (val.length) {
        this.checkVisible = true;
        // this.checkData(val[0].raw)
      }
    }
  },
  methods: {
    // 本地进行上传文件格式检查 已弃用
    checkData(files) {
      console.log(files);
      let that = this;
      const fileReader = new FileReader();
      fileReader.onload = (ev) => {
        try {
          const data = ev.target.result;
          // 通过xlsx获取workbook
          const workbook = XLSX.read(data, {
            type: "binary",
          });
          console.log(workbook);
          const wsname = workbook.SheetNames[0]; //取第一张表
          const xlsxData = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
          console.log(xlsxData);
          this.xlsxData = xlsxData;
          that.checkList = [];
          // 判断上传是否为空表格
          if (xlsxData.length === 0) {
            that.$message.error('请上传有效的excel文件！')
            return false;
          }
          // 字段空值检查
          xlsxData.forEach((item, index) => {
            console.log(item, that.checkFields);
            for (let field in that.checkFields) {
              let fieldVal = item[field];
              if (that.checkFields[field] && (!fieldVal || fieldVal == '' || (fieldVal + '').trim() == '')) {
                let flag = false;
                that.checkList.filter(item => {
                  if (item.index == index) { flag = true; return item.message += `${field}字段不能为空` }
                })
                if (!flag) {
                  that.checkList.push({ index, message: `【第${index + 1}行】${field}字段不能为空 ` })
                }
              }

            }
          });
          // for (let index = 0; index < 500; index++) {
          //   that.checkList.push(that.checkList[0])
          // }
          console.log(that.checkList);
        } catch (e) {
          console.log('error', e);
          return false;
        }
      };
      fileReader.readAsBinaryString(files);
      return false

    },
    async batchImport() {
      console.log(this.$refs.upload);
      if (this.checkList.length) {
        return this.$message.error("请检查异常字段后重新上传")
      }
      this.rightList = this.rightList.map(item => {delete item.goodsId; delete item.flag;return item;})
      console.log(this.rightList);
      let [err, res] = await catchAwait(saveSupplierGoods(this.rightList))
      console.log(err,res);
      if (err) {
        console.log(err);
      }
      if (res.code != 200) {
        return this.$message.error(res.message);
      }
      this.$message.success("上传成功")
      this.back()
    },
    async customSubmit(file) {
      console.log(this.ypqxType);
      let FormDatas = new FormData(); //上传文件的需要formdata类型;所以要转
      FormDatas.append("file", file);
      let func = this.ypqxType == 1?importDrugSupplierGoods:importApparatusSupplierGoods;
      console.log(this.ypqxType == 1?importDrugSupplierGoods:importApparatusSupplierGoods);
      let [err, res] = await catchAwait(func(FormDatas))
      console.log(res);
      if (err) {
        console.log(err);
      }
      if (res.code != 200) {
        return this.$message.error(res.message);
      }
      let { rightList, wrongList, right, wrong } = res.data;
      this.checkList = wrongList;
      this.rightList = rightList;
      this.right = right
      this.wrong = wrong
    },
    back() {
      this.$router.go(-1)
    },
    again() {
      this.checkVisible = false;
      this.excelData = [];
      this.checkList = [];
      this.right = 0;
      this.wrong = 0;
    },
    exportXls() {
      downloadGoods().then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success("获取数据成功，等待导出...");
          // var value = new FormData()
          if (!res.data) {
            this.$message.warning("文件下载失败");
          }
          console.log(res);
          this.downloads(res.data);
        }
        else {
          this.$message.error(res.message);
        }
      }).catch(err => {
        console.log(err);
      });
    },
    downloads(url) {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      function iframeLoad() {
        const win = iframe.contentWindow;
        const doc = win.document;
        if (win.location.href === url) {
          if (doc.body.childNodes.length > 0) {
          }
          iframe.parentNode.removeChild(iframe);
        }
      }
      iframe.src = "";
      document.body.appendChild(iframe);
      setTimeout(function loadUrl() {
        iframe.contentWindow.location.href = url;
      }, 50);
    },
  },
}
</script>
<style lang="scss" src="./supplierInstrumentBatchAdd.scss" scoped>

</style>
