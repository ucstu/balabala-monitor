<template>
  <div class="global">
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
import overview from "./APIOverview.vue";
</script>

<style scoped lang="scss">
.global {
  width: 100%;
  overflow: auto;
  background-color: rgb(0 0 0 / 4%);

  img {
    cursor: pointer;
  }

  .box {
    position: relative;

    img {
      position: absolute;
      top: 20px;
    }
  }

  .content {
    .content-items {
      box-sizing: border-box;
      display: grid;
      grid-template-rows: 1fr 10fr;
      margin: 20px;
      background-color: rgb(255 255 255);

      .content-top {
        display: flex;
        flex-direction: row;
        width: 100%;
        height: 60px;
        font-size: 16px;
        font-weight: 500;
        border-bottom: 1px solid #ccc;
      }

      .content-top div {
        padding: 20px;
        cursor: pointer;
      }

      .content-top div:active {
        color: #ea6947;
        border-bottom: 4px solid #ea6947;
      }
    }
  }
}
</style>
