<template>
  <HeaderBar v-show="!route?.meta?.hiddenHeader" :route="route" />
  <div id="container">
    <AsideBar v-show="!route?.meta?.hiddenAside" :route="route" />
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

const route = useRoute();
</script>

<style scoped lang="scss">
header {
  flex: 0 0 50px;
}

#container {
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
