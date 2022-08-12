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
  margin: 22px auto 0;
  text-align: center;

  .container {
    float: left;
    width: 700px;
    height: 2000px;

    .container-top {
      height: 46px;
      margin: 0;
      border-bottom: 1px solid hsl(0deg 0% 59.2% / 10%);
    }

    .container-top li {
      display: inline-block;
      float: left;
      width: 50px;
      font-size: 14px;
      line-height: 46px;
      color: #909090;
    }
  }

  .signin {
    box-sizing: border-box;
    float: right;
    width: 240px;
    height: 96px;

    // 为了看清才用的这个颜色
    padding: 16px;
    margin-bottom: 16px;
    background-color: aqua;

    .sigin-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;

      .rili {
        display: flex;
      }

      .title {
        display: flex;
        margin-top: 2px;
        font-size: 18px;
        font-weight: 500;
        color: #1d2129;
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
    font-size: 14px;
    color: #4e5969;
  }

  .guanggao-img img {
    float: right;
    width: 240px;
    height: 200px;
    margin-bottom: 16px;
  }
}
</style>
