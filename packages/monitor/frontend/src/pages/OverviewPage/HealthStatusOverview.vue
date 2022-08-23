<template>
  <div class="bg">
    <header class="header">
      <div class="title">健康数据</div>
      <div class="calendar">
        <input v-model="date" type="date" />
      </div>
    </header>
    <DataCard
      title="一天的用户访问量趋势"
      icon="fa-dedent"
      line="title"
      style="display: flex; justify-content: space-between; margin-top: 20px"
    >
      <ECharts
        :option="total_options"
        :autoresize="true"
        class="bar1"
      ></ECharts>
      <div>
        <ECharts></ECharts>
        <ECharts></ECharts>
      </div>
    </DataCard>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { onMounted, watch } from "vue";
import ECharts from "vue-echarts";
import { EChartsCoreOption } from "echarts";
import DataCard from "@/components/DataCard.vue";
import { useStore } from "@/stores";
import { basicChartOption } from "@/configs";
let date = $ref<string>(dayjs().format("YYYY-MM-DD"));
let total_options = $ref<EChartsCoreOption>({
  title: {
    zlevel: 2, // 控制圆环图中间的字的层级
    text: "58%",
    top: "47%", // 控制位置
    left: "47%", // 控制位置
    textAlign: "center", // 让文字居中
    textStyle: {
      color: "yellow",
      fontWeight: "bolder",
      fontSize: "30px",
    },
  },
  series: [
    {
      name: "Access From",
      type: "pie",
      radius: ["40%", "70%"],
      label: {
        position: "inside",
      },
      data: [
        { value: 0, name: "请求总数" },
        { value: 0, name: "错误总数" },
      ],
    },
  ],
  ...basicChartOption,
});
// onMounted(()=>{})
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

  .bar1 {
    width: 300px;
    height: 300px;
  }
}
</style>
