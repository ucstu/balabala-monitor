<template>
  <div class="global">
    <div class="content">
      <div class="content-left">
        <div class="list">
          <div class="list-title">
            <div class="list-title-name">高频错误</div>
            <div class="list-title-name">发生次数</div>
            <div class="list-title-name">影响人数</div>
          </div>
          <div v-for="(item, index) in list" :key="index" class="list-content">
            <div class="sort">
              <div class="list-left sort-content">
                <div class="list-left-top sort-content">
                  <div class="type">{{}}</div>
                  <div>{{}}</div>
                </div>
                <div class="list-left-bottom sort-content">{{}}</div>
              </div>
              <div class="list-center">{{}}</div>
              <div class="list-right">{{}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="list">
          <div class="list-title">
            <div class="list-title-name">最新错误</div>
            <div class="list-title-name">发生次数</div>
            <div class="list-title-name">影响人数</div>
          </div>
          <div v-for="(item, index) in list" :key="index" class="list-content">
            <div class="sort">
              <div class="list-left sort-content">
                <div class="list-left-top sort-content">
                  <div class="type">{{}}</div>
                  <div>{{}}</div>
                </div>
                <div class="list-left-bottom sort-content">{{}}</div>
              </div>
              <div class="list-center">{{}}</div>
              <div class="list-right">{{}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getErrorsInterfaceerrors,
  getErrorsInterfaceerrorstatistics,
} from "@/apis";
import { useStore } from "@/stores";
import { InterfaceIndicator } from "@balabala/monitor-api";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
let list: never[];

let store = useStore();
let { appId } = $(storeToRefs(store));

const loadInterfaceErrors = () => {
  getErrorsInterfaceerrors({
    appId,
    endTime: "",
    startTime: "",
    mainType: InterfaceIndicator.mainType.InterfaceIndicator,
    subType: InterfaceIndicator.subType.InterfaceIndicator,
  }).then((res) => {
    console.log(res);
  });
};
const loadInterfaceErrorStatistics = () => {
  getErrorsInterfaceerrorstatistics({
    appId,
    endTime: "",
    startTime: "",
    mainType: InterfaceIndicator.mainType.InterfaceIndicator,
    subType: InterfaceIndicator.subType.InterfaceIndicator,
  }).then((res) => {
    console.log(res);
  });
};

onMounted(() => {
  loadInterfaceErrors();
  loadInterfaceErrorStatistics();
});
</script>

<style scoped lang="scss">
.global {
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 4%);

  img {
    float: right;
    width: 18px;
    height: 18px;
  }
}

.content {
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: auto;
  padding: 20px;

  .content-left {
    box-sizing: border-box;
    height: 100%;
    margin-right: 5px;
    background-color: rgb(255 255 255);
  }

  .content-right {
    box-sizing: border-box;
    height: 100%;
    margin-left: 5px;
    background-color: rgb(255 255 255);
  }
}

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
    height: 100px;
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
      height: 110px;
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
</style>
