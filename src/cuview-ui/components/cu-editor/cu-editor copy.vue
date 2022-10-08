<template>
    <div id="cu-editor">
        <editor api-key="cwn8p05pajn0e4lqcsdebji3pi1avzufrmc669o15pb1f58w" :disabled="disabled" :initial-value="initVal"
            :init="init()" v-model="content" model-events="change keydown blur focus paste"
            :output-format="outputFormat" />
    </div>
</template>
  
<script>
import Editor from '@tinymce/tinymce-vue'
// https://www.tiny.cloud/docs/tinymce/6/vue-ref/
export default {
    name: 'cu-editor',
    components: {
        'editor': Editor
    },
    props: {
        data: {
            type: String,
            default: ''
        },
        height: {
            type: Number,
            default: 500
        },
        disabled: {
            type: Boolean,
            default: false
        },
        initVal: {
            type: String,
            default: ''
        },
        outputFormat: {// 指定通过input事件发出的内容的格式
            type: String,
            default: 'html',
            validator: function (value) {
                // The value must match one of these strings
                return ['html', 'text'].includes(value)
            }
        },
        statusbar: {// 是否显示底部状态栏
            type: Boolean,
            default: false
        },
        skin: {
            type: String,
            default: 'oxide',
            validator: function (value) {
                return ['oxide', 'material-classic', 'material-outline', 'fabric', 'jam', 'oxide-dark'].includes(value)
            }
        },
        contentCss: {
            type: String,
            default: 'oxide',
            validator: function (value) {
                // import 'tinymce/skins/ui/oxide/skin.css'
                return ['oxide', 'material-classic', 'material-outline', 'fabric', 'jam', 'dark'].includes(value)
            }
        }
    },
    data() {
        return {
            // content: '',
            // initEditor: {
            //     // height: 500,
            //     // language: 'zh_CN',//中文
            //     // language_url: '/tinymce/langs/zh_CN.js',//语言包路径
            // }
        }
    },
    created() {
        console.log('555', new Date().getMilliseconds());
    },
    mounted() {
        console.log('666', new Date().getMilliseconds());
        console.log(this.data);
    },
    computed: {
        content: {// 编辑器内容
            get() {
                console.log('677', new Date().getMilliseconds(), this.data);

                return this.data;
            },
            set(val) {
                this.$emit("update:data", val)

            }
        }
    },
    watch: {
    },
    methods: {
        init() {
            return {
                height: this.height,
                language: 'zh_CN',//中文
                language_url: '/tinymce/langs/zh_CN.js',//语言包路径
                skin: this.skin,// 皮肤 
                content_css: this.contentCss,// 样式文件 
                plugins: 'lists link image table code help wordcount',// 插件
                statusbar: this.statusbar,// 是否显示状态栏
            };
        },
        reset() {
            this.content = ''
        }
    }
}
</script>