<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive v-if="route?.meta?.keepAlive">
      <component :is="Component" :key="route.path" />
    </keep-alive>
    <component :is="Component" v-else :key="route.path" />
  </router-view>
</template>
