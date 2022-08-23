<template>
  <div class="container">
    <DataCard title="用户详情" icon="fa-dedent">
      <template #rActions>
        <div class="flex-row justify-between" style="width: 420px">
          <input v-model="activeRawTime" type="date" />
          <input v-model="userId" type="text" style="width: 250px" />
        </div>
      </template>
      <div class="charts">
        <DataCard
          class="card"
          title="页面平均加载时间"
          :loading="pageIndicatorStatisticsLoading"
        >
          <ECharts
            :option="pageIndicatorStatisticsChartOption"
            :autoresize="true"
          />
        </DataCard>
        <DataCard
          class="card"
          title="接口耗时区间分布"
          :loading="interfaceIndicatorStatisticsLoading"
        >
          <ECharts
            :option="interfaceIndicatorStatisticsChartOption"
            :autoresize="true"
          />
        </DataCard>
      </div>
    </DataCard>
    <div class="action">
      <DataCard title="行为记录列表" :loading="userActionsLoading">
        <template #rActions>
          <button
            v-for="index in 4"
            :key="index"
            :class="{ 'btn-active': activeActionType === index }"
            @click="activeActionType = index - 1"
          >
            {{ actionTypeNameMap[index - 1] }}
          </button>
        </template>
        <div class="main">
          <div class="list">
            <div
              v-for="(item, index) in userActions"
              v-show="
                activeActionType == 0 || item.listType == activeActionType
              "
              :key="index"
              class="item"
              @click="activeActionIndex = index"
            >
              <div class="icon">
                <i class="fa fa-hand-pointer-o" aria-hidden="true"></i>
              </div>
              <div :class="['content', { chose: activeActionIndex === index }]">
                <div class="title">
                  <div>{{ item.title }}</div>
                  <div>
                    {{ dayjs(item.time).format("YYYY-MM-DD HH:mm:ss") }}
                  </div>
                </div>
                <div class="msg">{{ item.pageUrl }}</div>
              </div>
            </div>
          </div>
          <ActionInfo
            class="info"
            :action-type="activeActionIndex"
            :action-info="activeActionInfo"
          ></ActionInfo>
        </div>
      </DataCard>
    </div>
  </div>
</template>
<!--
点击
<i class="fa fa-hand-pointer-o" aria-hidden="true"></i>
请求
<i class="fa fa-paper-plane-o" aria-hidden="true"></i>
错误
<i class="fa fa-exclamation-triangle" aria-hidden="true"></i>
浏览
<i class="fa fa-archive" aria-hidden="true"></i>
 -->
<script lang="ts" setup>
import { BasicIndicator, getBehaviorsUseraction } from "@/apis";
import DataCard from "@/components/DataCard.vue";
import { basicChartOption } from "@/configs";
import { useInterfaceIndicatorStatistics } from "@/hooks";
import { useBasicIndicatorStatistics } from "@/hooks/useBasicIndicatorStatistics";
import { useStore } from "@/stores";
import { useDebounceFn } from "@vueuse/shared";
import dayjs from "dayjs";
import type { EChartsCoreOption } from "echarts";
import { onMounted, watch } from "vue";
import ECharts from "vue-echarts";
import { useRoute, useRouter } from "vue-router";
import ActionInfo from "./ActionInfo.vue";

const store = useStore();
const route = useRoute();
const router = useRouter();

let userId = $ref("");
let userActions = $ref<any>([]);
let userActionsLoading = $ref(false);
let activeActionType = $ref(0);
const actionTypeNameMap: Record<number, string> = {
  0: "全部",
  1: "浏览",
  2: "错误",
  3: "接口",
};
// 耗时分段名称映射
let sectionNameMap: Record<number, string> = {
  0: "<1秒",
  1: "1-5秒",
  2: "5-10秒",
  3: "10-30秒",
  4: ">30秒",
};
let activeDateTime = $ref(dayjs());
let activeRawTime = $computed({
  get: () => activeDateTime.format("YYYY-MM-DD"),
  set: (value) => {
    activeDateTime = dayjs(value);
  },
});
let activeActionIndex = $ref(-1);
let activeActionInfo = $computed(() => userActions[activeActionIndex]);

