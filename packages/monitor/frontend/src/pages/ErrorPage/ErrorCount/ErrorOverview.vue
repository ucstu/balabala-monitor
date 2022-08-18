<template>
  <div class="global">
    <div class="content">
      <div class="content-left">
        <div class="content-top">
          <div class="error">JS错误(onerror)</div>
          <div class="date">
            <div><img src="@/assets/24.png" /></div>
            <div>{{ date }}</div>
          </div>
        </div>
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
      <div class="content-right">
        <div class="content-top">
          <div class="error">资源错误(error)</div>
          <div class="date">
            <div><img src="@/assets/24.png" /></div>
            <div>{{ date }}</div>
          </div>
        </div>
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
import { getErrorsJavascripterrors, getErrorsResourceerrors } from "@/apis";
import { onMounted } from "vue";
let list: never[];

const Errorparms = $ref({
  appid: "",
  starttime: "",
  endtime: "",
});

onMounted(() => {
  loadJavascriptErrors();
  loadResourceErrors();
});

const loadJavascriptErrors = () => {
  getErrorsJavascripterrors({ ...Errorparms })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};

const loadResourceErrors = () => {
  getErrorsResourceerrors({ ...Errorparms })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.log(err));
};

let a = new Date().getTime();
let b = new Date(a);
function nowDate(now: Date) {
  let year = now.getFullYear();
  let month = now.getMonth() + 1;
  let date = now.getDate();
  return year + "-" + month + "-" + date;
}
let date = nowDate(b);
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

  .content-top {
    display: grid;
    grid-template-columns: 1fr 1fr;

    .error {
      float: left;
      padding-left: 20px;
      margin-top: 30px;
    }

    .date {
      display: grid;
      grid-template-columns: 40px 1fr;
      justify-self: right;
      padding-right: 20px;
      margin-top: 30px;
      font-size: 12px;
    }
  }

  .list {
    height: auto;
    padding-right: 20px;
    padding-bottom: 20px;
    padding-left: 20px;

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

  .content {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 10px;

    .content-left {
      box-sizing: border-box;
      display: grid;
      grid-template-rows: 100px 1fr;
      height: 100%;
      margin-right: 5px;

      // border: 2px solid #ccc;
      background-color: rgb(255 255 255);
    }
  }

  .content-right {
    box-sizing: border-box;
    display: grid;
    grid-template-rows: 100px 1fr;
    height: 100%;
    margin-left: 5px;

    // border: 2px solid #ccc;
    background-color: rgb(255 255 255);
  }
}
</style>
