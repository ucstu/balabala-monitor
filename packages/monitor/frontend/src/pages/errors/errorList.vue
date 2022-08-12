<template>
  <div class="global">
    <div class="top">
      <div class="top-left">
        <form action="#">
          <select>
            <option>全部错误</option>
            <option>错误</option>
            <option>自定义异常</option>
          </select>
        </form>
      </div>
      <div class="top-right">
        <div class="sort">sort</div>
        <div class="calender">calendar</div>
      </div>
    </div>
    <div class="bottom">table</div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.global {
  background-color: rgb(88, 185, 185);
  height: 100%;

  width: 100%;

  .top {
    height: 60px;
    .top-left {
      float: left;
      margin: 20px 20px;
      select {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .top-right {
      float: right;
      margin: 20px 20px;

      div {
        display: inline-block;
        margin-right: 20px;
      }
    }
  }
  bottom {
    width: 100%;
    height: auto;
  }
}
</style>
