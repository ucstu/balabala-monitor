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

const { promiseErrors, promiseErrorsLoading } = $(
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

const { javaScriptErrors, javaScriptErrorsLoading } = $(
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

const allErrorLoading = $computed(
  () => javaScriptErrorsLoading || promiseErrorsLoading
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

  .bottom {
    .list {
      height: auto;

      .type {
        font-size: 18px;
        font-weight: 600;
      }

      .list-title,
      .sort {
        display: grid;
        grid-template-columns: 4fr 1fr 1fr;
        align-items: center;
        width: 100%;
        height: 80px;
        text-align: center;
        border-collapse: collapse;
        background-color: rgb(248 175 5 / 50%);

        .list-title-name {
          font-size: 16px;
          font-weight: 500;
          color: rgb(0 0 0 / 85%);
        }

        .sort-content {
          display: flex;
          flex-direction: row;
          font-size: 16px;
          font-weight: 500;
          color: rgb(0 0 0 / 85%);
        }

        .list-title-name:nth-child(1),
        .list-left {
          padding-right: 10px;
          padding-left: 10px;
          text-align: left;
        }
      }

      .list-content {
        .sort {
          height: 100px;
          background-color: #fff;
          border-bottom: 1px solid rgb(118 146 146);

          &:hover {
            background-color: rgb(208 247 247);
          }

          .list-left {
            display: grid;
            grid-template-rows: 1fr 1fr;
          }
        }
      }
    }

    .page {
      float: right;
      padding: 10px;

      span {
        margin-right: 10px;
      }

      button {
        height: 30px;
      }
    }
  }
}
</style>
