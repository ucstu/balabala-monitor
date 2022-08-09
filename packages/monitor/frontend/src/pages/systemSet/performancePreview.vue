<template>
  <div class="bg">
    <header class="header">
      <div class="title">页面性能</div>
      <div class="calendar">
        <input type="text" placeholder="今天" /><i class="fa fa-calendar-o"></i>
      </div>
    </header>
    <div class="add"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.bg {
  width: 100%;
  background-color: rgba(240, 240, 240, 0.3);
  padding: 25px 35px 0 25px;
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
      border: none;
      outline: none;
      height: 26px;
      width: 100px;
    }
  }
}
</style>
