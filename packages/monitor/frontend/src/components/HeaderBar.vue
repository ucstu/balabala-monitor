<template>
  <header style="background-color: blue"></header>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";

const props = defineProps<{
  route: RouteLocationNormalizedLoaded;
}>();
</script>

<style scoped lang="scss"></style>
