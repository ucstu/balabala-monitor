<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <div class="title">
          <i class="fa fa-hourglass-end"></i>
          <span> 页面加载耗时分段</span>
        </div>
        <div class="change">
          <input id="one" type="radio" name="tab" checked />
          <input id="two" type="radio" name="tab" />
          <input id="three" type="radio" name="tab" />
          <input id="four" type="radio" name="tab" />
          <input id="five" type="radio" name="tab" />
          <label for="one" class="one"
            ><span
              ><i class="fa fa-angle-left" @click="getlist(0)">1秒</i></span
            ></label
          >
          <label for="two" class="two" @click="getlist(1)"
            ><span>1-5秒</span></label
          >
          <label for="three" class="three" @click="getlist(2)"
            ><span>5-10秒</span></label
          >
          <label for="four" class="four" @click="getlist(3)"
            ><span>10-30秒</span></label
          >
          <label for="five" class="five" @click="getlist(4)"
            ><span><i class="fa fa-angle-right">30秒</i></span></label
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
        <div ref="time-solt-bar" class="bar1"></div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <div class="time-title">时间范围<span>9:00</span></div>
        <div class="list">
          <ul>
            <li v-for="(value, index) in pageRankRes" :key="index">
              <span>{{ value.pageUrl }}</span
              ><i class="fa fa-chain-broken"></i>{{ value.startTime
              }}<i class="fa fa-angle-right"></i>
            </li>
          </ul>
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
const userMessage = $ref({
  appid: APPID,
  starttime: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
  endtime: dayjs().format("YYYY-MM-DD"),
});
let count = $ref<number>();
let percentage = $ref<string>("00.00");
let Res = $ref<any>();
let date = $ref<string>(dayjs().format("MM-DD"));
let pageRankRes = $ref<any>();
let pagetime_echart: EChartsType;
const pagetimeDom = $ref<HTMLElement>();
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
onMounted(() => {
  pagetime_echart = echarts.init(pagetimeDom);
  getPerformancesBasicindicatorstatistics;
});
getPerformancesBasicindicatorstatistics({
  ...userMessage,
  type: BasicIndicator.mainType.LoadIndicator,
  subType: BasicIndicator.subType.FullLoad,
  granularity: "1d",
}).then((res) => {
  Res = res;
  let arr: any = [];
  let arr2: any = [];
  Res.data[0].forEach((e: any) => {
    arr.push(e.datetime);
  });
  option_page.xAxis.data = arr;
  Res.data[0].forEach((e: any) => {
    arr2.push(e.count);
  });
  option_page.series[0].data = arr2;
  console.log(res);
  pagetime_echart.setOption(option_page);
  Res.data[0].forEach((e: any) => {
    if (e.datetime == date) {
      count = e.count;
    }
  });
  let total = 0;
  for (var i = 0; i <= 4; i++) {
    Res.data[i].forEach((e: any) => {
      if (e.datetime == date) {
        total += e.count;
      }
    });
  }
  percentage = ((count / total) * 100).toFixed(2);
});

// 对数据进行处理
function getlist(index: number) {
  let arr: any = [];
  let arr2: any = [];
  Res.data[index].forEach((e: any) => {
    arr.push(e.datetime);
  });
  option_page.xAxis.data = arr;
  Res.data[index].forEach((e: any) => {
    arr2.push(e.count);
  });
  option_page.series[0].data = arr2;
  pagetime_echart.setOption(option_page);
  Res.data[index].forEach((e: any) => {
    if (e.datetime == date) {
      count = e.count;
    }
  });
  getpercentage();
}
//计算百分比
function getpercentage() {
  let total = 0;
  for (var i = 0; i <= 4; i++) {
    Res.data[i].forEach((e: any) => {
      if (e.datetime == date) {
        total += e.count;
      }
    });
    percentage = ((count / total) * 100).toFixed(2);
  }
}
//柱状图的点击事件
function clickbar() {
  pagetime_echart.on("click", function (params: any) {
    date = params.name;
    count = params.value;
    getpercentage();
  });
}
//获取页面记载排行榜
getPerformancesBasicindicators({
  ...userMessage,
  type: BasicIndicator.mainType.LoadIndicator,
  subType: BasicIndicator.subType.FullLoad,
  size: 10,
}).then((res) => {
  pageRankRes = res.data.items;
  console.log(res.data.items);
});
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
      border-radius: 5%;

      input {
        display: none;
      }

      span {
        padding: 10px 20px;
        font-size: 15px;
        color: rgb(186 186 186);
        cursor: pointer;
        background-color: rgb(231 231 231);
      }

      span:nth-child(1) {
        border-radius: 10% 0 0 10%;
      }

      span:nth-child(5) {
        border-radius: 0 10% 10% 0;
      }

      #one:checked ~ label.one span,
      #two:checked ~ label.two span,
      #three:checked ~ label.three span,
      #four:checked ~ label.four span,
      #five:checked ~ label.five span {
        color: #fff;
        background-color: #ea6947;
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
      width: 415px;
      height: 200px;
      margin-left: 20px;
      background-color: rgb(116 160 160);
    }

    .bar2 {
      width: 1050px;
      height: 100%;
      height: 200px;
      background-color: rgb(116 160 160);
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
    width: 500px;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 41px;
      padding-left: 20px;
      margin-bottom: 10px;
      background-color: rgb(230 230 230);

      .fa {
        margin: 0 10px;
      }
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
        border-radius: 10%;

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
