<template>
  <div class="whole">
    <div style="flex: 1"></div>
    <div class="main-content">
      <MarkdownViewer :mark-string="article?.articleContent" />
    </div>
    <div class="right-content"></div>
    <div style="flex: 1"></div>
  </div>
</template>

<script lang="ts" setup>
import { Article, getArticle } from "@/apis";
import { useRoute } from "vue-router";
import MarkdownViewer from "./MarkdownViewer.vue";

const route = useRoute();
let article = $ref<Article>();

getArticle({
  articleId:
    typeof route.params.id === "string" ? route.params.id : route.params.id[0],
}).then((res) => {
  article = res.data;
});
</script>
<style>
.whole {
  display: flex;
  height: 100%;
  margin-top: 63px;
  background-color: rgb(244 245 243);
}

.main-content {
  flex: 3;
  height: 400px;
  margin-top: 20px;
  background-color: white;
}

.right-content {
  flex: 1;
  margin: 20px 0 0 20px;
  background-color: white;
}
</style>
