<template>
  <div class="box">
    <!-- 左侧内容 -->
    <div class="container">
      <ul class="container-top">
        <li style="color: #007fff">推荐</li>
        <li>| 最新 |</li>
        <li>热榜</li>
      </ul>
      <div class="container-m">
        <div class="container-m-top">
          <div class="span-l">用户名</div>
          <div style="cursor: pointer">| 天数 |</div>
          <div class="span-l">分类</div>
        </div>
        <div class="container-m-content">
          <a href="">标题</a>
          <div><a href="">内容</a></div>
        </div>
        <div class="container-m-botton">
          <img src="../assets/guankan.png" alt="" />
          <div>观看数</div>
          <img src="../assets/dianzan.png" alt="" />
          <div>点赞数</div>
          <img src="../assets/pinglun.png" alt="" />
          <div>评论数</div>
        </div>
        <img
          src="../assets/fengmian.png"
          alt=""
          class="container-mbox-fengmian"
        />
      </div>
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
      <img src="../assets/erweima.png" alt="" style="height: 74px" />
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
.box {
  width: 960px;
  height: 2000px;
  margin: 80px auto 0;
  text-align: center;

  .guanggao-img img {
    float: right;
    width: 240px;
    height: 200px;
    margin-bottom: 16px;
  }

  .container {
    float: left;
    width: 700px;
    height: 2000px;

    .container-top {
      height: 46px;
      padding-left: 10px;
      margin: 0;
      border-bottom: 1px solid hsl(0deg 0% 59.2% / 10%);
    }

    .container-top li {
      display: inline-block;
      float: left;
      width: 50px;
      font-size: 14px;
      line-height: 46px;
      color: #909091;
      cursor: pointer;

      &:hover {
        color: #007fff;
      }
    }

    .container-m {
      width: 660px;
      height: 121px;
      padding: 12px 20px 0;
      font-size: 13px;
      background-color: #ddd;

      .container-mbox-fengmian {
        position: relative;
        top: -85px;
        right: -270px;
        width: 120px;
        height: 80px;
        cursor: pointer;
      }

      .container-m-top {
        display: flex;
        justify-content: baseline;
        width: 100%;

        div {
          padding-right: 8px;
        }

        .span-l:hover {
          color: #007fff;
          cursor: pointer;
        }

        span {
          display: flex;
          cursor: pointer;
        }
      }

      .container-m-content {
        a {
          display: flex;
          margin: 8px 0;
          font-size: 16px;
          font-weight: 700;
          line-height: 24px;
          color: #000;
          text-decoration: none;
        }

        div a {
          display: flex;
          margin: 0 0 10px;
          font-size: 13px;
          font-weight: normal;
          line-height: 22px;
          color: #86909c;
        }
      }

      .container-m-botton {
        display: flex;

        img {
          width: 16px;
          height: 16px;
          margin-right: 4px;
          cursor: pointer;
        }

        div {
          margin-right: 20px;
          font-size: 13px;
          line-height: 16px;
          color: #4e5969;
          cursor: pointer;
        }
      }
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
}
</style>
