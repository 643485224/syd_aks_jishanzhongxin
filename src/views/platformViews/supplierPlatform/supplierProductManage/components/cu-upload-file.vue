<template>
    <!-- action="https://jsonplaceholder.typicode.com/posts/" @submit="uploadSubmit" :http-request="httpRequest"  :http-request="customRequest?this.httpRequest:null"-->
    <div>
        <template v-if="type == 'file'">
            <el-upload ref="uploadRef" class="file-upload" :accept="accept" :multiple="multiple" :limit="limit"
                :on-exceed="handleExceed" :file-list="fileList" :action="actionUrl" :auto-upload="autoUpload"
                :before-upload="beforeUpload" :on-change="uploadChange" :on-success="uploadSuccess"
                :on-preview="handlePreview" :before-remove="beforeRemove" :http-request="httpRequest"
                :on-remove="handleRemove" :data="multipartFile" :headers="headers" :drag="drag">
                <el-button size="small" class="upload-btn">{{text}}</el-button>
                <slot name="tip">
                    <div slot="tip" class="el-upload__tip">{{tip}}</div>
                </slot>
            </el-upload>
            <!-- <el-progress style=" width:160px;margin-top: 0px" :text-inside="false" :stroke-width="12"
                :percentage="progressPercent" /> -->
        </template>
        <!-- <el-button size="small" class="upload-btn" @click="submit2">手动上传</el-button> -->

        <el-upload v-if="type=='image'" ref="uploadRef" class="avatar-uploader" list-type="picture-card"
            :accept="accept" :multiple="multiple" :limit="limit" :on-exceed="handleExceed" :file-list="fileList"
            :action="actionUrl" :auto-upload="autoUpload" :before-upload="beforeUpload" :on-change="uploadChange"
            :on-success="uploadSuccess" :http-request="httpRequest" :on-preview="handlePreview"
            :before-remove="beforeRemove" :on-remove="handleRemove">
            <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
            <i class="el-icon-plus"></i>
            <slot name="tip">
                <div slot="tip" class="el-upload__tip">{{tip}}</div>
            </slot>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogPreviewUrl" alt="" v-if="type == 'image'">
            <iframe :src="dialogPreviewUrl" width="100%" height="100%" border="0" v-else></iframe>
        </el-dialog>
    </div>
</template>
<script>
/**
 * 自动上传：
 * - 选择文件后自动上传 auto-upload: true
 * - 使用组件默认上传：action:上传地址
 * - 自定义上传： http-request 屏蔽 action ,自定义请求
 * 手动上传：auto-upload: false  不触发  beforeUpload  须在 on-change  做上传前判断
 * - 组件内触发上传事件
 * - 组件外触发上传事件：外部$refs 调用组件内上传方法时，组件内数据获取为data初始值，需要把上传步骤在组件外执行。
 */

