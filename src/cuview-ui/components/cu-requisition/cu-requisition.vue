<template>
  <div class="elTabThree">
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="elTabThreeBodyLeft">
        <!-- 左侧部分-审核单据列表 -->
        <div class="elTabThreeBodyLeft_title">审核单据列表</div>
        <el-collapse :accordion="true">
          <el-collapse-item title="待审核" :name="1">
            <div
              :tabindex="index"
              class="itemList"
              v-for="(item, index) in pendingReviewList"
              :key="item + index"
              @click="actinItem(item)"
            >
              <div>
                <span>姓名：</span>
                <span>{{ item.apply_name }}</span>
              </div>
              <div>
                <span>部门：</span>
                <span>{{ item.apply_department }}</span>
              </div>
              <div>
                <span>时间：</span>
                <span>{{ item.addtime }}</span>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="已驳回" :name="2">
            <div
              :tabindex="index"
              class="itemList"
              v-for="(item, index) in rejectedList"
              :key="item + index"
              @click="actinItem(item)"
            >
              <div>
                <span>姓名：</span>
                <span>{{ item.apply_name }}</span>
              </div>
              <div>
                <span>部门：</span>
                <span>{{ item.apply_department }}</span>
              </div>
              <div>
                <span>时间：</span>
                <span>{{ item.addtime }}</span>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="已审核" :name="3">
            <div
              :tabindex="index"
              class="itemList"
              v-for="(item, index) in auditedList"
              :key="item + index"
              @click="actinItem(item)"
            >
              <div>
                <span>姓名：</span>
                <span>{{ item.apply_name }}</span>
              </div>
              <div>
                <span>部门：</span>
                <span>{{ item.apply_department }}</span>
              </div>
              <div>
                <span>时间：</span>
                <span>{{ item.addtime }}</span>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </cu-animation>
    <cu-animation :type="'slideInRight'" :time="0.5">
      <div class="elTabThreeBodyRight">
        <!-- 右侧部分-加班申请单 -->
        <div class="elTabThreeBodyRight_title">{{ title }}</div>
        <!-- 上半部分-加班申请单 -->
        <div class="elTabThreeBodyTop">
          <div class="itemOne">填写申请信息：</div>
          <div class="itemTwo">
            <div class="formName">
              <span>名字：</span>
              <el-input
                :disabled="true"
                class="formInput"
                v-model="form.apply_name"
                placeholder="请输入名字"
              ></el-input>
            </div>
            <div class="formDepartment">
              <span>部门：</span>
              <el-input
                :disabled="true"
                class="formInput"
                v-model="form.apply_department"
                placeholder="请输入部门"
              ></el-input>
            </div>
            <div class="formWork">
              <span>职位：</span>
              <el-input
                :disabled="true"
                class="formInput"
                v-model="form.apply_position"
                placeholder="请输入职位"
              ></el-input>
            </div>
          </div>
          <div v-if="title == '请假申请单'" class="restClass">
            <div class="formRest">
              <span>请假类型：</span>
              <el-select
                :disabled="form.ifTrueOrFalse"
                class="formSelectRest"
                v-model="form.AskForLeave"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in form.AskForLeaveList"
                  :key="index"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
            <div class="inputCheckBox">
              <el-checkbox
                :disabled="form.ifTrueOrFalse"
                v-model="form.WorkOve"
              ></el-checkbox>
              <span
                >加班抵扣：抵扣{{
                  form.Duration ? form.Duration : ""
                }}
                /(剩余：0小时)</span
              >
            </div>
          </div>
          <div v-if="title == '出差申请单'" class="AddressAndTrafficToolsClass">
            <div class="AddressClass">
              <span>出差地址：</span>
              <el-input
                :disabled="form.ifTrueOrFalse"
                class="formInput"
                v-model="form.Address"
                placeholder="请输入地址"
              ></el-input>
            </div>
            <div class="TrafficToolsClass">
              <span>交通方式：</span>
              <el-select
                :disabled="form.ifTrueOrFalse"
                class="formSelectRest"
                v-model="form.TrafficTools"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in form.TrafficToolsList"
                  :key="index"
                  :value="item"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div v-if="title == '补卡申请单'" class="supplementaryCard">
            <div class="supplementaryCardFormDate">
              <span>补卡日期：</span>
              <el-date-picker
                :disabled="form.ifTrueOrFalse"
                class="supplementaryCardFormDateItem"
                v-model="form.cardDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
            <div class="supplementaryCardFormTime">
              <span>补卡时间：</span>
              <el-time-picker
                :disabled="form.ifTrueOrFalse"
                class="supplementaryCardFormTimeItem"
                v-model="form.cardTime"
                :picker-options="{
                  selectableRange: '08:00:00 - 23:59:59',
                }"
                placeholder="选择时间"
              >
              </el-time-picker>
            </div>
          </div>
          <div v-if="title == '转岗申请单'" class="transferToANewPost">
            <div class="transferToANewPostOne">
              <span>新部门：</span>
              <el-input
                :disabled="form.ifTrueOrFalse"
                class="formInput"
                v-model="form.department"
                placeholder="请输入部门"
              ></el-input>
            </div>
            <div class="transferToANewPostTwo">
              <span>新职位：</span>
              <el-input
                :disabled="form.ifTrueOrFalse"
                class="formInput"
                v-model="form.department"
                placeholder="请输入部门"
              ></el-input>
            </div>
            <div class="transferToANewPostThree">
              <span>生效时间：</span>
              <el-date-picker
                :disabled="form.ifTrueOrFalse"
                class="transferToANewPostThreeItem"
                v-model="form.takeEffectTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </div>
          </div>
          <div
            v-if="title != '补卡申请单' && title != '转岗申请单'"
            class="itemThree"
          >
            <div class="formTime">
              <span>日期时间：</span>
              <el-date-picker
                :disabled="form.ifTrueOrFalse"
                popper-class="elDatePicker"
                class="formSelectTime"
                v-model="form.timeList"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                size="mini"
                @change="pickerChange"
              >
              </el-date-picker>
            </div>
            <div class="formDate">
              <span>时长：</span>
              <el-input
                :disabled="true"
                class="formInput"
                v-model="form.DurationName"
              ></el-input>
            </div>
          </div>
          <div class="itemFour">
            <div class="formApplyNoteName">事由：</div>
            <el-input
              :disabled="form.ifTrueOrFalse"
              class="formApplyNote"
              type="ApplyNote"
              :rows="5"
              v-model="form.apply_note"
            >
            </el-input>
          </div>
          <div class="itemFive">选择关联复制人：</div>
          <div class="itemSix">
            <div class="formPrincipal">
              <span>部门负责人：</span>
              <el-select
                :disabled="form.ifTrueOrFalse"
                class="formSelectPrincipal"
                v-model="form.one_check_id"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in form.departmentHeadList"
                  :key="item + index"
                  :value="item.User.UserId"
                  :label="item.User.Name"
                >
                </el-option>
              </el-select>
            </div>
            <div class="frombox">
              <span>行政人资负责人：</span>
              <el-select
                :disabled="form.ifTrueOrFalse"
                class="fromSelectAdmin"
                v-model="form.two_check_id"
                clearable
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, index) in form.administrativeHrOfficerList"
                  :key="item + index"
                  :value="item.User.UserId"
                  :label="item.User.Name"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="itemSeven">
            <el-button
              type="primary"
              class="submitHover submitOne"
              @click="newButton"
              >新建</el-button
            >
            <el-button
              v-if="!form.ifTrueOrFalse"
              type="primary"
              class="submitHover submitTwo"
              @click="submitButton"
              >提交</el-button
            >
            <!-- <el-button
              type="primary"
              class="submitHover submitThree"
              @click="reviseButton"
              >修改</el-button
            > -->
          </div>
        </div>
        <!-- 下半部分-单据进度详情 -->
        <div v-if="form.apply_id" class="elTabThreesBodyBottom">
          <div class="elTabThreeBodyBottomTitle">单据进度详细</div>
          <div class="elTabThreeBodyBottomContent">
            <div class="bossTJ">
              <div v-if="true" class="stateBox">
                <img src="./image/TJ.svg" alt="" />
                <span>提交</span>
              </div>
              <div v-if="false" class="stateBox">
                <img src="./image/SHZ.svg" alt="" />
                <span>审核中...</span>
              </div>
              <div v-if="false" class="stateBox">
                <img src="./image/BH.svg" alt="" />
                <span>驳回</span>
              </div>
              <div v-if="false" class="stateBox">
                <img src="./image/TY.svg" alt="" />
                <span>同意</span>
              </div>
              <div class="itemText">
                <span>{{ form.apply_name }}</span>
                <span v-if="form.addtime">{{
                  new Date(form.addtime).Format("yyyy-MM-dd")
                }}</span>
              </div>
              <div class="itemText">
                <span>{{ form.apply_position }}</span>
                <span v-if="form.addtime">{{
                  new Date(form.addtime).Format("hh:mm:ss")
                }}</span>
              </div>
              <div class="itemText">
                <span v-if="form.apply_note">理由：{{ form.apply_note }}</span>
              </div>
            </div>
            <div>
              <img src="./image/JT.svg" alt="" />
            </div>
            <div
              :class="
                form.one_check_state == ''
                  ? 'bossSHZ'
                  : form.one_check_state == 'True'
                  ? 'bossTY'
                  : 'bossBH'
              "
            >
              <div>
                <div v-if="form.one_check_state == ''" class="stateBox">
                  <img src="./image/SHZ.svg" alt="" />
                  <span>审核中...</span>
                </div>
                <div v-if="form.one_check_state == 'False'" class="stateBox">
                  <img src="./image/BH.svg" alt="" />
                  <span>驳回</span>
                </div>
                <div v-if="form.one_check_state == 'True'" class="stateBox">
                  <img src="./image/TY.svg" alt="" />
                  <span>同意</span>
                </div>
                <div class="itemText">
                  <span>{{ form.one_name }}</span>
                  <span v-if="form.one_check_time">{{
                    new Date(form.one_check_time).Format("yyyy-MM-dd")
                  }}</span>
                </div>
                <div class="itemText">
                  <span>{{ form.one_position }}</span>
                  <span v-if="form.one_check_time">{{
                    new Date(form.one_check_time).Format("hh:mm:ss")
                  }}</span>
                </div>
                <div class="itemText">
                  <span v-if="form.one_check_note"
                    >理由：{{ form.one_check_note }}</span
                  >
                </div>
              </div>
            </div>
            <div>
              <img src="./image/JT.svg" alt="" />
            </div>
            <div
              :class="
                form.two_check_state == ''
                  ? 'bossSHZ'
                  : form.two_check_state == 'True'
                  ? 'bossTY'
                  : 'bossBH'
              "
            >
              <div>
                <div v-if="form.two_check_state == ''" class="stateBox">
                  <img src="./image/SHZ.svg" alt="" />
                  <span>审核中...</span>
                </div>
                <div v-if="form.two_check_state == 'False'" class="stateBox">
                  <img src="./image/BH.svg" alt="" />
                  <span>驳回</span>
                </div>
                <div v-if="form.two_check_state == 'True'" class="stateBox">
                  <img src="./image/TY.svg" alt="" />
                  <span>同意</span>
                </div>
                <div class="itemText">
                  <span>{{ form.two_name }}</span>
                  <span v-if="form.two_check_time">{{
                    new Date(form.two_check_time).Format("yyyy-MM-dd")
                  }}</span>
                </div>
                <div class="itemText">
                  <span>{{ form.two_position }}</span>
                  <span v-if="form.two_check_time">{{
                    new Date(form.two_check_time).Format("hh:mm:ss")
                  }}</span>
                </div>
                <div class="itemText" v-if="form.two_check_note">
                  <span>理由：{{ form.two_check_note }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="bodyBottomSubmit">
            <el-button
              v-if="form.role == '一级审核人' && form.one_check_state == ''"
              type="primary"
              class="submitHover submitOne"
              @click="agreeButton"
              >同意</el-button
            >
            <el-button
              v-if="form.role == '二级审核人' && form.two_check_state == ''"
              type="primary"
              class="submitHover submitOne"
              @click="agreeButton"
              >同意</el-button
            >
            <el-button
              v-if="form.role == '一级审核人' && form.one_check_state == ''"
              type="primary"
              class="submitHover submitTwo"
              @click="rejectButton"
              >驳回</el-button
            >
            <el-button
              v-if="form.role == '二级审核人' && form.two_check_state == ''"
              type="primary"
              class="submitHover submitTwo"
              @click="rejectButton"
              >驳回</el-button
            >
          </div>
        </div>
      </div>
    </cu-animation>
  </div>
</template>
<script>
export default {
  name: "cu-requisition",
  props: {
    // 待审核
    pendingReviewList: {
      type: [],
      default: () => [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ],
    },
    // 已驳回
    rejectedList: {
      type: [],
      default: () => [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ],
    },
    // 已审核
    auditedList: {
      type: [],
      default: () => [
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
        {
          name: "张三",
          department: "研发部",
          timeValue: "2022-06-22/16:36:30",
        },
      ],
    },
    title: {
      type: String,
      default: "申请单",
    },

    // 表单字段
    form: {
      type: Object,
      default: () => ({
        name: "", //名字
        department: "", //部门
        position: "", //职位
        timeList: ["", ""], //日期时间
        Start: "", //开始时间
        Finish: "", //结束时间
        Duration: 0, //时长  1.5
        DurationName: "", //时长 1小时30分
        ApplyNote: "", //事由
        departmentHeadList: [], //部门负责人 选择器数据
        departmentHead: "", //部门负责人
        administrativeHrOfficerList: [], //行政人资负责人 选择器数据
        administrativeHrOfficer: "", //行政人资负责人
        AskForLeaveList: [], //请假类型 选择器数据
        AskForLeave: "", //请假类型
        WorkOve: false, //加班抵扣
        Address: "", //地址
        TrafficTools: "", //交通方式
        TrafficToolsList: [], //交通方式 选择器数据
        cardDate: "", // 补卡日期
        cardTime: "", // 补卡时间
        takeEffectTime: "", //生效时间
        OneCheckId: "", //一级审核人ID(部门负责人id)
        one_name: "", //	一级审核人姓名
        one_department: "", //	一级审核人部门
        one_position: "", //	一级审核人职位
        TwoCheckId: "", //二级审核人ID(行政人资负责人id)
        two_name: "", //	二级审核人姓名
        two_department: "", //	二级审核人部门
        two_position: "", //	二级审核人职位
        ApplyTypeId: "", //申请类型：1为加班，2为请假，3为出差
        OneCheckState: "", //一级审核状态
        TwoCheckState: "", //二级审核状态
        one_check_time: "", //一级审核时间
        two_check_time: "", //二级审核时间
        one_check_note: "", //一级审核备注
        two_check_note: "", //二级审核备注

        start: "", //	开始时间
        finish: "", //	结束时间
        duration: "", //	时长
        apply_type_name: "", //	申请类别
        role: "", //	所属角色
        // 进度详情数据
        apply_id: "", //申请ID
        user_id: "", //申请人ID
        apply_type_id: "", //申请类别ID
        apply_name: "", //	申请人姓名
        apply_department: "", //	申请人部门
        apply_position: "", //	申请人职位
        apply_note: "", //	申请备注
        addtime: "", //	申请时间

        one_check_id: "", //一级审核人ID
        one_name: "", //一级审核人姓名
        one_department: "", //一级审核人部门
        one_position: "", //一级审核人职位
        one_check_state: "", //一级审核状态
        one_check_note: "", //一级审核备注
        one_check_time: "", //一级审核时间

        two_check_id: "", //    二级审核人ID
        two_check_state: "", //	二级审核状态
        two_name: "", //	二级审核人姓名
        two_department: "", //	二级审核人部门
        two_position: "", //	二级审核人职位
        two_check_note: "", //	二级审核备注
        two_check_time: "", //	二级审核时间
      }),
    },
  },
  data() {
    return {
      vuex_user: JSON.parse(localStorage.getItem("lifeData"))["vuex_user"], //获取当前登录用户信息
    };
  },
  methods: {
    // 审核单据列表-点击回调
    actinItem(item) {
      this.$emit("actinItem", item);
    },
    // 日期时间-改变回调
    pickerChange(value) {
      this.form.Duration = 0;
      this.form.DurationName = "";
      if (value != null) {
        this.getIntervalHour(value[0], value[1]);
        this.form.Start = value[0]; //开始时间
        this.form.Finish = value[1]; //结束时间
        // this.form.Start = new Date(value[0]).Format("yyyy-MM-dd hh:mm:ss"); //开始时间
        // this.form.Finish = new Date(value[1]).Format("yyyy-MM-dd hh:mm:ss"); //结束时间
      }
    },
    //计算两个时间相差了几个小时 格式：flot  一个半小时=> 1.5    小时+1/60*分钟
    getIntervalHour(startDate, endDate) {
      var stime = Date.parse(new Date(startDate));
      var etime = Date.parse(new Date(endDate));
      var usedTime = etime - stime; //两个时间戳相差的毫秒数
      var days = Math.floor(usedTime / (24 * 3600 * 1000));
      //计算出小时数
      var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000));
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000));
      var time = days + "天" + hours + "时" + minutes + "分";
      // this.form.Duration = days * 24 + hours + "小时" + minutes + "分";
      this.form.Duration = days * 24 + hours + (1 / 60) * minutes;
      this.form.DurationName = days * 24 + hours + (1 / 60) * minutes + " 小时";
    },
    // 新建按钮
    newButton() {
      this.form.ifTrueOrFalse = false;
      this.form.timeList = ["", ""]; //日期时间
      this.form.Start = ""; //开始时间
      this.form.Finish = ""; //结束时间
      this.form.Duration = 0; //时长  1.5
      this.form.DurationName = ""; //时长 1小时30分
      this.form.AskForLeave = ""; //请假类型
      this.form.WorkOve = false; //加班抵扣
      this.form.Address = ""; //地址
      this.form.TrafficTools = ""; //交通方式
      this.form.cardDate = ""; // 补卡日期
      this.form.cardTime = ""; // 补卡时间
      this.form.takeEffectTime = ""; //生效时间
      this.form.ApplyTypeId = ""; //申请类型：1为加班，2为请假，3为出差
      this.form.apply_type_name = ""; //	申请类别
      // 进度详情数据
      this.form.apply_id = ""; //申请ID
      this.form.user_id = ""; //申请人ID
      this.form.apply_type_id = ""; //申请类别ID
      this.form.apply_note = ""; //	申请备注
      this.form.addtime = ""; //	申请时间
      this.form.one_check_id = ""; //一级审核人ID
      this.form.one_name = ""; //一级审核人姓名
      this.form.one_department = ""; //一级审核人部门
      this.form.one_position = ""; //一级审核人职位
      this.form.one_check_state = ""; //一级审核状态
      this.form.one_check_note = ""; //一级审核备注
      this.form.one_check_time = ""; //一级审核时间
      this.form.two_check_id = ""; //    二级审核人ID
      this.form.two_check_state = ""; //	二级审核状态
      this.form.two_name = ""; //	二级审核人姓名
      this.form.two_department = ""; //	二级审核人部门
      this.form.two_position = ""; //	二级审核人职位
      this.form.two_check_note = ""; //	二级审核备注
      this.form.two_check_time = ""; //	二级审核时间
    },
    // 提交按钮
    submitButton() {
      this.$emit("submitButton", this.form);
    },
    // 修改按钮
    reviseButton() {
      this.$message.success("点击了修改");
    },
    // 同意按钮
    agreeButton() {
      this.$emit("agreeButton", this.form);
    },
    // 驳回按钮
    rejectButton() {
      this.$emit("rejectButton", this.form);
    },
  },
  mounted() {
    // 初始化wowjs动画
    new this.$wow.WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
    }).init();
  },
};
</script>
<style lang="scss" scoped>
// 加班申请
::v-deep.elTabThree {
  display: flex;
  height: 810px;

  // 左侧审核单据列表
  .elTabThreeBodyLeft {
    width: 360px;
    height: 800px;
    overflow: overlay;
    border-right: 0.5px solid rgba(0, 0, 0, 0.45);

    .elTabThreeBodyLeft_title {
      width: 360px;
      height: 26px;
      font-family: "Microsoft YaHei";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 26px;
      color: rgba(0, 0, 0, 0.85);
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0px;
    }

    .itemList {
      width: 360px;
      padding: 10px 20px;
    }

    .itemList:active {
      background: #109af9;
      color: #ffffff;
    }

    .itemList:focus {
      background: #109af9;
      color: #ffffff;
    }
  }

  // 右侧加班申请单
  .elTabThreeBodyRight {
    width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .elTabThreeBodyRight_title {
      width: 1200px;
      height: 26px;
      font-family: "Microsoft YaHei";
      font-style: normal;
      font-weight: 400;
      font-size: 32px;
      line-height: 42px;
      text-align: center;
      color: #000000;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 10px 0px;
    }

    // 上半部分-加班申请单
    .elTabThreeBodyTop {
      width: 614px;
      height: 322px;

      .itemOne {
        font-family: "Microsoft YaHei";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #000000;
        margin-bottom: 10px;
      }

      .itemTwo {
        display: flex;
        margin-bottom: 10px;
        margin-left: 20px;

        .formName {
          .formInput {
            height: 26px;
            width: 130px;

            .el-input__inner {
              height: 26px;
            }
          }
        }

        .formDepartment {
          margin-left: 48px;

          .formInput {
            height: 26px;
            width: 130px;

            .el-input__inner {
              height: 26px;
            }
          }
        }

        .formWork {
          margin-left: 48px;

          .formInput {
            height: 26px;
            width: 130px;

            .el-input__inner {
              height: 26px;
            }
          }
        }
      }
      .restClass {
        display: flex;
        margin-bottom: 10px;
        margin-left: 20px;
        .formRest {
          .formSelectRest {
            height: 26px !important;
            width: 200px !important;

            .el-input--suffix .el-input__inner {
              height: 26px !important;
            }

            .el-input__icon {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
        .inputCheckBox {
          width: 332px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          span {
            margin-left: 10px;
          }
        }
      }
      .AddressAndTrafficToolsClass {
        display: flex;
        margin-bottom: 10px;
        margin-left: 20px;
        .AddressClass {
          .formInput {
            height: 26px;
            width: 320px;

            .el-input__inner {
              height: 26px;
            }
          }
        }
        .TrafficToolsClass {
          margin-left: 24px;

          .formSelectRest {
            height: 26px !important;
            width: 130px !important;

            .el-input--suffix .el-input__inner {
              height: 26px !important;
            }

            .el-input__icon {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
      .supplementaryCard {
        display: flex;
        margin-bottom: 10px;
        margin-left: 20px;
        .supplementaryCardFormDate {
          height: 26px;
          width: 410px;
          .supplementaryCardFormDateItem {
            height: 26px;
            width: 200px;
            .el-input__inner {
              height: 26px;
              width: 200px;
            }
            .el-input__prefix {
              .el-input__icon {
                line-height: 26px;
              }
            }
          }
        }
        .supplementaryCardFormTime {
          height: 26px;
          width: 320px;
          .supplementaryCardFormTimeItem {
            height: 26px;
            width: 200px;
            .el-input__inner {
              height: 26px;
              width: 200px;
            }
            .el-input__prefix {
              .el-input__icon {
                line-height: 26px;
              }
            }
          }
        }
      }
      .transferToANewPost {
        display: flex;
        margin-bottom: 10px;
        margin-left: 20px;
        .transferToANewPostOne {
          width: 197px;
          .formInput {
            height: 26px;
            width: 120px;

            .el-input__inner {
              height: 26px;
            }
          }
        }
        .transferToANewPostTwo {
          width: 197px;
          .formInput {
            height: 26px;
            width: 120px;

            .el-input__inner {
              height: 26px;
            }
          }
        }
        .transferToANewPostThree {
          width: 200px;
          display: flex;
          align-items: center;
          .transferToANewPostThreeItem {
            height: 26px;
            width: 140px;
            .el-input__inner {
              height: 26px;
              width: 140px;
            }
            .el-input__prefix {
              .el-input__icon {
                line-height: 26px;
              }
            }
          }
        }
      }
      .itemThree {
        display: flex;
        margin-bottom: 10px;
        margin-left: 20px;

        .formTime {
          .formSelectTime {
            height: 26px;
            width: 320px;
          }
        }

        .formDate {
          margin-left: 48px;

          .formInput {
            height: 26px;
            width: 130px;

            .el-input__inner {
              height: 26px;
            }
          }
        }
      }

      .itemFour {
        display: flex;
        margin-bottom: 10px;
        margin-left: 20px;

        .formApplyNoteName {
          width: 40px;
        }

        .formApplyNote {
          .el-ApplyNote__inner {
            height: 80px;
          }
        }
      }

      .itemFive {
        font-family: "Microsoft YaHei";
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 18px;
        color: #000000;
        margin-bottom: 10px;
      }

      .itemSix {
        display: flex;
        margin-bottom: 10px;
        margin-left: 20px;

        .formPrincipal {
          .formSelectPrincipal {
            height: 26px !important;
            width: 130px !important;

            .el-input--suffix .el-input__inner {
              height: 26px !important;
            }

            .el-input__icon {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }

        .frombox {
          margin-left: 166px;

          .fromSelectAdmin {
            height: 26px !important;
            width: 130px !important;

            .el-input--suffix .el-input__inner {
              height: 26px !important;
            }

            .el-input__icon {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }

      .itemSeven {
        display: flex;
        justify-content: center;

        .submitOne {
          background: #109af9;
          border: 1px solid #109af9;
        }

        .submitTwo {
          background: #1dd19b;
          border: 1px solid #1dd19b;
          margin-left: 100px;
        }

        .submitThree {
          background: #ffa728;
          border: 1px solid #ffa728;
        }

        .submitHover {
          width: 68px;
          height: 28px;
          padding: 0;
        }

        .submitHover:hover {
          transform: scale(1.04);
        }
      }
    }

    // 下半部分-单据进度详情
    .elTabThreesBodyBottom {
      width: 1080px;
      border-top: 1px solid rgba(0, 0, 0, 0.45);
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
      margin-left: -20px;
      padding-bottom: 20px;

      .elTabThreeBodyBottomTitle {
        font-family: "Microsoft YaHei";
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 26px;
        display: flex;
        align-items: center;
        color: rgba(0, 0, 0, 0.85);
        margin-top: 20px;
        margin-bottom: 20px;
      }
      .elTabThreeBodyBottomContent {
        width: 1080px;
        height: 180px;
        display: flex;
        justify-content: center;
        align-items: center;
        .bossTJ {
          border-radius: 10px;
          padding: 10px;
          width: 282px;
          height: 160px;
          background: #109af9;
          .stateBox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 60px;
            span {
              font-family: "Microsoft YaHei";
              font-style: normal;
              font-weight: 400;
              font-size: 24px;
              line-height: 32px;
              display: flex;
              align-items: center;
              text-align: right;
              color: #ffffff;
            }
          }
          .itemText {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            font-family: "Microsoft YaHei";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            display: flex;
            align-items: center;
            color: #ffffff;
          }
        }

        .bossSHZ {
          border-radius: 10px;
          padding: 10px;
          width: 282px;
          height: 160px;

          background: #ffa728;
          .stateBox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 60px;
            span {
              font-family: "Microsoft YaHei";
              font-style: normal;
              font-weight: 400;
              font-size: 24px;
              line-height: 32px;
              display: flex;
              align-items: center;
              text-align: right;
              color: #ffffff;
            }
          }
          .itemText {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            font-family: "Microsoft YaHei";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            display: flex;
            align-items: center;
            color: #ffffff;
          }
        }
        .bossTY {
          border-radius: 10px;
          padding: 10px;
          width: 282px;
          height: 160px;
          //   margin: 0px 80px;
          background: #1dd19b;
          .stateBox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 60px;
            span {
              font-family: "Microsoft YaHei";
              font-style: normal;
              font-weight: 400;
              font-size: 24px;
              line-height: 32px;
              display: flex;
              align-items: center;
              text-align: right;
              color: #ffffff;
            }
          }
          .itemText {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            font-family: "Microsoft YaHei";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            display: flex;
            align-items: center;
            color: #ffffff;
          }
        }
        .bossBH {
          border-radius: 10px;
          padding: 10px;
          width: 282px;
          height: 160px;

          background: #f05c27;
          .stateBox {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0px 60px;
            span {
              font-family: "Microsoft YaHei";
              font-style: normal;
              font-weight: 400;
              font-size: 24px;
              line-height: 32px;
              display: flex;
              align-items: center;
              text-align: right;
              color: #ffffff;
            }
          }
          .itemText {
            margin-top: 20px;
            display: flex;
            justify-content: space-between;
            font-family: "Microsoft YaHei";
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 21px;
            display: flex;
            align-items: center;
            color: #ffffff;
          }
        }
      }

      .bodyBottomSubmit {
        margin-top: 20px;
        display: flex;
        justify-content: center;

        .submitOne {
          background: #109af9;
          border: 1px solid #109af9;
        }

        .submitTwo {
          background: #1dd19b;
          border: 1px solid #1dd19b;
          margin-left: 100px;
        }

        .submitHover {
          width: 68px;
          height: 28px;
          padding: 0;
        }

        .submitHover:hover {
          transform: scale(1.04);
        }
      }
    }
  }
}
</style>
