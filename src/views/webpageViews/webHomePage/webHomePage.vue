<template>
  <div>
    <div class="content-body">
      <div class="content-LBs">
        <div class="content-LB pt_20">
          <el-carousel
            :interval="4000"
            :autoplay="true"
            type="card"
            :height="bannerHeight + 'px'"
            @change="elCarouselChange"
            :initial-index="setActiveItem"
          >
            <el-carousel-item>
              <!-- <div class="topLeft_body">
                <cu-animation ref="cu_animation" :type="'pulse'" :time="2">
                  <div v-if="setActiveItem == 0" class="topLeft">
                    天山梦城 逢恋古墨 何处心安 唯有温宿
                  </div>
                </cu-animation>
              </div> -->
              <img
                class="content-LB-img"
                src="./image/webHomePage-LB2.png"
                alt=""
              />
              <!-- <div class="topRight_body">
                <cu-animation ref="cu_animation" :type="'pulse'" :time="2">
                  <div v-if="setActiveItem == 0" class="topRight">
                    温宿 —— 温暖的归宿
                  </div>
                </cu-animation>
              </div> -->
            </el-carousel-item>
            <el-carousel-item>
              <!-- <div class="topLeft_body">
                <cu-animation ref="cu_animation" :type="'pulse'" :time="2">
                  <div v-if="setActiveItem == 1" class="topLeft">
                    天山梦城 逢恋古墨 何处心安 唯有温宿
                  </div>
                </cu-animation>
              </div> -->
              <div>

              </div>
              <div class="content-LB-dw" @click="clickButton('申请入驻')"></div>
              <img
                class="content-LB-img"
                src="./image/webHomePage-LB1.png"
                alt=""
              />
              <!-- <div class="topRight_body">
                <cu-animation ref="cu_animation" :type="'pulse'" :time="2">
                  <div v-if="setActiveItem == 1" class="topRight">
                    温宿 —— 温暖的归宿
                  </div>
                </cu-animation>
              </div> -->
            </el-carousel-item>
            <el-carousel-item>
              <!-- <div class="topLeft_body">
                <cu-animation ref="cu_animation" :type="'pulse'" :time="2">
                  <div v-if="setActiveItem == 2" class="topLeft">
                    天山梦城 逢恋古墨 何处心安 唯有温宿
                  </div>
                </cu-animation>
              </div> -->
              <img
                class="content-LB-img"
                src="./image/webHomePage-LB3.png"
                alt=""
              />
              <!-- <div class="topRight_body">
                <cu-animation ref="cu_animation" :type="'pulse'" :time="2">
                  <div v-if="setActiveItem == 2" class="topRight">
                    温宿 —— 温暖的归宿
                  </div>
                </cu-animation>
              </div> -->
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <div class="content-btn mt_20">
        <div
          class="content_btnItem btnItem_three"
          @click="clickButton('申请入驻')"
        >
          <div class="itemBox">
            <div class="itemTitle">申请入驻</div>
            <div class="itemTitlePY">APPLICATION IN</div>
          </div>
          <img class="itemImage" :src="gifSrc3" alt="" />
        </div>
        <div
          class="content_btnItem btnItem_four"
          @click="clickButton('我是采购商')"
        >
          <div class="itemBox">
            <div class="itemTitle">我是采购商</div>
            <div class="itemTitlePY">PURCHASER</div>
          </div>
          <img class="itemImage" :src="gifSrc1" alt="" />
        </div>

        <div
          class="content_btnItem btnItem_two"
          @click="clickButton('我是供应商')"
        >
          <div class="itemBox">
            <div class="itemTitle">我是供应商</div>
            <div class="itemTitlePY">SUPPLIER</div>
          </div>
          <img class="itemImage mr_20" :src="gifSrc2" alt="" />
        </div>

        <div
          class="content_btnItem btnItem_one"
          @click="clickButton('我是采购商')"
        >
          <div class="itemBox">
            <div class="itemTitle">我是监管机构</div>
            <div class="itemTitlePY">I'M THE REGULATOR</div>
          </div>
          <img class="itemImage" :src="gifSrc4" alt="" />
        </div>
      </div>

      <div class="content-two">
        <span class="content_two1">药品集散</span>
        <span class="content_two2">中心</span>

        入驻企业矩阵
      </div>

      <div class="content-four">
        健全统一规范、驻地行业监管、进园可享受一揽子区域医疗药品药械优惠政策
      </div>
      <div class="content_five mt_40">
        <div
          @mouseenter="moveChange(1)"
          :class="
            moveHover == 1
              ? 'content_five_1 moveHover1'
              : moveHover != 1 && moveHover != 2
              ? 'content_five_1 moveHoverNo1No2'
              : 'content_five_1'
          "
        >
          <img
            v-if="moveHover == 1"
            src="https://p2.ssl.qhimg.com/d/inn/1c330b0e8238/product/top1B.png"
            width="320px"
            height="246px"
            alt=""
            style="position: absolute; right: 0; bottom: 0"
          />
          <img
            v-else
            src="https://p2.ssl.qhimg.com/d/inn/1c330b0e8238/product/top1W.png"
            width="130px"
            height="130px"
            style="position: absolute; right: 0; bottom: 0"
          />
          <div class="content_five_11">
            <div class="content_five_111">阿克苏药品集散中心</div>
            <div class="content_five_112">
              国内独家线下药企集聚基地、线上线下同企多业务融合平台。国内独家线下线上无缝粘合采配管运服平台。
            </div>
            <div class="content_five_113">
              <el-button class="content_five_113_btn" type="primary" @click="getapp"
                >查看详情</el-button
              >
            </div>
          </div>
        </div>
        <div
          @mouseenter="moveChange(2)"
          :class="
            moveHover == 2
              ? 'content_five_2 moveHover1'
              : moveHover != 1 && moveHover != 2
              ? 'content_five_2 moveHoverNo1No2'
              : 'content_five_2'
          "
        >
          <img
            v-if="moveHover == 2"
            src="https://p2.ssl.qhimg.com/d/inn/1c330b0e8238/product/top2B.png"
            width="320px"
            height="246px"
            alt=""
            style="position: absolute; right: 0; bottom: 0"
          />
          <img
            v-else
            src="https://p2.ssl.qhimg.com/d/inn/1c330b0e8238/product/top2W.png"
            width="130px"
            height="130px"
            style="position: absolute; right: 0; bottom: 0"
          />
          <div class="content_five_21">
            <div class="content_five_211">九洲通医药集团</div>
            <div class="content_five_212">
              九州通官网汇集九州通集团商务网、九州通医药集团门户网于一体的综合性官方网站，九州通医药集团股份有限公司以传递健康，创造价值为企业宗旨。
            </div>
            <div class="content_five_213">
              <el-button class="content_five_213_btn" type="primary"
              @click="getapp">查看详情</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="content_six">
        <div
          @mouseenter="moveChange(3)"
          :class="
            moveHover == 3
              ? 'content_six_1 moveHover1'
              : moveHover != 3 && moveHover != 4 && moveHover != 5
              ? 'content_six_1 moveHoverNo1No2'
              : 'content_six_1'
          "
        >
          <img
            v-if="moveHover == 3"
            src="https://p2.ssl.qhimg.com/d/inn/1c330b0e8238/product/bottom1B.png"
            width="320px"
            height="246px"
            alt=""
            style="position: absolute; right: 0; bottom: 0"
          />
          <img
            v-else
            src="https://p2.ssl.qhimg.com/d/inn/1c330b0e8238/product/bottom1W.png"
            width="130px"
            height="130px"
            style="position: absolute; right: 0; bottom: 0"
          />
          <div class="content_six_11">
            <div class="content_six_111">国药集团</div>
            <div
              v-if="moveHover != 4 && moveHover != 5"
              class="content_six_112"
            >
              是由国务院国有资产监督管理委员会直接管理的医药健康产业集团。以预防治疗和诊断护理等健康相关产品的分销、零售、研发及生产为主业。
            </div>
            <div
              v-if="moveHover != 4 && moveHover != 5"
              class="content_six_113"
            >
              <el-button class="content_six_113_btn" type="primary"
              @click="getapp">查看详情</el-button
              >
            </div>
          </div>
        </div>
        <div
          @mouseenter="moveChange(4)"
          :class="
            moveHover == 4
              ? 'content_six_1 moveHover1'
              : moveHover != 3 && moveHover != 4 && moveHover != 5
              ? 'content_six_1 moveHoverNo1No2'
              : 'content_six_1'
          "
        >
          <img
            v-if="moveHover == 4"
            src="https://p2.ssl.qhimg.com/d/inn/1c330b0e8238/product/bottom2B.png"
            width="320px"
            height="246px"
            alt=""
            style="position: absolute; right: 0; bottom: 0"
          />
          <img
            v-else
            src="https://p2.ssl.qhimg.com/d/inn/1c330b0e8238/product/bottom2W.png"
            width="130px"
            height="130px"
            style="position: absolute; right: 0; bottom: 0"
          />
          <div class="content_six_11">
            <div class="content_six_111">新疆富沃药业有限公司</div>
            <div
              v-if="moveHover != 3 && moveHover != 5"
              class="content_six_112"
            >
              新疆富沃药业有限公司位于美丽的新疆塔里木河流域沙雅县，是以新疆特色资源甘草、罗布麻、洋葱、苦豆子等道地药材。
            </div>
            <div
              v-if="moveHover != 3 && moveHover != 5"
              class="content_six_113"
            >
              <el-button class="content_six_113_btn" type="primary"
              @click="getapp">查看详情</el-button
              >
            </div>
          </div>
        </div>
        <div
          @mouseenter="moveChange(5)"
          :class="
            moveHover == 5
              ? 'content_six_1 moveHover1'
              : moveHover != 3 && moveHover != 4 && moveHover != 5
              ? 'content_six_1 moveHoverNo1No2'
              : 'content_six_1'
          "
        >
          <img
            v-if="moveHover == 5"
            src="https://p2.ssl.qhimg.com/d/inn/1c330b0e8238/product/bottom3B.png"
            width="320px"
            height="246px"
            alt=""
            style="position: absolute; right: 0; bottom: 0"
          />
          <img
            v-else
            src="https://p2.ssl.qhimg.com/d/inn/1c330b0e8238/product/bottom3W.png"
            width="130px"
            height="130px"
            style="position: absolute; right: 0; bottom: 0"
          />
          <div class="content_six_11">
            <div class="content_six_111">新疆三胶药业有限责任公司</div>
            <div
              v-if="moveHover != 3 && moveHover != 4"
              class="content_six_112"
            >
              新疆三胶药业有限责任公司是利用当地原料资源和托峰药业国药准字[Z65020191]批号，专门生产药胶系列的新型企业。
            </div>
            <div
              v-if="moveHover != 3 && moveHover != 4"
              class="content_six_113"
            >
              <el-button class="content_six_113_btn" type="primary"
              @click="getapp" >查看详情</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <div class="content_seven">
        <div class="content_seven_body">
          <div class="content_seven_1">药品集散中心优势</div>
          <div class="content_seven_2">
            <div class="content_seven_21">
              <div class="content_seven_211">阿克苏药品集散中心</div>
              <div class="content_seven_211">网数融综管运服平台</div>
              <div class="content_seven_212">
                国内独家线下药企集聚基地、线上线下同企多业务融合平台。国内独家线下线上无缝粘合采配管运服平台。
              </div>
              <div class="content_seven_212">集采 集配 线上管理运营</div>
            </div>
            <div class="content_seven_22">
              <img src="./image/webHomePage-24.png" alt="" />
            </div>
          </div>
          <div class="content_seven_3">为什么入驻集散中心</div>
          <div class="content_seven_4">
            <div class="content_seven_41">
              <div class="content_seven_411">
                <img
                  src="https://p4.ssl.qhimg.com/t01737fd7a3b3543e62.jpg"
                  alt=""
                />
              </div>
              <div class="content_seven_412">高效便捷</div>
              <div class="content_seven_413">
                功能高效便捷，资源汇集。线上运营，平台实现了全
                程信息化、无纸化操作。
              </div>
            </div>
            <div class="content_seven_41">
              <div class="content_seven_411">
                <img
                  src="https://p3.ssl.qhimg.com/t019d6d4a6486e26256.jpg"
                  alt=""
                />
              </div>
              <div class="content_seven_412">市场驱动</div>
              <div class="content_seven_413">
                通过市场驱动对不同企业的同类采购需求进行整合，其它
                文字说明请补充。
              </div>
            </div>
            <div class="content_seven_41">
              <div class="content_seven_411">
                <img
                  src="https://p2.ssl.qhimg.com/t0172db840caa2ee439.jpg"
                  alt=""
                />
              </div>
              <div class="content_seven_412">创新生态</div>
              <div class="content_seven_413">
                平台旨在实现产业链上下游的数据共享和信息流互通，为
                供应商融资增信。
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="plan" class="plan">
        <div class="plan_title">入驻企业</div>
        <div class="numberbox">
          <div class="numberadd">
            <div id="number-container" class="plan_count">200</div>
            <div class="icon">+</div>
          </div>
        </div>
        <div class="plan_box">
          <div class="plan_content">
            <div class="plan_1">阿克苏药品集散中心</div>
            <div class="plan_2">
              国内独家线下药企集聚基地、线上线下同企多业务融合平台。
            </div>
            <div class="plan_2">国内独家线下线上无缝粘合采配管运服平台。</div>
            <div class="plan_3">年交易额</div>
            <div class="plan_4">
              <span>0</span>
              <span>3</span>
              <span>2</span>
              <span>亿</span>
              <div class="godetial" @click="getapp">查看详情</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content_eight">
        力争亿万客户共同将平台的便捷力转化为实力
      </div>
      <div class="content_nine">为您服务</div>
      <div class="content_ten mt_60">
        <div class="content_ten1">
          <div class="content_ten11">
            <img src="./image/webHomePage-22.png" alt="" />
          </div>
          <div class="content_ten11">
            <img src="./image/webHomePage-23.png" alt="" />
          </div>
          <div class="content_ten11">
            <img src="./image/webHomePage-22.png" alt="" />
          </div>
          <div class="content_ten11">
            <img src="./image/webHomePage-22.png" alt="" />
          </div>
        </div>
        <div class="content_ten1 mt_30">
          <div class="content_ten11">
            <img src="./image/webHomePage-22.png" alt="" />
          </div>
          <div class="content_ten11">
            <img src="./image/webHomePage-23.png" alt="" />
          </div>
          <div class="content_ten11">
            <img src="./image/webHomePage-22.png" alt="" />
          </div>
          <div class="content_ten11">
            <img src="./image/webHomePage-22.png" alt="" />
          </div>
        </div>
        <div class="content_ten1 mt_30">
          <div class="content_ten11">
            <img src="./image/webHomePage-22.png" alt="" />
          </div>
          <div class="content_ten11">
            <img src="./image/webHomePage-23.png" alt="" />
          </div>
          <div class="content_ten11">
            <img src="./image/webHomePage-22.png" alt="" />
          </div>
          <div class="content_ten11">
            <img src="./image/webHomePage-22.png" alt="" />
          </div>
        </div>
      </div>

      <div class="logo mt_60 mb_60">
        <!-- <div class="logo__box">
          <div class="logo__box__nav logo__box__add1">
            <img src="./image/1.png" />
          </div>
          <div class="logo__box__nav logo__box__add2">
            <img src="./image/1.png" />
          </div>
          <div class="logo__box__nav logo__box__add3">
            <img src="./image/2.png" />
          </div>
          <div class="logo__box__nav logo__box__add4">
            <img src="./image/3.png" />
          </div>
          <div class="logo__box__nav logo__box__add5">
            <img src="./image/4.png" />
          </div>
          <div class="logo__box__nav logo__box__add6">
            <img src="./image/5.png" />
          </div>
          <div class="logo__box__nav logo__box__nav2">
            <img src="./image/6.png" />
          </div>
          <div class="logo__box__nav logo__box__nav3">
            <img src="./image/7.png" />
          </div>
          <div class="logo__box__nav logo__box__nav4">
            <img src="./image/8.png" />
          </div>
          <div class="logo__box__nav logo__box__nav5">
            <img src="./image/9.png" />
          </div>
          <div class="logo__box__nav logo__box__nav6">
            <img src="./image/10.png" />
          </div>
          <div class="logo__box__nav logo__box__nav7">
            <img src="./image/11.png" />
          </div>
          <div class="logo__box__nav logo__box__nav8">
            <img src="./image/12.png" />
          </div>
          <div class="logo__box__nav9">
            <div>1800+</div>
            <p>合作药企共创</p>
          </div>
          <div class="logo__box__nav logo__box__nav10">
            <img src="./image/13.png" />
          </div>
          <div class="logo__box__nav logo__box__nav11">
            <img src="./image/14.png" />
          </div>
          <div class="logo__box__nav logo__box__nav12">
            <img src="./image/15.png" />
          </div>
          <div class="logo__box__nav logo__box__nav13">
            <img src="./image/16.png" />
          </div>
          <div class="logo__box__nav logo__box__nav14">
            <img src="./image/17.png" />
          </div>
          <div class="logo__box__nav logo__box__nav15">
            <img src="./image/18.png" />
          </div>
          <div class="logo__box__nav logo__box__nav16">
            <img src="./image/19.png" />
          </div>
          <div class="logo__box__nav logo__box__nav17">
            <img src="./image/20.png" />
          </div>
          <div class="logo__box__nav logo__box__nav18">
            <img src="./image/21.png" />
          </div>
          <div class="logo__box__nav logo__box__nav19">
            <img src="./image/22.png" />
          </div>
          <div class="logo__box__nav logo__box__nav20">
            <img src="./image/23.png" />
          </div>
        </div> -->

        <div class="logo__box">
          <div class="logo__box__nav logo__box__add1">
            阿克苏海萍康商贸
            <!-- <img src="https://p0.ssl.qhimg.com/t01d4947505d36059dc.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__add2">
            阿克苏江右商贸
            <!-- <img src="https://p4.ssl.qhimg.com/t01f51dcd250625cf12.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__add3">
            温宿益鸣医疗器械
            <!-- <img src="https://p2.ssl.qhimg.com/t015fc308971b18bbfd.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__add4">
            阿克苏远大商贸
            <!-- <img src="https://p0.ssl.qhimg.com/t0173b73f9036049c57.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__add5">
            阿克苏众维达商贸
            <!-- <img src="https://p4.ssl.qhimg.com/t01ed3fa84e99c8d547.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__add6">
            阿克苏维尔康医疗器械
            <!-- <img src="https://p1.ssl.qhimg.com/t0180cb071893d8bacb.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav2">
            新疆蓝天白云医疗器械
            <!-- <img src="https://p3.ssl.qhimg.com/t01a6026b065077e023.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav3">
            阿克德信成医疗用品
            <!-- <img src="https://p3.ssl.qhimg.com/t01630c353d0e4998c2.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav4">
            疆南春（新疆）医疗科技
            <!-- <img src="https://p4.ssl.qhimg.com/t01011f845c14e655f9.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav5">
            阿克苏赫尔斯商贸
            <!-- <img src="https://p1.ssl.qhimg.com/t01738f0ec0dc26b31c.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav6">
            新疆壹动力医疗用品
            <!-- <img src="https://p1.ssl.qhimg.com/t01079610511ca7cad5.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav7">
            新疆倍佳康医疗器械
            <!-- <img src="https://p0.ssl.qhimg.com/t01052237f74eb7ace7.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav8">
            阿克苏赣商进出口贸易
            <!-- <img src="https://p1.ssl.qhimg.com/t01da7084c2c28deacb.png" /> -->
          </div>
          <div class="logo__box__nav9">
            <div>1800+</div>
            <p>合作药企共创</p>
          </div>
          <div class="logo__box__nav logo__box__nav10">
            新疆雅迪尔生物制品
            <!-- <img src="https://p4.ssl.qhimg.com/t01616bb8c18ee4f057.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav11">
            阿克苏豪信商贸
            <!-- <img src="https://p3.ssl.qhimg.com/t019c3306261be38de7.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav12">
            新疆贝尔康商贸
            <!-- <img src="https://p2.ssl.qhimg.com/t01ee4e8236cb9e9f57.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav13">
            阿克苏创兴恒康商贸
            <!-- <img src="https://p3.ssl.qhimg.com/t0140b12b93ab3718cd.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav14">
            阿克苏天润发商贸
            <!-- <img src="https://p1.ssl.qhimg.com/t01af552fd53bc7c4e3.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav15">
            阿克苏康鑫源医疗器械
            <!-- <img src="https://p1.ssl.qhimg.com/t019fa7efb1ad95bf82.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav16">
            新疆鑫豫源贸易
            <!-- <img src="https://p4.ssl.qhimg.com/t019d647fb8af946a22.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav17">
            阿克苏科创利丰贸易
            <!-- <img src="https://p1.ssl.qhimg.com/t0165d0d0f4c2cb91e5.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav18">
            新疆康尔健医疗器械
            <!-- <img src="https://p3.ssl.qhimg.com/t010c8edd48ea21dd67.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav19">
            阿克苏振波医疗器械
            <!-- <img src="https://p0.ssl.qhimg.com/t01b5d88cd5442c6f6c.png" /> -->
          </div>
          <div class="logo__box__nav logo__box__nav20">
            阿克苏新百特医疗设备
            <!-- <img src="https://p2.ssl.qhimg.com/t01ffb382bf2059d1a5.png" /> -->
          </div>
        </div>
      </div>

      <!-- 友情链接组件 -->
      <cu-friendshipLink></cu-friendshipLink>
    </div>

    <!-- 最底部组件 -->
    <webMainFooter></webMainFooter>

    <!-- 详情公告弹框 -->
    <cu-dialog :visible="visible" :center="true" @handleClose="handleClose">
      <div class="detailTitle">{{ dialogDetails.title }}</div>
      <div class="detailTime">发布时间：{{ dialogDetails.releaseTime }}</div>
      <div class="detail">{{ dialogDetails.detail }}</div>
      <template slot="footer">
        <div class="flex">
          <el-button type="primary" @click="handleClose">关闭</el-button>
        </div>
      </template>
    </cu-dialog>
  </div>
