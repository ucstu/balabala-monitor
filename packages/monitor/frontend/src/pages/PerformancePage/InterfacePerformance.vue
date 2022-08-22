<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <div class="title">
          <i class="fa fa-hourglass-end"></i>
          <span> 耗时分段</span>
        </div>
        <div class="change">
          <label v-for="i in 5" :key="i">
            <input
              v-model="activeSection"
              :value="i - 1"
              type="radio"
              name="section"
            />
            <span>
              {{ activeSectionMap[i - 1] }}
            </span>
          </label>
        </div>
        <div class="title">
          <i class="fa fa-calendar-o"></i>
          <span> 当日数据</span>
        </div>
        <div class="data">
          <span
            ><strong>{{ sectionTotals[activeSection] || 0 }}</strong
            ><br />数量</span
          >
          <span
            ><strong
              >{{
                (
                  ((sectionTotals[activeSection] || 0) / (sectionTotal || 1)) *
                  100
                ).toFixed(2)
              }}%</strong
            ><br />百分比</span
          >
          <span
            ><strong>{{ wantDateTimeString }}</strong
            ><br />发生日期</span
          >
        </div>
      </div>
      <div class="right">
        <div class="title">
          <i class="fa fa-bar-chart"></i>
          <span> 变化趋势（近30天）</span>
        </div>
        <ECharts
          :option="indicatorStatisticsChartOption"
          :autoresize="true"
          class="bar"
        />
      </div>
    </div>
    <div class="content">
      <div class="title">
        <i class="fa fa-bars"></i>
        <span> 接口列表（近30天）</span>
      </div>
      <div class="main">
        <div class="left">
          <ul>
            <li
              v-for="(interfaceIndicator, index) in indicators"
              :key="index"
              :class="{ active: activeIndicator === index }"
              @click="activeIndicator = index"
            >
              <span>{{ interfaceIndicator.url }}</span>
              <span>
                <i class="fa fa-chain-broken"></i>
                ({{ interfaceIndicator.count }})
                <i class="fa fa-angle-right"></i>
              </span>
            </li>
          </ul>
        </div>
        <div class="right">
          <div class="title">
            <i class="fa fa-flag"></i>
            <span> 常见指标</span>
          </div>
          <div class="board">
            <div class="data">
              <div class="time">
                <span>平均耗时</span>
                <span
                  >{{
                    (
                      (indicators?.[activeIndicator]?.average || 0) / 1000
                    ).toFixed(2)
                  }}s</span
                >
              </div>
              <div class="icon">
                <i class="fa fa-hourglass-end"></i>
              </div>
            </div>
            <div class="data">
              <div class="time">
                <span>影响用户</span>
                <span>{{ indicators?.[activeIndicator]?.userCount || 0 }}</span>
              </div>
              <div class="icon">
                <i class="fa fa-male"></i>
              </div>
            </div>
          </div>
          <div class="title">
            <i class="fa fa-bar-chart"></i>
            <span> 请求趋势</span>
          </div>
          <ECharts
            :option="theIndicatorStatisticsChartOption"
            :autoresize="true"
            class="bar"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getPerformancesInterfaceindicators,
  getPerformancesInterfaceindicatorstatistics,
} from "@/apis";
import { useStore } from "@/stores";
import type { BasicList, BasicStatistic } from "@/types";
import { BasicIndicator } from "@balabala/monitor-api";
import dayjs from "dayjs";
import type { ECBasicOption } from "echarts/types/dist/shared";
import { watchEffect } from "vue";
import ECharts from "vue-echarts";

const store = useStore();

let activeSection = $ref(0);
let activeSectionMap: Record<number, string> = {
  0: "<1秒",
  1: "1-5秒",
  2: "5-10秒",
  3: "10-30秒",
  4: ">30秒",
};
const wantDateTime = $ref(dayjs());
const wantDateTimeString = $computed(() => wantDateTime.format("YYYY-MM-DD"));
const requestParam = $computed(() => {
  return {
    appId: store.appId,
    mainType: BasicIndicator.mainType.InterfaceIndicator,
    subType: BasicIndicator.subType.InterfaceIndicator,
    startTime: wantDateTime.subtract(30, "day").format("YYYY-MM-DD HH:mm:ss"),
    endTime: wantDateTime.format("YYYY-MM-DD HH:mm:ss"),
  };
});
const basicChartOption: ECBasicOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  legend: {},
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
};

let activeIndicator = $ref(0);

let indicatorStatistics = $ref<Array<Array<BasicStatistic>> | undefined>();
const indicatorStatisticsChartOption = $computed<ECBasicOption>(() => {
  return {
    xAxis: {
      type: "category",
      data:
        indicatorStatistics?.[activeSection]?.map((item) => item.dateTime) ||
        [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "数量",
        data:
          indicatorStatistics?.[activeSection]
            ?.map((item) => item.count)
            .filter((item) => item !== 0) || [],
        type: "bar",
      },
    ],
    ...basicChartOption,
  };
});
const sectionTotals = $computed(
  () =>
    indicatorStatistics?.map(
      (section) =>
        section.find(({ dateTime }) =>
          dayjs(dateTime).isSame(wantDateTime, "d")
        )?.count || 0
    ) || []
);
const sectionTotal = $computed(() =>
  sectionTotals.reduce((total, count) => total + count, 0)
);

