<template>
  <div class="container">
    <div class="top">
      <div class="left">
        <div class="title">
          <i class="fa fa-hourglass-end"></i>
          <span> 页面加载耗时分段</span>
        </div>
        <div class="change">
          <input id="one" type="radio" name="tab" checked />
          <input id="two" type="radio" name="tab" />
          <input id="three" type="radio" name="tab" />
          <input id="four" type="radio" name="tab" />
          <input id="five" type="radio" name="tab" />
          <label for="one" class="one"
            ><span><i class="fa fa-angle-left">1秒</i></span></label
          >
          <label for="two" class="two"><span>1-5秒</span></label>
          <label for="three" class="three"><span>5-10秒</span></label>
          <label for="four" class="four"><span>10-30秒</span></label>
          <label for="five" class="five"
            ><span><i class="fa fa-angle-right">30秒</i></span></label
          >
        </div>
        <div class="data">
          <div>
            <span><strong>1980</strong>数量&nbsp;</span>
            <span><strong>27.6%</strong>百分比&nbsp;</span>
            <span><strong>08-14</strong>日期&nbsp;</span>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="title">
          <i class="fa fa-bar-chart">近三十天变化趋势（点击切换其他日期）</i>
        </div>
        <div class="bar"></div>
      </div>
    </div>
    <div class="center">
      <div class="page-title">
        <span class="page-title-span"
          ><i class="fa fa-bars">页面列表</i>（点击接口查看详情）</span
        >
      </div>
      <div class="bars">
        <div class="bar1"></div>
        <div class="bar2"></div>
      </div>
    </div>
    <div class="bottom">
      <div>
        <div class="time-title">时间范围<span>9:00</span></div>
        <div class="list">
          <ul>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
            <li>
              <span>www.baidu.com</span
              ><i class="fa fa-chain-broken"></i>(163)<i
                class="fa fa-angle-right"
              ></i>
            </li>
          </ul>
        </div>
      </div>
      <div class="left">
        <div class="board">
          <div class="board-data">
            <div class="time">
              <span>平均网络耗时</span>
              <span>6.82s</span>
            </div>
            <div class="icon">
              <i class="fa fa-hourglass-end"></i>
            </div>
          </div>
          <div class="board-data">
            <div class="time">
              <span>影响用户</span>
              <span>6.82s</span>
            </div>
            <div class="icon">
              <i class="fa fa-male"></i>
            </div>
          </div>
        </div>
        <div class="bar3"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.container {
  padding: 0 10px;
  margin-top: 5px;
}

.container .top {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .left {
    width: 415px;
    height: 200px;
    margin-left: 20px;

    .title {
      padding: 20px 0;
    }

    .change {
      border-radius: 5px;

      input {
        display: none;
      }

      span {
        padding: 10px 20px;
        font-size: 15px;
        color: rgb(186 186 186);
        cursor: pointer;
        background-color: rgb(231 231 231);
      }

      span:nth-child(1) {
        border-radius: 10px 0 0 10px;
      }

      span:nth-child(5) {
        border-radius: 0 10px 10px 0;
      }

      #one:checked ~ label.one span,
      #two:checked ~ label.two span,
      #three:checked ~ label.three span,
      #four:checked ~ label.four span,
      #five:checked ~ label.five span {
        color: #fff;
        background-color: #ea6947;
      }
    }

    .data {
      display: flex;
      justify-content: space-around;
      margin: 40px 0;

      div {
        margin: 0 auto;

        strong {
          font-size: 20px;
        }
      }
    }
  }

  .right {
    width: 1050px;

    .title {
      padding: 20px 0;
    }

    .bar {
      width: 100%;
      height: 125px;
      background-color: aqua;
    }
  }
}

.container .center {
  height: 253.4px;

  .page-title {
    display: flex;

    .page-title-span {
      padding: 10px 0;
      margin-left: 20px;
      border-bottom: 5px solid rgb(116 160 160);

      i {
        font-size: 18px;
        color: rgb(116 160 160);
      }
    }
  }

  .bars {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 10px;

    .bar1 {
      width: 415px;
      height: 200px;
      margin-left: 20px;
      background-color: rgb(116 160 160);
    }

    .bar2 {
      width: 1050px;
      height: 100%;
      height: 200px;
      background-color: rgb(116 160 160);
    }
  }
}

.container .bottom {
  display: flex;
  justify-content: space-between;

  .time-title {
    padding: 20px;
  }

  .list ul {
    width: 400px;
    list-style: none;

    li {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 41px;
      margin-bottom: 10px;
      background-color: rgb(230 230 230);

      .fa {
        margin: 0 10px;
      }
    }
  }

  .left {
    width: 1050px;

    .board {
      display: flex;
      margin-top: 70px;

      .board-data {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 200px;
        height: 60px;
        padding: 20px 10px;
        margin-left: 10px;
        background-color: aqua;
        border-radius: 10px;

        .time {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 60px;
          font-size: 20px;
          font-weight: 600;
        }

        .icon {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          font-size: 30px;
        }
      }
    }

    .bar3 {
      width: 100%;
      height: 200px;
      margin-top: 20px;
      background-color: aqua;
    }
  }
}
</style>
