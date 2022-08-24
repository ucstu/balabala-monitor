<template>
  <div class="container">
    <DataCard
      title="用户详情"
      icon="fa-dedent"
      :fold="true"
      @title-click="showDetails = !showDetails"
    >
      <template #rActions>
        <div class="flex-row">
          <input v-model="userActionParma.startTime" type="date" />
          <input v-model="userActionParma.userId" type="text" />
          <button class="btn-search" @click="search">搜索</button>
        </div>
      </template>
      <div v-show="showDetails" class="charts">
        <DataCard class="card" title="页面平均加载时间">
          <ECharts :option="option_page" :autoresize="true" />
        </DataCard>
        <DataCard class="card" title="接口耗时区间分布">
          <ECharts :option="option_api" :autoresize="true" />
        </DataCard>
      </div>
    </DataCard>
    <div class="action">
      <DataCard title="行为记录列表">
        <template #rActions>
          <button
            v-for="index in 4"
            :key="index"
            :class="['btn', { 'btn-active': activeActionType === index }]"
            @click="activeActionType = index - 1"
          >
            {{ actionTypeNameMap[index - 1] }}
          </button>
        </template>
        <div class="main">
          <div v-for="(item, index) in actions" :key="index" class="list">
            <div
              v-show="
                activeActionType == 0 || item.listType == activeActionType
              "
              class="action-list-item"
              @click="clickAction(index)"
            >
              <div class="action-icon">
                <i class="fa fa-hand-pointer-o" aria-hidden="true"></i>
              </div>
              <div
                :class="[
                  'action-content',
                  { 'action-chose': chosesAction === index },
                ]"
              >
                <div class="action-title">
                  <div>{{ item.title }}</div>
                  <div>
                    {{ dayjs(item.time).format("YYYY-MM-DD HH:mm:ss") }}
                  </div>
                </div>
                <div class="action-msg">{{ item.pageUrl }}</div>
              </div>
            </div>
          </div>
          <ActionInfo
            class="info"
            :action-type="chosesAction"
            :action-info="showActionInfo"
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
import {
  BasicIndicator,
  getBehaviorsUseraction,
  getPerformancesBasicindicators,
} from "@/apis";
import DataCard from "@/components/DataCard.vue";
import { useStore } from "@/stores";
import dayjs from "dayjs";
import type { ECBasicOption } from "echarts/types/dist/shared";
import { onMounted, watch } from "vue";
import ECharts from "vue-echarts";
import { useRoute } from "vue-router";
import ActionInfo from "./ActionInfo.vue";
import type { ActionInfo as _ActionInfo } from "./types";
let showDetails = $ref<boolean>(true);
const route = useRoute();
const pageDom = $ref<HTMLElement>();
const apiDom = $ref<HTMLElement>();
let echar_page: ECBasicOption;
let echar_api: ECBasicOption;
//页面平均加载时间
let option_page = $ref<any>({
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: [],
  },
  series: [
    {
      data: [],
      type: "bar",
      // showBackground: true,
      // backgroundStyle: {
      //   color: "rgba(180, 180, 180, 0.2)",
      // },
    },
  ],
});
//接口耗时
let option_api = $ref<any>({
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: ["Mon", "Tue", "Wed", "Fri", "Sat", "Sun"],
  },
  series: [
    {
      data: [120, 200, 150, 80, 110, 130],
      type: "bar",
      // showBackground: true,
      // backgroundStyle: {
      //   color: "rgba(180, 180, 180, 0.2)",
      // },
    },
  ],
});
const actions: any[] = $ref([]);
let activeActionType = $ref(0);
const actionTypeNameMap: Record<number, string> = {
  0: "全部",
  1: "浏览",
  2: "错误",
  3: "接口",
};
let chosesAction = $ref(-1);
let showActionInfo = $ref<_ActionInfo>();

onMounted(() => {
  if (!route.query.userId) {
    alert("id不能为空");
    return;
  }
  userActionParma.userId = route.query.userId + "";
  //echar_page = echarts.init(pageDom);
  //echar_api = echarts.init(apiDom);
  //
  // echar_page.setOption(option_page);
  // echar_api.setOption(option_api);
  loadAllData();
  loadBasicindicators();
});

const user = useStore();
const userActionParma = $ref({
  appId: user.appId,
  userId: "",
  startTime: dayjs().format("YYYY-MM-DD"),
  endTime: dayjs().add(1, "day").format("YYYY-MM-DD"),
  mainType: 2,
  subType: 2002,
  size: 10,
});

const clickAction = (index: number) => {
  chosesAction = index;
  showActionInfo = { ...actions[chosesAction] };
};

// 加载行为记录列表
const loadBasicindicators = async () => {
  const resultData = await getPerformancesBasicindicators({
    ...userActionParma,
    subType: BasicIndicator.subType.FullLoad,
  });

  const urlList: string[] = [];
  const loadTime: number[] = [];
  resultData.data.forEach((item) => {
    urlList.push(item.pageUrl);
    loadTime.push(item.average);
  });
  option_page.series[0].data = loadTime;
  option_page.yAxis.data = urlList;
  // option_page.series![0].data = [total / resultData.data.items.length];
  // nextTick(() => {
  //   echar_page.setOption(option_page);
  // });
};

const loadAllData = async () => {
  const res = await getBehaviorsUseraction({ ...userActionParma });
  actions.push(...res.data);
};
// 计算结束时间
watch(
  () => userActionParma.startTime,
  (newVal, oldVal) => {
    userActionParma.endTime = dayjs(newVal).add(1, "day").format("YYYY-MM-DD");
  }
);

const search = () => {
  if (!userActionParma.userId) {
    alert("用户id 不能为空");
    return;
  }
  actions.length = 0;
  loadAllData();
  loadBasicindicators();
};
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 20px;
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