const getIndicatorStatistics = () => {
  getPerformancesInterfaceindicatorstatistics(requestParam).then(({ data }) => {
    indicatorStatistics = data.map((section) =>
      section.map((item) => ({
        ...item,
        dateTime: dayjs(item.dateTime).format("MM-DD"),
      }))
    );
  });
};
getIndicatorStatistics();

let indicators = $ref<Array<BasicList & { url: string }> | undefined>();

const getIndicators = () => {
  getPerformancesInterfaceindicators(requestParam).then(({ data }) => {
    indicators = data;
  });
};
getIndicators();

let theIndicatorStatistics = $ref<Array<Array<BasicStatistic>> | undefined>();
const theIndicatorStatisticsChartOption = $computed<ECBasicOption>(() => {
  return {
    xAxis: {
      type: "category",
      data:
        theIndicatorStatistics?.[activeSection]?.map((item) => item.dateTime) ||
        [],
    },
    yAxis: {
      type: "value",
    },
    series:
      theIndicatorStatistics?.map((section, index) => ({
        name: activeSectionMap[index],
        data: section.map((item) => item.count).filter((item) => item !== 0),
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
      })) || [],
    ...basicChartOption,
  };
});

watchEffect(() => {
  if (indicators?.[activeIndicator]) {
    getPerformancesInterfaceindicatorstatistics({
      ...requestParam,
      url: indicators[activeIndicator].url,
    }).then(({ data }) => {
      theIndicatorStatistics = data.map((section) =>
        section.map((item) => ({
          ...item,
          dateTime: dayjs(item.dateTime).format("MM-DD"),
        }))
      );
    });
  }
});
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;

  .title {
    padding-bottom: 10px;
    margin-bottom: 20px;
    border-bottom: 3px solid #ea6947;
  }

  .top {
    display: flex;
    height: 250px;

    .left {
      display: flex;
      flex: 3;
      flex-direction: column;
      padding: 10px;

      .change {
        display: flex;
        margin-bottom: 10px;
        overflow: hidden;
        border-radius: 10px;

        label {
          flex: 1;
          line-height: 40px;
          border-right: 1px solid #bababa;

          &:hover {
            cursor: pointer;
            background-color: #bababa;
          }

          &:last-child {
            border-right: none;
          }

          span {
            display: inline-block;
            width: 100%;
            height: 100%;
            font-size: 15px;
            color: #bababa;
            text-align: center;
            background-color: #e7e7e7;
          }

          input {
            display: none;

            &:checked ~ span {
              color: #fff;
              background-color: #ea6947;
            }
          }
        }
      }

      .data {
        display: flex;
        flex: 1;
        align-items: center;
        justify-content: space-around;

        // stylelint-disable-next-line all
        span {
          text-align: center;

          strong {
            font-size: 20px;
          }
        }
      }
    }

    .right {
      display: flex;
      flex: 7;
      flex-direction: column;
      padding: 10px;
      margin-left: 20px;

      .bar {
        flex: 1;
        width: 100%;
      }
    }
  }

  .content {
    padding: 10px;

    .main {
      display: flex;

      .left {
        flex: 3;
        margin-right: 40px;

        ul {
          width: 100%;
          padding: 0;
          margin: 0;
          list-style: none;

          li {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 40px;
            padding-left: 10px;
            margin-bottom: 10px;
            background-color: #e7e7e7;
            border-radius: 7px;

            &:hover {
              cursor: pointer;
              background-color: #bababa;
            }

            &.active {
              background-color: #ea6947;
            }

            // stylelint-disable-next-line all
            span {
              &:first-child {
                flex: 1 1 auto;
                overflow: hidden;
                text-overflow: ellipsis;
              }

              &:last-child {
                flex: 1 0 120px;
                text-align: right;
              }
            }

            .fa {
              margin: 0 10px;
            }
          }
        }
      }

      .right {
        display: flex;
        flex: 7;
        flex-direction: column;

        .board {
          display: flex;
          flex-wrap: wrap;
          margin-bottom: 20px;

          .data {
            display: flex;
            flex: 0 1 200px;
            align-items: center;
            justify-content: space-between;
            height: 60px;
            padding: 20px;
            margin-right: 10px;
            background-color: #ea6947;
            border-radius: 10px;

            &:last-child {
              margin-right: 0;
            }

            .time {
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              height: 100%;
              font-size: 20px;
            }

            .icon i {
              font-size: 30px;
            }
          }
        }

        .bar {
          width: 100%;
          height: 300px;
        }
      }
    }
  }
}
</style>
