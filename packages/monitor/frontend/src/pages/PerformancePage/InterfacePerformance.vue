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
        :loading="interfaceIndicatorsLoading"
        :empty="interfaceIndicators?.length ? false : true"
      >
        <div class="main">
          <ul class="left">
            <li
              v-for="(interfaceIndicator, index) in interfaceIndicators"
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
            <div class="flex-row">
              <DataCard icon="fa-flag" title="常见指标">
                <div class="board">
                  <div class="data">
                    <div class="time">
                      <span>平均耗时</span>
                      <span
                        >{{
                          (
                            (interfaceIndicators?.[activeInterface]?.average ||
                              0) / 1000
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
                        interfaceIndicators?.[activeInterface]?.userCount || 0
                      }}</span>
                    </div>
                    <div class="icon">
                      <i class="fa fa-male"></i>
                    </div>
                  </div>
                </div>
              </DataCard>
              <DataCard title="用户列表（点击查看详情）">
                <div class="user-list">
                  <div
                    v-for="userID in activeUserList"
                    :key="userID"
                    class="user-name"
                    @click="
                      router.push(
                        `/Behavior/BehaviorDetail?userId=${userID}&dateTime=${activeDateTime.format(
                          'YYYY-MM-DD'
                        )}`
                      )
                    "
                  >
                    {{ userID }}
                  </div>
                </div>
              </DataCard>
            </div>
            <DataCard
              icon="fa-bar-chart"
              title="请求趋势"
              :loading="theIndicatorStatisticsLoading"
              :empty="theIndicatorStatistics?.length ? false : true"
            >
              <ECharts
                :option="theIndicatorStatisticsChartOption"
                :autoresize="true"
                class="bar"
              />
            </DataCard>
          </div>
        </div>
      </DataCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import DataCard from "@/components/DataCard.vue";
import { basicChartOption } from "@/configs";
import {
  useInterfaceIndicators,
  useInterfaceIndicatorStatistics,
} from "@/hooks";
import dayjs from "dayjs";
import type { EChartsCoreOption } from "echarts";
import { watch } from "vue";
import ECharts from "vue-echarts";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// 激活耗时分段索引
let activeSection = $ref(0);
// 激活统计日期
let activeDateTime = $ref(dayjs(route.query.dateTime as string).startOf("d"));
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

const {
  interfaceIndicatorStatistics: indicatorStatistics,
  interfaceIndicatorStatisticsLoading: indicatorStatisticsLoading,
} = $(
  useInterfaceIndicatorStatistics({
    startTime: nowDateTime.subtract(29, "d"),
    endTime: nowDateTime.add(1, "d"),
  })
);
// 接口指标分段统计图标配置项
const indicatorStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data:
        indicatorStatistics?.[activeSection]?.map((item) =>
          item.dateTime.format("MM-DD")
        ) || [],
    },
    yAxis: {
      type: "value",
    },
    series:
      indicatorStatistics?.map((section, index) => ({
        name: sectionNameMap[index],
        data: section.map((item) => item.count),
        type: "line",
        stack: "total",
        areaStyle: {},
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
        section.find(({ dateTime }) => dateTime.isSame(nowDateTime, "d"))
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

const { interfaceIndicators, interfaceIndicatorsLoading } = $(
  useInterfaceIndicators(() => {
    return {
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "d"),
    };
  })
);

const {
  interfaceIndicatorStatistics: theIndicatorStatistics,
  interfaceIndicatorStatisticsLoading: theIndicatorStatisticsLoading,
} = $(
  useInterfaceIndicatorStatistics(() => {
    return {
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "d"),
      granularity: "1h",
      url: interfaceIndicators?.[activeInterface]?.url,
      _skip: !interfaceIndicators?.[activeInterface]?.url,
      _lazy: true,
    };
  })
);

const theIndicatorStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data:
        theIndicatorStatistics?.[activeSection]?.map((item) =>
          item.dateTime.format("HH:mm")
        ) || [],
    },
    yAxis: {
      type: "value",
    },
    series:
      theIndicatorStatistics?.map((section, index) => ({
        name: sectionNameMap[index],
        data: section.map((item) => item.count),
        type: "line",
        stack: "total",
        areaStyle: {},
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

const activeUserList = $computed(
  () => interfaceIndicators?.[activeInterface]?.userList || []
);

if (route.query.url) {
  const url = decodeURI(route.query.url as string);
  const cancel = watch(
    () => interfaceIndicators,
    () => {
      const index = interfaceIndicators?.findIndex((item) => item.url === url);
      if (index !== undefined && index !== -1) {
        activeInterface = index;
        cancel();
      }
    }
  );
}

watch(
  () => interfaceIndicators,
  () => {
    if (activeInterface >= (interfaceIndicators?.length || 0)) {
      activeInterface = 0;
    }
  }
);
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
          min-height: 40px;
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

.user-list {
  .user-name {
    padding: 10px;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      background-color: azure;
    }

    &:checked {
      background-color: aliceblue;
    }
  }
}
</style>
