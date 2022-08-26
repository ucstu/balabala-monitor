<template>
  <div class="content">
    <ToolBar v-model:date-time="activeDateTime" title="代码错误概览" />
    <div class="flex-row" style="height: 250px">
      <DataCard
        title="JS错误趋势（24H）"
        :loading="javaScriptErrorStatisticsLoading"
      >
        <ECharts
          :option="javaScriptErrorStatisticsChartOption"
          :autoresize="true"
        />
      </DataCard>
      <DataCard
        title="Promise错误趋势（24H）"
        :loading="promiseErrorStatisticsLoading"
      >
        <ECharts
          :option="promiseErrorStatisticsChartOption"
          :autoresize="true"
        />
      </DataCard>
    </div>
    <div class="flex-row">
      <DataCard
        class="card"
        title="JS错误（TOP10）"
        :loading="javaScriptErrorsLoading"
        :empty="javaScriptErrors?.length ? false : true"
      >
        <BasicTable
          :border="false"
          :titles="['错误消息', '发生次数', '影响用户']"
          :data-list="javaScriptErrorRows"
        />
      </DataCard>
      <DataCard
        class="card"
        title="Promise错误（TOP10）"
        :loading="promiseErrorsLoading"
        :empty="promiseErrors?.length ? false : true"
      >
        <BasicTable
          :border="false"
          :titles="['错误消息', '发生次数', '影响用户']"
          :data-list="promiseErrorRows"
        />
      </DataCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicTable from "@/components/BasicTable.vue";
import DataCard from "@/components/DataCard.vue";
import ToolBar from "@/components/ToolBar.vue";
import { basicChartOption } from "@/configs";
import {
  useJavaScriptErrors,
  useJavaScriptErrorStatistics,
  usePromiseErrors,
  usePromiseErrorStatistics,
} from "@/hooks";
import dayjs from "dayjs";
import type { EChartsCoreOption } from "echarts";
import "vue-datepicker-next/index.css";
import ECharts from "vue-echarts";

let activeDateTime = $ref(dayjs().startOf("day"));

const { javaScriptErrors, javaScriptErrorsLoading } = $(
  useJavaScriptErrors(() => {
    return {
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "d"),
      size: 10,
    };
  })
);

const javaScriptErrorRows = $computed(
  () =>
    javaScriptErrors?.map((item) => [item.msg, item.count, item.userCount]) ||
    []
);

const { promiseErrors, promiseErrorsLoading } = $(
  usePromiseErrors(() => {
    return {
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "d"),
      size: 10,
    };
  })
);

const promiseErrorRows = $computed(
  () =>
    promiseErrors?.map((item) => [item.msg, item.count, item.userCount]) || []
);

const { javaScriptErrorStatistics, javaScriptErrorStatisticsLoading } = $(
  useJavaScriptErrorStatistics(() => {
    return {
      startTime: activeDateTime.startOf("d"),
      endTime: activeDateTime.add(1, "d"),
      granularity: "1h",
    };
  })
);

const javaScriptErrorStatisticsChartOption = $computed<EChartsCoreOption>(
  () => {
    return {
      xAxis: {
        type: "category",
        data:
          javaScriptErrorStatistics?.map((item) =>
            item.dateTime.format("HH:mm")
          ) || [],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: javaScriptErrorStatistics?.map((item) => item.count) || [],
          type: "line",
          areaStyle: {},
          emphasis: {
            focus: "series",
          },
        },
      ],
      ...basicChartOption,
    };
  }
);

const { promiseErrorStatistics, promiseErrorStatisticsLoading } = $(
  usePromiseErrorStatistics(() => {
    return {
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "d"),
      granularity: "1h",
    };
  })
);

const promiseErrorStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data:
        promiseErrorStatistics?.map((item) => item.dateTime.format("HH:mm")) ||
        [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: promiseErrorStatistics?.map((item) => item.count) || [],
        type: "line",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
      },
    ],
    ...basicChartOption,
  };
});
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;

  .card {
    flex: 1;
    height: calc(100% - 20px);
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
