<template>
  <div class="bg">
    <header class="header">
      <div class="title">健康数据</div>
      <div class="calendar">
        <input v-model="date" type="date" />
      </div>
    </header>
    <DataCard
      title="一天的用户访问量趋势"
      icon="fa-dedent"
      line="title"
      style="margin-top: 20px"
      ><div
        style="
          display: flex;
          justify-content: space-between;
          text-align: center;
        "
      >
        <ECharts
          :option="total_options"
          :autoresize="true"
          class="bar1"
        ></ECharts>
        <div style="display: flex; align-items: center; width: 650px">
          <ECharts
            :option="interface_options"
            :autoresize="true"
            class="bar2"
          ></ECharts>
          <ECharts
            :option="resourse_options"
            :autoresize="true"
            class="bar2"
          ></ECharts>
        </div>
      </div>
    </DataCard>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { onMounted, watch } from "vue";
import ECharts from "vue-echarts";
import { EChartsCoreOption } from "echarts";
import DataCard from "@/components/DataCard.vue";
import { useStore } from "@/stores";
import { basicChartOption } from "@/configs";
import {
  getErrorsInterfaceerrorstatistics,
  getErrorsResourceerrorstatistics,
  getPerformancesInterfaceindicatorstatistics,
  getPerformancesResourceindicatorstatistics,
  InterfaceIndicator,
  ResourceIndicator,
} from "@/apis";
const store = useStore();
let date = $ref<string>(dayjs().format("YYYY-MM-DD"));
let interfaceStatistics = $ref<number>(0);
let resourseStatistics = $ref<number>(0);
let interfaceErrorStatistics_code400 = $ref<number>(0);
let interfaceErrorStatistics_code500 = $ref<number>(0);
let resourseErrorStatistics = $ref<number>(0);
let total_options = $computed<EChartsCoreOption>(() => {
  return {
    title: {
      zlevel: 2, // 控制圆环图中间的字的层级
      text:
        (1 -
          (resourseErrorStatistics +
            interfaceErrorStatistics_code400 +
            interfaceErrorStatistics_code500) /
            (interfaceStatistics +
              resourseStatistics +
              resourseErrorStatistics)) *
        100
          ? (
              (1 -
                (resourseErrorStatistics +
                  interfaceErrorStatistics_code400 +
                  interfaceErrorStatistics_code500) /
                  (interfaceStatistics +
                    resourseStatistics +
                    resourseErrorStatistics)) *
              100
            ).toFixed(2) + "%"
          : "暂无数据",
      top: "45%",
      left: "50%",
      textAlign: "center", // 让文字居中
      textStyle: {
        color: "red",
        fontWeight: "bolder",
        fontSize: "30px",
      },
    },
    series: [
      {
        name: "Access From",
        type: "pie",
        radius: ["60%", "80%"],
        label: {
          position: "inside",
        },
        data: [
          {
            value:
              interfaceStatistics +
              resourseStatistics +
              resourseErrorStatistics,
            name: "请求总数",
          },
          {
            value:
              resourseErrorStatistics +
              interfaceErrorStatistics_code400 +
              interfaceErrorStatistics_code500,
            name: "错误总数",
          },
        ],
      },
    ],
    ...basicChartOption,
  };
});
let interface_options = $computed<EChartsCoreOption>(() => {
  return {
    title: {
      zlevel: 2, // 控制圆环图中间的字的层级
      text:
        ((interfaceErrorStatistics_code400 + interfaceErrorStatistics_code500) /
          interfaceStatistics) *
        100
          ? (
              ((interfaceErrorStatistics_code400 +
                interfaceErrorStatistics_code500) /
                interfaceStatistics) *
              100
            ).toFixed(2) + "%"
          : "暂无数据",
      top: "45%",
      left: "50%",
      textAlign: "center", // 让文字居中
      textStyle: {
        color: "red",
        fontWeight: "bolder",
        fontSize: "30px",
      },
    },
    series: [
      {
        name: "interface",
        type: "pie",
        radius: ["60%", "80%"],
        label: {
          position: "inside",
        },
        data: [
          {
            value: interfaceStatistics,
            name: "接口请求",
          },
          {
            value:
              interfaceErrorStatistics_code400 +
              interfaceErrorStatistics_code500,
            name: "接口错误",
          },
        ],
      },
    ],
    ...basicChartOption,
  };
});
let resourse_options = $computed<EChartsCoreOption>(() => {
  return {
    title: {
      zlevel: 2, // 控制圆环图中间的字的层级
      text:
        (resourseErrorStatistics /
          (resourseStatistics + resourseErrorStatistics)) *
        100
          ? (
              (resourseErrorStatistics /
                (resourseStatistics + resourseErrorStatistics)) *
              100
            ).toFixed(2) + "%"
          : "暂无数据",
      top: "45%",
      left: "50%",
      textAlign: "center", // 让文字居中
      textStyle: {
        color: "red",
        fontWeight: "bolder",
        fontSize: "30px",
      },
    },
    series: [
      {
        name: "resourse",
        type: "pie",
        radius: ["60%", "80%"],
        label: {
          position: "inside",
        },
        data: [
          {
            value: resourseStatistics + resourseErrorStatistics,
            name: "资源请求",
          },
          {
            value: resourseErrorStatistics,
            name: "资源错误",
          },
        ],
      },
    ],
    ...basicChartOption,
  };
});
onMounted(() => {
  getalldata(date);
});
watch(
  () => date,
  (newValue) => {
    getalldata(newValue);
  }
);
function getalldata(start: string) {
  getPerformancesInterfaceindicatorstatistics({
    appId: store.appId,
    startTime: start,
    endTime: dayjs(start).add(1, "day").format("YYYY-MM-DD"),
    mainType: InterfaceIndicator.mainType.InterfaceIndicator,
    subType: InterfaceIndicator.subType.InterfaceIndicator,
    granularity: "1d",
  }).then((res) => {
    let total = 0;
    res.data.forEach((e: any) => {
      total += e[0].count;
    });
    interfaceStatistics = total;
    console.log("接口统计", total);
  });
  getErrorsInterfaceerrorstatistics({
    appId: store.appId,
    startTime: start,
    endTime: dayjs(start).add(1, "day").format("YYYY-MM-DD"),
    mainType: InterfaceIndicator.mainType.InterfaceIndicator,
    subType: InterfaceIndicator.subType.InterfaceIndicator,
    granularity: "1d",
    statusCode: 400,
  }).then((res) => {
    interfaceErrorStatistics_code400 = res.data[0].count;
    console.log("code400", res.data[0].count);
  });
  getErrorsInterfaceerrorstatistics({
    appId: store.appId,
    startTime: start,
    endTime: dayjs(start).add(1, "day").format("YYYY-MM-DD"),
    mainType: InterfaceIndicator.mainType.InterfaceIndicator,
    subType: InterfaceIndicator.subType.InterfaceIndicator,
    granularity: "1d",
    statusCode: 500,
  }).then((res) => {
    interfaceErrorStatistics_code500 = res.data[0].count;
    console.log("code500", res.data[0].count);
  });
  getPerformancesResourceindicatorstatistics({
    appId: store.appId,
    startTime: start,
    endTime: dayjs(start).add(1, "day").format("YYYY-MM-DD"),
    mainType: ResourceIndicator.mainType.ResourceIndicator,
    subType: ResourceIndicator.subType.ResourceIndicator,
    granularity: "1d",
  }).then((res) => {
    resourseStatistics = res.data[0].count;
    console.log("资源统计", res.data[0].count);
  });
  getErrorsResourceerrorstatistics({
    appId: store.appId,
    startTime: start,
    endTime: dayjs(start).add(1, "day").format("YYYY-MM-DD"),
    mainType: ResourceIndicator.mainType.ResourceIndicator,
    subType: ResourceIndicator.subType.ResourceIndicator,
    granularity: "1d",
  }).then((res) => {
    resourseErrorStatistics = res.data[0].count;
    console.log("资源错误", res.data[0].count);
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

  .bar1 {
    display: flex;
    width: 300px;
    height: 300px;
    text-align: center;
  }

  .bar2 {
    width: 250px;
    height: 250px;
  }
}
</style>
