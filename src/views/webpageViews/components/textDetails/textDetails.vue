<template>
  <!-- 商城平台-文本类详情组件 -->
  <div>
    <div class="content_body">
      <div class="content_body_item">
        <div class="content_one">{{ detailsObject.title }}</div>
        <div class="content_two">
          【信息来源：国务院国资委】【信息时间：{{ detailsObject.releaseTime }}
          阅读次数： 253 】
        </div>
        <div class="content_three">
          {{ detailsObject.detail }}
        </div>
      </div>
    </div>
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import {
  infomationGetAnnouncementById,
  infomationGetPoliciesById,
} from "@/api/aksApi/webApi/webApi.js";
export default {
  data() {
    return {
      // 详情接口回参
      detailsObject: {},
    };
  },

  mounted() {
    console.log(this.$route);
    //1 政策法规  2通知公告
    if (this.$route.query.type == 1) {
      this.infomationGetPoliciesByIdApi(); // 通过信息ID查询政策法规详情列表-接口
    } else if (this.$route.query.type == 2) {
      this.infomationGetAnnouncementByIdApi(); // 通过信息ID查询通知公告详情列表-接口
    }
  },
  methods: {
    // 通过信息ID查询政策法规详情列表-接口
    infomationGetPoliciesByIdApi() {
      infomationGetPoliciesById(this.$route.query.id)
        .then((res) => {
          if (res.code == 200) {
            this.detailsObject = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.isloading = false;
          console.log(err);
        });
    },
    // 通过信息ID查询通知公告详情列表-接口
    infomationGetAnnouncementByIdApi() {
      infomationGetAnnouncementById(this.$route.query.id)
        .then((res) => {
          if (res.code == 200) {
            this.detailsObject = res.data;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.isloading = false;
          console.log(err);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./textDetails.scss";
</style>
