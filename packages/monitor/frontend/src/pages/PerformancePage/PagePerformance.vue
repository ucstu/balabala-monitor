<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <div class="title">
          <i class="fa fa-hourglass-end"></i>
          <span> 页面加载耗时分段</span>
        </div>
        <div class="change">
          <span
            v-for="(value, index) in myarr"
            :key="index"
            :class="timerangeselect == index ? 'select' : null"
            @click="getlist(index), getalldaypagetime(index)"
            >{{ value }}</span
          >
        </div>
        <div class="data">
          <div>
            <span
              ><strong>{{ count }}</strong
              >数量&nbsp;</span
            >
            <span
              ><strong>{{ percentage }}</strong
              >%百分比&nbsp;</span
            >
            <span
              ><strong>{{ date }}</strong
              >日期&nbsp;</span
            >
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          <i class="fa fa-bar-chart">近三十天变化趋势（点击切换其他日期）</i>
        </div>
        <div ref="pagetimeDom" class="bar" @click="clickbar"></div>
      </div>
    </div>
    <div class="center">
      <div class="page-title">
        <span class="page-title-span"
          ><i class="fa fa-bars">页面列表</i>（点击接口查看详情）</span
        >
      </div>
      <div class="bars">
        <div ref="pagealldaytimeDom" class="bar1"></div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <div class="time-title">时间范围<span>9:00</span></div>
        <div class="list">
          <ul>
            <li
              v-for="(value, index) in pageRankRes"
              :key="index"
              :class="selection === index ? 'select' : null"
              @click="getpageurl(value.pageUrl, index)"
            >
              <span>{{ value.pageUrl }}</span
              ><i class="fa fa-chain-broken"></i>{{ value.startTime
              }}<i class="fa fa-angle-right"></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="left">
        <div class="board">
          <div class="board-data">
            <div class="time">
              <span>平均网络耗时</span>
              <span>{{ averagetime + "ms" }}</span>
            </div>
            <div class="icon">
              <i class="fa fa-hourglass-end"></i>
            </div>
          </div>
          <div class="board-data">
            <div class="time">
              <span>影响用户</span>
              <span>{{ usercount }}</span>
            </div>
            <div class="icon">
              <i class="fa fa-male"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getPerformancesBasicindicators,
  getPerformancesBasicindicatorstatistics,
} from "@/apis";
import { BasicIndicator } from "@balabala/monitor-api";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { EChartsType } from "echarts";
import { onMounted } from "vue";
const APPID = "b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5";
const myarr = $ref<Array<string>>([
  "<1秒",
  "1-5秒",
  "5-10秒",
  "10-30秒",
  ">30秒",
]);
const userMessage = $ref({
  appId: APPID,
  startTime: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
  endTime: dayjs().format("YYYY-MM-DD"),
});
let timerangeselect = $ref<number>(0);
let selection = $ref<number>(0);
let count = $ref<number>();
let percentage = $ref<string>("00.00");
let Res = $ref<any>();
let pagealldayRes = $ref<any>();
let date = $ref<string>(dayjs().format("MM-DD"));
let pageRankRes = $ref<any>();
let averagetime = $ref<string>("00.00");
let usercount = $ref<number>(0);
const pagealldaytimeDom = $ref<HTMLElement>();
let pagealldaytime_echart: EChartsType;
const pagetimeDom = $ref<HTMLElement>();
let pagetime_echart: EChartsType;
let option_page = $ref<any>({
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [0],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
  tooltip: {
    // 鼠标悬浮提示框显示 X和Y 轴数据
    trigger: "axis",
    backgroundColor: "rgba(32, 33, 36,.7)",
    borderColor: "rgba(32, 33, 36,0.20)",
    borderWidth: 1,
    textStyle: {
      // 文字提示样式
      color: "#fff",
      fontSize: "12",
    },
    axisPointer: {
      // 坐标轴虚线
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
});
let option_pagealldaytime = $ref<any>({
  xAxis: {
    type: "category",
    data: [],
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      data: [0],
      type: "bar",
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
  tooltip: {
    // 鼠标悬浮提示框显示 X和Y 轴数据
    trigger: "axis",
    backgroundColor: "rgba(32, 33, 36,.7)",
    borderColor: "rgba(32, 33, 36,0.20)",
    borderWidth: 1,
    textStyle: {
      // 文字提示样式
      color: "#fff",
      fontSize: "12",
    },
    axisPointer: {
      // 坐标轴虚线
      type: "cross",
      label: {
        backgroundColor: "#6a7985",
      },
    },
  },
});
onMounted(() => {
  pagetime_echart = echarts.init(pagetimeDom);
  pagealldaytime_echart = echarts.init(pagealldaytimeDom);
  getRank("2022-" + date, timerangeselect);
});
// 获取排行榜
function getRank(date: string, index: number) {
  getPerformancesBasicindicators({
    appId: APPID,
    startTime: date,
    endTime: dayjs(date).add(1, "day").format("YYYY-MM-DD"),
    mainType: BasicIndicator.mainType.LoadIndicator,
    subType: BasicIndicator.subType.FullLoad,
    size: 10,
  }).then((res) => {
    pageRankRes = res.data;
    console.log("排行榜返回值：", res);
    if (res.data.length === 0) {
      averagetime = "暂无数据";
      usercount = 0;
    } else {
      averagetime = res.data[0].average.toFixed(2);
      usercount = res.data[0].count;
      getpagealldaydata(pageRankRes[0].pageUrl, date, index);
    }
  });
}

getPerformancesBasicindicatorstatistics({
  ...userMessage,
  mainType: BasicIndicator.mainType.LoadIndicator,
  subType: BasicIndicator.subType.FullLoad,
  granularity: "1d",
}).then((res) => {
  Res = res;
  console.log("近一个月页面加载数据", res);
  getlist(0);
});

// 对数据进行处理
function getlist(index: number) {
  timerangeselect = index;
  let arr: any = [];
  let arr2: any = [];
  Res.data[index].forEach((e: any) => {
    arr.push(e.dateTime);
  });
  option_page.xAxis.data = arr;
  Res.data[index].forEach((e: any) => {
    arr2.push(e.count);
  });
  option_page.series[0].data = arr2;
  pagetime_echart.setOption(option_page);
  Res.data[index].forEach((e: any) => {
    if (e.dateTime == date) {
      count = e.count;
    }
  });
  getpercentage();
}
// 获取具体一天页面加载数据24小时的列表
function getalldaypagetime(index: number) {
  let arr: any = [];
  let arr2: any = [];
  pagealldayRes.data[index].forEach((e: any) => {
    arr.push(e.dateTime);
  });
  option_pagealldaytime.xAxis.data = arr;
  pagealldayRes.data[index].forEach((e: any) => {
    arr2.push(e.count);
  });
  option_pagealldaytime.series[0].data = arr2;
  pagealldaytime_echart.setOption(option_pagealldaytime);
}
//计算百分比
function getpercentage() {
  let total = 0;
  for (var i = 0; i <= 4; i++) {
    Res.data[i].forEach((e: any) => {
      if (e.dateTime == date) {
        total += e.count;
      }
    });
    if (isNaN(count / total)) {
      percentage = 0 + "";
    } else {
      percentage = ((count / total) * 100).toFixed(2);
    }
  }
}
//柱状图的点击事件
function clickbar() {
  selection = 0;
  pagetime_echart.on("click", function (params: any) {
    date = params.name;
    count = params.value;
    getpercentage();
    getRank("2022-" + date, timerangeselect);
  });
}
//获取页面记载排行榜
// getPerformancesBasicindicators({
//   appId: APPID,
//   startTime: dayjs().subtract(5, "day").format("YYYY-MM-DD"),
//   endTime: dayjs().subtract(4, "day").format("YYYY-MM-DD"),
//   mainType: BasicIndicator.mainType.LoadIndicator,
//   subType: BasicIndicator.subType.FullLoad,
//   size: 10,
// }).then((res) => {
//   pageRankRes = res.data;
//   console.log(pageRankRes)
//   averagetime = res.data[0].average.toFixed(2)
//   usercount = res.data[0].count
//   getpagealldaydata(pageRankRes[0].pageurl,'2022-'+date)
// });
function getpageurl(url: string, index: number) {
  selection = index;
  averagetime = pageRankRes[index].average.toFixed(2);
  usercount = pageRankRes[index].count;
  getpagealldaydata(pageRankRes[index].pageUrl, "2022-" + date, index);
}
function getpagealldaydata(url: string, time: string, index: number) {
  getPerformancesBasicindicatorstatistics({
    appId: APPID,
    startTime: dayjs(time).format("YYYY-MM-DD"),
    endTime: dayjs(time).add(1, "day").format("YYYY-MM-DD"),
    mainType: BasicIndicator.mainType.LoadIndicator,
    subType: BasicIndicator.subType.FullLoad,
    pageUrl: url,
    granularity: "1h",
  }).then((res) => {
    pagealldayRes = res;
    getalldaypagetime(index);
    console.log(time, "一天的数据", res);
  });
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 10px;
  margin-top: 5px;
}

.container .top {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .left {
    width: 415px;
    height: 200px;
    margin-left: 20px;

    .title {
      padding: 20px 0;
    }

    .change {
      border-radius: 5px;

      span {
        padding: 10px 15px;
        font-size: 15px;
        color: rgb(186 186 186);
        cursor: pointer;
        background-color: rgb(231 231 231);
      }

      span.select {
        color: white;
        background-color: rgb(236 105 69);
      }

      span:nth-child(1) {
        border-radius: 5px 0 0 5px;
      }

      span:nth-child(5) {
        border-radius: 0 5px 5px 0;
      }
    }

    .data {
      display: flex;
      justify-content: space-around;
      margin: 40px 0;

      div {
        margin: 0 auto;

        strong {
          font-size: 20px;
        }
      }
    }
  }

  .right {
    width: 1050px;

    .title {
      padding: 20px 0;
    }

    .bar {
      width: 100%;
      height: 200px;
    }
  }
}

.container .center {
  height: 253.4px;

  .page-title {
    display: flex;

    .page-title-span {
      padding: 10px 0;
      margin-left: 20px;
      border-bottom: 5px solid rgb(116 160 160);

      i {
        font-size: 18px;
        color: rgb(116 160 160);
      }
    }
  }

  .bars {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;

    .bar1 {
      width: 850px;
      height: 200px;
      margin-left: 20px;
    }
  }
}

.container .bottom {
  display: flex;
  justify-content: space-between;

  .time-title {
    padding: 20px;
  }

  .list ul {
    width: 400px;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 41px;
      padding-left: 20px;
      margin-bottom: 10px;
      cursor: pointer;
      background-color: rgb(230 230 230);

      .fa {
        margin: 0 10px;
      }
    }

    li.select {
      color: white;
      background-color: rgb(236 105 69);
    }
  }

  .left {
    width: 1050px;

    .board {
      display: flex;
      margin-top: 70px;

      .board-data {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 200px;
        height: 60px;
        padding: 20px 10px;
        margin-left: 10px;
        background-color: aqua;
        border-radius: 10px;

        .time {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 60px;
          font-size: 20px;
          font-weight: 600;
        }

        .icon {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 30px;
        }
      }
    }

    .bar3 {
      width: 100%;
      height: 200px;
      margin-top: 20px;
      background-color: aqua;
    }
  }
}
</style>
