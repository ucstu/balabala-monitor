<template>
  <div>
    <div class="header">
      <div class="header-top">
        <div></div>
        <a href="/" class="logo">
          <img src="@/assets/logo.png" alt="" class="logo-info" />
        </a>
        <div class="header-left">
          <div class="header-left-item" v-for="(item, index) in TopFence">
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
              style="
                height: 100%;
                width: 1px;
                background-color: rgb(0, 0, 0, 0.1);
              "
            ></span>
            <div>
              <div class="trangle"></div>
            </div>
          </div>
          <img src="@/assets/vip.png" alt="" class="vip-info" />
          <div></div>
          <img
            src="https://th.bing.com/th/id/R.0d4d56a772f73a4c146aa4754f8c17f8?rik=d3RxqOmmhPIZTg&pid=ImgRaw&r=0"
            class="avatar-info"
          />
        </div>
      </div>
      <Divider />
      <div class="header-bottom">
        <div></div>
        <div class="label-fence">
          <div
            v-for="(item, index) in BottomFence"
            class="click"
            :key="index"
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
  </div>
</template>

<script lang="ts" setup>
import router from "../router";
import Divider from "./Divider.vue";

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
  height: 110px;
  grid-template-rows: 60px 1px 50px;

  .header-top {
    display: grid;
    grid-template-columns: 60px 130px 25% 8% 1fr;
    align-items: center;
    column-gap: 20px;
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
          height: 100%;
          cursor: pointer;
          align-items: center;
          &:hover {
            color: rgb(25, 128, 255);
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
        width: 100%;
        height: 100%;
        background: rgb(30, 128, 255);
        border-radius: 5%;
        display: grid;
        cursor: pointer;
        grid-template-columns: 83% 1px 1fr;
        .trangle {
          width: 0px;
          height: 0px;
          border: 5px solid #000;
          border-top-color: white;
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
        }
      }

      .vip-info {
        width: 61px;
        height: 25px;
      }

      .avatar-info {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
  .header-bottom {
    display: grid;
    grid-template-columns: 18% 45% 1fr;
    column-gap: 20px;
    .biaoqian1 {
      position: relative;
      .biaoqian {
        position: absolute;
        color: #666;
        font-size: 14px;
        top: 12px;
        right: 200px;
        cursor: pointer;
        &:hover {
          color: rgb(25, 128, 255);
        }
      }
    }

    .label-fence {
      display: grid;
      align-items: center;
      grid-template-columns: repeat(10, 1fr);
      grid-gap: 10px;
      font-size: 14px;
      color: #666;
      .click {
        display: grid;
        height: 100%;
        cursor: pointer;
        align-items: center;
        justify-items: center;
        &:hover {
          color: rgb(25, 128, 255);
        }
      }
    }
  }
}
</style>
