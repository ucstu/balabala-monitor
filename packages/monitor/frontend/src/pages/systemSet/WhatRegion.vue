<template>
  <div class="bg">
    <header class="header">
      <div class="title"></div>
      <div class="calendar">
        <input type="text" placeholder="今天" /><i class="fa fa-calendar-o"></i>
      </div>
    </header>
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
}
</style>
