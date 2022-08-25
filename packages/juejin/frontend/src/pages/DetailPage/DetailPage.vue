<template>
  <div class="whole">
    <div style="flex: 1"></div>
    <div class="main-content">
      <div class="title">{{ article?.articleTitle }}</div>
      <div class="content-center">
        <div class="avator" style="margin: 0; border: 0">
          <div class="tou-xiang">
            <img :src="article?.articleCover" />
          </div>
          <div class="name">
            <div>{{ article?.phone }}</div>
            <div>{{ article?.updatedAt }}</div>
          </div>
        </div>
        <div class="concern">关注</div>
      </div>
      <MarkdownViewer :mark-string="article?.articleContent" />
    </div>
    <div class="right-content">
      <div style="background-color: white">
        <div class="avator">
          <div class="tou-xiang">
            <img :src="article?.articleCover" />
          </div>
          <div class="name">
            <div>{{ article?.phone }}</div>
          </div>
        </div>
        <div style="margin-top: 12px; margin-left: 20px">
          <div class="dian-zan">
            <img src="../../assets/zan.png" />
            <span>获得点赞量 {{ article?.articlelikes }}</span>
          </div>
          <div class="dian-zan">
            <img src="../../assets/see.png" />
            <span>获得点赞量 {{ article?.articleTraffic }}</span>
          </div>
        </div>
      </div>
      <div class="up-other">
        <div class="navigator">目录</div>
        <div
          v-for="(item, index) of [1, 2, 3]"
          :key="index"
          style="position: relative"
        >
          <div
            class="pianpian"
            :style="{ display: defaultIndex == index ? 'block' : 'none' }"
          ></div>
          <div
            class="navigator-item"
            :style="{
              background: currentIndex == index ? ' rgb(244 245 243)' : '',
              color: defaultIndex == index ? '#1e80ff' : '',
            }"
            @mouseenter="enterHandle(index)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>
    <div style="flex: 1"></div>
  </div>
</template>

<script lang="ts" setup>
import { Article, getArticle } from "@/apis";
import { useRoute } from "vue-router";
import MarkdownViewer from "./MarkdownViewer.vue";

const route = useRoute();
let currentIndex = $ref();
let defaultIndex = $ref(0);
let article = $ref<Article>();
const enterHandle = (index) => {
  currentIndex = index;
};
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
  padding: 30px;

  /* height: 100%; */
  margin-top: 20px;
  background-color: white;
}

.content-center {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.right-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 20px 0 0 20px;
}

.navigator-item {
  height: 22px;
  padding: 8px;
  margin: 5px 20px;
  border-radius: 3px;
}

.title {
  font-size: 30px;
}

.concern {
  width: 44px;
  height: 32px;
  padding: 0 12px;
  line-height: 32px;
  color: #1e80ff;
  text-align: center;
  border: 1px solid rgb(30 128 255 / 30%);
  border-radius: 5px;
}

.avator {
  display: flex;
  height: 50px;
  padding: 20px;
  background-color: white;
  border-bottom: 1px solid rgb(185 185 185);
}

.up-other {
  margin-top: 30px;
  background-color: white;

  /* margin: 20px; */
}

.up-other .navigator {
  padding: 16px 0;
  margin: 0 20px;
  border-bottom: 1px solid rgb(204 204 204);
}

.pianpian {
  position: absolute;
  top: 9px;
  display: none;
  width: 4px;
  height: 16px;
  background-color: #1e80ff;
  border-radius: 0 4px 4px 0;
}

.tou-xiang {
  height: 50px;
}

.tou-xiang > img {
  width: 48px;
  height: 48px;
  border-radius: 50%;
}

.name {
  height: 48px;
  margin-left: 16px;
  font-size: 12px;
  line-height: 24px;
}

.dian-zan {
  height: 26px;
  margin-bottom: 10px;
  font-size: 14px;
  line-height: 26px;
}

.dian-zan img {
  height: 18px;
  margin-right: 10px;
  vertical-align: middle;
}
</style>
