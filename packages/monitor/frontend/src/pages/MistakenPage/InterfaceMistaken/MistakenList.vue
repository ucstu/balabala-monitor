<template>
  <div class="content">
    <ToolBar v-model:date-time="activeDateTime" title="接口错误列表" />
    <div class="flex-row">
      <BasicTable
        :titles="['错误消息', '发生次数', '影响用户']"
        :data-list="interfaceErrorRaws.slice(page * 5, (page + 1) * 5)"
        style="flex: 7; height: 300px; margin: 0 10px 10px"
        @row-click="handleRowClick"
      />
      <DataCard title="用户列表" style="flex: 3">
        <div class="user-list">
          <div
            v-for="userID in activeUserList"
            :key="userID"
            class="user-name"
            @click="
              router.push(
                `/Behavior/BehaviorDetail?userId=${userID}&dateTime=${activeDateTime.format(
                  'YYYY-MM-DD'
                )}`
              )
            "
          >
            {{ userID }}
          </div>
        </div>
      </DataCard>
    </div>
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
import DataCard from "@/components/DataCard.vue";
import ToolBar from "@/components/ToolBar.vue";
import { useInterfaceErrors } from "@/hooks";
import dayjs from "dayjs";
import { useRouter } from "vue-router";

const router = useRouter();

let activeDateTime = $ref(dayjs());
let activeUserList = $ref<Array<string>>();

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

const handleRowClick = (row: number) => {
  activeUserList = interfaceErrors?.[row]?.userList || [];
};
</script>

<style scoped lang="scss">
.content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px;

  .user-list {
    .user-name {
      padding: 10px;
      border-radius: 5px;

      &:hover {
        cursor: pointer;
        background-color: azure;
      }

      &:checked {
        background-color: aliceblue;
      }
    }
  }
}
</style>
