<template>
  <div>
    <div class="header">
      <div></div>
      <a href="/" class="logo">
        <img src="@/assets/logo.png" alt="" class="logo-info" />
      </a>
      <div class="header-left">
        <div class="header-right-item" v-for="item in TopFence">
          <a href="/">{{ item }}</a>
        </div>
      </div>
      <div class="header-right">
        <input type="text" placeholder="请输入搜索内容" />
        <button>创作者中心</button>
        <img src="@/assets/vip.png" alt="" class="vip-info" />
        <img
          src="https://th.bing.com/th/id/R.0d4d56a772f73a4c146aa4754f8c17f8?rik=d3RxqOmmhPIZTg&pid=ImgRaw&r=0"
          class="avatar-info"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";

const TopFence = [
  "首页",
  "沸点",
  "课程",
  "直播",
  "活动",
  "商城",
  "APP",
  "插件",
];
onMounted(() => {
  console.log(TopFence);
});
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  height: 110px;
  grid-template-columns: 100px 120px 1fr 1fr;
  align-items: center;

  .logo-info {
    width: 125px;
    height: 40px;
  }

  .header-left {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
  }

  .header-right {
    display: grid;
    grid-template-columns: repeat(5, 1fr);

    .vip-info {
      width: 60px;
      height: 40px;
    }

    .avatar-info {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
