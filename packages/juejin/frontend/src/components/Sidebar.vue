<template>
  <div class="box">
    <!-- 左侧内容 -->
    <div class="container">
      <ul class="container-top">
        <li style="color: #007fff">推荐</li>
        <li>| 最新 |</li>
        <li>热榜</li>
      </ul>
    </div>
    <!-- 签到 -->
    <div class="signin">
      <div class="sigin-top">
        <img class="rili" src="../assets/rili.png" alt="" />
        <span class="title">上午好!</span>
        <a href="">
          <img class="signin-jpg" src="../assets/signin.png" />
        </a>
      </div>
      <div class="signin2">点亮你在社区的每一天</div>
    </div>
    <div class="guanggao-img">
      <img src="../assets/guanggao.png" alt="" />
      <img src="../assets/guangao2.png" alt="" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.box {
  width: 960px;
  height: 2000px;
  text-align: center;
  margin: 22px auto 0;
  .container {
    width: 700px;
    height: 2000px;
    float: left;
    .container-top {
      height: 46px;
      margin: 0px;
      border-bottom: 1px solid hsla(0, 0%, 59.2%, 0.1);
    }
    .container-top li {
      display: inline-block;
      line-height: 46px;
      width: 50px;
      float: left;
      color: #909090;
      font-size: 14px;
    }
  }
  .signin {
    width: 240px;
    height: 96px;
    background-color: aqua;
    // 为了看清才用的这个颜色
    padding: 16px;
    float: right;
    box-sizing: border-box;
    margin-bottom: 16px;
    .sigin-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      .rili {
        display: flex;
      }
      .title {
        display: flex;
        color: #1d2129;
        font-size: 18px;
        font-weight: 500;
        margin-top: 2px;
      }
      .signin-jpg {
        display: flex;
        width: 72px;
        height: 32px;
      }
    }
  }
  .signin2 {
    margin-left: 36px;
    color: #4e5969;
    font-size: 14px;
  }
  .guanggao-img img {
    width: 240px;
    height: 200px;
    float: right;
    margin-bottom: 16px;
  }
}
</style>
