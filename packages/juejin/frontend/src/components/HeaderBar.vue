<template>
  <div class="header">
    <div class="header-top">
      <div></div>
      <a href="/" class="logo">
        <img src="@/assets/logo.png" alt="" class="logo-info" />
      </a>
      <div class="header-left">
        <div
          v-for="(item, index) in TopFence"
          :key="index"
          class="header-left-item"
        >
          <div class="click">
            <span>{{ item }}</span>
          </div>
        </div>
      </div>
      <div></div>
      <div class="header-right">
        <input type="text" placeholder="探索稀土掘金" />
        <div
          class="button"
          style="display: grid; align-items: center; justify-items: center"
          @click="toEditor"
        >
          <div>创作者中心</div>
          <span
            style="width: 1px; height: 100%; background-color: rgb(0 0 0 / 10%)"
          ></span>
          <div>
            <div class="trangle"></div>
          </div>
        </div>
        <img src="@/assets/vip.png" alt="" class="vip-info" />
        <div></div>
        <!-- <button class="avatar-info login-btn">登录</button> -->
        <UserLogin v-if="!store.token" />
        <div v-else>
          <img
            src="@/assets/change.png"
            alt=""
            srcset=""
            style="height: 30px"
          />
        </div>
      </div>
    </div>
    <ComDivider />
    <div class="header-bottom">
      <div></div>
      <div class="label-fence">
        <div
          v-for="(item, index) in BottomFence"
          :key="index"
          class="click"
          @click="toPage(index)"
        >
          <span>{{ item }}</span>
        </div>
      </div>
      <div class="biaoqian1">
        <div class="biaoqian">标签管理</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/stores";
import router from "../router";
import ComDivider from "./ComDivider.vue";
import UserLogin from "./UserLogin.vue";

const store = useStore();

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
const BottomFence = [
  "综合",
  "关注",
  "后端",
  "前端",
  "Android",
  "iOS",
  "人工智能",
  "开发工具",
  "代码人生",
  "阅读",
];
const toPage = (index: number) => {
  console.log("toPage", index);
};
//前往编辑页面
const toEditor = () => {
  router.push("/editor");
};
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-rows: 60px 1px 50px;
  height: 110px;

  .header-bottom {
    display: grid;
    grid-template-columns: 18% 45% 1fr;
    column-gap: 20px;
    background-color: #fff;
    box-shadow: 0 2px 2px 0 rgb(118 118 118 / 20%);

    .biaoqian1 {
      position: relative;

      .biaoqian {
        position: absolute;
        top: 12px;
        right: 200px;
        font-size: 14px;
        color: #666;
        cursor: pointer;

        &:hover {
          color: rgb(25 128 255);
        }
      }
    }

    .label-fence {
      display: grid;
      grid-template-columns: repeat(10, 1fr);
      grid-gap: 10px;
      align-items: center;
      font-size: 14px;
      color: #666;

      .click {
        display: grid;
        align-items: center;
        justify-items: center;
        height: 100%;
        cursor: pointer;

        &:hover {
          color: rgb(25 128 255);
        }
      }
    }
  }

  .header-top {
    display: grid;
    grid-template-columns: 60px 130px 25% 8% 1fr;
    column-gap: 20px;
    align-items: center;
    background-color: #fff;

    .logo-info {
      width: 130px;
      height: 38px;
    }

    .header-left {
      display: grid;
      grid-template-columns: repeat(8, 1fr);
      height: 100%;

      .header-left-item {
        display: grid;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;

        &:hover {
          color: #333;
        }

        .click {
          display: grid;
          align-items: center;
          height: 100%;
          cursor: pointer;

          &:hover {
            color: rgb(25 128 255);
          }
        }
      }
    }

    .header-right {
      display: grid;
      grid-template-columns: 46% 120px 8% 30px 1fr;
      column-gap: 20px;
      align-items: center;

      input {
        height: 100%;
      }

      .button {
        display: grid;
        grid-template-columns: 83% 1px 1fr;
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: rgb(30 128 255);
        border-radius: 5px;

        .trangle {
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-top-color: white;
        }
      }

      .vip-info {
        width: 61px;
        height: 25px;
      }

      .avatar-info {
        width: 60px;
        height: 35px;
        border-radius: 3px;
      }
    }
  }
}
</style>
