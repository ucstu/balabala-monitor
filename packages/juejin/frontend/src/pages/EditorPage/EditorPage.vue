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
          white-space: nowrap;
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
      <div class="publish button" @click="publishEssay">
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
    <div></div>
  </div>
  <Editor :markString="markString" @handleEditor="handleChange" />
  <publish-comfirm />
</template>

<script lang="ts" setup>
import { postArticle } from "@/apis";
import { ref } from "vue";
import Editor from "./Editor.vue";
import PublishComfirm from "./PublishComfirm.vue";
const markString = ref("");
const handleChange = (v: any) => {
  markString.value = v;
};
const publishEssay = () => {
  postArticle(markString.value).then((res) => {
    console.log(res);
  });
};
</script>

<style lang="scss" scoped>
.body {
  overflow: hidden;
}
.header {
  display: grid;
  grid-template-columns: 2.5% 65% 1fr 2%;
  width: 100%;
  grid-gap: 0ch;
  align-content: center;
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
    grid-template-columns:
      calc(35% - 8px) repeat(2, calc(20% - 8px)) calc(10% - 8px)
      calc(15% - 8px);
    width: 100%;
    column-gap: 10px;
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
  height: 100%;
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
      grid-template-columns: repeat(15, 50px);
      align-items: center;
      margin-left: 20px;
      position: relative;
      .button-editor {
        text-align: center;
        cursor: pointer;
        width: 30px;
        height: 30px;
        &:hover {
          border-radius: 5%;
          background-color: rgb(225, 228, 232);
        }
      }
      .list {
        width: 30px;
        &:hover .list-select {
          display: block;
        }
      }
      .list-select {
        display: none;
        position: absolute;
        top: 30px;
        align-items: center;
        height: 200px;
        width: 100px;
        border-radius: 5%;
        font-size: 13px;
        border: solid 1px #e6e6e6;
        background-color: #ffffff;
        ul {
          padding: 0%;
          li {
            text-align: center;
            list-style-type: none;
            white-space: nowrap;
            padding: 2.5px 0px;
            &:hover {
              background-color: #f6f8fa;
            }
          }
        }
      }
    }
  }
  .content_bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: solid 1px #e6e6e6;
    width: 100%;
    height: calc(100vh - 60px - 35px - 30px);
    .markdown_body {
      min-width: 800px;
      width: 100%;
      height: 100%;
      margin: 0 auto;
      padding: 16px 4%;
    }

    .html_body {
      width: 100%;
      height: 100%;
      padding: 20px;
      display: flex;
      overflow: scroll;
      display: -webkit-flex;
      background-color: #ffffff;
    }

    .md_textarea_content {
      width: 100%;
      height: 100%;
      padding: 12px;
      overflow: auto;
      box-sizing: border-box;
      resize: none;
      outline: none;
      border: none;
      border-right: solid 1px #e6e6e6;
      background-color: #fafbfc;
      font-size: 14px;
      color: #232323;
      line-height: 24px;
    }
  }
}
</style>
