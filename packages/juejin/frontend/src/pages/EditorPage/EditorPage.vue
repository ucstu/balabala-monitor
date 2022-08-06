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
    <div></div>
  </div>
  <div class="md_root_content" v-bind:style="{ width: 1000, height: 600 }">
    <!--功能按钮区-->
    <div class="button_bar">
      <div class="button-left">
        <div class="button-editor list">
          <SvgIcon
            name="a-edit-office-richtext-headline-style"
            style="width: 18px"
          ></SvgIcon>
          <div class="list-select">
            <ul>
              <li v-for="(item, index) in Hlist" @click="addTitle(index)">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
        <div
          class="button-editor"
          v-for="(item, index) in svgNames"
          :key="item"
        >
          <SvgIcon
            :name="item"
            style="width: 18px"
            @click="addinfo(index)"
          ></SvgIcon>
          <div class="list-select" style="display: none">
            <span v-for="item in Hlist">{{ item }}</span>
          </div>
        </div>
      </div>
      <div></div>
    </div>

    <!--主要内容区-->
    <div class="content_bar">
      <!-- markdown编辑器区 -->
      <div class="markdown_body">
        <div
          ref="ref_md_edit"
          class="md_textarea_content"
          style="font-size: 24px"
        ></div>
      </div>
      <!--解析成html区-->
      <div class="html_body">
        <Viewer
          :value="markString"
          :plugins="[
            breaks(),
            frontmatter(),
            gemoji(),
            gfm(),
            highlight(),
            math(),
            zoom(),
            mermaid(),
          ]"
        />
      </div>
    </div>
  </div>
  <div class="bottom">
    <div class="bytemd-status-left">
      <span>字数: <strong>0</strong></span
      ><span>行数: <strong>1</strong></span>
    </div>
    <div class="bytemd-status-right">
      <label><input type="checkbox" />同步滚动</label><span>回到顶部</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from "@/components/SvgIcon.vue";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math";
import zoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import { Viewer } from "@bytemd/vue-next";
import "highlight.js/styles/github.css";
import * as monaco from "monaco-editor";
import { nextTick, ref } from "vue";

const markString = ref("");

const Hlist = [
  "H1 一级标题",
  "H2 二级标题",
  "H3 三级标题",
  "H4 四级标题",
  "H5 五级标题",
  "H6 六级标题",
];

const ref_md_edit = ref<HTMLElement>(null as unknown as HTMLElement);

nextTick(() => {
  const editor = monaco.editor.create(ref_md_edit.value, {
    automaticLayout: true,
    lineNumbers: false as any,
    minimap: {
      enabled: false,
    },
    language: "markdown",
  });
  editor.onDidChangeModelContent(() => {
    markString.value = editor.getValue();
  });
});

const addinfo = (index: number) => {};

const addTitle = (index: number) => {
  let idx = index + 1;
  const str1 = "#".repeat(idx);
};

const svgNames = ref<Array<string>>([
  "ziyuan",
  "a-edit-office-italic-tilt-richtext",
  "a-edit-office-richtext-quote",
  "lianjie",
  "tupian",
  "a-edit-office-richtext-program",
  "daimapianduan",
  "brackets-curly",
  "a-edit-office-richtext-list",
  "youxuliebiao",
  "a-edit-office-richtext-slash-delete",
  "zu",
  "a-edit-office-richtext-table",
  "a-edit-office-richtext-centeralined",
]);
const sty = ["list"];
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
      width: 100%;
      height: 100%;
    }

    .html_body {
      width: 50%;
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
.bottom {
  font-size: 12px;
  line-height: 24px;
  border-top: 1px solid #e1e4e8;
  border-top: transparent;
  .bytemd-status-left {
    float: left;
  }
  .bytemd-status-right {
    float: right;
  }
  span {
    padding-left: 16px;
  }
}
</style>
