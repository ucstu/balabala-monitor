<template>
  <div class="outer">
    <div style="flex: 1"><img :src="randomString(3)" /></div>
    <div class="outer-header">
      <span
        v-for="(top, index) of mainList"
        :key="index"
        :style="{
          color: currentIndex == index ? 'rgb(0,127,255)' : '',
        }"
        @mouseenter="lightHeight(index, 'enter')"
        @mouseleave="lightHeight(index, 'leave')"
        @click="clickNavigator(index)"
      >
        {{ top }}
        <span style="display: inline-block; margin-left: 15px; color: #90908e"
          >{{ index < mainList.length - 1 ? "|" : "" }}
        </span>
      </span>
      <div
        v-for="(item, index) in list"
        :key="index"
        class="contain"
        @click="goDetail(item.articleId)"
      >
        <div class="contain-top">
          {{ item.articleTitle }}
          <span style="margin: 0 8px; opacity: 0.3">|</span>
          <div class="contain-article-class">
            {{ articleClass[item.articleClass] }}
          </div>
        </div>
        <div class="contain-center">
          <div>
            <div class="contain-summary">
              {{ item.articleSummary }}
            </div>
            <div class="contain-footer">
              <ul>
                <li>
                  <i class="iconfont icon-liulan"
                    ><span>{{ " " + item.articleTraffic }}</span></i
                  >
                </li>
                <li>
                  <i class="iconfont icon-31dianzan"
                    ><span>{{ " " + item.articlelikes }}</span>
                  </i>
                </li>
              </ul>
            </div>
          </div>
          <div class="contain-cover">
            <img :src="item.articleCover" alt="tags" />
          </div>
        </div>
      </div>
    </div>
    <div style="flex: 1"></div>
  </div>
</template>
<script setup lang="ts">
import { Article, getArticle1, postImages } from "@/apis";
import { useStore } from "@/stores";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const store = useStore();

const articleClass = [
  "后端",
  "前端",
  "Android",
  "IOS",
  "人工智能",
  "开发工具",
  "代码人生",
  "阅读",
];
let router = useRouter();
let mainList = ["推荐", "最新", "热榜"];
let list = $ref<Array<Article>>();

let currentIndex = ref<number>(0);
let defaultIndex = ref<number>(0);
function lightHeight(index: number, operate: string) {
  if (operate == "enter") {
    currentIndex.value = index;
  } else {
    currentIndex.value = defaultIndex.value;
  }
}

function randomString(len: number) {
  len = len || 32;
  var $chars =
    "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678"; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  var maxPos = $chars.length;
  var pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
}

function clickNavigator(index: number) {
  defaultIndex.value = index;
  new Promise((resolve, reject) => {
    setTimeout(() => {
      reject({
        msg: randomString(Math.ceil(Math.random() * 100)),
        stack: randomString(Math.ceil(Math.random() * 10000)),
      });
    }, 2000);
    setTimeout(() => {
      [randomString(Math.ceil(Math.random() * 100))]();
    }, 3000);
    setTimeout(() => {
      a();
    }, 4000);
    setTimeout(() => {
      let arr: Array<number> = [];
      arr[100].a();
    }, 4000);
  });
}
function goDetail(id: number | string) {
  router.push(`/detail/${id}`);
}

postImages({
  formData: {
    filename: "a.jpg",
    image: "",
  },
}).then((res) => {
  console.log(res);
});

watch(
  () => store.token,
  () => {
    getArticle1({ _class: 0 }).then((res) => {
      list = res.data as unknown as Array<Article>;
    });
  },
  {
    immediate: true,
  }
);
</script>

<style scoped>
.outer {
  display: flex;
  height: 100%;
  padding-top: 15px;
  margin-top: 63px;
  background-color: rgb(244 245 243);
}

.outer-header {
  flex: 2.5;
  height: 46px;
  font-size: 14px;
  line-height: 46px;
  color: rgb(144 144 142);
  background-color: white;
  border-bottom: 1px solid rgb(155 155 155 / 60%);
}

.outer-header > span {
  display: inline-block;
  width: 56px;
  padding-right: 10px;
  padding-left: 10px;
  text-align: center;
}

.contain {
  box-sizing: border-box;
  width: 100%;
  height: 133px;
  padding-top: 12px;
  padding-right: 20px;
  padding-left: 20px;
  background-color: white;
  border-bottom: 1px solid;
}

.contain-top {
  display: flex;
  height: 22px;
  font-size: 13px;
  line-height: 22px;
  color: #4e5969;
}

.contain-center {
  display: flex;
  justify-content: space-between;

  /* height: 80px; */
}

.contain-summary {
  height: 24px;
  margin: 10px 0;
  margin-bottom: 8px;
  overflow: hidden;
  font-size: 13px;
  line-height: 24px;
  color: #86909c;
}

.contain-article-class {
  color: #86909c;
}

.contain-cover img {
  width: 120px;
  height: 80px;
  margin-left: 24px;
}

.contain-footer {
  /* overflow: hidden; */
  height: 20px;
  margin-top: 15px;
  font-size: 13px;
}

.contain-footer ul {
  display: flex;
  padding-left: 0;
}

.contain-footer li {
  width: 48px;
  margin-right: 20px;
  list-style: none;
}

.contain-footer i {
  color: #4e5969;
}

.contain-footer i span {
  font-size: 13px;
}
</style>