</template>
<script>
import {
  announcementPageAnnouncementList,
  announcementGetAnnouncementById,
  policiesPagePoliciesList,
  policiesGetPoliciesById,
  mallHomepageGetLocation,
  mallHomepageGetMemberInfo,
  mallHomepageGetResourceIntegration,
} from "@/api/aksApi/webApi/webApi.js";
export default {
  data() {
    return {
      elTabsNoticeName: "通知公告", //通知公告el-tabs控件值
      noticeList: [], //公告列表
      elTabsPolicyName: "国家政策", //政策法规el-tabs控件值
      policyList: [], //政策法规列表
      visible: false, //详情弹框
      dialogDetails: {}, //详情弹框数据

      distributionList: [], //会员分布数据
      distributionListMap: [],
      // 资源整合
      resourceIntegrationList: {
        buyerCount: 0, //采购商数量
        orderAmount: 0, //交易总金额
        orderCount: 0, //交易笔数
        supplierCount: 0, //供应商数量
      },

      setActiveItem: 1,
      bannerHeight: "",
      gifSrc1: require("./image/webHomePage-btnItem1.gif"),
      gifSrc2: require("./image/webHomePage-btnItem2.gif"),
      gifSrc3: require("./image/webHomePage-btnItem3.gif"),
      gifSrc4: require("./image/webHomePage-btnItem4.gif"),
      moveHover: 1, //1,2,3,4,5
    };
  },
  mounted() {
    this.announcementPageAnnouncementListApi(); //查询信息表中通知公告分页列表信息（ 1 通知公告 2 中标公告 3 招标公告）-接口
    this.policiesPagePoliciesListApi(); // 查询信息表中政策法规分页列表信息（4 国家政策 5 地方政策 6 交易规则）-接口
    this.mallHomepageGetLocationApi(); //获取阿克苏地区地区名
    this.mallHomepageGetResourceIntegrationApi(); //资源整合接口

    this.imgLoad();
    window.onresize = () => {
      this.bannerHeight = (540 / 1920) * window.innerWidth;
      this.imgLoad();
    };
  },
  beforeDestroy() {
    //在组件生命周期结束的时候销毁。
    window.onresize = null;
  },
  methods: {
    imgLoad() {
      this.$nextTick(() => {
        this.bannerHeight = (540 / 1920) * window.innerWidth;
        console.log(
          "this.$refs.bannerHeight[0].bannerHeight:",
          this.$refs.bannerHeight[0].bannerHeight
        );
      });
    },
    //查询信息表中通知公告分页列表信息（ 1 通知公告 2 中标公告 3 招标公告）-接口
    announcementPageAnnouncementListApi() {
      this.noticeList = [];
      // 1 通知公告 2 中标公告 3 招标公告
      let valueId = 1;
      if (this.elTabsNoticeName == "通知公告") {
        valueId = 1;
      } else if (this.elTabsNoticeName == "中标公告") {
        valueId = 2;
      } else if (this.elTabsNoticeName == "招标公告") {
        valueId = 3;
      }
      let valueData = {
        sort: "desc",
        announcementId: valueId,
        currPageNo: 1,
        pageSize: 6, //首页只展示六条
      };
      announcementPageAnnouncementList(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.noticeList = res.data.list;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 通过信息ID查询通知公告详情列表-接口
    announcementGetAnnouncementByIdApi(valueId) {
      announcementGetAnnouncementById(valueId)
        .then((res) => {
          if (res.code == 200) {
            this.visible = true;
            this.dialogDetails = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 查询信息表中政策法规分页列表信息（4 国家政策 5 地方政策 6 交易规则）-接口
    policiesPagePoliciesListApi() {
      this.policyList = [];
      // 4 国家政策 5 地方政策 6 交易规则
      let valueId = 4;
      if (this.elTabsPolicyName == "国家政策") {
        valueId = 4;
      } else if (this.elTabsPolicyName == "地方政策") {
        valueId = 5;
      } else if (this.elTabsPolicyName == "交易规则") {
        valueId = 6;
      }
      let valueData = {
        policiesId: valueId,
        currPageNo: 1,
        pageSize: 10, //首页只展示六条
      };
      policiesPagePoliciesList(valueData)
        .then((res) => {
          if (res.code == 200) {
            this.policyList = res.data.list;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 通过信息ID查询政策法规详情列表-接口
    policiesGetPoliciesByIdApi(valueId) {
      policiesGetPoliciesById(valueId)
        .then((res) => {
          if (res.code == 200) {
            this.visible = true;
            this.dialogDetails = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 获取阿克苏地区名-接口
    mallHomepageGetLocationApi() {
      this.distributionList = [];
      mallHomepageGetLocation()
        .then((res) => {
          if (res.code == 200) {
            this.distributionList = res.data;
            this.distributionList.forEach((element) => {
              this.mallHomepageGetMemberInfoApi(element.areaCode);
            });
            this.distributionListMap = this.distributionList;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 会员分布信息-接口
    mallHomepageGetMemberInfoApi(areaCode) {
      mallHomepageGetMemberInfo(areaCode)
        .then((res) => {
          if (res.code == 200) {
            if (res.data == null) {
            } else {
              this.distributionList.forEach((element) => {
                if (element.areaName == res.data.areaName) {
                  element.name = res.data.areaName.replace(/\s+/g, "");
                  element.value = res.data.orderCount;
                  element.medicalIns = res.data.medicalIns; //医疗机构数
                  element.orderCount = res.data.orderCount; //交易订单数
                  element.pharmacyBuyer = res.data.pharmacyBuyer; //药店采购商
                }
              });
            }
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 资源整合-接口
    mallHomepageGetResourceIntegrationApi() {
      mallHomepageGetResourceIntegration(1)
        .then((res) => {
          if (res.code == 200) {
            this.resourceIntegrationList = res.data;
          } else {
            this.$message.error(res.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 各平台入口点击回调
    clickButton(value) {
      if (value == "我是采购商") {
        this.$store.commit("switchPlatform", "purchaser");
        this.$router.push("/login");
      } else if (value == "我是供应商") {
        this.$store.commit("switchPlatform", "supplier");
        this.$router.push("/login");
      } else if (value == "申请入驻") {
        this.$store.commit("switchPlatform", "operation");
        this.$router.push("/Register");
      }
    },
    getapp(){
      console.log(1111);
   this.$router.push("/webUnderConstruction");
    },
    // 点击更多进行跳转
    moreRouter(value) {
      this.$router.push("/" + value);
      this.$store.commit("$uStore", {
        name: "vuex_webName",
        value: value,
      });
    },
    // 建设中跳转
    underConstructionButton() {
      let routeData = this.$router.resolve({
        name: "webUnderConstruction",
        // query: { species: "Brassica rapa" },
      });
      window.open(routeData.href, "_blank");
      // this.$router.push("/webUnderConstruction");
      // this.$store.commit("$uStore", {
      //   name: "vuex_webName",
      //   value: "webUnderConstruction",
      // });
    },
    // 弹框关闭
    handleClose() {
      this.visible = false;
    },
    elCarouselChange(value) {
      // this.$refs.cu_animation.again();
      this.setActiveItem = value;
      console.log("setActiveItem:", this.setActiveItem);
    },
    moveChange(value) {
      this.moveHover = value;
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./webHomePage.scss";
el-carousel-item{
  position: relative;
}
.content-LB-dw{
  position: absolute;
  left: 5%;
  bottom: 23%;
  background: transparent;
  // background: red;
  border-radius: 5px;
  height: 16%;
  width: 20%;
}
</style>
