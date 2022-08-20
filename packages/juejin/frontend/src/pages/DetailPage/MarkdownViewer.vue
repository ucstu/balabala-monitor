<template>
  <div class="details">
    <Viewer
      class="editos"
      :value="markString"
      :plugins="plugins"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts" setup>
// 这里就是引入所有的扩展的插件
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import gemoji from "@bytemd/plugin-gemoji";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import math from "@bytemd/plugin-math-ssr";
import zoom from "@bytemd/plugin-medium-zoom";
import mermaid from "@bytemd/plugin-mermaid";
import { Viewer } from "@bytemd/vue-next";
import "bytemd/dist/index.css"; // 导入编辑器样式
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
