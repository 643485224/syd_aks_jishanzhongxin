<template>
  <div>
    <div class="content-body">
      <div class="content-top">
        <div class="content-top-inner">
          <div class="inner-text">
            <div class="title">中心招商</div>
            <div class="subtitle">线下入驻 线上免入驻 同步交易更多选择</div>
            <el-button class="apply-btn" @click="getapp">会员申请入驻</el-button>
          </div>
          <img
            class="inner-img"
            src="@/assets/images/webMainImage/entrePort_top.png"
            alt=""
          />
        </div>
      </div>
      <div class="content-center">
        <div class="section">
          <div class="section-title">物业缴费</div>
          <div class="grid">
            <!-- v-for="item in priceList" :key="item" -->
            <div class="grid-col col-bg col-3">
              <img
                class="img"
                src="../../../assets/images/webMainImage/entrePot/waterprice.png"
              />
              <div class="grid-title" >水费</div>
              <div class="grid-desc">一键缴费 简单省事</div>
              <el-button type="primary" round plain size="mini"
              @click="getapp">去缴费</el-button
              >
            </div>
            <div class="grid-col col-bg col-3">
              <img
                class="img"
                src="../../../assets/images/webMainImage/entrePot/electricprice.png"
              />
              <div class="grid-title" >电费</div>
              <div class="grid-desc">一键缴费 简单省事</div>
              <el-button type="primary" round plain size="mini"
              @click="getapp">去缴费</el-button
              >
            </div>
            <div class="grid-col col-bg col-3">
              <img
                class="img"
                src="../../../assets/images/webMainImage/entrePot/propertyprice.png"
              />
              <div class="grid-title" >物业费</div>
              <div class="grid-desc">一键缴费 简单省事</div>
              <el-button type="primary" round plain size="mini"
              @click="getapp">去缴费</el-button
              >
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section-title">大数据优势</div>
          <div class="grid">
            <!-- -->
            <div class="grid-col col-6">
              <img
                src="http://www.yjsds.com/static/web/images/bigdata/youshi_001.jpg"
                class="cover-img h_146"
                alt=""
              />
              <div class="grid-desc">入驻企业 医疗机构</div>
            </div>
            <div class="grid-col col-6">
              <img
                src="http://www.yjsds.com/static/web/images/bigdata/youshi_002.jpg"
                class="cover-img h_146"
                alt=""
              />
              <div class="grid-desc">零售药店 主管部门</div>
            </div>
            <div class="grid-col col-6">
              <img
                src="http://www.yjsds.com/static/web/images/bigdata/youshi_003.jpg"
                class="cover-img h_146"
                alt=""
              />
              <div class="grid-desc">科研院所 行业协会</div>
            </div>
            <div class="grid-col col-6">
              <img
                src="http://www.yjsds.com/static/web/images/bigdata/youshi_004.jpg"
                class="cover-img h_146"
                alt=""
              />
              <div class="grid-desc">数据分析 管理建设</div>
            </div>
            <div class="grid-col col-6">
              <img
                src="http://www.yjsds.com/static/web/images/bigdata/youshi_005.jpg"
                class="cover-img h_146"
                alt=""
              />
              <div class="grid-desc">孵化边缘独角兽企业</div>
            </div>
            <div class="grid-col col-6">
              <img
                src="http://www.yjsds.com/static/web/images/bigdata/youshi_06.jpg"
                class="cover-img h_146"
                alt=""
              />
              <div class="grid-desc">新业态融合（直播）</div>
            </div>
          </div>
        </div>
        <div class="cover-section">
          <div class="cover-section-inner">
            <div class="inner-title">强大的企业融资能力</div>
            <div class="inner-content">
              <ul>
                <li>
                  <div class="subtitle">付款无忧</div>
                  <div class="desc">
                    资金短缺，不能如约付款，中心可依相关政策转垫付，保障中心入驻优秀企业能更好运行
                  </div>
                </li>
                <li>
                  <div class="subtitle">信贷无忧</div>
                  <div class="desc">
                    可对中心与合作银行个金机构信贷，综合业务以中心及中心众企业优势多业务合作共赢
                  </div>
                </li>
              </ul>
              <img
                src="../../../assets/images/webMainImage/entrePot/pay.png"
                alt=""
              />
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section-title">大数据能力</div>
          <div class="grid">
            <div class="grid-col col-3">
              <img
                src="../../../assets/images/webMainImage/entrePot/datapower1.png"
                class="cover-img h_250"
                alt=""
              />
              <div class="grid-title">海量医药数据库</div>
              <div class="grid-desc">
                全国中标数据库、药品说明书、医保目录、基药目录、
                低价药目录等海量数据库
              </div>
            </div>
            <div class="grid-col col-3">
              <img
                src="../../../assets/images/webMainImage/entrePot/datapower2.png"
                class="cover-img h_250"
                alt=""
              />
              <div class="grid-title">专业的数据分析团队</div>
              <div class="grid-desc">
                团队成员涵盖药学、计算机、统计分析等相关专业，具备多年的医药行业数据处理和分析经验
              </div>
            </div>
            <div class="grid-col col-3">
              <img
                src="../../../assets/images/webMainImage/entrePot/datapower3.png"
                class="cover-img h_250"
                alt=""
              />
              <div class="grid-title">体系化的工具技术</div>
              <div class="grid-desc">
                基于机器学习技术自主研发的数据标准化处理技术，自主可配的数据分析工具，图表并茂的可视化展现方式
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section-title mb_20">集散中心大数据衍生服务</div>
          <div class="grid">
            <div class="grid-col col-bg col-3">
              <img
                class="img"
                src="../../../assets/images/webMainImage/entrePot/data1.png"
              />
              <div class="grid-title">数据管理服务</div>
              <div class="grid-desc">数据存储|数据更新|数据质量|数据安全</div>
              <div class="grid-details">
                数据管理是数据共享服务的基础，贯穿
                所有药品数据共享服务内容，包括数据
                存储、数据更新、数据质量和数据安全管理
              </div>
            </div>
            <div class="grid-col col-bg col-3">
              <img
                class="img"
                src="../../../assets/images/webMainImage/entrePot/data2.png"
              />
              <div class="grid-title">数据整合服务</div>
              <div class="grid-desc">数据分析|数据清洗|数据关联</div>
              <div class="grid-details">
                数据整合服务是基于规范化协调模型，通过数据拆分、数据清洗、数据关联将不同来源的药品信息数据整合起来
              </div>
            </div>
            <div class="grid-col col-bg col-3">
              <img
                class="img"
                src="../../../assets/images/webMainImage/entrePot/data3.png"
              />
              <div class="grid-title">数据交换服务</div>
              <div class="grid-desc">数据采集|数据查询|数据下载|EDI接口</div>
              <div class="grid-details">
                数据交换服务包括各种来源的原始数据采用不同的方式采集起来、通过药品信息平台提供数据查询、数据下载、EDI接口等方式实现数据的共享
              </div>
            </div>
            <div class="grid-col col-bg col-3">
              <img
                class="img"
                src="../../../assets/images/webMainImage/entrePot/data4.png"
              />
              <div class="grid-title">数据应用服务</div>
              <div class="grid-desc">数据统计|数据分析|数据可视化|数据咨询</div>
              <div class="grid-details">
                数据应用服务指根据用户需求，提供数据
                统计、分析、数据可视化、数据咨询等相 关服务
              </div>
            </div>
          </div>
        </div>
        <div class="section">
          <div class="section-title mb_20">应用案例</div>
          <div class="grid">
            <div class="grid-col col-3">
              <img
                src="http://www.yjsds.com/static/web/images/bigdata/yy_01.jpg"
                class="cover-img"
                alt=""
              />
              <div class="grid-title">区域信息共享</div>
              <div class="grid-details">
                提供数据编码规范、清洗标准与接口标准
                ，企业资质、产品资质互认，价格共享
              </div>
            </div>
            <div class="grid-col col-3">
              <img
                src="http://www.yjsds.com/static/web/images/bigdata/yy_02.jpg"
                class="cover-img"
                alt=""
              />
              <div class="grid-title">行业主管部门监管</div>
              <div class="grid-details">
                为卫生、医保、药监等行业主管部门对医药全流程采购行为、流通秩序、货款结算、
                供应保障、政策制定等方面提供数据支撑
              </div>
            </div>
            <div class="grid-col col-3">
              <img
                src="http://www.yjsds.com/static/web/images/bigdata/yy_03.jpg"
                class="cover-img"
                alt=""
              />
              <div class="grid-title">医药供应链系统</div>
              <div class="grid-details">
                医药流通数据标准为海量医药数据集成提供编码规范、接口标准与口径标准
              </div>
            </div>
            <div class="grid-col col-3">
              <img
                src="http://www.yjsds.com/static/web/images/bigdata/yy_04.jpg"
                class="cover-img"
                alt=""
              />
              <div class="grid-title">交易运营实时监测</div>
              <div class="grid-details">
                医药交易注册、产品挂牌、合同签订、交易、交收、货款结算、评价全流程业务
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 友情链接组件 -->
      <cu-friendshipLink></cu-friendshipLink>
    </div>
    <!-- 最底部组件 -->
    <webMainFooter></webMainFooter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      priceList: [
        // { icon: waterprice, title: '水费', desc: '一键缴费 简单省事' },
        // { icon: require('../../../assets/images/webMainImage/entrePot/electricprice.png'), title: '电费', desc: '一键缴费 简单省事' },
        // { icon: require('../../../assets/images/webMainImage/entrePot/propertyprice.png'), title: '物业费', desc: '一键缴费 简单省事' },
      ],
    };
  },
  created() {},
  methods: {
    // getImageUrl(name) {
    //   console.log(new URL(`@/assets/images/webMainImage/entrePot/${name}`, 'http://localhost:8082'));
    //   // return new URL(`@/assets/images/webMainImage/entrePot/${name}`, import.meta.url).href;
    //   return new URL('');
    // },

    getapp(){
      console.log(1111);
   this.$router.push("/webUnderConstruction");
    },
  },
};
</script>
<style lang="scss" scoped>
.content-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 166px);
  background-color: #fff;
  color: #515a6e;
  .content-top {
    width: 100%;
    height: 400px;
    color: #fff;
    background: #e13b07;

    &-inner {
      display: flex;
      justify-content: space-between;
      width: 1200px;
      margin: 64px auto 54px;
    }

    .title {
      font-size: 60px;
    }

    .subtitle {
      font-size: 36px;
      margin-bottom: 38px;
    }

    .apply-btn {
      height: 60px;
      font-size: 24px;
      color: #ff480e;
      border-radius: 10px;
    }

    .inner-img {
    }
  }

  .content-center {
    width: 100%;

    .section {
      width: 1200px;
      margin: 0 auto;
      margin-top: 50px;

      &-title {
        margin-bottom: 10px;
        text-align: center;
        font-size: 40px;
        font-weight: bold;
        color: #020552;
      }

      .grid {
        display: flex;

        .grid-col {
          flex: 1;
          padding: 24px 0;
          // height: 246px;

          &:not(:last-child) {
            margin-right: 20px;
          }

          text-align: center;
          border-radius: 4px 4px 4px 4px;

          .img {
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background-color: #eee;
            margin: 20px auto;

            &:hover {
              transform: scale(1.1);
            }
          }

          .cover-img {
            width: 100%;
            height: 100px;
            margin-bottom: 14px;
            background-color: #eee;

            &:hover {
              transform: scale(1.04);
            }
          }

          .grid-title {
            font-size: 24px;
            font-weight: 500;
            color: #00023a;
          }

          .grid-desc {
            padding: 0 24px;
            margin-bottom: 14px;
            font-size: 14px;
            color: #00023a;
          }

          .grid-details {
            padding: 0 24px;
          }
        }

        .col-bg {
          background: #eef1fa;
        }

        .col-3 {
        }
      }
    }

    .cover-section {
      width: 100%;
      margin-top: 30px;
      color: #fff;
      background: #156cc2;
      border: 1px solid transparent;

      &-inner {
        width: 1200px;
        margin: 64px auto 54px;

        .inner-title {
          margin-bottom: 90px;

          text-align: center;
          font-size: 40px;
        }

        .inner-content {
          display: flex;
          align-items: center;
          justify-content: space-between;

          ul {
            width: 40%;

            li {
              list-style: none;
              margin-bottom: 46px;
            }
          }

          // .list-style {
          //   width: 3px;
          //   height: 24px;
          //   margin-right: 24px;
          //   background: rgba(255, 255, 255, 0.5);
          //   border-radius: 0px 0px 0px 0px;
          //   opacity: 1;
          // }

          .subtitle {
            display: flex;
            align-items: center;
            font-size: 24px;
            margin-bottom: 22px;
            border-left: 3px solid rgba(255, 255, 255, 0.5);
            padding-left: 24px;
            height: 24px;
          }

          .desc {
            margin-left: 27px;
            font-size: 14px;
          }

          img {
            width: 351px;
            height: 366px;
          }
        }
      }
    }

    .mb_20 {
      margin-bottom: 20px !important;
    }

    .h_250 {
      height: 250px !important;
    }

    .h_146 {
      height: 146px !important;
    }
  }
}
</style>
