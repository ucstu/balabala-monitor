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
            <div v-if="chosesAction !== -1">
              <div class="action-info-item">
                <div class="action-info-item-title">事件类型：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.title }}
                </div>
              </div>
              <div class="action-info-item">
                <div class="action-info-item-title">发生时间：</div>
                <div class="action-info-item-data">
                  {{ dayjs(showActionInfo.time).format("YYYY-MM-DD HH:mm:ss") }}
                </div>
              </div>
              <div class="action-info-item">
                <div class="action-info-item-title">发生页面：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.pageUrl }}
                </div>
              </div>
              <!-- 资源错误 -->
              <div
                v-if="
                  showActionInfo.listType === 2 && showActionInfo.mainType === 1
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">资源类型：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.resourceType }}
                </div>
              </div>
              <div
                v-if="
                  showActionInfo.listType === 2 && showActionInfo.mainType === 1
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">资源路径：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.path }}
                </div>
              </div>
              <!-- js错误 -->
              <div
                v-if="
                  showActionInfo.listType === 2 && showActionInfo.mainType === 2
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">文件路径：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.url }}
                </div>
              </div>
              <div
                v-if="
                  showActionInfo.listType === 2 && showActionInfo.mainType === 2
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">错误消息：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.msg }}
                </div>
              </div>
              <div
                v-if="
                  showActionInfo.listType === 2 && showActionInfo.mainType === 2
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">错误行号：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.line }}
                </div>
              </div>
              <div
                v-if="
                  showActionInfo.listType === 2 && showActionInfo.mainType === 2
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">错误列号：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.column }}
                </div>
              </div>
              <div
                v-if="
                  showActionInfo.listType === 2 && showActionInfo.mainType === 2
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">错误调用堆栈：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.stack }}
                </div>
              </div>
              <!-- Promise 错误-->
              <div
                v-if="
                  showActionInfo.listType === 2 && showActionInfo.mainType === 3
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">错误调用堆栈：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.stack }}
                </div>
              </div>
              <!-- 点击行为 -->
              <div
                v-if="
                  showActionInfo.listType === 1 &&
                  showActionInfo.subType === 2001
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">
                  点击位置距离页面左端距离：
                </div>
                <div class="action-info-item-data">
                  {{ showActionInfo.left }}
                </div>
              </div>
              <div
                v-if="
                  showActionInfo.listType === 1 &&
                  showActionInfo.subType === 2001
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">
                  点击位置距离页面顶端距离：
                </div>
                <div class="action-info-item-data">
                  {{ showActionInfo.top }}
                </div>
              </div>
              <div
                v-if="
                  showActionInfo.listType === 1 &&
                  showActionInfo.subType === 2002
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">点击对象：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.target }}
                </div>
              </div>
              <div
                v-if="
                  showActionInfo.listType === 1 && showActionInfo.mainType === 2
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">内部文本：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.inner }}
                </div>
              </div>
              <!-- 页面跳转行为 -->
              <div
                v-if="
                  showActionInfo.listType === 1 && showActionInfo.mainType === 3
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">路由跳转起步位置：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.from }}
                </div>
              </div>
              <div
                v-if="
                  showActionInfo.listType === 1 && showActionInfo.mainType === 3
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">路由跳转目的位置：</div>
                <div class="action-info-item-data">{{ showActionInfo.to }}</div>
              </div>
              <!-- 路由跳转 -->
              <div
                v-if="
                  showActionInfo.listType === 1 && showActionInfo.mainType === 4
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">路径参数：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.params }}
                </div>
              </div>
              <div
                v-if="
                  showActionInfo.listType === 1 && showActionInfo.mainType === 4
                "
                class="action-info-item"
              >
                <div class="action-info-item-title">查询参数：</div>
                <div class="action-info-item-data">
                  {{ showActionInfo.query }}
                </div>
              </div>
            </div>
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
import { getBehaviorsUserAction } from "@/apis";
import dayjs from "dayjs";
import type { EChartOption, EChartsType } from "echarts";
import * as echarts from "echarts";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

let showDetails = $ref<boolean>(true);
const route = useRoute();
const pageDom = $ref<HTMLElement>();
const apiDom = $ref<HTMLElement>();
let echar_page: EChartsType;
let echar_api: EChartsType;
const APPID = "b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5";
//页面平均加载时间
let option_page = $ref<EChartOption>({
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: ["加载时间"],
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

type Info = {
  title?: string; // 类型名称
  time?: string; // 发生时间
  pageUrl?: string; //发生页面
  listType?: number;
  mainType?: number;
  subType?: number;
  content?: string; //发生内容
  resourceType?: string; //资源类型
  path?: string; // 资源路径
  url?: string; // 文件路径
  msg?: string; // 错误消息
  line?: number; // 错误行号
  column?: number; // 错误列号
  stack?: string; // 错误调用堆栈
  value?: number; // 指标数值
  left?: number; // 点击位置距离页面左端距离
  top?: number; // 点击位置距离页面顶端距离
  target?: string; // 点击对象
  inner?: string; // 内部文本
  from?: string; // 路由跳转起步位置
  to?: string; // 路由跳转目的位置
  params?: string; // 路径参数
  query?: string; // 查询参数
};

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

const userActionParma = $ref({
  appId: APPID,
  userId: "",
  startTime: dayjs().format("YYYY-MM-DD"),
  endTime: dayjs().add(1, "day").format("YYYY-MM-DD"),
  mainType: 1,
  subType: 1001,
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
};

// 加载行为记录列表
const loadBasicindicators = async () => {
  // const resultData = await getPerformancesBasicindicators({
  //   ...userActionParma,
  //   subType: BasicIndicator.subType.FullLoad,
  // });
  // let total = 0;
  // resultData.data.forEach((e) => {
  //   total += e.value;
  // });
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
