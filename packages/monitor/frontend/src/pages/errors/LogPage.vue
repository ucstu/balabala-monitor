<template>
  <div class="global">
    <!-- <HeaderBar
      v-show="!route?.meta?.hiddenHeader"
      :route="route"
      class="header"
    ></HeaderBar> -->
    <div class="content">
      <div class="content-items">
        <div class="content-top">
          <div>概览</div>
          <div>错误列表</div>
          <div>版本分析</div>
          <div>待处理错误</div>
        </div>
        <div class="content-bottom"><overview></overview></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import overview from "./overview.vue";
const route = useRoute();
</script>

<style scoped lang="scss">
.global {
  width: 100%;
  overflow: auto;
  background-color: rgb(0 0 0 / 4%);
  .box {
    position: relative;
    img {
      position: absolute;
      top: 20px;
    }
  }

  img {
    cursor: pointer;
  }

  .content {
    .content-items {
      box-sizing: border-box;
      margin: 20px;
      background-color: rgb(255, 255, 255);
      display: grid;
      grid-template-rows: 1fr 10fr;
      .content-top {
        width: 100%;
        font-size: 16px;
        font-weight: 500;
        border-bottom: 1px solid #ccc;
        display: flex;
        flex-direction: row;
      }
      .content-top div {
        padding: 20px;
        cursor: pointer;
      }
      .content-top div:active {
        border-bottom: 4px solid #ea6947;
        color: #ea6947;
      }
    }
  }
}
</style>
