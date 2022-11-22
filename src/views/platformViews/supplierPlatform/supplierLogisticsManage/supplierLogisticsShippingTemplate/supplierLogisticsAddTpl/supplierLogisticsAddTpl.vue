<template>
    <div class="page-container table-page">
        <el-button class="back-btn" type="info" size="mini" @click="back">返回上一页</el-button>
        <div class="header">
            <h2 class="header-title">{{tplId?'编辑':'新增'}}运费模板</h2>
        </div>
        <div class="content">
            <cu-form ref="form" :formData.sync="tpl" :formRule="rules" class="form" @submitForm="submitForm"
                @sendAreaCodeChange="areaChange" labelWidth="130px" @closeForm="closeForm"
                @sendAreaCodeInitData="sendAreaCodeInitData" :disabledIgnoreValidate="true">
            </cu-form>
        </div>


    </div>
</template>
<script>
import { addSupplierFreightTemplate, getFreightTemplateInfo,updateSupplierFreightTemplate,getArea } from "@/api/aksApi/platformApi/supplierPlatformApi.js";
import area from "@/assets/js/area.js";
import { mapState } from "vuex";
export default {
    data() {
        return {
            tplId: '',
            tpl: {
                templateName: '',
                sendAreaCode: '',
                amount: '',
                orderFromAmount: '',
                orderToAmount: '',
            },
            areaList: [],
            areaData: null,
            rules: [
                {
                    key: 'templateName',
                    view: 'input',
                    label: '模板名称',
                    placeholder: '请输入模板名称',
                    rules: [
                        { required: true, message: "请输入模板名称", trigger: "change" },
                        { min: 2, max: 40, message: "名称长度不得少于2个字符", trigger: "blur" },
                    ],
                },
                {
                    key: 'sendAreaCode',
                    view: 'select',
                    label: '发货地区',
                    placeholder: '请选择发货地区',
                    rules: [
                        { required: true, message: "请选择发货地区", trigger: "change" },
                    ],
                    data: [],
                    propsRule: {
                        label: "areaName",
                        value: "areaCode",
                    },
                    multiple: false,
                    dynamicEnable: true,
                    realTimeDynamic: false,
                },
                {
                    key: 'amount',
                    view: 'input-number',
                    label: '运费金额',
                    placeholder: '请输入运费金额',
                    rules: [
                        { required: true, message: "请输入运费金额", trigger: "change" },
                    ],
                },
                {
                    key: 'orderFromAmount',
                    view: 'input-number',
                    label: '订单金额起始值',
                    placeholder: '请输入订单金额起始值',
                    rules: [
                        { required: true, message: "请输入订单金额起始值", trigger: "change" },
                    ],
                },
                {
                    key: 'orderToAmount',
                    view: 'input-number',
                    label: '订单金额起始值',
                    placeholder: '请输入订单金额起始值',
                    rules: [
                        { required: true, message: "请输入订单金额起始值", trigger: "change" },
                    ],
                },
            ]
        }
    },
    created() {
        this.tplId = this.$route.params.id;
        if (this.tplId) {
            this.tpl['id'] = this.tplId;
            this.getTplDetails()
        }
    },
    computed: {
        ...mapState(['vuex_user'])
    },
    methods: {
        getTplDetails() {
            getFreightTemplateInfo({id:this.tplId}).then(res => {
                console.log(res);
                if (res.code == 200) {
                   this.tpl = res.data;
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        sendAreaCodeInitData({ item }, callback) {
            console.log(item,callback);
            getArea().then(res => {
                console.log(res);
                if (res.code == 200) {
                  let areas = res.data;
                  areas.unshift({
                    areaCode: "-1",
                    areaName: "全国"
                  });
                  console.log(areas);
                    setTimeout(() => {
                        callback(areas, {
                        label: "areaName",
                        value: "areaCode",
                    })
                    }, 200);
                }else {
                  this.$message.error(res.message)
                }
            }).catch((err) => {
                console.log(err);
            });
        },
        areaChange(data) {
            console.log(data);
            this.areaData = data;
        },
        submitForm(formData, formRef) {
            let params = formData;
            console.log( this.areaData);
            if (this.areaData) {
                params.sendAreaCode = this.areaData.areaCode;
                params.sendAreaName = this.areaData.areaName;
            }
            console.log(params, formRef);
            delete params.createTime;

            if (this.tplId) {// 编辑模板
                updateSupplierFreightTemplate(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success("操作成功")
                        formRef.resetFields();
                        this.back()
                    }else {
                        this.$message.error(res.message)
                    }
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                params.id = 0;// 接口问题 新增时必须传一个id
                console.log(this.vuex_user);
                params.createBy = this.vuex_user.id + '';
                params.supplierId = this.vuex_user.sysId;
                console.log(params);
                addSupplierFreightTemplate(params).then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.$message.success("运费模板新增成功")
                        formRef.resetFields();
                        this.back()
                    }else {
                        this.$message.error(res.message)

                    }
                });
            }

            this.formVisible = false;
        },
        closeForm(formRef) {
            formRef.resetFields();
            this.back()
        },

        back() {
            this.$router.go(-1)
        }
    },
}
</script>
<style lang="scss"  scoped>
.page-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    padding: 0 20px 20px;
    font-size: 16px;

    .back-btn {
        position: absolute;
        margin-top: 20px;
        z-index: 999;
        // width: 110px;
        height: 32px;
        background: #156cc2;
        border: none;
        outline: none;
        border-radius: 2px 2px 2px 2px;
        opacity: 1;

    }

    &::-webkit-scrollbar {
        width: 0px;
    }
}

.header {
    position: relative;
    height: 76px;
    line-height: 76px;
    border-bottom: 1px solid #eeeeee;

    &-title {
        text-align: center;
        font-size: 20px;
        font-family: Source Han Sans CN-Bold, Source Han Sans CN;
        font-weight: bold;
        color: #00023a;
        text-align: center;
    }
}

.form {
    width: 40%;
    margin: 40px auto;
}
</style>
