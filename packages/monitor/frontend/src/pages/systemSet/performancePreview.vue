<template>
  <div class="bg">
    <header class="header">
      <div class="title">页面性能</div>
      <div class="calendar">
        <input type="text" placeholder="今天" /><i class="fa fa-calendar-o"></i>
      </div>
    </header>
    <div class="board">
      <div class="data-board">
        <span>TTFB平均时间</span>
        <span>985ms</span>
      </div>
      <div class="data-board">
        <span>DOM解析时间</span>
        <span>2.58s</span>
      </div>
      <div class="data-board">
        <span>页面平均加载时间</span>
        <span>2.74s</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  padding: 25px 35px 0 25px;
  background-color: rgb(240 240 240 / 30%);

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    .title {
      font-size: 18px;
      font-weight: 600;
    }

    .calendar {
      padding: 5px 0;
    }

    .calendar input {
      width: 100px;
      height: 26px;
      border: none;
      outline: none;
    }
  }

  .board {
    display: flex;
    justify-content: space-between;
    width: 100%;

    .data-board {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 30%;
      height: 70px;
      padding: 20px 15px;
      background-color: white;
      border-radius: 5%;
    }

    .data-board span:nth-child(1) {
      font-size: 18px;
    }

    .data-board span:nth-child(2) {
      font-size: 30px;
      font-weight: 600;
    }
  }
}
</style>
