<template>
  <div class="bg">
    <header class="header">
      <div class="title">核心数据</div>
      <div class="calendar">
        <DatePicker
          v-model:value="date"
          format="YYYY-MM-DD"
          style="width: 150px"
          value-type="format"
          :editable="false"
          :clearable="false"
        />
      </div>
    </header>
    <div class="browse-card">
      <div class="browse-head">
        <div>
          <span>流量数据</span>
        </div>
      </div>
      <div class="browse-body">
        <div class="user-info-list">
          <div>浏览量&nbsp;(PV)</div>
          <div>访客量&nbsp;(UV)</div>
          <div>用户页面平均停留时间</div>
          <div>用户页面平均访问深度</div>
        </div>
        <div class="user-info-list weight">
          <div>{{ PV }}</div>
          <div>{{ UV }}</div>
          <div>{{ PageDwell }}min</div>
          <div>{{ PageAccessDepth }}%</div>
        </div>
        <div class="user-info-list">
          <div>较昨日&nbsp;{{ PVcomparedpercentage }}%</div>
          <div>较昨日&nbsp;{{ UVcomparedpercentage }}%</div>
          <div>较昨日&nbsp;{{ PageDwellcomparedpercentage }}%</div>
          <div>较昨日&nbsp;{{ PageAccessDepthcomparedpercentage }}%</div>
        </div>
      </div>
    </div>
    <DataCard
      title="一天的用户访问量趋势"
      icon="fa-dedent"
      line="title"
      style="margin-top: 20px"
    >
      <ECharts
        v-if="PValldaydataisshow"
        :option="PValldaydata_options"
        :autoresize="true"
        class="bar"
      />
      <div
        v-else
        class="bar"
        style="height: 75px; margin-top: 30px; text-align: center"
      >
        暂无数据
      </div>
    </DataCard>
    <DataCard
      title="近30天用户访问量"
      icon="fa-dedent"
      line="title"
      style="margin-top: 20px"
    >
      <ECharts
        v-if="PVdataisshow"
        :option="PVdata_options"
        :autoresize="true"
        class="bar"
      />
      <div
        v-else
        class="bar"
        style="height: 75px; margin-top: 30px; text-align: center"
      >
        暂无数据
      </div>
    </DataCard>
  </div>
</template>

<script setup lang="ts">
import { BasicBehavior, getBehaviorsBasicbehaviorstatistics } from "@/apis";
import DataCard from "@/components/DataCard.vue";
import { basicChartOption } from "@/configs";
import { useStore } from "@/stores";
import dayjs from "dayjs";
import { EChartsCoreOption } from "echarts";
import { onMounted, watch } from "vue";
import ECharts from "vue-echarts";
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";
const store = useStore();
// PV数据
let PV = $ref<number>(0);
// UV数据
let UV = $ref<number>(0);
let PageDwell = $ref<number>(0);
let PageAccessDepth = $ref<number>(0);
// 各数据百分比
let PVcomparedpercentage = $ref<string>("00.00");
let UVcomparedpercentage = $ref<string>("00.00");
let PageDwellcomparedpercentage = $ref<string>("00.00");
let PageAccessDepthcomparedpercentage = $ref<string>("00.00");
// 判断一个月内的PVdata数据是否显示
let PVdataisshow = $ref<boolean>(false);
let PValldaydataisshow = $ref<boolean>(false);
// PVdata的echarts数据
let PVdata0 = $ref<Array<number>>([]);
let PVdata1 = $ref<Array<number>>([]);
let PVdatax = $ref<Array<string>>([]);
let PVdata_options = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data: PVdatax,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "PV",
        data: PVdata0,
        type: "bar",
        stack: 1,
        label: {
          show: true,
        },
      },
      {
        name: "UV",
        data: PVdata1,
        type: "bar",
        stack: 1,
        label: {
          show: true,
        },
      },
    ],
    ...basicChartOption,
  };
});
let PValldaydata0 = $ref<Array<number>>([]);
let PValldaydatax = $ref<Array<string>>([]);
let PValldaydata_options = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data: PValldaydatax,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "PV",
        data: PValldaydata0,
        type: "line",
        stack: 1,
        label: {
          show: true,
        },
      },
    ],
    ...basicChartOption,
  };
});

