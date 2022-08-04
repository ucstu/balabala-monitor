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
        <div class="button-editor" v-for="item in svgNames" :key="item">
          <SvgIcon
            :name="item"
            style="width: 18px"
            @click="addinfo()"
          ></SvgIcon>
        </div>
      </div>
      <div></div>
    </div>

    <!--主要内容区-->
    <div class="content_bar">
      <!-- markdown编辑器区 -->
      <div class="markdown_body">
        <textarea
          ref="ref_md_edit"
          class="md_textarea_content"
          style="font-size: 24px"
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
import hljs from "highlight.js"; //对代码进行语法高亮的库
import { marked } from "marked"; //解析mardown语法的库
import { nextTick, Ref, ref, watch } from "vue";
const markString = ref("");
const htmlString = ref("");
watch(
  () => markString,
  (newVal, oldVal) => {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    });
    htmlString.value = marked(oldVal);
  }
);
watch(
  () => htmlString,
  (newVal, oldVal) => {
    nextTick(() => {
      const codes = document.querySelectorAll(".code");
      codes.forEach((item: any) => {
        item.innerHTML =
          "<ul><li>" +
          item.innerHTML.replace(/\n/g, "\n</li><li>") +
          "\n</li></ul>";
        hljs.highlightBlock(item);
      });
    });
  }
);
const addinfo = () => {
  changeSelectedText("#", "#");
};
const ref_md_edit: Ref<HTMLElement | null> = ref(null);
console.log(ref_md_edit);

const changeSelectedText = (startString: string, endString: string) => {
  let t = ref_md_edit;
  const selection = window.getSelection();
  if (selection) {
    if (
      t.value.selectionStart != undefined &&
      t.value.selectionEnd != undefined
    ) {
      let str1 = t.value.value.substring(0, t.value.selectionStart);
      let str2 = t.value.value.substring(
        t.value.selectionStart,
        t.value.selectionEnd
      );
      let str3 = t.value.value.substring(t.value.selectionEnd);

      let result = str1 + startString + str2 + endString + str3;
      t.value = result;
      markString.value = t.value;
    }
  }
};

const svgNames = ref<Array<string>>([
  "a-edit-office-richtext-headline-style",
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
    }
  }
  .content_bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: solid 1px #e6e6e6;
    width: 100%;
    height: 86vh;
    .markdown_body {
      width: 100%;
      height: 100%;
    }

    .html_body {
      width: 50%;
      height: 100%;
      display: flex;
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
