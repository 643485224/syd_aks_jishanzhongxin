<template>
    <uploader :options="options" class="uploader-example">
        <uploader-unsupport></uploader-unsupport>
        <uploader-drop>
            <!-- <p>Drop files here to upload or</p> -->
            <uploader-btn :attrs="attrs" v-if="type == 'image'">
                <!-- <slot name="image-btn"></slot> -->
                <img src="./image/camera_light.svg" alt="">
                <p>添加照片</p>
            </uploader-btn>
            <uploader-btn v-else-if="type == 'file'">select files</uploader-btn>
            <uploader-btn v-else-if="type == 'directory'" :directory="true">select folder</uploader-btn>
        </uploader-drop>
        <!-- <uploader-list></uploader-list> -->
    </uploader>
</template>

<script>
export default {
    name: 'cu-upload',
    props: {
        type: {
            type: String,
            default: 'image'
        }
    },
    data() {
        const self = this;
        return {
            options: {
                // https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js
                target: '//localhost:3000/upload',
                testChunks: false
            },
            attrs: {
                accept: 'image/*'
            }
        }
    }
}
</script>

<style lang="scss">
.uploader-example {
    width: 110px;
    height: 110px;
    padding: 2px;
    margin: 10px;
    font-size: 12px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #CBCBCB;
    /* box-shadow: 0 0 10px rgba(0, 0, 0, .4); */
}
.uploader-example .uploader-drop {
    width: 100%;
    height: 100%;
    padding: 0;
    // margin: 0 auto;
    text-align: center;
    border: none;
    background-color: #fff;
}

.uploader-example .uploader-btn {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-right: 4px;
    text-align: center;
    border: none;
    background-color: #fff;
    font-size: 12px;
    font-family: Source Han Sans CN-Regular, Source Han Sans CN;
    font-weight: 400;
    color: #CBCBCB;

    img {
        width: 30px;
    }
}



.uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>