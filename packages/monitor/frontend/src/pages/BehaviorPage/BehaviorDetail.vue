<template>
  <div class="main">
    <div class="header">
      <div class="header-left">
        <span>用户详情</span>
        <span @click="showDetails = !showDetails">
          <i
            :class="[
              { 'fa-rotate-180': !showDetails },
              'fa fa-angle-up icon-up fa-2x',
            ]"
            aria-hidden="true"
          ></i
        ></span>
      </div>
      <div class="header-right">
        <div>
          <input
            v-model="userActionParma.startTime"
            class="input"
            type="date"
          />
        </div>
        <div><input class="input" type="text" /></div>
        <div style="width: 300px">
          <input v-model="userActionParma.userId" class="input" type="text" />
        </div>
        <div><button class="btn btn-search" @click="search">搜索</button></div>
      </div>
    </div>
    <div v-show="showDetails" class="load-time">
      <div class="load-time-pag load-item">
        <div class="load-title">页面平均加载时间</div>
        <div ref="pageDom" class="load-data"></div>
      </div>
      <div class="load-time-api load-item">
        <div class="load-title">接口耗时区间分布</div>
        <div ref="apiDom" class="load-data"></div>
      </div>
    </div>
    <div class="action">
      <div class="action-header">
        <div>行为记录列表</div>
        <div class="action-btn">
          <div>
            <button
              :class="['btn', { 'choses-btn': chosesBtn === 0 }]"
              @click="chosesBtn = 0"
            >
              全部
            </button>
          </div>
          <div>
            <button
              :class="['btn', { 'choses-btn': chosesBtn === 1 }]"
              @click="chosesBtn = 1"
            >
              浏览
            </button>
          </div>
          <div>
            <button
              :class="['btn', { 'choses-btn': chosesBtn === 2 }]"
              @click="chosesBtn = 2"
            >
              错误
            </button>
          </div>
          <div>
            <button
              :class="['btn', { 'choses-btn': chosesBtn === 3 }]"
              @click="chosesBtn = 3"
            >
              接口
            </button>
          </div>
        </div>
      </div>
      <div class="action-body">
        <div class="action-main">
          <div class="action-list">
            <template v-for="(item, index) in actionList" :key="index">
              <div
                v-show="chosesBtn == 0 || item.listType == chosesBtn"
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
            </template>
          </div>
          <div class="action-info">
            <ActionInfo
              :choses-action="chosesAction"
              :show-action-info="showActionInfo"
            ></ActionInfo>
          </div>
        </div>
        <!-- <div class="action-body-pager">
          <div class="pagers">
            <button class="btn">1</button>
            <button class="btn">3</button>
            <button class="btn">4</button>
            <button class="btn">5</button>
          </div>
        </div> -->
      </div>
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
import { getBehaviorsUserAction, getPerformancesBasicindicators } from "@/apis";
import { useStore } from "@/stores";
import { BasicIndicator } from "@balabala/monitor-api";
import dayjs from "dayjs";
import type { EChartOption, EChartsType } from "echarts";
import * as echarts from "echarts";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import ActionInfo from "./ActionInfo.vue";
import { Info } from "./Types";

