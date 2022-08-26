<template>
  <div class="content">
    <ToolBar v-model:date-time="activeDateTime" title="接口错误概览" />
    <div class="flex-row" style="height: 500px">
      <DataCard
        class="card"
        title="接口错误趋势（24H）"
        :loading="interfaceErrorStatisticsLoading"
      >
        <ECharts
          :option="interfaceErrorStatisticsChartOption"
          :autoresize="true"
        />
      </DataCard>
      <DataCard
        class="card"
        title="接口错误（TOP10）"
        :loading="interfaceErrorsLoading"
        :empty="interfaceErrors?.length ? false : true"
      >
        <BasicTable
          :titles="['错误消息', '发生次数', '影响用户']"
          :data-list="interfaceErrorRaws"
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
import { useInterfaceErrors, useInterfaceErrorStatistics } from "@/hooks";
import dayjs from "dayjs";
import type { EChartsCoreOption } from "echarts";
import "vue-datepicker-next/index.css";
import ECharts from "vue-echarts";

let activeDateTime = $ref(dayjs().startOf("day"));

const { interfaceErrors, interfaceErrorsLoading } = $(
  useInterfaceErrors(() => {
    return {
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "d"),
      size: 10,
    };
  })
);

const interfaceErrorRaws = $computed(
  () =>
    interfaceErrors?.map((item) => [item.url, item.count, item.userCount]) || []
);

const { interfaceErrorStatistics, interfaceErrorStatisticsLoading } = $(
  useInterfaceErrorStatistics(() => {
    return {
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "d"),
      granularity: "1h",
    };
  })
);

const interfaceErrorStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data:
        interfaceErrorStatistics?.map((item) =>
          item.dateTime.format("HH:mm")
        ) || [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: interfaceErrorStatistics?.map((item) => item.count) || [],
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
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
