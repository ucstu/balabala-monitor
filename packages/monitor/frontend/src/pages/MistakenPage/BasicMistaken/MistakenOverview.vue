<template>
  <div class="content">
    <DataCard
      class="card"
      title="JS错误"
      :loading="javaScriptErrorsLoading"
      :empty="javaScriptErrors?.length ? false : true"
    >
      <template #rActions>
        <div class="date">
          <div><img src="@/assets/24.png" /></div>
          <div>{{ nowDateTime.format("YYYY-MM-DD") }}</div>
        </div>
      </template>
      <BasicTable
        :titles="['错误消息', '发生次数', '影响用户']"
        :data-list="javaScriptErrorRows"
      />
    </DataCard>
    <DataCard
      class="card"
      title="Promise错误"
      :loading="promiseErrorsLoading"
      :empty="promiseErrors?.length ? false : true"
    >
      <template #rActions>
        <div class="date">
          <div><img src="@/assets/24.png" /></div>
          <div>{{ nowDateTime.format("YYYY-MM-DD") }}</div>
        </div>
      </template>
      <BasicTable
        :titles="['错误消息', '发生次数', '影响用户']"
        :data-list="promiseErrorRows"
      />
    </DataCard>
  </div>
</template>

<script setup lang="ts">
import BasicTable from "@/components/BasicTable.vue";
import DataCard from "@/components/DataCard.vue";
import { useJavaScriptErrors, usePromiseErrors } from "@/hooks";
import dayjs from "dayjs";

let nowDateTime = $ref(dayjs());

const { javaScriptErrors, javaScriptErrorsLoading } = $(
  useJavaScriptErrors({
    startTime: nowDateTime.subtract(5, "d"),
    endTime: nowDateTime,
  })
);

const javaScriptErrorRows = $computed(
  () =>
    javaScriptErrors?.map((item) => [item.msg, item.count, item.userCount]) ||
    []
);

const { promiseErrors, promiseErrorsLoading } = $(
  usePromiseErrors({
    startTime: nowDateTime.subtract(5, "d"),
    endTime: nowDateTime,
  })
);

const promiseErrorRows = $computed(
  () =>
    promiseErrors?.map((item) => [item.msg, item.count, item.userCount]) || []
);
</script>

<style scoped lang="scss">
.content {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 10px;

  .card {
    flex: 1;
    height: calc(100% - 20px);
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
}

.date {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