import { upload, uploadImage } from "@/api/aksApi/platformApi/commonApi.js";
const formData = new FormData()
export default {
    name: 'cu-upload-file',
    props: {
        type: {
            type: String,
            default: 'image'
        },
        text: {
            type: String,
            default: '点击上传'
        },
        tip: {
            type: String,
            default: '只能上传jpg/png文件，且不超过500kb'
        },
        accept: {
            type: String,
            default: '.doc,.docx,.xls,.xlsx,.pdf'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number,
            default: 1
        },
        // minSize: {
        //     type: Number,
        //     default: 3  // kb
        // },
        maxSize: {
            type: Number,
            default: 2 // MB
        },

        files: {
            type: Array,
            default: () => []
        },
        imageUrl: {
            type: String,
            default: ''
        },
        actionUrl: {
            type: String,
            default: '/api/upload'
        },
        autoUpload: {// 是否在选取文件后立即进行上传
            type: Boolean,
            default: true
        },
        drag: {// 是否启用拖拽上传
            type: Boolean,
            default: false
        },
        // customRequest: {// 是否使用自定义上传
        //     type: Boolean,
        //     default: false
        // }
    },
    data() {
        return {
            // {name:'主图',url:'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
            fileList: [],
            progressPercent: 0,// 进度条
            multipartFile: {},
            headers: {
                // 'Authorization': this.$store.state.vuex_token.tokenHead + store.state.vuex_token.token
            },
            dialogPreviewUrl: '',
            dialogVisible: false
            // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        };
    },
    created() {
        this.fileList = this.files
        this.headers = {
            'Authorization': this.$store.state.vuex_token.tokenHead + this.$store.state.vuex_token.token,
            'Content-Type': 'multipart/form-data',
            // 'Accept': 'multipart/form-data'
        }
    },
    computed: {
        // fileList(val) {
        //     console.log(val);
        //     return this.files
        // },
    },
    watch: {
        fileList(val) {
            this.$emit("update:files", val)
            val.length ? this.multipartFile['multipartFile'] = val[0] : null
        },
        files(val) {
            this.fileList = val;
        }
    },
    methods: {
        // 上传前校验
        beforeUpload(file) {
            console.log(file);
            if (this.type == 'image') {
                return this.validatorIMG(file)
            }
            //校验上传文件类型
            // const fileType = file.name.substring(file.name.lastIndexOf("."));
            // if (this.accept.indexOf(fileType) == -1) {
            //     this.$message.error(`请选择 ${this.accept} 文件`);
            //     this.fileList = [];
            // }

        },
        validatorIMG(file) {
            const isAccept = this.accept.indexOf(file.type) == -1;
            const fitSize = file.size / 1024 / 1024 < this.maxSize;

            if (!isAccept) {
                this.$message.error(`上传图片只能是 ${this.accept} 格式!`);
            }
            if (!fitSize) {
                this.$message.error(`上传图片大小不能超过  ${this.maxSize} MB!`);
            }
            return isAccept && fitSize;
        },
        // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
        uploadChange(file, fileList) {
            this.fileList = fileList
            // .map(item => item.raw)

            // this.file = file.raw;
            // this.fileList.push(file.raw);
            // console.log(this.fileList);
            if (file.status === 'ready') {

                // 附件变更
                //this.filelist = filelist  //这种方式无法触发手动上传动作
                // if(filelist.length > 1) {
                // 	filelist.splice(0,1)
                // }
                // console.log(file, fileList);
            }
            // else if (file.status === 'success') {
            //     this.$message({
            //         type: 'success',
            //         message: '上传附件成功！'
            //     })
            // } else {
            //     console.log(file, fileList);
            //     this.$message({
            //         type: 'error',
            //         message: '上传附件失败，请重试！'
            //     })
            // }

        },
        updateProgress(e) {
            //e为回调回来的参数 通过进行和total的值来进行进度
            this.progressPercent = parseInt((e.loaded / e.total) * 100);
        },
        async httpRequest(params) {
            // 上传新文件时，将进度条值置为零
            this.progressPercent = 0
            let { file } = params;
            console.log(params, this.fileList);
            let res;
            console.log(this.type);
            // if (this.type == 'image') {
            //     res = await uploadImage(this.fileList[0])
            //     console.log(res);
            // }else {

            // 重点一：complete就是处理后的上传进度数值1-100
            res = await upload(file, this.updateProgress)
            this.$emit("submit", res)
            // }


        },
        uploadSuccess(res, file, fileList) {
            console.log('uploadSuccess', res, file, fileList);
            if (this.type == 'image') {
                // this.imageUrl = URL.createObjectURL(file.raw);
            }


        },
        async uploadSubmit() {


            //创建FormData对象，调用append方法添加参数
            // let formData = new FormData();
            // if (!this.fileList.length) return;
            // this.fileList.forEach(file => {
            //     console.log(file);
            //     formData.append("file", file);
            // })
            // console.log(formData);
            let res = await upload(this.filelist_temp[0])
            console.log(res);
            // return res;
        },

        // 附件移除
        handleRemove(file, filelist) {
            console.log(file, filelist);
            this.$emit("remove", file, filelist)
            // //this.filelist = filelist  //这种方式无法触发手动上传动作
            // filelist.splice(0, 1)
            // this.file_list_temp = filelist
            // this.$forceUpdate()
        },
        handlePreview(file) {
            console.log(file);
            // this.dialogPreviewUrl = file.url;
            // this.dialogVisible = true;

            if (this.type == 'image') {
                this.dialogPreviewUrl = file.url;
            } else {
                let docUrl = file.url
                let url = encodeURIComponent(docUrl)
                console.log(url);
                // pptx、ppt、pps、docx、doc、xlsx、xls
                let officeUrl = 'http://view.officeapps.live.com/op/view.aspx?src=' + url
                window.open(officeUrl,'_target');
            }
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 ${this.limit} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        }
    }
}
</script>
<style lang="scss" scoped>
// 文件上传
.file-upload {

    .upload-btn {
        height: 32px;
    }

}





// 图片上传
.avatar-uploader {

    ::v-deep .el-upload {
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        text-align: left;
    }

    .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {

        font-size: 28px;
        color: #8c939d;
        width: 110px;
        height: 110px;
        line-height: 110px;
        text-align: center;
        // border: 1px dashed #d9d9d9;

    }

    .avatar {
        width: 110px;
        height: 110px;
        display: block;
    }

    ::v-deep.el-upload--picture-card {
        width: 110px;
        height: 110px;
        line-height: 110px;
        text-align: center;

    }


    ::v-deep.el-upload-list--picture-card .el-upload-list__item {
        width: 110px;
        height: 110px;
    }
}
</style>
