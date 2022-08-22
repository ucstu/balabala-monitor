<template>
  <div class="bg">
    <header class="header">
      <div class="title">核心数据</div>
      <div class="calendar">
        <input ref="dateDOM" v-model="date" type="date" />
      </div>
    </header>
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
          <div>新访客</div>
        </div>
        <div class="user-info-list weight">
          <div>00000</div>
          <div>00000</div>
          <div>00000</div>
        </div>
        <div class="user-info-list">
          <div>较昨日&nbsp;00.00%<i class="fa fa-arrow-up"></i></div>
          <div>较昨日&nbsp;00.00%<i class="fa fa-arrow-up"></i></div>
          <div>较昨日&nbsp;00.00%<i class="fa fa-arrow-down"></i></div>
        </div>
      </div>
    </div>
    <div class="form">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getBehaviorsBasicbehaviors } from "@/apis";
import { BasicBehavior } from "@balabala/monitor-api";
import dayjs from "dayjs";
import { onMounted, watch } from "vue";
const APPID = "b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5";
let date = $ref<string>(dayjs().format("YYYY-MM-DD"));
let dateDOM = $ref<HTMLElement>();
onMounted(() => {
  getalldata("2022-08-01", "2022-08-20");
});
watch(
  () => date,
  (newValue, oldValue) => {
    console.log("date变化了", newValue, oldValue);
  }
);
function getalldata(starttime: string, endtime: string) {
  getBehaviorsBasicbehaviors({
    appId: APPID,
    startTime: starttime,
    endTime: endtime,
    mainType: BasicBehavior.mainType.BasicBehavior,
    subType: BasicBehavior.subType.PV,
  }).then((res) => {
    console.log(res);
  });
}
</script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  padding: 25px 35px 0 25px;
  background-color: rgb(240 240 240 / 30%);

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .title {
      font-size: 18px;
      font-weight: 600;
    }

    .calendar {
      padding: 5px 0;
    }

    .calendar input {
      width: 130px;
      height: 26px;
      border: none;
      outline: none;
    }
  }

  .form {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;

    div {
      width: 30%;
      height: 300px;
      background-color: white;
    }
  }

  .browse-card .browse-head {
    display: flex;
    align-items: center;
    width: 100%;
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
}
</style>
