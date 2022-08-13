<template>
  <div class="bg">
    <header class="header">
      <div class="title">健康数据</div>
      <div class="calendar">
        <input type="text" placeholder="今天" /><i class="fa fa-calendar-o"></i>
      </div>
    </header>
    <div class="data-board">
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

  .data-board {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 10px;

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
          color: #ea6947;
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
  }
}
</style>
