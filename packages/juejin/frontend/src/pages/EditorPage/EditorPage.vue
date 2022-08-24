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
          align-items: center;
          justify-items: end;
          width: 100%;
          height: 100%;
          padding-right: 20px;
          white-space: nowrap;
        "
      >
        <span
          style="justify-items: end; font-size: 14px; color: rgb(0 0 0 / 40%)"
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
  <MarkdownEditor :mark-string="markString" @handleEditor="handleChange" />
  <PublishConfirm />
</template>

<script lang="ts" setup>
import { postArticle } from "@/apis";
import { ref } from "vue";
import MarkdownEditor from "./MarkdownEditor.vue";
import PublishConfirm from "./PublishConfirm.vue";

const markString = ref("");
const handleChange = (v: any) => {
  markString.value = v;
};
const publishEssay = () => {
  postArticle({
    requestBody: {
      articleTitle: "string",
      articleClass: 1,
      articleTags: "string",
      articleCover: "string",
      articleSummary: "string",
      articleContent: markString.value,
    },
  }).then((res) => {
    console.log(res);
  });
};
</script>

<style lang="scss" scoped>
.header {
  display: grid;
  grid-template-columns: 2.5% 65% 1fr 2%;
  grid-gap: 0;
  align-content: center;
  width: 100%;
  margin-top: 70px;

  input {
    width: 80%;
    height: 60px;
    font-size: 25px;
    border-style: none;
    outline: none;

    // &:input-placeholder,
    // &::input-placeholder {
    //   color: rgb(0 0 0 / 50%);
    // }
  }

  .avatar-info {
    justify-items: start;
    width: 30px;
    height: 30px;
    border-radius: 50px;
  }

  .header-right {
    display: grid;
    grid-template-columns:
      calc(35% - 8px) repeat(2, calc(20% - 8px)) calc(10% - 8px)
      calc(15% - 8px);
    column-gap: 10px;
    align-items: center;
    justify-items: center;
    width: 100%;

    .button {
      height: 30px;
      font-size: 14px;
      line-height: 28px;
      text-align: center;
      cursor: pointer;
      border: solid 1px #1d7dfa;
      border-radius: 5px;
    }

    .draft {
      width: 75px;
      color: #1d7dfa;
      background-color: rgb(255 255 255 / 10%);
      border-radius: 5px;

      &:hover {
        background-color: rgb(0 0 0 / 20%);
      }
    }

    .publish {
      width: 60px;
      color: #fff;
      background-color: #1d7dfa;
    }
  }
}
</style>