let showDetails = $ref<boolean>(true);
const route = useRoute();
const pageDom = $ref<HTMLElement>();
const apiDom = $ref<HTMLElement>();
let echar_page: EChartsType;
let echar_api: EChartsType;
//页面平均加载时间
let option_page = $ref<EChartOption>({
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: [],
  },
  series: [
    {
      data: [0],
      type: "bar",
      // showBackground: true,
      // backgroundStyle: {
      //   color: "rgba(180, 180, 180, 0.2)",
      // },
    },
  ],
});
//接口耗时
let option_api = $ref<EChartOption>({
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
const actionList: any[] = $ref([]);
let chosesBtn = $ref<number>(0);
let chosesAction = $ref(-1);
let showActionInfo = $ref<Info>();

onMounted(() => {
  if (!route.query.userId) {
    alert("id不能为空");
    return;
  }
  userActionParma.userId = route.query.userId + "";
  echar_page = echarts.init(pageDom);
  echar_api = echarts.init(apiDom);
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
  showActionInfo = {};
  showActionInfo.title = actionList[chosesAction].title;
  showActionInfo.time = actionList[chosesAction].time;
  showActionInfo.pageUrl = actionList[chosesAction].pageUrl;
  showActionInfo.listType = actionList[chosesAction].listType;
  showActionInfo.mainType = actionList[chosesAction].mainType;
  showActionInfo.subType = actionList[chosesAction].subType;
  showActionInfo.resourceType = actionList[chosesAction].resourceType;
  showActionInfo.path = actionList[chosesAction].path;
  showActionInfo.url = actionList[chosesAction].url;
  showActionInfo.msg = actionList[chosesAction].msg;
  showActionInfo.line = actionList[chosesAction].line;
  showActionInfo.column = actionList[chosesAction].column;
  showActionInfo.stack = actionList[chosesAction].stack;
  showActionInfo.value = actionList[chosesAction].value;
  showActionInfo.left = actionList[chosesAction].left;
  showActionInfo.top = actionList[chosesAction].top;
  showActionInfo.target = actionList[chosesAction].target;
  showActionInfo.inner = actionList[chosesAction].inner;
  showActionInfo.from = actionList[chosesAction].from;
  showActionInfo.to = actionList[chosesAction].to;
  showActionInfo.params = actionList[chosesAction].params;
  showActionInfo.query = actionList[chosesAction].query;
  showActionInfo.statusCode = actionList[chosesAction].statusCode;
  showActionInfo.method = actionList[chosesAction].method;
  showActionInfo.duration = actionList[chosesAction].duration;
  showActionInfo.data = actionList[chosesAction].data;
};

// 加载行为记录列表
const loadBasicindicators = async () => {
  const resultData = await getPerformancesBasicindicators({
    ...userActionParma,
    subType: BasicIndicator.subType.FullLoad,
  });
  const option_page_data = {};
  // option_page.series[0].data!.length = 0;
  resultData.data.forEach((item) => {
    console.log(item);
    const a = option_page.series;
  });
  // option_page.series![0].data = [total / resultData.data.items.length];
  // nextTick(() => {
  //   echar_page.setOption(option_page);
  // });
};

const loadAllData = async () => {
  const res = await getBehaviorsUserAction({ ...userActionParma });
  actionList.push(...res.data);
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
  actionList.length = 0;
  loadAllData();
  loadBasicindicators();
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  padding: 0 50px;
  background-color: #f5f5f9;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;

  .header-left {
    display: flex;
    align-items: center;
  }

  .header-right {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    width: 800px;
  }
}

.load-time {
  display: flex;
  flex-wrap: wrap;

  .load-item {
    width: 500px;
    height: 350px;
    margin: 10px 10px 10px 0;
  }

  .load-title {
    height: 50px;
    padding-left: 10px;
    margin-bottom: 5px;
    overflow: hidden;
    line-height: 50px;
    background-color: #fff;
    border-radius: 10px;
  }

  .load-data {
    width: 100%;
    height: 300px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;
  }
}

.action {
  margin-top: 20px;

  .action-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 50px;
    padding: 0 15px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 10px;

    .action-btn {
      display: flex;
      justify-content: space-evenly;
      width: 350px;
    }
  }

  .action-body {
    height: 430px;
    background-color: #fff;

    .action-main {
      display: flex;

      .action-list {
        width: 70%;
        height: 370px;
        overflow-y: auto;

        .action-list-item {
          display: flex;
          height: 70px;
          padding: 20px;

          .action-icon {
            padding-top: 10px;
          }

          .action-content {
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

            .action-msg {
              margin-right: 10px;
              overflow: hidden;
              font-size: 13px;
              color: #6c6e7a;
            }

            .action-title {
              display: flex;
              justify-content: space-between;
              font-size: 15px;
            }
          }
        }
      }

      .action-info {
        flex: 1;
        height: 370px;
        padding: 10px 20px;
        margin-left: 15px;
        overflow-y: auto;
        border: 2px solid #f5f5f9;
        border-radius: 10px;

        .action-info-item {
          width: 100%;
          margin-bottom: 20px;
          word-wrap: break-word;

          .action-info-item-data {
            font-size: 14px;
            color: gray;
          }
        }
      }
    }

    .action-body-pager {
      display: flex;
      width: 100%;
      background-color: #fff;
    }

    .pagers {
      display: flex;
      justify-content: flex-end;
      width: 100%;
    }
  }
}

.icon-up {
  cursor: pointer;
  transition: all 400ms;
}

.btn {
  width: 50px;
  height: 30px;
  padding: 3px;
  margin-right: 15px;
  cursor: pointer;
  background-color: #fff;
  border: 0;
  border: 1px solid #ebebeb;
  border-radius: 5px;
  outline: none;
}

.input {
  width: 100%;
  height: 30px;
  font-size: 14px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  outline: none;
  transition: all 30ms;
}

.input:focus {
  outline: 2px solid #1890ff;
}

.choses-btn {
  color: #ff7626;
  border-color: #ff7626;
}

.action-chose {
  background-color: #fff4ee !important;
}

.btn-search {
  width: 60px;
  color: #fff;
  background-color: #1890ff;
}
</style>
