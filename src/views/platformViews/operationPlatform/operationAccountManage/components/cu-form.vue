<template>
    <div>
        <el-form :ref="formName" :model="form" status-icon :label-width="labelWidth" :label-position="labelPosition" :inline="inline" :size="size">
            <el-form-item :label="item.label" v-for="item in formRule" :key="item.key" :prop="item.key"
                :rules="ruleFilter(item.rules)">
                <div v-if="item.view == 'input'">
                    <el-input v-model="form[item.key]" :placeholder="item.placeholder"></el-input>
                </div>
                <div v-if="item.view == 'input-tel'">
                    <el-input type="tel" v-model="form[item.key]" :placeholder="item.placeholder" autocomplete="off"></el-input>
                </div>
                <div v-if="item.view == 'input-number'">
                    <el-input :type="item.key" v-model.number="form[item.key]" :placeholder="item.placeholder" autocomplete="off"></el-input>
                </div>
                <div v-if="item.view == 'input-password'">
                    <el-input :type="'password'" v-model="form[item.key]" :placeholder="item.placeholder" autocomplete="off"></el-input>
                </div> 
                <div v-if="item.view == 'input-textarea'">
                    <el-input type="textarea" :rows="4" v-model="form[item.key]" :placeholder="item.placeholder">
                    </el-input>
                </div>
                <div v-if="item.view == 'select'">
                    <el-select v-model="form[item.key]" :placeholder="item.placeholder">
                        <el-option :label="selectItem.name" :value="selectItem.value" v-for="selectItem in item.data"
                            :key="selectItem.value">
                        </el-option>
                    </el-select>
                </div>
                <div v-if="item.view == 'date-picker'">
                    <el-date-picker type="date" :placeholder="item.placeholder" v-model="form[item.key]">
                    </el-date-picker>
                </div>
            </el-form-item>
                <template>
                    <slot name="footer">
                        <div class="form-footer">
                            <el-button class="footer-btn">??????</el-button>
                            <el-button class="footer-btn" type="primary" @click="submitForm('cuForm')">
                                ??????
                            </el-button>
                            <!-- <el-button @click="resetForm('cuForm')">
                                ??????
                            </el-button> -->
                        </div>

                    </slot>
                </template>
        </el-form>
    </div>
</template>
<script>
import deepClone from '@/cuview-ui/function/deepClone'
import {formValidates,validateMobile,validatePass,validateCheckPass} from './validate.js'
export default {
    props: {
        // ????????????
        formRule: {
            type: Array,
            default: () => [
                {
                    key: 'name',
                    view: 'input',
                    width: '',
                    label: '????????????',
                    placeholder: '?????????????????????',
                    rules: [
                        { required: true, message: '?????????????????????', trigger: 'blur' },
                        { min: 3, max: 5, message: '????????? 3 ??? 5 ?????????', trigger: 'blur' }
                    ]
                },
                {
                    key: 'region',
                    view: 'select',
                    width: '',
                    label: '????????????',
                    placeholder: '?????????????????????',
                    data: [
                        {
                            name: '????????????1',
                            value: '????????????1'
                        },
                        {
                            name: '????????????2',
                            value: '????????????2'
                        }
                    ],
                    rules: [
                        { required: true, message: '?????????????????????', trigger: 'change' }
                    ]
                },
                {
                    key: 'date',
                    view: 'date-picker',
                    width: '',
                    label: '????????????',
                    placeholder: '?????????????????????',
                    rules: [
                        { required: true, message: '?????????????????????', trigger: 'change' }
                    ]
                },
                {
                    key: 'desc',
                    view: 'input-textarea',
                    width: '',
                    label: '????????????',
                    placeholder: '?????????????????????',
                    rules: [
                        { required: true, message: '?????????????????????', trigger: 'blur' },
                        { min: 3, max: 5, message: '????????? 3 ??? 5 ?????????', trigger: 'blur' }
                    ]
                },
                {
                    key: 'password',
                    view: 'input-password',
                    width: '',
                    label: '??????',
                    placeholder: '???????????????',
                    rules: [
                        { required: true, message: "???????????????", trigger: "change" },
                        { min: 2, max: 20, message: "?????????6-12????????????????????????(???????????????)", trigger: "blur", validator: checkPassword }
                    ]
                },


            ]
        },
        // ????????????
        formData: {
            type: Object,
            default: () => {
                return {
                    name: '',
                    region: '',
                    date: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    password: ''
                }
            }
        },
        size: {// ????????????
            type:String,
            default:'medium'
        },
        labelWidth: {// label ??????
            type:String,
            default:'80px'
        },
        labelPosition: {// label ?????? top/left/right
            type:String,
            default:'right'
        },
        inline: {// ????????????  
            type:Boolean,
            default:false
        },
        formName: {
            type: String,
            default: 'cuForm'
        }
        
    },
    data() {
        return {
            rules: {},
            form: {}
        }
    },
    created() {
        this.bindValue()
        console.log(this.rules);
    },
    mounted() {
        formValidates.init(this.$refs[this.formName],this.form)
        console.log(this.form, this.formRule);
    },
    watch: {
        form(newVal, oldVal) {
            console.log(newVal, oldVal);
            this.$emit("update:formData", newVal)
        }
    },
    methods: {
        bindValue() {
            this.form = deepClone(this.formData)
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.$emit('submitForm', this.$refs[formName])
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        ruleFilter(rules){
            if(rules.length){
                rules.map(rule => {
                    if(formValidates[rule.validate]){
                        rule.validate = formValidates[rule.validate]
                    }
                })
            }
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
}
</script>
<style lang="scss" scoped>
.form-footer {
    display: flex;
    justify-content: center;

    .footer-btn {
        width: 120px;
        height: 32px;
        margin: 20px 20px 0px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
