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
            class="input"
            v-model="userActionParms.starttime"
            type="date"
          />
        </div>
        <div><input class="input" type="text" /></div>
        <div style="width: 300px">
          <input class="input" v-model="userActionParms.userid" type="text" />
        </div>
        <div><button @click="search" class="btn btn-search">搜索</button></div>
      </div>
    </div>
    <div class="load-time" v-show="showDetails">
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
              @click="chosesBtn = 0"
              :class="['btn', { 'choses-btn': chosesBtn === 0 }]"
            >
              全部
            </button>
          </div>
          <div>
            <button
              @click="chosesBtn = 1"
              :class="['btn', { 'choses-btn': chosesBtn === 1 }]"
            >
              浏览
            </button>
          </div>
          <div>
            <button
              @click="chosesBtn = 2"
              :class="['btn', { 'choses-btn': chosesBtn === 2 }]"
            >
              错误
            </button>
          </div>
          <div>
            <button
              @click="chosesBtn = 3"
              :class="['btn', { 'choses-btn': chosesBtn === 3 }]"
            >
              接口
            </button>
          </div>
        </div>
      </div>
      <div class="action-body">
        <div class="action-main">
          <div class="action-list">
            <div
              class=""
              @click="clickAction(index)"
              v-for="(item, index) in actionList"
              :key="index"
            >
              <template
                class="action-list-item"
                v-show="chosesBtn == 0 || item.listType == chosesBtn"
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
              </template>
            </div>
          </div>
          <div class="action-info">
            <div>
              <div class="action-info-item">
                <div>事件类型：</div>
                <div>dsadsadsad</div>
              </div>
              <div class="action-info-item">
                <div>发生时间：</div>
                <div>dsadsadsad</div>
              </div>
              <div class="action-info-item">
                <div>发生页面：</div>
                <div>dsadsadsad</div>
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
<script setup lang="ts">
import {
  getBehaviorsBasicbehaviors,
  getBehaviorsClickbehaviors,
  getBehaviorsPageskipbehaviors,
  getBehaviorsRoutingskipbehaviors,
  getErrorsJavascripterrors,
  getErrorsPromiseerrors,
  getErrorsResourceerrors,
  getErrorsVueerrors,
  getPerformancesBasicindicators,
} from "@/apis";
import { BasicIndicator } from "@balabala/monitor-api";
import dayjs from "dayjs";
import * as echarts from "echarts";
import { EChartsType } from "echarts";
import { computed, nextTick, onMounted } from "vue";
import { useRoute } from "vue-router";
let showDetails = $ref<boolean>(true);
const route = useRoute();
const pageDom = $ref<HTMLElement>();
const apiDom = $ref<HTMLElement>();
let echar_page: EChartsType;
let echar_api: EChartsType;
const APPID: string = "b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5";
//页面平均加载时间
let option_page = $ref({
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
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
});
//接口耗时
let option_api = $ref<echarts.EChartsOption>({
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
      showBackground: true,
      backgroundStyle: {
        color: "rgba(180, 180, 180, 0.2)",
      },
    },
  ],
});
const actionList: any[] = $ref([]);
let chosesBtn = $ref<number>(0);
let chosesAction = $ref(-1);
let showActionInfo = $ref<Info>();

type Info = {
  title: string;
  time: string;
  pageUrl: string;
  content?: string;
};

onMounted(() => {
  if (!route.query.userId) {
    alert("id不能为空");
    return;
  }
  userActionParms.userid = route.query.userId + "";
  echar_page = echarts.init(pageDom);
  echar_api = echarts.init(apiDom);
  echar_page.setOption(option_page);
  echar_api.setOption(option_api);
  loadAllData();
  loadBasicindicators();
});

const userActionParms = $ref({
  appid: APPID,
  userid: "",
  starttime: dayjs().format("YYYY-MM-DD"),
  endtime: dayjs().add(1, "day").format("YYYY-MM-DD"),
});

const clickAction = (index: number) => {
  chosesAction = index;
  showActionInfo.title = actionList[chosesAction].title;
  showActionInfo.time = actionList[chosesAction].time;
  showActionInfo.pageUrl = actionList[chosesAction].pageUrl;
};

// 加载行为记录列表
const loadBasicindicators = async () => {
  const resultData = await getPerformancesBasicindicators({
    ...userActionParms,
    subType: BasicIndicator.subType.FullLoad,
  });
  let total = 0;
  resultData.data.forEach((e) => {
    total += e.value;
  });
  option_page.series[0].data = [total / resultData.data.length];
  nextTick(() => {
    echar_page.setOption(option_page);
  });
};
// 加载资源错误
const loadResourceerrors = () => {
  return getErrorsResourceerrors({ ...userActionParms }).then((e) => {
    e.data.forEach((data) => {
      const temp = Object.assign({ ...data });
      temp.listType = 2;
      temp.title = "错误";
      temp.time = temp.errorTime || temp.startTime;
      actionList.push(temp);
    });
  });
};

// 加载 JavaScript错误
const loadJavascripterrors = () => {
  return getErrorsJavascripterrors({ ...userActionParms }).then((e) => {
    e.data.forEach((data) => {
      const temp = Object.assign({ ...data });
      temp.listType = 2;
      temp.title = "错误";
      temp.time = temp.errorTime || temp.startTime;
      actionList.push(temp);
    });
  });
};
// 加载 Promise错误
const loadPromiseerrors = () => {
  return getErrorsPromiseerrors({ ...userActionParms }).then((e) => {
    e.data.forEach((data) => {
      const temp = Object.assign({ ...data });
      temp.listType = 3;
      temp.title = "接口";
      temp.time = temp.errorTime || temp.startTime;
      actionList.push(temp);
    });
  });
};
// 加载 Vue错误
const loadVueerrors = () => {
  return getErrorsVueerrors({ ...userActionParms }).then((e) => {
    e.data.forEach((data) => {
      const temp = Object.assign({ ...data });
      temp.listType = 2;
      temp.title = "错误";
      temp.time = temp.errorTime || temp.startTime;
      actionList.push(temp);
    });
  });
};

