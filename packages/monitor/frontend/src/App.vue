<template>
  <HeaderBar v-show="!route?.meta?.hiddenHeader" :route="route" />
  <div class="container">
    <AsideBar v-show="!route?.meta?.hiddenAside" :route="route" :menu="menu" />
    <router-view v-slot="{ Component, route }">
      <keep-alive v-if="route?.meta?.keepAlive">
        <component :is="Component" :key="route.path" />
      </keep-alive>
      <component v-else :is="Component" :key="route.path" />
    </router-view>
  </div>
</template>

<script setup lang="ts">
import AsideBar from "@/components/AsideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";
const menu = reactive([
  { id: "01", name: "总览" },
  { id: "02", name: "健康状况" },
  { id: "03", name: "性能预览" },
  { id: "04", name: "地域分布" },
]);

const route = useRoute();
</script>

<style scoped lang="scss">
header {
  flex: 0 0 50px;
}

.container {
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
  aside {
    flex: 0 0 200px;
  }
  main {
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
}
</style>