let userActionParma = $computed(() => {
  return {
    appId: store.appId,
    userId: userId,
    startTime: activeDateTime.format("YYYY-MM-DD"),
    endTime: activeDateTime.add(1, "day").format("YYYY-MM-DD"),
  };
});

const {
  basicIndicatorStatistics: pageIndicatorStatistics,
  basicIndicatorStatisticsLoading: pageIndicatorStatisticsLoading,
} = $(
  useBasicIndicatorStatistics(() => {
    return {
      mainType: BasicIndicator.mainType.LoadIndicator,
      subType: BasicIndicator.subType.FullLoad,
      userId: userId,
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "d"),
      granularity: "1h",
    };
  })
);

// 页面指标分段统计图标配置项
const pageIndicatorStatisticsChartOption = $computed<EChartsCoreOption>(() => {
  return {
    xAxis: {
      type: "category",
      data:
        pageIndicatorStatistics?.[0]?.map((item) =>
          dayjs(item.dateTime).format("HH:mm")
        ) || [],
    },
    yAxis: {
      type: "value",
    },
    series:
      pageIndicatorStatistics?.map((section, index) => ({
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

const { interfaceIndicatorStatistics, interfaceIndicatorStatisticsLoading } = $(
  useInterfaceIndicatorStatistics(() => {
    return {
      userId: userId,
      startTime: activeDateTime,
      endTime: activeDateTime.add(1, "d"),
      granularity: "1h",
    };
  })
);
// 接口指标分段统计图标配置项
const interfaceIndicatorStatisticsChartOption = $computed<EChartsCoreOption>(
  () => {
    return {
      xAxis: {
        type: "category",
        data:
          interfaceIndicatorStatistics?.[0]?.map((item) =>
            dayjs(item.dateTime).format("HH:mm")
          ) || [],
      },
      yAxis: {
        type: "value",
      },
      series:
        interfaceIndicatorStatistics?.map((section, index) => ({
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
  }
);

onMounted(() => {
  if (!route.query.userId) {
    alert("id不能为空");
    router.go(-1);
    return;
  }
  userId = route.query.userId + "";
  loadActions();
});

const loadActions = useDebounceFn(async () => {
  if (userId === "") {
    return;
  }
  userActionsLoading = true;
  const { data } = await getBehaviorsUseraction(userActionParma);
  userActions = data;
  userActionsLoading = false;
}, 20);

watch([() => activeDateTime, () => userId], () => {
  loadActions();
});
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 20px;

  .action {
    .main {
      .list {
        width: 70%;
        height: 370px;
        overflow-y: auto;

        .item {
          display: flex;
          height: 70px;
          padding: 20px;

          .icon {
            padding-top: 10px;
          }

          .content {
            display: flex;
            flex-direction: column;
            width: 100%;
            padding: 10px;
            margin-left: 20px;
            overflow: hidden;
            line-height: 25px;
            cursor: pointer;
            background-color: #f7f7f7;
            border-radius: 10px;

            .msg {
              margin-right: 10px;
              overflow: hidden;
              font-size: 13px;
              color: #6c6e7a;
            }

            .title {
              display: flex;
              justify-content: space-between;
              font-size: 15px;
            }
          }
        }
      }

      .info {
        flex: 1;
        height: 370px;
        padding: 10px 20px;
        margin-left: 15px;
        overflow-y: auto;
        border: 2px solid #f5f5f9;
        border-radius: 10px;

        .item {
          width: 100%;
          margin-bottom: 20px;
          word-wrap: break-word;

          .data {
            font-size: 14px;
            color: gray;
          }
        }
      }
    }
  }
}

.charts {
  display: flex;

  .card {
    flex: 1;
    height: 350px;
    margin-right: 40px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
