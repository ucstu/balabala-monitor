<template>
  <div class="content">
    <ToolBar v-model:date-time="activeDateTime" title="代码错误列表" />
    <BasicTable
      :titles="['错误消息', '发生次数', '影响用户']"
      :data-list="javaScriptErrorRows.slice(page * 5, (page + 1) * 5)"
      style="height: 300px; margin-bottom: 20px"
    />
    <div class="page">
      <span><button @click="page = 0">首页</button></span>
      <span>
        <button @click="page = page > 0 ? page - 1 : 0">上一页</button>
      </span>
      <span
        ><button
          @click="page = allErrorRows.length / 5 > page + 1 ? page + 1 : page"
        >
          下一页
        </button></span
      >
      <span>当前&nbsp;{{ page + 1 }}&nbsp;页</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import BasicTable from "@/components/BasicTable.vue";
import ToolBar from "@/components/ToolBar.vue";
import { useJavaScriptErrors, usePromiseErrors } from "@/hooks";
import dayjs from "dayjs";

let activeDateTime = $ref(dayjs());

let page = $ref(0);

const { promiseErrors } = $(
  usePromiseErrors(() => {
    return {
      startTime: activeDateTime.subtract(1, "d"),
      endTime: activeDateTime.add(1, "d"),
    };
  })
);

const promiseErrorRows = $computed(
  () =>
    promiseErrors?.map((item) => [item.msg, item.count, item.userCount]) || []
);

const { javaScriptErrors } = $(
  useJavaScriptErrors(() => {
    return {
      startTime: activeDateTime.subtract(1, "d"),
      endTime: activeDateTime.add(1, "d"),
    };
  })
);

const javaScriptErrorRows = $computed(
  () =>
    javaScriptErrors?.map((item) => [item.msg, item.count, item.userCount]) ||
    []
);

const allErrorRows = $computed(() => [
  ...javaScriptErrorRows,
  ...promiseErrorRows,
]);
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;
}
</style>
