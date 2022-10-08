<template>
  <div class="content">
    <div class="content_one">
      <div class="content_one1">
        <div class="content_one11">
          <div class="content_one111">生产企业 配送企业 医疗机构</div>
          <div class="content_one112">互联互通药械数据全流程智能追溯</div>
          <div class="content_one113">
            <el-button class="el_button" type="primary"
              >进入智能物流平台</el-button
            >
          </div>
        </div>
        <div class="content_one12"></div>
      </div>
    </div>
    <div class="content_body">
      <div class="content_two">
        <div class="content_two1">
          <div class="content_two11">卫生健康部门</div>
          <div class="content_two12">
            <el-button class="el_button" type="primary" @click="getapp">登录</el-button>
          </div>
          <div class="content_two13"></div>
        </div>
        <div class="content_two2">
          <div class="content_two21">医疗保障部门</div>
          <div class="content_two22">
            <el-button class="el_button" type="primary" @click="getapp">登录</el-button>
          </div>
          <div class="content_two23"></div>
        </div>
        <div class="content_two3">
          <div class="content_two31">药监部门</div>
          <div class="content_two32">
            <el-button class="el_button" type="primary" @click="getapp">登录</el-button>
          </div>
          <div class="content_two33"></div>
        </div>
        <div class="content_two4">
          <div class="content_two41">其它监管部门</div>
          <div class="content_two42">
            <el-button class="el_button" type="primary" @click="getapp">登录</el-button>
          </div>
          <div class="content_two43"></div>
        </div>
      </div>
      <div class="content_three">监管动态</div>
      <div class="content_four">
        <div class="content_four1">
          <div class="content_four11">
            <div class="content_four111">药械质量公告</div>
            <div class="content_four112">查看更多></div>
          </div>
          <div class="content_four12">
            <div class="content_four121">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four121">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four121">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four121">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four121">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four121">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four121">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
          </div>
        </div>
        <div class="content_four2">
          <div class="content_four21">
            <div class="content_four211">不良记录转载</div>
            <div class="content_four212">查看更多></div>
          </div>
          <div class="content_four22">
            <div class="content_four221">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four221">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four221">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four221">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four221">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four221">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
            <div class="content_four221">
              国家药监局关于注销7个医疗器械注册证书的公告（2020年第91号）
            </div>
          </div>
        </div>
      </div>
      <cu-friendshipLink class="content_five"></cu-friendshipLink>
    </div>
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
export default {
  methods:{
    getapp(){
      console.log(1111);
   this.$router.push("/webUnderConstruction");
    },
  }
};
</script>
<style lang="scss" scoped>
@import "./webIndustrySupervision.scss";
</style>
