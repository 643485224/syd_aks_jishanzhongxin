<template>
  <!-- 日历控件 -->
  <div class="cal_con">
    <div class="cal_header">
      <!-- 顶部左侧 -->
      <div class="cal_header_left">
        <div class="cal_header_left_top">
          <span class="cal_h_time">{{ year }}</span>
        </div>
        <div class="cal_header_left_bottom">
          <div class="cal_h_left">
            <div class="cal_h_btn" @click="preYear">
              <svg class="cal_h_l_icon">
                <!-- 画线条 -->
                <polyline
                  points="6,0 2,4 6,8"
                  style="fill: none; stroke: #ffffff; stroke-width: 2"
                />
                <!-- 画线条 -->
                <polyline
                  points="10,0 6,4 10,8"
                  style="fill: none; stroke: #ffffff; stroke-width: 2"
                />
              </svg>
            </div>
            <div class="cal_h_btn" @click="preMonth">
              <svg class="cal_h_l_icon">
                <polyline
                  points="6,0 2,4 6,8"
                  style="fill: none; stroke: #ffffff; stroke-width: 2"
                />
              </svg>
            </div>
          </div>
          <div class="cal_h_center">
            <span class="cal_h_time">{{ month }}</span>
          </div>
          <div class="cal_h_right">
            <div class="cal_h_btn" @click="nextMonth">
              <svg class="cal_h_l_icon">
                <polyline
                  points="2,0 8,4 2,8"
                  style="fill: none; stroke: #ffffff; stroke-width: 2"
                />
              </svg>
            </div>
            <div class="cal_h_btn" @click="nextYear">
              <svg class="cal_h_l_icon">
                <polyline
                  points="2,0 8,4 2,8"
                  style="fill: none; stroke: #ffffff; stroke-width: 2"
                />
                <polyline
                  points="6,0 12,4 6,8"
                  style="fill: none; stroke: #ffffff; stroke-width: 2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <!-- 顶部右侧 -->
      <div class="cal_header_right">
        <div class="nameText">姓名:张三</div>
        <div class="QingjiaText">请假:2h</div>
        <div class="JiaBanText">加班:11h</div>
        <div class="ChuCaiText">出差:32h</div>
        <div class="YiChangText">异常考勤:7次</div>
      </div>
    </div>

    <div class="cal_month">
      <!--日历表头  周一 周二 周三 周四 周五 周六 周日-->
      <div class="cal_m_weeks">
        <div v-for="w in weeks" :key="w" class="cal_m_weeks_cell">
          {{ w }}
        </div>
      </div>
      <!--日历表内容 -->
      <div class="cal_m_days">
        <!-- 第几行 -->
        <div
          v-for="(ds, index) in monthData"
          :key="index"
          class="cal_m_day_line"
        >
          <!-- 每行内容 -->
          <div
            v-for="d in ds"
            :key="d.day"
            class="cal_m_day_cell"
            :style="{ color: getCellColor(d) }"
            @mouseenter="mouseenter(d, $event)"
            @mouseleave="mouseleave(d, $event)"
          >
            <div class="itemDay">{{ d.day }}</div>
            <!-- {{ ds[index].date.Format("yyyy-MM-dd") }} -->
            <!-- {{ d.date.Format("yyyy-MM-dd") }} -->
            <slot :name="d.fullYear + '-' + d.month + '-' + d.day"></slot>
            <!-- 正常卡 -->
            <div
              v-if="
                d.type == 0 &&
                setDataList(d.date.Format('yyyy-MM-dd')).typeName == '正常卡'
              "
              class="ZhengChang"
            >
              <div class="ZhengChangTitle">正常卡:4次</div>
              <div class="ZhengChangDian">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <!-- 请假 -->
            <div
              v-if="
                d.type == 0 &&
                setDataList(d.date.Format('yyyy-MM-dd')).typeName == '请假'
              "
              class="Qingjia"
            >
              <div class="QingjiaTitle">请假:事假</div>
              <div class="QingjiaDian">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <!-- 加班 -->
            <div
              v-if="
                d.type == 0 &&
                setDataList(d.date.Format('yyyy-MM-dd')).typeName == '加班'
              "
              class="JiaBan"
            >
              <div class="JiaBanTitle">加班:4h</div>
              <div class="JiaBanDian">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <!-- 出差 -->
            <div
              v-if="
                d.type == 0 &&
                setDataList(d.date.Format('yyyy-MM-dd')).typeName == '出差'
              "
              class="ChuChai"
              @click="ss(setDataList(d.date.Format('yyyy-MM-dd')))"
            >
              <div class="ChuChaiTitle">出差</div>
              <div class="ChuChaiDian">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
            <!-- 异常卡 -->
            <div
              v-if="
                d.type == 0 &&
                setDataList(d.date.Format('yyyy-MM-dd')).typeName == '异常卡'
              "
              class="YiChang"
              @click="ss(setDataList(d.date.Format('yyyy-MM-dd')))"
            >
              <div class="YiChangTitle">异常卡</div>
              <div class="YiChangDian">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>

            <!-- 假期 -->
            <div
              v-if="
                d.type == 0 &&
                setDataList(d.date.Format('yyyy-MM-dd')).typeName == '假期'
              "
              class="JiaQi"
            >
              <div class="JiaQiTitle">假期</div>
              <div class="JiaQiDian">
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "cu-calendar",
  props: {
    date: {
      type: Date,
      default: () => new Date(),
    },
    dataList: {
      type: [],
      default: () => [
        {
          time: "2022-07-29",
          typeName: "正常卡",
        },
        {
          time: "2022-07-20",
          typeName: "请假",
        },
        {
          time: "2022-07-22",
          typeName: "加班",
        },
        {
          time: "2022-07-11",
          typeName: "出差",
        },
        {
          time: "2022-07-14",
          typeName: "异常卡",
        },
        {
          time: "2022-07-04",
          typeName: "假期",
        },
      ],
    },
  },
  data() {
    return {
      now: this.date, //当前时间：Fri Jul 29 2022 09:57:33 GMT+0800 (中国标准时间)
      year: 0,
      month: 0,
      weeks: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
      monthData: [], //月数据容器
      currentYear: new Date().getFullYear(), //当前年：2022
      currentMonth: new Date().getMonth() + 1, //当前月：7
      currentDay: new Date().getDate(), //当前天：29
    };
  },
  computed: {},
  mounted() {
    this.setYearMonth(this.now);
    this.generateMonth(this.now);
  },
  methods: {
    // 通过输入日期，匹配当天的所有数据
    // 入参格式 value：'2022-07-09'
    setDataList(value) {
      let object = {};
      this.dataList.forEach((element) => {
        if (element.time == value) {
          object = element;
        }
      });
      return object;
    },
    setYearMonth(now) {
      this.year = now.getFullYear();
      this.month = now.getMonth() + 1;
    },
    preYear() {
      let n = this.now;
      let date = new Date(
        n.getFullYear() - 1,
        n.getMonth(),
        n.getDate(),
        n.getHours(),
        n.getMinutes(),
        n.getSeconds(),
        n.getMilliseconds()
      );

      this.setYearMonthInfos(date);
    },
    preMonth() {
      let n = this.now;
      let date = new Date(
        n.getFullYear(),
        n.getMonth() - 1,
        n.getDate(),
        n.getHours(),
        n.getMinutes(),
        n.getSeconds(),
        n.getMilliseconds()
      );

      this.setYearMonthInfos(date);
    },
    nextYear() {
      let n = this.now;
      let date = new Date(
        n.getFullYear() + 1,
        n.getMonth(),
        n.getDate(),
        n.getHours(),
        n.getMinutes(),
        n.getSeconds(),
        n.getMilliseconds()
      );

      this.setYearMonthInfos(date);
    },
    nextMonth() {
      let n = this.now;
      let date = new Date(
        n.getFullYear(),
        n.getMonth() + 1,
        n.getDate(),
        n.getHours(),
        n.getMinutes(),
        n.getSeconds(),
        n.getMilliseconds()
      );

      this.setYearMonthInfos(date);
    },
    setYearMonthInfos(date) {
      this.setYearMonth(date);
      this.generateMonth(date);
      this.now = date;
      this.dateChange();
    },
    generateMonth(date) {
      date.setDate(1);
      // 星期 0 - 6， 星期天 - 星期6
      let weekStart = date.getDay();

      let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
      let dayEnd = endDate.getDate();
      // 星期 0 - 6， 星期天 - 星期6
      let weeEnd = endDate.getDay();

      let milsStart = date.getTime();
      let dayMils = 24 * 60 * 60 * 1000;
      let milsEnd = endDate.getTime() + dayMils;

      let monthDatas = [];
      let current;
      // 上个月的几天
      for (let i = 1; i < weekStart; i++) {
        current = new Date(milsStart - (weekStart - i) * dayMils);
        monthDatas.push({
          type: -1,
          date: current,
          fullYear: current.getFullYear(),
          month: current.getMonth() + 1,
          day: current.getDate(),
        });
      }
      // 当前月
      for (let i = 0; i < dayEnd; i++) {
        current = new Date(milsStart + i * dayMils);
        monthDatas.push({
          type: 0,
          date: current,
          fullYear: current.getFullYear(),
          month: current.getMonth() + 1,
          day: current.getDate(),
        });
      }
      // 下个月的几天
      for (let i = 0; i < 6 - weeEnd + 1; i++) {
        current = new Date(milsEnd + i * dayMils);
        monthDatas.push({
          type: 1,
          date: current,
          fullYear: current.getFullYear(),
          month: current.getMonth() + 1,
          day: current.getDate(),
        });
      }
      this.monthData = [];
      for (let i = 0; i < monthDatas.length; i++) {
        let mi = i % 7;
        if (mi == 0) {
          this.monthData.push([]);
        }
        this.monthData[Math.floor(i / 7)].push(monthDatas[i]);
      }

      // 少于6行，补足6行
      if (this.monthData.length <= 5) {
        milsStart = current.getTime();
        let lastLine = [];
        for (let i = 1; i <= 7; i++) {
          current = new Date(milsStart + i * dayMils);
          lastLine.push({
            type: 1,
            date: current,
            fullYear: current.getFullYear(),
            month: current.getMonth() + 1,
            day: current.getDate(),
          });
        }
        this.monthData.push(lastLine);
      }
    },

    getCellColor(d) {
      if (
        d.fullYear == this.currentYear &&
        d.month == this.currentMonth &&
        d.day == this.currentDay
      ) {
        return "#409eff";
      }
      let color = d.type == -1 ? "#c0c4cc" : d.type == 1 ? "#c0c4cc  " : "";

      return color;
    },
    mouseenter(d, event) {
      this.$emit("enter", event, d);
      // document.getElementsByClassName('cal_m_day_cell').style('background-color','#000000')
    },
    mouseleave(d, event) {
      this.$emit("leave", event, d);
    },
    dateChange() {
      let fullYear = this.now.getFullYear();
      let month = this.now.getMonth();
      let startDay = new Date(fullYear, month, 1);
      let endDay = new Date(fullYear, month + 1, 0, 23, 59, 59);
      this.$emit("changeMonth", startDay, endDay);
    },

    ss(value) {
      console.log(value);
      this.$message.success("ssssssss");
    },
  },
};
</script>

