<template>
  <div class="details">
    <Editor
      class="editos"
      :value="markString"
      :plugins="plugins"
      :locale="zhHans"
      @change="handleChange"
      :uploadImages="uploadImage"
    />
  </div>
</template>

<script lang="ts" setup>
// 这里就是引入所有的扩展的插件
import { postImages } from "@/apis";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math-ssr";
import zoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import { Editor } from "@bytemd/vue-next";
import "bytemd/dist/index.css"; // 导入编辑器样式
import zhHans from "bytemd/lib/locales/zh_Hans.json";
import "highlight.js/styles/vs.css";
import "juejin-markdown-themes/dist/juejin.min.css"; // 其实就是需要这个css文件
interface Props {
  markString: string;
}
const props = withDefaults(defineProps<Props>(), {
  markString: "",
});
const emit = defineEmits(["handleEditor"]);
const plugins = [
  // 将所有的扩展功能放入插件数组中，然后就可以生效了
  breaks(),
  frontmatter(),
  gemoji(),
  gfm(),
  highlight(),
  math(),
  zoom(),
  mermaid(),
];

// 获取书写文档内容
const handleChange = (v: any) => {
  emit("handleEditor", v);
};

// 上传图片 点击触发上传图片事件，大家获取文件把图片上传服务器然后返回url既可
const uploadImage = async (files: any[]) => {
  console.log("files", files);
  postImages(files[0])
    .then((res) => {
      console.log(res);
    })
    .catch(() => {
      console.log("上传失败");
    });
};
</script>
<style lang="scss">
.details {
  width: 100%;
  height: 100%;
  .editos {
    .bytemd {
      height: calc(100vh - 62px) !important;
    }
  }
}
</style>
