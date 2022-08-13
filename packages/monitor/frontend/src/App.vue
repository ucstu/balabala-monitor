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
        :menu-list="route?.meta?.menu"
        class="aside"
      />
    </Transition>
    <!-- eslint-disable-next-line vue/no-template-shadow -->
    <router-view v-slot="{ Component, route }" class="main">
      <keep-alive v-if="route?.meta?.keepAlive">
        <component :is="Component" :key="route.path" />
      </keep-alive>
      <component :is="Component" v-else :key="route.path" />
    </router-view>
  </div>
</template>

<script lang="ts" setup>
import AsideBar from "@/components/AsideBar.vue";
import HeaderBar from "@/components/HeaderBar.vue";
import { useRoute } from "vue-router";
import { reactive, ref } from "vue";

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

  & > .content {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: calc(100vh - 50px);

    & > .aside {
      width: 220px;
    }

    .aside-leave-active {
      animation: aside-leave-animation 0.3s normal;
    }

    & > .main {
      box-sizing: border-box;
      flex: 1 1 auto;
      overflow: auto;
    }
  }
}

@keyframes aside-leave-animation {
  75% {
    opacity: 0;
  }

  100% {
    width: 0;
    opacity: 0;
  }
}
</style>
