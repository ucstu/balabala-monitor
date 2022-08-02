<template>
  <div class="box">
    <!-- 左侧内容 -->
    <div class="container"></div>
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
  width: 1200px;
  height: 2000px;
  margin-top: 22px;
  text-align: center;
  .container {
    width: 880px;
    height: 2000px;
    float: left;
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
