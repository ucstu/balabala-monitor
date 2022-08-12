<template>
  <HeaderBar
    v-if="!route?.meta?.hiddenHeader"
    v-model:hiddenAside="hiddenAside"
    class="header"
  />
  <div class="content">
    <Transition name="aside">
      <AsideBar
        v-if="route?.meta?.menu?.length"
        v-show="!hiddenAside"
        :menuList="route?.meta?.menu"
        class="aside"
      />
    </Transition>
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
import { useRoute } from "vue-router";

const route = useRoute();

const hiddenAside = $ref(false);
</script>

<style scoped lang="scss">
.aside-leave-active {
  animation: aside-leave-animation 0.3s normal;
}

@keyframes aside-leave-animation {
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
    width: 0px;
  }
}
</style>