<style scoped lang="scss">
.cal_con {
  box-sizing: border-box;
  width: 1020px; //下方单元格*7+左右内边距 140*7+20+20
  padding: 10px 20px 20px 20px;
  -webkit-user-select: none; //取消鼠标点快了文字会被选中。
  -moz-user-select: none; //取消鼠标点快了文字会被选中。
  -ms-user-select: none; //取消鼠标点快了文字会被选中。
  user-select: none; //取消鼠标点快了文字会被选中。
  color: #000000;
  box-shadow: 0 2px 12px 0 #0000006e;
  background: #ffffff;
  border-radius: 20px;

  .cal_header {
    width: 980px; //下方单元格*7 140*7
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .cal_header_left {
      display: flex;
      flex-direction: column;
      align-items: center;
      .cal_header_left_top {
        width: 122px;
        height: 30px;
        background: #109af9;
        display: flex;
        align-items: center;
        justify-content: center;
        .cal_h_time {
          font-family: "Microsoft YaHei";
          font-style: normal;
          font-weight: 400;
          font-size: 20px;
          color: #ffffff;
        }
      }
      .cal_header_left_bottom {
        width: 122px;
        height: 30px;
        background: rgba(16, 154, 249, 0.6);
        display: flex;
        align-items: center;
        justify-content: space-between;
        .cal_h_left {
          height: 100%;
          display: flex;

          .cal_h_btn {
            height: 100%;
            width: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .cal_h_btn:hover {
            background-color: #109af9;
          }

          .cal_h_l_icon {
            height: 8px;
            width: 12px;
            margin: auto;
          }
        }
        .cal_h_center {
          .cal_h_time {
            font-family: "Microsoft YaHei";
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            color: #ffffff;
          }
        }
        .cal_h_right {
          height: 100%;
          display: flex;

          .cal_h_btn {
            height: 100%;
            width: 24px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .cal_h_btn:hover {
            background-color: #109af9;
          }

          .cal_h_l_icon {
            height: 8px;
            width: 12px;
            margin: auto;
          }
        }
      }
    }
    .cal_header_right {
      //   width: 1125px;
      height: 43px;
      font-family: "Microsoft YaHei";
      font-style: normal;
      font-weight: 400;
      font-size: 20px;
      line-height: 26px;
      display: flex;
      align-items: center;
      justify-content: center;
      .QingjiaText {
        color: rgba(255, 199, 0, 1);
        margin-left: 80px;
      }
      .JiaBanText {
        color: rgba(36, 0, 255, 1);
        margin-left: 80px;
      }
      .ChuCaiText {
        color: rgba(255, 167, 40, 1);
        margin-left: 80px;
      }
      .YiChangText {
        color: rgba(240, 92, 39, 1);
        margin-left: 80px;
      }
    }
  }

  .cal_month {
    // 日历表头 周日 周一 周二 周三 周四 周五 周六
    .cal_m_weeks {
      display: flex;
      .cal_m_weeks_cell {
        box-sizing: border-box;
        width: 140px;
        height: 30px;
        font-weight: 400;
        font-size: 16px;
        border: 1px solid #e4e7ed;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    // 日历表内容
    .cal_m_days {
      // 第几行
      .cal_m_day_line {
        display: flex;
        // 每行内容
        .cal_m_day_cell {
          box-sizing: border-box;
          width: 140px;
          height: 120px;
          border: 1px solid #e4e7ed;
          .itemDay {
            width: 100%;
            height: 30px;
            font-style: normal;
            font-weight: 400;
            font-size: 24px;
            text-align: right;
            box-sizing: border-box;
            padding-right: 10px;
          }
        }
        // 每行内容-浮动效果
        .cal_m_day_cell:hover {
          color: #409eff;
        }
      }
    }
  }
}
// 正常卡
.ZhengChang {
  margin: 10px 10px 10px 10px;
  width: 100px;
  height: 28px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  background: rgba(16, 154, 249, 0.2);
  color: rgba(16, 154, 249, 1);
  .ZhengChangTitle {
  }
  .ZhengChangDian {
    div {
      width: 4px;
      height: 4px;
      margin-bottom: 2px;
      border-radius: 4px;
      background: rgba(16, 154, 249, 1);
    }
  }
}
.ZhengChang:hover {
  transform: scale(1.1);
}
// 请假
.Qingjia {
  margin: 10px 10px 10px 10px;
  width: 100px;
  height: 28px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  background: rgba(255, 199, 0, 0.2);
  color: rgba(255, 199, 0, 1);
  .QingjiaTitle {
  }
  .QingjiaDian {
    div {
      width: 4px;
      height: 4px;
      margin-bottom: 2px;
      border-radius: 4px;
      background: rgba(255, 199, 0, 1);
    }
  }
}
.Qingjia:hover {
  transform: scale(1.1);
}
// 加班
.JiaBan {
  margin: 10px 10px 10px 10px;
  width: 100px;
  height: 28px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  background: rgba(36, 0, 255, 0.2);
  color: rgba(36, 0, 255, 1);
  .JiaBanTitle {
  }
  .JiaBanDian {
    div {
      width: 4px;
      height: 4px;
      margin-bottom: 2px;
      border-radius: 4px;
      background: rgba(36, 0, 255, 1);
    }
  }
}
.JiaBan:hover {
  transform: scale(1.1);
}
// 出差
.ChuChai {
  margin: 10px 10px 10px 10px;
  width: 100px;
  height: 28px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  background: rgba(255, 167, 40, 0.2);
  color: #ffa728;
  .ChuChaiTitle {
  }
  .ChuChaiDian {
    div {
      width: 4px;
      height: 4px;
      margin-bottom: 2px;
      border-radius: 4px;
      background: #ffa728;
    }
  }
}
.ChuChai:hover {
  transform: scale(1.1);
}
// 异常卡
.YiChang {
  margin: 10px 10px 10px 10px;
  width: 100px;
  height: 28px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  background: rgba(240, 92, 39, 0.2);
  color: rgba(240, 92, 39, 1);
  .YiChangTitle {
  }
  .YiChangDian {
    div {
      width: 4px;
      height: 4px;
      margin-bottom: 2px;
      border-radius: 4px;
      background: rgba(240, 92, 39, 1);
    }
  }
}
.YiChang:hover {
  transform: scale(1.1);
}
// 假期
.JiaQi {
  margin: 10px 10px 10px 10px;
  width: 100px;
  height: 28px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  background: rgba(29, 209, 155, 0.2);
  color: rgba(29, 209, 155, 1);
  .JiaQiTitle {
  }
  .JiaQiDian {
    div {
      width: 4px;
      height: 4px;
      margin-bottom: 2px;
      border-radius: 4px;
      background: rgba(29, 209, 155, 1);
    }
  }
}
.JiaQi:hover {
  transform: scale(1.1);
}
</style>
