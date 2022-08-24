<template>
  <div class="main">
    <ToolBar v-model:dateTime="activeDateTime" title="业务数据" />
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
          <div>{{ pvStatistics?.[1].count || 0 }}</div>
          <div>{{ pvStatistics?.[1].userCount || 0 }}</div>
          <div>
            {{
              ((pageDwellStatistics?.[1].average || 0) / 60000).toFixed(2)
            }}Min
          </div>
          <div>
            {{
              ((pageAccessDepthStatistics?.[1].average || 0) * 100).toFixed(2)
            }}%
          </div>
        </div>
        <div class="user-info-list">
          <div>
            较昨日&nbsp;{{
              (
                (((pvStatistics?.[1].count || 0) -
                  (pvStatistics?.[0].count || 0)) /
                  (pvStatistics?.[0].count || pvStatistics?.[1].count || 1)) *
                100
              ).toFixed(2)
            }}%
          </div>
          <div>
            较昨日&nbsp;{{
              (
                (((pvStatistics?.[1].userCount || 0) -
                  (pvStatistics?.[0].userCount || 0)) /
                  (pvStatistics?.[0].userCount ||
                    pvStatistics?.[1].userCount ||
                    1)) *
                100
              ).toFixed(2)
            }}%
          </div>
          <div>
            较昨日&nbsp;{{
              (
                (((pageDwellStatistics?.[1].average || 0) -
                  (pageDwellStatistics?.[0].average || 0)) /
                  (pageDwellStatistics?.[0].average ||
                    pageDwellStatistics?.[1].average ||
                    1)) *
                100
              ).toFixed(2)
            }}%
          </div>
          <div>
            较昨日&nbsp;{{
              (
                (((pageAccessDepthStatistics?.[1].average || 0) -
                  (pageAccessDepthStatistics?.[0].average || 0)) /
                  (pageAccessDepthStatistics?.[0].average ||
                    pageAccessDepthStatistics?.[1].average ||
                    1)) *
                100
              ).toFixed(2)
            }}%
          </div>
        </div>
      </div>
    </div>
    <DataCard
      title="浏览量趋势（24H）"
      style="margin-top: 20px"
      :loading="twoDayPVStatisticsLoading"
    >
      <ECharts
        :option="oneDayPVStatisticsChartOption"
        :autoresize="true"
        class="bar"
      />
    </DataCard>
    <DataCard
      title="访问量趋势（30D）"
      style="margin-top: 20px"
      :loading="thirtyDayPVStatisticsLoading"
    >
      <ECharts
        :option="thirtyDayPVStatisticsChartOption"
        :autoresize="true"
        class="bar"
      />
    </DataCard>
  </div>
</template>

<script setup lang="ts">
import { BasicBehavior } from "@/apis";
import DataCard from "@/components/DataCard.vue";
import ToolBar from "@/components/ToolBar.vue";
import { basicChartOption } from "@/configs";
import { useBasicBehaviorStatistics } from "@/hooks";
import dayjs from "dayjs";
import { EChartsCoreOption } from "echarts";
import "vue-datepicker-next/index.css";
import ECharts from "vue-echarts";

// 当前激活时间
let activeDateTime = $ref(dayjs());

const { basicBehaviorStatistics: pvStatistics } = $(
  useBasicBehaviorStatistics(() => {
    return {
      startTime: activeDateTime.subtract(1, "d"),
      endTime: activeDateTime.add(1, "d"),
      mainType: BasicBehavior.mainType.BasicBehavior,
      subType: BasicBehavior.subType.PV,
      granularity: "1d",
    };
  })
);

const { basicBehaviorStatistics: pageDwellStatistics } = $(
  useBasicBehaviorStatistics(() => {
    return {
      startTime: activeDateTime.subtract(1, "d"),
      endTime: activeDateTime.add(1, "d"),
      mainType: BasicBehavior.mainType.BasicBehavior,
      subType: BasicBehavior.subType.PageDwellTime,
      granularity: "1d",
    };
  })
);

const { basicBehaviorStatistics: pageAccessDepthStatistics } = $(
  useBasicBehaviorStatistics(() => {
    return {
      startTime: activeDateTime.subtract(1, "d"),
      endTime: activeDateTime.add(1, "d"),
      mainType: BasicBehavior.mainType.BasicBehavior,
      subType: BasicBehavior.subType.PageAccessDepth,
      granularity: "1d",
    };
  })
);

const {
  basicBehaviorStatistics: twoDayPVStatistics,
  basicBehaviorStatisticsLoading: twoDayPVStatisticsLoading,
} = $(
  useBasicBehaviorStatistics(() => {
    return {
      startTime: activeDateTime.subtract(1, "d"),
      endTime: activeDateTime.add(1, "d"),
      mainType: BasicBehavior.mainType.BasicBehavior,
      subType: BasicBehavior.subType.PV,
      granularity: "1h",
    };
  })
);

let oneDayPVStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data: twoDayPVStatistics?.length
        ? twoDayPVStatistics
            .slice(0, twoDayPVStatistics.length / 2)
            .map((item) => item.dateTime.format("HH:mm"))
        : [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: activeDateTime.subtract(1, "d").format("YYYY-MM-DD"),
        data: twoDayPVStatistics?.length
          ? twoDayPVStatistics
              .slice(0, twoDayPVStatistics.length / 2)
              .map((item) => item.count)
          : [],
        type: "line",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
      },
      {
        name: activeDateTime.format("YYYY-MM-DD"),
        data: twoDayPVStatistics?.length
          ? twoDayPVStatistics
              .slice(twoDayPVStatistics.length / 2, twoDayPVStatistics.length)
              .map((item) => item.count)
          : [],
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

const {
  basicBehaviorStatistics: thirtyDayPVStatistics,
  basicBehaviorStatisticsLoading: thirtyDayPVStatisticsLoading,
} = $(
  useBasicBehaviorStatistics(() => {
    return {
      startTime: activeDateTime.subtract(29, "d"),
      endTime: activeDateTime.add(1, "d"),
      mainType: BasicBehavior.mainType.BasicBehavior,
      subType: BasicBehavior.subType.PV,
      granularity: "1d",
    };
  })
);

let thirtyDayPVStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data:
        thirtyDayPVStatistics?.map((item) => item.dateTime.format("MM-DD")) ||
        [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "PV",
        data: thirtyDayPVStatistics?.map((item) => item.count) || [],
        type: "line",
        areaStyle: {},
        emphasis: {
          focus: "series",
        },
      },
      {
        name: "UV",
        data: thirtyDayPVStatistics?.map((item) => item.userCount) || [],
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

<style lang="scss" scoped>
.main {
  width: 100%;
  padding: 5px 35px 0 25px;
  background-color: rgb(240 240 240 / 30%);

  .browse-card .browse-head {
    display: flex;
    align-items: center;
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
    width: 100%;
    height: 300px;
  }
}
</style>
