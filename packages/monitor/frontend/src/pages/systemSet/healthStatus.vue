<template>
  <div class="bg">
    <header class="header">
      <div class="title">健康数据</div>
      <div class="calendar">
        <input v-model="ErrorListParms.starttime" type="date" />
      </div>
    </header>
    <!-- 指标 -->
    <div class="center">
      <!-- 健康状态 -->
      <div></div>

      <!-- js错误 -->
      <div></div>

      <!-- 静态资源异常 -->
      <div></div>

      <!-- 接口异常 -->
      <div></div>
    </div>

    <!-- 图像 -->
    <div class="bottom"></div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";

const ErrorListParms = $ref({
  appid: "b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5",
  //userid: "ce124A07-9111-C9b7-84C5-5644CEdB4Abf",
  starttime: dayjs().format("YYYY-MM-DD"),
  endtime: dayjs().add(1, "day").format("YYYY-MM-DD"),
});
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
      width: 100px;
      height: 26px;
      border: none;
      outline: none;
    }
  }
}
</style>
