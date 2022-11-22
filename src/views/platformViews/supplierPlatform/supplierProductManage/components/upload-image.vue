<template>
  <div :class="size">
    <!-- :limit="limit" 设置 accept 、muitiple 时 不符合限制自动移除操作下无提示 待解决 -->
    <el-upload list-type="picture-card" :class="{disabled: uploadDisabled}" v-bind="$attrs" :action="action"
      :file-list="value" :http-request="httpRequest" :before-upload="beforeUpload" :before-remove="beforeRemove"
      :on-remove="handleRemove" :on-preview="handlePreview">
      <i class="el-icon-plus"></i>
      <slot name="tip">
        <div slot="tip" class="el-upload__tip">{{tip}}</div>
      </slot>
    </el-upload>
    <image-viewer v-if="showImgViewer" :url-list="imgPreviewUrl" :on-close="() => {showImgViewer = false}"
      :z-index="3000" />
  </div>
</template>
<script>
import ImageViewer from 'element-ui/packages/image/src/image-viewer'
import { upload } from "@/api/aksApi/platformApi/commonApi.js";

export default {
  components: {
    ImageViewer
  },
  props: {
    value: {// 上传文件列表
      type: Array,
      default: () => { return [] }
    },
    type: {// 上传类型
      type: String,
      default: 'image'
    },
    customRequest: {// 是否开启自定义上传
      type: Boolean,
      default: false
    },
    tip: {// 提示说明文字
      type: String,
      default: ''
    },
    accept: {// 接受上传的文件类型
      type: String,
      default: 'image/jpeg,image/gif,image/png'
    },
    maxSize: {// 限制文件上传尺寸最大值 MB
      type: Number,
      default: 2
    },
    action: {// 必选参数，默认上传的地址  开启自定义上传后被覆盖
      type: String,
      default: '/api/upload'
    },
    size: {// 图片上传时，上传框尺寸  large small
      type: String,
      default: ''
    },
  },
  data() {
    return {
      fileList: [],// 上传文件列表
      limit: undefined,// 上传数量限制
      uploadDisabled: false,// 是否禁用上传
      showImgViewer: false,// 显示图片预览
      imgPreviewUrl: [],// 图片预览列表
    }
  },
  created() {
    console.log(this.$attrs);
    this.$attrs.disabled?this.uploadDisabled = this.$attrs.disabled:null;
    console.log(this.uploadDisabled);

  },
  watch: {
    immediate:true,
    value(val) {
      console.log(val);
      console.log(this.$attrs);
      this.fileList = val;
      if (this.$attrs.limit != undefined && !this.$attrs.disabled ) {
        this.limit = this.$attrs.limit;
        // 控制图片上传数量等于limit数量时，不显示多余上传按钮
        (val.length == this.limit) ? this.uploadDisabled = true : this.uploadDisabled = false;
        console.log(this.limit);
      }

    }
  },
  methods: {
    // 上传前校验
    beforeUpload(file) {
      // console.log(file);
      // if (this.type == 'image') {
      //   return this.validatorIMG(file)
      // }
    },
    // 图片校验
    validatorIMG(file) {
      let accepts = this.accept.split(',')
      const isAccept = accepts.indexOf(file.type) > -1;
      const fitSize = file.size / 1024 / 1024 < this.maxSize;
      if (!isAccept) {
        this.$message.error(`上传图片只能是 ${this.accept} 格式!`);
      }
      if (!fitSize) {
        this.$message.error(`上传图片大小不能超过  ${this.maxSize} MB!`);
      }
      console.log(isAccept, fitSize);
      return isAccept && fitSize;
    },
    // 上传文件-接口
    async httpRequest(data) {
      console.log(data);
      try {
        let FormDatas = new FormData(); //上传文件的需要formdata类型;所以要转
        FormDatas.append("file", data.file);
        this.uploadDisabled = true;// 执行上传操作到文件上传完成前这段时间  超出上传数量仍会显示上传按钮 先进行禁用
        // 测试时模拟 不触发真实上传操作
        // let url = data.file.url;
        // console.log(url, data.file.uid);
        // console.log(data.file.name,);
        // this.fileList.push({ name: data.file.name, url, uid: data.file.uid })
        // console.log(this.fileList, url);
        // this.$emit("input", this.fileList)
        let res = await upload(data.file)
        console.log(res);
        if (res.code == 200) {
          this.$message.success(res.message);
          let url = res.data;
          console.log(this.value);
          this.fileList.push({ name: data.file.name, url, uid: data.file.uid })
          console.log(this.fileList, url);
          // 有 $emit input ，value 监听方法不执行情况，这里做补充处理
          (this.fileList.length == this.limit) ? this.uploadDisabled = true : this.uploadDisabled = false;
          this.$emit("input", this.fileList)
          console.log(this.value);

        } else {
          this.$message.error(res.message);
        }
      } catch (error) {
        console.log(error);
      }

    },
    // 文件预览
    handlePreview(file) {
      console.log(file,this.fileList);
      if (this.type == 'image') {
        this.showImgViewer = true;
        this.imgPreviewUrl = this.fileList.map(item => item.url);
      } else {
        let docUrl = file.url
        let url = encodeURIComponent(docUrl)
        console.log(url);
        // pptx、ppt、pps、docx、doc、xlsx、xls
        let officeUrl = 'http://view.officeapps.live.com/op/view.aspx?src=' + url
        window.open(officeUrl, '_target');
      }
    },
    // 文件移除
    handleRemove(file, filelist) {
      console.log(file, filelist);
      if (!filelist.length) {
        this.fileList = []
        // 有 $emit input ，value 监听方法不执行情况，这里做补充处理
        this.uploadDisabled = false
      } else {
        this.fileList = this.fileList.filter(item => file.uid != item.uid)
      }
      this.$emit("input", this.fileList)
      console.log(this.fileList);

    },
    // 移除前操作
    beforeRemove(file, fileList) {
      console.log(file, fileList);
      // return this.$confirm(`确定移除 ${file.name}？`);
    },
  },
}
</script>
<style lang="scss" scoped>
// 禁用时 不显示上传按钮
.disabled ::v-deep .el-upload--picture-card {
  display: none;
}
.is-disabled {
  display: none;
}

// 禁用移除时动画
::v-deep .el-list-leave-active {
  transition: none;
}

::v-deep .el-list-leave-to {
  transition: none;
}





// 设置图片上传框 不同尺寸
.large {
  ::v-deep .el-upload--picture-card {
    width: 162px;
    height: 118px;
    line-height: 118px;
  }

  ::v-deep.el-upload-list--picture-card .el-upload-list__item {
    width: 162px;
    height: 118px;
  }
}

.small {
  ::v-deep .el-upload--picture-card {
    width: 110px;
    height: 110px;
    line-height: 110px;

  }

  ::v-deep.el-upload-list--picture-card .el-upload-list__item {
    width: 110px;
    height: 110px;
  }

}
</style>
