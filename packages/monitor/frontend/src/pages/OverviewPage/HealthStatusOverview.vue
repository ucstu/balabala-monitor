<template>
  <div class="main">
    <ToolBar v-model:dateTime="activeDateTime" title="业务数据" />
    <DataCard title="一天的用户访问量趋势">
      <div
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
            :option="interfaceErrorStatisticsChartOption"
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
    <DataCard
      title="一天的JS错误趋势"
      style="margin-top: 20px"
      :loading="!JSerroralldaydataisshow"
    >
      <ECharts
        :option="JSerroralldaydata_options"
        :autoresize="true"
        class="bar3"
      />
    </DataCard>
  </div>
</template>

<script setup lang="ts">
import {
  getErrorsInterfaceerrorstatistics,
  getErrorsJavascripterrorstatistics,
  getErrorsResourceerrorstatistics,
  getPerformancesInterfaceindicatorstatistics,
  getPerformancesResourceindicatorstatistics,
  InterfaceIndicator,
  JavaScriptError,
  ResourceIndicator,
} from "@/apis";
import DataCard from "@/components/DataCard.vue";
import ToolBar from "@/components/ToolBar.vue";
import { basicChartOption } from "@/configs";
import { useInterfaceErrorStatistics } from "@/hooks";
import { useStore } from "@/stores";
import dayjs from "dayjs";
import { EChartsCoreOption } from "echarts";
import { onMounted, watch } from "vue";
import "vue-datepicker-next/index.css";
import ECharts from "vue-echarts";

const store = useStore();

let activeDateTime = $ref(dayjs());

const { interfaceErrorStatistics, interfaceErrorStatisticsLoading } = $(
  useInterfaceErrorStatistics(() => {
    return {
      startTime: activeDateTime.subtract(1, "d"),
      endTime: activeDateTime.add(1, "d"),
    };
  })
);

let interfaceErrorStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    series: [
      {
        type: "pie", //pie类型的图实现环形图
        radius: ["60%", "90%"], //数组的话，表示内圆和外圆的半径大小，相对于宽高中较小的那一个。
        center: ["50%", "50%"], //圆心坐标
        label: {
          //每个数据的标签
          show: true, //设置为true则显示第一个数据
          position: "center", //位置居中
          formatter: "{d}%", //{d}表示数据在总数据中的百分比
          fontSize: 20,
          fontWeight: "bold",
        },
        color: ["#695BF9", "#1E3E55"], //系列的颜色
        emphasis: {
          //高亮，即鼠标经过时的样式
          scale: false, //表示不放大item
        },
        labelLine: {
          show: true,
        },
        data: [
          {
            value: 80,
            name: "正确请求",
          },
          {
            value: 20,
            name: "错误请求",
            emphasis: {
              label: {
                show: false, //这个数据高亮时不显示label，就不会显示替遮住第一个数据的label值了
              },
            },
          },
        ],
      },
    ],
  };
});

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
        avoidLabelOverlap: false,
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
        avoidLabelOverlap: false,
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
let JSerroralldaydata0 = $ref<Array<number>>([]);
let JSerroralldaydatax = $ref<Array<string>>([]);
let JSerroralldaydataisshow = $ref<boolean>(false);
let JSerroralldaydata_options = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data: JSerroralldaydatax,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "JSerror",
        data: JSerroralldaydata0,
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
  });
  getErrorsJavascripterrorstatistics({
    appId: store.appId,
    startTime: start,
    endTime: dayjs(start).add(1, "day").format("YYYY-MM-DD"),
    mainType: JavaScriptError.mainType.JavaScriptError,
    subType: JavaScriptError.subType.JavaScriptError,
    granularity: "1h",
  }).then((res) => {
    JSerroralldaydataisshow = true;
    JSerroralldaydata0 = [];
    JSerroralldaydatax = [];
    res.data.forEach((e: any) => {
      JSerroralldaydata0.push(e.count);
      JSerroralldaydatax.push(dayjs(e.dataTime).format("HH:mm"));
    });
  });
}
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  padding: 5px 35px 0 25px;
  background-color: rgb(240 240 240 / 30%);

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .title {
      display: flex;
      align-items: center;
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
    height: 350px;
    text-align: center;
  }

  .bar2 {
    width: 250px;
    height: 300px;
  }

  .bar3 {
    width: auto;
    height: 300px;
  }
}
</style>
