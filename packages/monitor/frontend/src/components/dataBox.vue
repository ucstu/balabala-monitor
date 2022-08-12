<template>
  <div class="box">
    <div class="main-card">
      <div class="data-board-count">
        <div class="count">
          <span>0</span>
          <span>js错误数</span>
        </div>
        <div>|</div>
        <div class="count">
          <span>--:--</span>
          <span>js错误率</span>
        </div>
      </div>
      <div class="percentage">
        <div>
          <span>周同比：</span>
          <span>--%</span>
          <i class="fa fa-arrow-up"></i>
        </div>
        <div>
          <span>周同比：</span>
          <span>--%</span>
          <i class="fa fa-arrow-up"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.box {
  width: 22%;
  padding: 10px 15px;
  background-color: white;

  .data-board-count {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .count {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      width: 100px;
      height: 60px;
    }

    .count span:nth-child(1) {
      font-size: 30px;
      font-weight: 600;
      color: pink;
    }

    .count span:nth-child(2) {
      font-size: 10px;
      color: rgb(179 179 179);
    }
  }

  .percentage {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;

    div {
      font-size: 13.6px;
      color: rgb(141 141 141);
    }
  }
}
</style>
