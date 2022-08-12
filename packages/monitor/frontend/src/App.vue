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
