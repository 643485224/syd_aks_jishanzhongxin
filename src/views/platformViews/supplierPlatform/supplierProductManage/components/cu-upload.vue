<template>
    <!-- action="https://jsonplaceholder.typicode.com/posts/" -->
    <div>
        <el-upload v-if="type == 'file'" class="file-upload" :accept="accept" :multiple="multiple" :limit="limit"
            :on-exceed="handleExceed" :action="actionUrl" :auto-upload="autoUpload" :before-upload="beforeUpload"
            :on-preview="handlePreview" :before-remove="beforeRemove" :on-remove="handleRemove" 
            :on-change="uploadChange" :on-success="uploadSuccess" :file-list="fileList" @submit="uploadSubmit">
            <el-button size="small" class="upload-btn">{{text}}</el-button>
            <slot name="tip">
                <div slot="tip" class="el-upload__tip">{{tip}}</div>
            </slot>
        </el-upload>

        <el-upload v-if="type=='image'" class="avatar-uploader" :multiple="multiple" :limit="limit"
        list-type="picture-card" :on-success="uploadSuccess" :action="actionUrl" :auto-upload="autoUpload"
             :before-upload="beforeUpload" >
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <slot name="tip">
                <div slot="tip" class="el-upload__tip">{{tip}}</div>
            </slot>
        </el-upload>

    </div>
</template>
<script>
import {
    http,
    baseURL
} from "@/api/conf/index-json";
export default {
    name: 'cu-el-upload',
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
            default: '.pdf,.jpg,.png'
        },
        multiple: {
            type: Boolean,
            default: false
        },
        limit: {
            type: Number,
            default: 3
        },

        fileList: {
            type: Array,
            default: () => []
        },
        imageUrl: {
            type: String,
            default: ''
        },
        actionUrl: {
            type: String,
            default: `${baseURL}/upload`
        },
        autoUpload: {// 是否在选取文件后立即进行上传
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            // fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        };
    },
    created() {
 
    },
    methods: {
        // 上传前校验
        beforeUpload(file) {
            console.log(file);
            if (this.type == 'image') {
                return validatorIMG(file)
            }

        },
        validatorIMG(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt2M = file.size / 1024 / 1024 < 2;

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!');
            }
            return isJPG && isLt2M;
        },
        // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
        uploadChange(file,fileList){
            console.log(file,fileList);
           
        },
        uploadSuccess(res, file) {
            console.log(res,file);
            // this.imageUrl = URL.createObjectURL(file.raw);
        },
        uploadSubmit(){

        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
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
    ::v-deep.el-upload--picture-card{
        width: 110px;
        height: 110px;
        line-height: 110px;

    }
}
</style>