// 当日时间
let date = $ref<string>(dayjs().format("YYYY-MM-DD"));
onMounted(() => {
  getPVdata(
    dayjs(date).subtract(1, "day").format("YYYY-MM-DD"),
    dayjs(date).add(1, "day").format("YYYY-MM-DD")
  );
});
watch(
  () => date,
  (newValue) => {
    getPVdata(
      dayjs(newValue).subtract(1, "day").format("YYYY-MM-DD"),
      dayjs(newValue).add(1, "day").format("YYYY-MM-DD")
    );
  }
);
function getPVdata(start: string, end: string) {
  getBehaviorsBasicbehaviorstatistics({
    appId: store.appId,
    startTime: start,
    endTime: end,
    mainType: BasicBehavior.mainType.BasicBehavior,
    subType: BasicBehavior.subType.PV,
    granularity: "1d",
  }).then((res) => {
    let arr = [];
    arr = res.data;
    PV = arr[1].count;
    UV = arr[1].userCount;
    if (PV == 0 && arr[0].count == 0) {
      PVcomparedpercentage = "00.00";
    } else {
      PVcomparedpercentage =
        arr[0].count == 0
          ? "+100"
          : (((PV - arr[0].count) / arr[0].count) * 100).toFixed(2);
    }
    if (UV == 0 && arr[0].userCount == 0) {
      UVcomparedpercentage = "00.00";
    } else {
      UVcomparedpercentage =
        arr[0].userCount == 0
          ? "+100"
          : (((UV - arr[0].userCount) / arr[0].userCount) * 100).toFixed(2);
    }
  });

  getBehaviorsBasicbehaviorstatistics({
    appId: store.appId,
    startTime: start,
    endTime: end,
    mainType: BasicBehavior.mainType.BasicBehavior,
    subType: BasicBehavior.subType.PageDwellTime,
    granularity: "1d",
  }).then((res) => {
    let arr = [];
    arr = res.data;
    PageDwell = Number((arr[1].average / 60000).toFixed(2));
    if (PageDwell == 0 && arr[0].average == 0) {
      PageDwellcomparedpercentage = "00.00";
    } else {
      PageDwellcomparedpercentage =
        arr[0].average == 0
          ? "+100"
          : (
              ((arr[1].average - arr[0].average) / arr[0].average) *
              100
            ).toFixed(2);
    }
  });
  getBehaviorsBasicbehaviorstatistics({
    appId: store.appId,
    startTime: start,
    endTime: end,
    mainType: BasicBehavior.mainType.BasicBehavior,
    subType: BasicBehavior.subType.PageAccessDepth,
    granularity: "1d",
  }).then((res) => {
    let arr = [];
    arr = res.data;
    PageAccessDepth = Number((res.data[1].average * 100).toFixed(2));
    if (PageAccessDepth == 0 && arr[0].average == 0) {
      PageAccessDepthcomparedpercentage = "00.00";
    } else {
      PageAccessDepthcomparedpercentage =
        arr[0].average == 0
          ? "+100"
          : (
              ((arr[1].average - arr[0].average) / arr[0].average) *
              100
            ).toFixed(2);
    }
  });
  getBehaviorsBasicbehaviorstatistics({
    appId: store.appId,
    startTime: dayjs(start).subtract(29, "day").format("YYYY-MM-DD"),
    endTime: dayjs(start).add(1, "day").format("YYYY-MM-DD"),
    mainType: BasicBehavior.mainType.BasicBehavior,
    subType: BasicBehavior.subType.PV,
    granularity: "1d",
  }).then((res) => {
    PVdata0 = [];
    PVdata1 = [];
    PVdatax = [];
    res.data.forEach((e: any) => {
      PVdata0.push(e.count);
      PVdata1.push(e.userCount);
      PVdatax.push(dayjs(e.dateTime).format("MM-DD"));
    });
    PVdataisshow = true;
  });
  getBehaviorsBasicbehaviorstatistics({
    appId: store.appId,
    startTime: dayjs(start).add(1, "day").format("YYYY-MM-DD"),
    endTime: end,
    mainType: BasicBehavior.mainType.BasicBehavior,
    subType: BasicBehavior.subType.PV,
    granularity: "1h",
  }).then((res) => {
    PValldaydata0 = [];
    PValldaydatax = [];
    res.data.forEach((e: any) => {
      PValldaydata0.push(e.count);
      PValldaydatax.push(dayjs(e.dateTime).format("HH:mm"));
    });
    PValldaydataisshow = true;
  });
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  padding: 25px 35px 0 25px;
  background-color: rgb(240 240 240 / 30%);

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .title {
      font-size: 18px;
      font-weight: 600;
    }

    .calendar {
      padding: 5px 0;
    }

    .calendar input {
      width: 130px;
      height: 26px;
      border: none;
      outline: none;
    }
  }

  .form {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;

    div {
      width: 30%;
      height: 300px;
      background-color: white;
    }
  }

  .browse-card .browse-head {
    display: flex;
    align-items: center;
    width: 1247.74px;
    height: 60px;
    padding-left: 20px;
    margin-bottom: 3px;
    background-color: white;
    border-radius: 5px 5px 0 0;
  }

  .browse-card .browse-body {
    width: 100%;
    background-color: white;
    border-radius: 0 0 5px 5px;

    .user-info-list {
      display: flex;
      justify-content: space-around;
      padding: 5px 0;
      font-size: 15px;
      text-align: center;

      div {
        width: 20%;
      }
    }

    .weight {
      font-size: 30px;
      font-weight: 700;
    }
  }

  .bar {
    width: auto;
    height: 300px;
  }
}
</style>
