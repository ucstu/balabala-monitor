<template>
  <div class="header">
    <div></div>
    <div>
      <input type="text" placeholder="输入文章标题..." />
    </div>
    <div class="header-right">
      <div
        style="
          display: grid;
          justify-items: end;
          width: 100%;
          height: 100%;
          align-items: center;
          padding-right: 20px;
        "
      >
        <span
          style="color: rgb(0, 0, 0, 0.4); font-size: 14px; justify-items: end"
          >文章将自动保存</span
        >
      </div>
      <div class="draft button">
        <span>草稿箱</span>
      </div>
      <div class="publish button">
        <span>发布</span>
      </div>
      <img
        src="@/assets/change.png"
        alt=""
        style="width: 20px; height: 20px; color: azure"
      />
      <img
        src="https://th.bing.com/th/id/R.0d4d56a772f73a4c146aa4754f8c17f8?rik=d3RxqOmmhPIZTg&pid=ImgRaw&r=0"
        class="avatar-info"
      />
    </div>
  </div>
  <div class="md_root_content" v-bind:style="{ width: 1000, height: 600 }">
    <!--功能按钮区-->
    <div class="button_bar">
      <div class="button-left">
        <SvgIcon
          name="ziyuan"
          style="width: 15px"
          class="button-editor"
          @click="addBold"
        ></SvgIcon>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ziyuan"></use>
        </svg>
        <div>
          <SvgIcon
            name="ziyuan"
            style="width: 15px"
            class="button-editor"
            @click="addBold"
          ></SvgIcon>
        </div>
        <span @click="addUnderline"><B>B</B></span>
        <span @click="addItalic"><B>I</B></span>
      </div>
      <div></div>
    </div>

    <!--主要内容区-->
    <div class="content_bar">
      <!--markdown编辑器区-->
      <div class="markdown_body">
        <textarea
          ref="ref_md_edit"
          class="md_textarea_content"
          v-model="markString"
        >
        </textarea>
      </div>

      <!--解析成html区-->
      <div class="html_body">
        <p v-html="htmlString"></p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from "@/components/SvgIcon.vue";
import { ref } from "vue";

const addBold = () => {
  console.log(111);
};
const addUnderline = () => {
  console.log(222);
};
const addItalic = () => {
  console.log(333);
};
const markString = ref("");
const htmlString = ref("");
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 35px 70% 1fr;
  grid-gap: 0ch;
  input {
    font-size: 25px;
    height: 60px;
    width: 80%;
    border-style: none;
    outline: none;
    &::-webkit-input-placeholder {
      color: rgb(0, 0, 0, 0.5);
    }
  }
  .avatar-info {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    justify-items: start;
  }
  .header-right {
    display: grid;
    grid-template-columns: 35% 20% 20% 10% 15%;
    width: 100%;
    align-items: center;
    justify-items: center;
    .button {
      border-radius: 5%;
      font-size: 14px;
      border: solid 1px #1d7dfa;
      text-align: center;
      height: 30px;
      line-height: 28px;
      cursor: pointer;
    }
    .draft {
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 5%;
      color: #1d7dfa;
      width: 75px;
      &:hover {
        background-color: rgb(0, 0, 0, 0.2);
      }
    }
    .publish {
      background-color: #1d7dfa;
      color: #fff;
      width: 60px;
    }
  }
}
.md_root_content {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  .button_bar {
    width: 100%;
    height: 35px;
    background-color: #fafbfc;
    border-top: solid 1px #e6e6e6;
    border-bottom: solid 1px #e6e6e6;
    display: grid;
    grid-template-columns: 70% 30%;
    align-items: center;
    .button-left {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
      margin-left: 20px;
      .button-editor {
        cursor: pointer;
        &:hover {
          width: 100%;
          height: 80%;
          background-color: rgb(225, 228, 232);
        }
      }
    }
  }
  .content_bar {
    display: flex;
    display: -webkit-flex;
    width: 100%;
    height: 100%;
    .markdown_body {
      width: 50%;
      height: 100%;
      display: flex;
      display: -webkit-flex;
    }

    .html_body {
      width: 50%;
      height: 100%;
      display: flex;
      display: -webkit-flex;
      background-color: #ffffff;
    }

    .md_textarea_content {
      flex: 1;
      height: 100%;
      padding: 12px;
      overflow: auto;
      box-sizing: border-box;
      resize: none;
      outline: none;
      border: none;
      background-color: #ffffff;
      font-size: 14px;
      color: #232323;
      line-height: 24px;
    }
  }
}
</style>
