<template>
  <div class="global">
    <div class="top">
      <div class="top-left">
        <form action="#">
          <select v-model="statusCode">
            <option value="400">400</option>
            <option value="500">500</option>
          </select>
        </form>
      </div>
      <div class="top-right">
        <div class="calendar">
          <input v-model="startTime" type="date" />
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="list">
        <div class="list-title">
          <div class="list-title-name">错误排行</div>
          <div class="list-title-name">发生次数</div>
          <div class="list-title-name">影响人数</div>
        </div>
        <div
          v-for="(item, index) in pagedList[page]"
          :key="index"
          class="list-content"
        >
          <div class="sort">
            <div class="list-left sort-content">
              <div class="list-left-top sort-content">
                <div class="type">interfaceErrors</div>
                <div>{{ statusCode }}</div>
              </div>
              <div class="list-left-bottom sort-content">
                {{ item.dateTime }}
              </div>
            </div>
            <div class="list-center">{{ item.count }}</div>
            <div class="list-right">{{ item.userCount }}</div>
          </div>
        </div>
      </div>
      <div class="page">
        <span><button @click="page = 0">首页</button></span>
        <span
          ><button @click="page = page > 0 ? page-- : 0">上一页</button></span
        >
        <span
          ><button
            @click="
              page =
                page < pagedList.length / size
                  ? page++
                  : pagedList.length / size
            "
          >
            下一页
          </button></span
        >
        <span>当前&nbsp;{{ page + 1 }}&nbsp;页</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getErrorsInterfaceerrorstatistics } from "@/apis";
import { useStore } from "@/stores";
import { BasicStatistic } from "@/types";
import { InterfaceIndicator } from "@balabala/monitor-api";
import dayjs from "dayjs";
import { storeToRefs } from "pinia";
import { watch } from "vue";
let store = useStore();
let { appId } = $(storeToRefs(store));
let startTime = $ref(dayjs().format("YYYY-MM-DD"));

let statusCode: number = $ref(400);

const interfaceErrorStatisticsParam = $computed(() => {
  return {
    appId,
    mainType: InterfaceIndicator.mainType.InterfaceIndicator,
    subType: InterfaceIndicator.subType.InterfaceIndicator,
    startTime: dayjs(startTime).format("YYYY-MM-DD"),
    endTime: dayjs().add(1, "day").format("YYYY-MM-DD"),
    statusCode,
  };
});

let page = $ref(0);
let size = $ref(3);
let pagedList = $ref<Array<Array<BasicStatistic>>>([]);

const loadInterfaceErrorStatistics = async () => {
  const { data } = await getErrorsInterfaceerrorstatistics(
    interfaceErrorStatisticsParam
  );
  for (let i = 0; i < data.length; i += 5) {
    pagedList.push(data.slice(i, i + 5));
  }
};

watch(
  () => statusCode,
  (newVal, _oldVal) => {
    if (Number(newVal) == 500) {
      loadInterfaceErrorStatistics;
    } else {
      loadInterfaceErrorStatistics;
    }
  }
);

loadInterfaceErrorStatistics();
</script>

<style scoped lang="scss">
.global {
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 4%);

  .top {
    width: 100%;
    height: 70px;

    .top-left {
      box-sizing: border-box;
      float: left;
      width: 140px;
      height: 40px;
      padding: 30px;
      font-size: 16px;
      font-weight: 800;
      cursor: pointer;

      select {
        width: 140px;
        height: 40px;
        font-size: 16px;
        font-weight: 800;
        cursor: pointer;
      }
    }

    .top-right {
      float: right;
      padding: 30px;

      select {
        cursor: pointer;
        border: 0;
      }

      div {
        display: inline-block;
        margin-top: 10px;
        margin-right: 20px;
      }

      .sort {
        width: 160px;
        background-color: rgb(255 255 255);
        border: 1px solid #ccc;

        div {
          margin: 5px 10px;
        }
      }
    }

    .calendar {
      input {
        width: 130px;
        height: 32px;
        font-size: 14px;
        border: 0;
        border: 1px solid #d9d9d9;
        border-radius: 5px;
        outline: none;
        transition: all 30ms;

        &:focus {
          outline: 2px solid #1890ff;
        }
      }
    }
  }

  .bottom {
    padding: 30px;

    .list {
      height: auto;

      .type {
        margin-right: 20px;
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
</style>
