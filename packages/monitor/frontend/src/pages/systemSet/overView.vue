<template>
  <div class="bg">
    <header class="header">
      <div class="title">核心数据</div>
      <div class="calendar">
        <input type="text" placeholder="今天" /><i class="fa fa-calendar-o"></i>
      </div>
    </header>
    <div class="browse-card">
      <div class="browse-head">
        <div>
          <span>流量数据</span>
        </div>
      </div>
      <div class="browse-body">
        <div class="user-info-list">
          <div>浏览量&nbsp;(PV)</div>
          <div>访客量&nbsp;(UV)</div>
          <div>新访客</div>
          <div>IP数</div>
          <div>频次&nbsp;(人均)</div>
        </div>
        <div class="user-info-list weight">
          <div>00000</div>
          <div>00000</div>
          <div>00000</div>
          <div>00000</div>
          <div>00000</div>
        </div>
        <div class="user-info-list">
          <div>较昨日&nbsp;00.00%<i class="fa fa-arrow-up"></i></div>
          <div>较昨日&nbsp;00.00%<i class="fa fa-arrow-up"></i></div>
          <div>较昨日&nbsp;00.00%<i class="fa fa-arrow-down"></i></div>
          <div>较昨日&nbsp;00.00%<i class="fa fa-arrow-down"></i></div>
          <div>较昨日&nbsp;00.00%<i class="fa fa-arrow-down"></i></div>
        </div>
      </div>
    </div>
    <div class="form">
      <div></div>
      <div></div>
      <div></div>
    </div>
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
  .browse-card .browse-head {
    width: 100%;
    height: 60px;
    background-color: white;
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin-bottom: 3px;
  }
  .browse-card .browse-body {
    width: 100%;
    background-color: white;

    .user-info-list {
      display: flex;
      justify-content: space-around;
      font-size: 15px;
      text-align: center;
      padding: 5px 0;
      div {
        width: 20%;
      }
    }
    .weight {
      font-weight: 700;
      font-size: 30px;
    }
  }
  .form {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    width: 100%;
    div {
      width: 30%;
      height: 300px;
      background-color: white;
    }
  }
}
</style>
