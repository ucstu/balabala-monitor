<template>
  <HeaderBar
    v-if="!route?.meta?.hiddenHeader"
    v-model:hiddenAside="hiddenAside"
    class="header"
  />
  <router-view v-slot="{ Component, route }" class="main">
    <keep-alive v-if="route?.meta?.keepAlive">
      <component :is="Component" :key="route.path" />
    </keep-alive>
    <component :is="Component" v-else :key="route.path" />
  </router-view>
</template>

<script lang="ts" setup>
import HeaderBar from "@/components/HeaderBar.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const hiddenAside = $ref(false);
</script>

<style lang="scss">
#app {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;

  & > .header {
    height: 50px;
  }

  & > .main {
    box-sizing: border-box;
    flex: 1 1 auto;
    overflow: auto;
  }
}
</style>
