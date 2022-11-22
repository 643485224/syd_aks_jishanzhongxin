<template>
  <!-- 友情链接（商城底部使用） -->
  <div class="content bg_e2ffec">
    <div class="content-title">
      <span class="mr_10">友情链接</span>
      <span>MONTHLY SALES LIST</span>
    </div>
    <!-- <div class="content-body">
      <div>
        <span>国家部委：</span>
        <el-select
          v-model="cadre"
          clearable
          placeholder="请选择"
          @change="selectChange"
        >
          <el-option
            v-for="(item, index) in cadreList"
            :key="index"
            :value="item.linkUrl"
            :label="item.title"
          >
          </el-option>
        </el-select>
      </div>
      <div class="ml_60 mr_60">
        <span>本地网站：</span>
        <el-select
          v-model="website"
          clearable
          placeholder="请选择"
          @change="selectChange"
        >
          <el-option
            v-for="(item, index) in websiteList"
            :key="index"
            :value="item.linkUrl"
            :label="item.title"
          >
          </el-option>
        </el-select>
      </div>
      <div>
        <span>县政府：</span>
        <el-select
          v-model="governmen"
          clearable
          placeholder="请选择"
          @change="selectChange"
        >
          <el-option
            v-for="(item, index) in governmenList"
            :key="index"
            :value="item.linkUrl"
            :label="item.title"
          >
          </el-option>
        </el-select>
      </div>
    </div> -->

    <div class="content_item">
      <div
        class="content_item_img img_1"
        @click="selectChange('http://www.nhc.gov.cn/')"
      ></div>
      <div
        class="content_item_img img_2"
        @click="selectChange('https://www.nmpa.gov.cn/')"
      ></div>
      <div
        class="content_item_img img_3"
        @click="selectChange('http://wjw.xinjiang.gov.cn/')"
      ></div>
      <div
        class="content_item_img img_4"
        @click="selectChange('http://www.nhsa.gov.cn/')"
      ></div>
    </div>
  </div>
</template>
<script>
import {
  blogrollWebsiteList,
  blogrollGovernmentList,
  blogrollGetBlogrollById,
  blogrollCadreList,
} from "@/api/aksApi/webApi/webApi.js";
export default {
  name: "cu-friendshipLink",
  data() {
    return {
      cadre: "", //国家部委值
      cadreList: [], //国家部委列表
      governmen: "", //县政府值
      governmenList: [], //县政府列表
      website: "", //本地网站值
      websiteList: [], //本地网站列表
    };
  },
  mounted() {
    // this.blogrollWebsiteListApi();
    // this.blogrollGovernmentListApi();
    // this.blogrollCadreListApi();
  },
  methods: {
    // // 查询信息表中国家部委列表信息-接口
    // blogrollCadreListApi() {
    //   let valueData = {};
    //   blogrollCadreList(valueData)
    //     .then((res) => {
    //       if (res.code == 200) {
    //         this.cadreList = res.data;
    //       } else {
    //         this.$message.error(res.message);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // // 查询信息表中县政府列表信息-接口
    // blogrollGovernmentListApi() {
    //   let valueData = {};
    //   blogrollGovernmentList(valueData)
    //     .then((res) => {
    //       if (res.code == 200) {
    //         this.governmenList = res.data;
    //       } else {
    //         this.$message.error(res.message);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // // 查询信息表中本地网站列表信息-接口
    // blogrollWebsiteListApi() {
    //   let valueData = {};
    //   blogrollWebsiteList(valueData)
    //     .then((res) => {
    //       if (res.code == 200) {
    //         this.websiteList = res.data;
    //       } else {
    //         this.$message.error(res.message);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // // 通过信息ID查询友情链接详情列表-接口
    // blogrollGetBlogrollByIdApi() {
    //   let valueData = {};
    //   blogrollGetBlogrollById(valueData)
    //     .then((res) => {
    //       if (res.code == 200) {
    //       } else {
    //         this.$message.error(res.message);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // },
    // 选择器回调
    selectChange(value) {
      if (value) {
        window.open(value, "_blank");
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.bg_e2ffec {
  background: #e2ffec !important;
}
.content {
  margin: 20px 0px;
  height: 180px;
  width: 1200px;
  background: #ffffff;
  padding: 20px;

  .content-title {
    span:nth-child(1) {
      font-size: 24px;
      font-family: Source Han Sans CN-Medium, Source Han Sans CN;
      font-weight: 700;
      color: #156cc2;
    }

    span:nth-child(2) {
      font-size: 14px;
      font-family: Source Han Sans CN-Regular, Source Han Sans CN;
      font-weight: 400;
      color: #999999;
    }
  }
  // .content-body {
  //   margin-top: 40px;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }
  .content_item {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    .content_item_img {
      width: 272px;
      height: 52px;
    }
    .img_1 {
      margin-right: 20px;

      background: url("./image/cu-friendshipLink-1.png");
    }
    .img_2 {
      margin-right: 20px;
      background: url("./image/cu-friendshipLink-2.png");
    }
    .img_3 {
      margin-right: 20px;
      background: url("./image/cu-friendshipLink-3.png");
    }
    .img_4 {
      background: url("./image/cu-friendshipLink-4.png");
    }
  }
}

</style>
