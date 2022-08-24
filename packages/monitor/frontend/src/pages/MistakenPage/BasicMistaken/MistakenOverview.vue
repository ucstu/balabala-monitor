<template>
  <div class="content">
    <header class="header">
      <div class="title">核心数据</div>
      <div class="calendar">
        <DatePicker
          v-model:value="activeRawDateTime"
          format="YYYY-MM-DD"
          style="width: 150px"
          value-type="format"
          :editable="false"
          :clearable="false"
        />
      </div>
    </header>
    <DataCard
      class="card"
      title="JS错误"
      :loading="javaScriptErrorsLoading"
      :empty="javaScriptErrors?.length ? false : true"
    >
      <template #rActions>
        <div class="date">
          <div><img src="@/assets/24.png" /></div>
          <div>{{ activeDateTime.format("YYYY-MM-DD") }}</div>
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
          <div>{{ activeDateTime.format("YYYY-MM-DD") }}</div>
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
import DatePicker from "vue-datepicker-next";
import "vue-datepicker-next/index.css";

let activeDateTime = $ref(dayjs());
let activeRawDateTime = $computed({
  get: () => activeDateTime.format("YYYY-MM-DD"),
  set: (value) => {
    activeDateTime = dayjs(value);
  },
});

const { javaScriptErrors, javaScriptErrorsLoading } = $(
  useJavaScriptErrors({
    startTime: activeDateTime.subtract(5, "d"),
    endTime: activeDateTime,
  })
);

const javaScriptErrorRows = $computed(
  () =>
    javaScriptErrors?.map((item) => [item.msg, item.count, item.userCount]) ||
    []
);

const { promiseErrors, promiseErrorsLoading } = $(
  usePromiseErrors({
    startTime: activeDateTime.subtract(5, "d"),
    endTime: activeDateTime,
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

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .title {
      display: flex;
      align-items: center;
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
