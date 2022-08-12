<template>
  <HeaderBar
    v-show="!route?.meta?.hiddenHeader"
    :route="route"
    class="header"
  />
  <div class="content">
    <AsideBar
      v-show="!route?.meta?.hiddenAside"
      :route="route"
      :menuList="route?.meta?.menu"
      class="aside"
    />
    <router-view v-slot="{ Component, route }" class="main">
      <keep-alive v-if="route?.meta?.keepAlive">
        <component :is="Component" :key="route.path" />
      </keep-alive>
      <component v-else :is="Component" :key="route.path" />
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import AsideBar from "@/components/AsideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import { watch } from "vue";
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
const menu = reactive([
  { id: "01", name: "总览", path: "/Home/overView" },
  { id: "02", name: "健康状况", path: "/Home/healthStatus" },
  { id: "03", name: "性能预览", path: "/Home/performancePreview" },
  { id: "04", name: "地域分布", path: "/Home/region" },
]);

const route = useRoute();

watch(
  () => route.meta.title,
  () => {
    document.title = route.meta.title
      ? "前端监控-" + (route.meta.title || "")
      : "Balabala云-前端监控";
  }
);
</script>

<style scoped lang="scss"></style>
