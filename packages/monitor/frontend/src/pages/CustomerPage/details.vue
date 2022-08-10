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
        <div><input type="text" /></div>
        <div><input type="text" /></div>
        <div><input type="text" /></div>
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
              class="action-list-item"
              @click="chosesAction = index"
              v-for="(i, index) in 20"
              :key="index"
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
                <div class="action-title">页面浏览</div>
                <div class="action-msg">https://www.webf页面浏览</div>
              </div>
            </div>
          </div>
          <div class="action-info">23</div>
        </div>
        <div class="action-body-pager">
          <div class="pagers">
            <button class="btn">1</button>
            <button class="btn">3</button>
            <button class="btn">4</button>
            <button class="btn">5</button>
          </div>
        </div>
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
import * as echarts from "echarts";
import { EChartsType } from "echarts";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
let userId = $ref<number>();
let showDetails = $ref<boolean>(true);
const route = useRoute();
const pageDom = $ref<HTMLElement>();
const apiDom = $ref<HTMLElement>();
let echar_page: EChartsType;
let echar_api: EChartsType;
//页面平均加载时间
let option_page = $ref<echarts.EChartsOption>({
  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "category",
    data: ["Mon", "Tue", "Thu", "Fri", "Sat", "Sun"],
  },
  series: [
    {
      data: [120, 200, 150, 70, 110, 130],
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
onMounted(() => {
  if (route.query.userId) {
    userId = parseInt(route.query.userId + "");
  }
  echar_page = echarts.init(pageDom);
  echar_api = echarts.init(apiDom);
  echar_page.setOption(option_page);
  echar_api.setOption(option_api);
});

let chosesBtn = $ref<number>(0);
let chosesAction = $ref(-1);
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
            }
          }
        }
      }
      .action-info {
        border: 2px solid #f5f5f9;
        flex: 1;
        margin: 0 14px;
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
  transition: all 300ms;
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
.choses-btn {
  border-color: #ff7626;
  color: #ff7626;
}
.action-chose {
  background-color: #fff4ee !important;
}
</style>