// 基础行为查询
const loadBasicbehaviors = () => {
  return getBehaviorsBasicbehaviors({ ...userActionParms }).then((e) => {
    e.data.forEach((data) => {
      const temp = Object.assign({ ...data });
      temp.listType = 1;
      temp.title = "页面浏览";
      temp.time = temp.errorTime || temp.startTime;
      actionList.push(temp);
    });
  });
};

// 点击行为
const loadClickbehaviors = () => {
  return getBehaviorsClickbehaviors({ ...userActionParms }).then((e) => {
    e.data.forEach((data) => {
      const temp = Object.assign({ ...data });
      temp.listType = 4;
      temp.title = "点击";
      temp.time = temp.errorTime || temp.startTime;
      actionList.push(temp);
    });
  });
};
// 页面跳转行为
const loadPageskipbehaviors = () => {
  return getBehaviorsPageskipbehaviors({ ...userActionParms }).then((e) => {
    e.data.forEach((data) => {
      const temp = Object.assign({ ...data });
      temp.listType = 1;
      temp.title = "页面浏览";
      temp.time = temp.errorTime || temp.startTime;
      actionList.push(temp);
    });
  });
};
// 路由跳转行为
const loadRoutingskipbehaviors = () => {
  return getBehaviorsRoutingskipbehaviors({ ...userActionParms }).then((e) => {
    e.data.forEach((data) => {
      const temp = Object.assign({ ...data });
      temp.listType = 1;
      temp.title = "页面浏览";
      temp.time = temp.errorTime || temp.startTime;
      actionList.push(temp);
    });
  });
};

const loadAllData = async () => {
  const resultData = await Promise.all([
    loadResourceerrors(),
    loadJavascripterrors(),
    loadPromiseerrors(),
    loadVueerrors(),
    loadBasicbehaviors(),
    loadClickbehaviors(),
    loadPageskipbehaviors(),
    loadRoutingskipbehaviors(),
  ]);
  actionList.sort((data1, data2) => data1.time - data2.time);
  console.log(actionList);
};

const updateTime = computed(() => {
  userActionParms.endtime = dayjs(userActionParms.starttime)
    .add(1, "day")
    .format("YYYY-MM-DD");
});

const search = () => {
  if (!userActionParms.userid) {
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
  background-color: #f5f5f9;
  padding: 0 50px;
}
.header {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  align-items: center;
  border-radius: 10px;
  overflow: hidden;
  .header-left {
    display: flex;
    align-items: center;
  }
  .header-right {
    width: 800px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
}
.load-time {
  display: flex;
  flex-wrap: wrap;
  .load-item {
    margin: 10px 10px 10px 0;
    width: 500px;
    height: 350px;
  }
  .load-title {
    background-color: #fff;
    height: 50px;
    line-height: 50px;
    padding-left: 10px;
    margin-bottom: 5px;
    border-radius: 10px;
    overflow: hidden;
  }
  .load-data {
    background-color: #fff;
    width: 100%;
    height: 300px;
    border-radius: 10px;
    overflow: hidden;
  }
}

.action {
  margin-top: 20px;
  .action-header {
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    height: 50px;
    align-items: center;
    padding: 0 15px;
    border-radius: 10px;
    overflow: hidden;
    .action-btn {
      display: flex;
      width: 350px;
      justify-content: space-evenly;
    }
  }
  .action-body {
    height: 430px;
    background-color: #fff;
    .action-main {
      display: flex;
      .action-list {
        width: 70%;
        overflow-y: auto;
        height: 370px;
        .action-list-item {
          display: flex;
          padding: 20px;
          height: 70px;
          .action-icon {
            padding-top: 10px;
          }
          .action-content {
            display: flex;
            flex-direction: column;
            margin-left: 20px;
            background-color: #f7f7f7;
            width: 100%;
            padding: 10px;
            border-radius: 10px;
            line-height: 25px;
            overflow: hidden;
            cursor: pointer;
            .action-msg {
              color: #6c6e7a;
              font-size: 13px;
              margin-right: 10px;
              overflow: hidden;
            }
            .action-title {
              font-size: 15px;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
      .action-info {
        border: 2px solid #f5f5f9;
        flex: 1;
        padding: 10px 20px;
        height: 370px;
        overflow-y: auto;
        margin-left: 15px;
        border-radius: 10px;
        .action-info-item {
          width: 100%;
          margin-bottom: 20px;
        }
      }
    }
    .action-body-pager {
      background-color: #fff;
      display: flex;
      width: 100%;
    }
    .pagers {
      display: flex;
      width: 100%;
      justify-content: flex-end;
    }
  }
}

.icon-up {
  transition: all 400ms;
  cursor: pointer;
}
.btn {
  border: 0;
  outline: none;
  cursor: pointer;
  width: 50px;
  height: 30px;
  border-radius: 5px;
  padding: 3px;
  margin-right: 15px;
  border: 1px solid #ebebeb;
  background-color: #fff;
}
.input {
  border: 1px solid #d9d9d9;
  outline: none;
  height: 30px;
  width: 100%;
  border-radius: 5px;
  transition: all 30ms;
  font-size: 14px;
}

.input:focus {
  outline: 2px solid #1890ff;
}

.choses-btn {
  border-color: #ff7626;
  color: #ff7626;
}
.action-chose {
  background-color: #fff4ee !important;
}
.btn-search {
  background-color: #1890ff;
  color: #fff;
  width: 60px;
}
</style>
