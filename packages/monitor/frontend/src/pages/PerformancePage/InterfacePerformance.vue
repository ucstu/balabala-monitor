<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <DataCard icon="fa-hourglass-end" title="耗时分段">
          <div class="change">
            <label v-for="i in 5" :key="i">
              <input
                v-model="activeSection"
                :value="i - 1"
                type="radio"
                name="section"
              />
              <span class="name">
                {{ sectionNameMap[i - 1] }}
              </span>
            </label>
          </div>
        </DataCard>
        <DataCard
          icon="fa-calendar-o"
          title="当日数据"
          :loading="indicatorStatisticsLoading"
        >
          <div class="data">
            <span
              ><strong>{{ sectionTotals[activeSection] || 0 }}</strong
              ><br />数量</span
            >
            <span
              ><strong
                >{{
                  (
                    ((sectionTotals[activeSection] || 0) /
                      (sectionTotal || 1)) *
                    100
                  ).toFixed(2)
                }}%</strong
              ><br />百分比</span
            >
            <span
              ><strong>{{ nowDateTimeString }}</strong
              ><br />发生日期</span
            >
          </div>
        </DataCard>
      </div>
      <div class="right">
        <DataCard
          icon="fa-bar-chart"
          title="变化趋势（近30天，点击可查看详情）"
          :loading="indicatorStatisticsLoading"
        >
          <ECharts
            :option="indicatorStatisticsChartOption"
            :autoresize="true"
            class="bar"
            @click="indicatorStatisticsChartClick"
          />
        </DataCard>
      </div>
    </div>
    <div class="bottom">
      <DataCard
        icon="fa-bars"
        :title="`接口列表（${activeDateTime.format('YYYY-MM-DD')}）`"
        :loading="pageIndicatorsLoading"
        :empty="pageIndicators?.length ? false : true"
      >
        <div class="main">
          <ul class="left">
            <li
              v-for="(interfaceIndicator, index) in pageIndicators"
              :key="index"
              :class="{ active: activeInterface === index }"
              @click="activeInterface = index"
            >
              <span>{{ interfaceIndicator.url }}</span>
              <span>
                <i class="fa fa-chain-broken"></i>
                ({{ interfaceIndicator.count }})
                <i class="fa fa-angle-right"></i>
              </span>
            </li>
          </ul>
          <div class="right">
            <DataCard icon="fa-flag" title="常见指标">
              <div class="board">
                <div class="data">
                  <div class="time">
                    <span>平均耗时</span>
                    <span
                      >{{
                        (
                          (pageIndicators?.[activeInterface]?.average || 0) /
                          1000
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
                    <span>{{
                      pageIndicators?.[activeInterface]?.userCount || 0
                    }}</span>
                  </div>
                  <div class="icon">
                    <i class="fa fa-male"></i>
                  </div>
                </div>
              </div>
            </DataCard>
            <DataCard
              icon="fa-bar-chart"
              title="请求趋势"
              :loading="theIndicatorStatisticsLoading"
            >
              <ECharts
                v-if="theIndicatorStatistics?.length"
                :option="theIndicatorStatisticsChartOption"
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
        </div>
      </DataCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getPerformancesInterfaceindicators,
  getPerformancesInterfaceindicatorstatistics,
} from "@/apis";
import DataCard from "@/components/DataCard.vue";
import { basicChartOption } from "@/configs";
import { useStore } from "@/stores";
import type { BasicList, BasicStatistic } from "@/types";
import { BasicIndicator } from "@balabala/monitor-api";
import dayjs, { Dayjs } from "dayjs";
import { EChartsCoreOption } from "echarts";
import { watch } from "vue";
import ECharts from "vue-echarts";

const store = useStore();

// 激活耗时分段索引
let activeSection = $ref(0);
// 激活统计日期
let activeDateTime = $ref(dayjs().startOf("d"));
// 激活接口索引
let activeInterface = $ref(0);
// 耗时分段名称映射
let sectionNameMap: Record<number, string> = {
  0: "<1秒",
  1: "1-5秒",
  2: "5-10秒",
  3: "10-30秒",
  4: ">30秒",
};
// 当前时间dayjs对象
const nowDateTime = activeDateTime;
// 当前时间字符串
const nowDateTimeString = nowDateTime.format("YYYY-MM-DD");
// 接口指标分段统计列表基础请求参数
const basicRequestParam = {
  appId: store.appId,
  mainType: BasicIndicator.mainType.InterfaceIndicator,
  subType: BasicIndicator.subType.InterfaceIndicator,
};

// 接口指标分段统计列表
let indicatorStatistics = $ref<Array<Array<BasicStatistic>> | undefined>();
// 接口指标分段统计列表加载状态
let indicatorStatisticsLoading = $ref(false);
// 接口指标分段统计图标配置项
const indicatorStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data:
        indicatorStatistics?.[activeSection]?.map((item) =>
          dayjs(item.dateTime).format("MM-DD")
        ) || [],
    },
    yAxis: {
      type: "value",
    },
    series:
      indicatorStatistics?.map((section, index) => ({
        name: sectionNameMap[index],
        data: section.map((item) => item.count),
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
// 接口指标分段统计总数列表
const sectionTotals = $computed(
  () =>
    indicatorStatistics?.map(
      (section) =>
        section.find(({ dateTime }) => dayjs(dateTime).isSame(nowDateTime, "d"))
          ?.count || 0
    ) || []
);
// 接口指标分段统计总数
const sectionTotal = $computed(() =>
  sectionTotals.reduce((total, count) => total + count, 0)
);

// 接口指标分段统计图标点击事件
const indicatorStatisticsChartClick = (e: any) => {
  activeDateTime = dayjs(`${nowDateTime.year()}-${e.name}`);
};

// 获取接口指标分段统计列表
const getIndicatorStatistics = (startTime: Dayjs, endTime?: Dayjs) => {
  indicatorStatisticsLoading = true;
  getPerformancesInterfaceindicatorstatistics({
    ...basicRequestParam,
    startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
    endTime:
      endTime?.format("YYYY-MM-DD HH:mm:ss") ||
      nowDateTime.format("YYYY-MM-DD HH:mm:ss"),
  }).then(({ data }) => {
    indicatorStatistics = data;
    indicatorStatisticsLoading = false;
  });
};
// 获取近30天的接口指标分段统计列表
getIndicatorStatistics(
  nowDateTime.subtract(29, "day").startOf("d"),
  nowDateTime.add(1, "d").startOf("d")
);

// 接口指标列表
let pageIndicators = $ref<Array<BasicList & { url: string }> | undefined>();
// 接口指标列表加载状态
let pageIndicatorsLoading = $ref(false);
// 获取接口指标列表
const getPageIndicators = (startTime: Dayjs, endTime?: Dayjs) => {
  pageIndicatorsLoading = true;
  getPerformancesInterfaceindicators({
    ...basicRequestParam,
    startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
    endTime:
      endTime?.format("YYYY-MM-DD HH:mm:ss") ||
      nowDateTime.format("YYYY-MM-DD HH:mm:ss"),
  }).then(({ data }) => {
    pageIndicators = data;
    pageIndicatorsLoading = false;
  });
};

// 监听激活时间变化
watch(
  () => activeDateTime,
  (activeDateTime) => {
    // 获取激活时间当天的接口指标列表
    getPageIndicators(
      activeDateTime.startOf("d"),
      activeDateTime.add(1, "d").startOf("d")
    );
  },
  {
    immediate: true,
  }
);

// 某天接口指标分段统计列表
let theIndicatorStatistics = $ref<Array<Array<BasicStatistic>> | undefined>();
// 某天接口指标分段统计列表加载状态
let theIndicatorStatisticsLoading = $ref(false);
// 某天接口指标分段统计图标配置项
const theIndicatorStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data:
        theIndicatorStatistics?.[activeSection]?.map((item) =>
          dayjs(item.dateTime).format("HH:mm")
        ) || [],
    },
    yAxis: {
      type: "value",
    },
    series:
      theIndicatorStatistics?.map((section, index) => ({
        name: sectionNameMap[index],
        data: section.map((item) => item.count),
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

// 获取某天接口指标分段统计列表
const getTheIndicatorStatistics = (startTime: Dayjs, endTime?: Dayjs) => {
  theIndicatorStatisticsLoading = true;
  getPerformancesInterfaceindicatorstatistics({
    ...basicRequestParam,
    startTime: startTime.format("YYYY-MM-DD HH:mm:ss"),
    endTime:
      endTime?.format("YYYY-MM-DD HH:mm:ss") ||
      nowDateTime.format("YYYY-MM-DD HH:mm:ss"),
    pageUrl: pageIndicators?.[activeInterface].url,
    granularity: "1h",
  }).then(({ data }) => {
    theIndicatorStatistics = data;
    theIndicatorStatisticsLoading = false;
  });
};

// 监听接口指标列表和激活接口索引
watch([() => pageIndicators, () => activeInterface], () => {
  // 自动获取某天接口指标分段统计列表
  if (activeInterface >= (pageIndicators?.length || 0)) {
    activeInterface = 0;
  }
  if (pageIndicators?.[activeInterface]) {
    getTheIndicatorStatistics(
      activeDateTime.startOf("d"),
      activeDateTime.add(1, "d").startOf("d")
    );
  }
});
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;

  .top {
    display: flex;

    .left {
      display: flex;
      flex: 3;
      flex-direction: column;

      .change {
        display: flex;
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

          .name {
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

            &:checked ~ .name {
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
        height: 95px;

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
      margin-left: 20px;

      .bar {
        width: 100%;
        height: 200px;
      }
    }
  }

  .bottom {
    .main {
      display: flex;

      .left {
        flex: 3;
        padding: 0;
        margin-right: 10px;
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

          & > span {
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

      .right {
        display: flex;
        flex: 7;
        flex-direction: column;

        .board {
          display: flex;
          flex-wrap: wrap;

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
