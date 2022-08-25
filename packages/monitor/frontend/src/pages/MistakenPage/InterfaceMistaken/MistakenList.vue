<template>
  <div class="content">
    <ToolBar v-model:date-time="activeDateTime" title="接口错误列表" />
    <BasicTable
      :titles="['错误接口', '发生次数', '影响用户']"
      :data-list="interfaceErrorRaws.slice(page * 5, (page + 1) * 5)"
      style="height: 300px; margin-bottom: 20px"
    />
    <div class="page">
      <span><button @click="page = 0">首页</button></span>
      <span>
        <button @click="page = page > 0 ? page - 1 : 0">上一页</button>
      </span>
      <span
        ><button
          @click="
            page = interfaceErrorRaws.length / 5 > page + 1 ? page + 1 : page
          "
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
import { useInterfaceErrors } from "@/hooks";
import dayjs from "dayjs";

let activeDateTime = $ref(dayjs());

let page = $ref(0);

const { interfaceErrors } = $(
  useInterfaceErrors(() => {
    return {
      startTime: activeDateTime.subtract(1, "d"),
      endTime: activeDateTime.add(1, "d"),
    };
  })
);

const interfaceErrorRaws = $computed(
  () =>
    interfaceErrors?.map((item) => [item.url, item.count, item.userCount]) || []
);
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
