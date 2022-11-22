<template>
  <div>
    <div class="content_body">
      <div class="content_one">
        <div class="one_div">
          <img v-lazy src="./image/webPartyBuildingCulture-1.png" alt="" />
        </div>
      </div>
      <div class="content_two">
        <div class="bg_e0edff two_div">
          <div class=" two_div_image">
            <el-carousel :interval="4000" height="334px">
              <el-carousel-item>
                <img v-lazy
                  class="two_div_imageItem"
                  src="./image/webPartyBuildingCulture-2.png"
                  alt=""
                />
              </el-carousel-item>
              <el-carousel-item>
                <img v-lazy 
                  class="two_div_imageItem"
                  src="./image/webPartyBuildingCulture-3.png"
                  alt=""
                />
              </el-carousel-item>
              <el-carousel-item>
                <img v-lazy
                  class="two_div_imageItem"
                  src="./image/webPartyBuildingCulture-4.png"
                  alt=""
                />
              </el-carousel-item>
              <el-carousel-item>
                <img v-lazy
                  class="two_div_imageItem"
                  src="./image/webPartyBuildingCulture-5.png"
                  alt=""
                />
              </el-carousel-item>
              <el-carousel-item>
                <img v-lazy
                  class="two_div_imageItem"
                  src="./image/webPartyBuildingCulture-6.png"
                  alt=""
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class=" two_div_txt">
            <div class="two_div_txt_title">
              习近平出席全球健康峰会并发表重要讲话
            </div>
            <div class="two_div_txt_describe">
              国家主席习近平应邀在北京以视频方式出席全球健康峰会，并发表题为《携手共建人类卫生健康共同体》的重要讲话。
            </div>
            <div class="two_div_txt_body mt_10" v-for="item in 7" :key="item">
              <div class="two_div_txt_body_txt">
                坚持人民至上、生命至上抗击疫情是为了人民，也必须依坚持人民至上、生命至上抗击疫情是为了人民，也必须依
              </div>
              <div class="two_div_txt_body_time">2022-07-14 17:28:10</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_three">
        <div class="bg_fde5e5 three_div">
          <div class="three_right_title">学习专栏</div>
          <div class="three_right_FG"></div>
          <div class="three_right_tabsListHeight">
            <div
              class="three_right_tabsList"
              v-for="(item, index) in 6"
              :key="index"
            >
              <div class="tabsList_title">
                关于对2022年5月份药品价格和供应异常药品进行调查的通知
                国家医疗保障局办公室关于做好国家组织药品集中带量采购...
              </div>
              <div>2022-07-14 17:28:10</div>
            </div>
          </div>

          <div class="three_right_page">
            <Page
              :total="pages.total"
              :current="pages.current"
              @on-change="currentChange($event)"
            />
          </div>
        </div>
      </div>
      <cu-friendshipLink></cu-friendshipLink>
    </div>

    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
import {} from "@/api/aksApi/webApi/webApi.js";
export default {
  data() {
    return {
      pages: {
        total: 0,
        current: 1,
        size: 10,
      },
    };
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "./webPartyBuildingCulture.scss";
</style>
