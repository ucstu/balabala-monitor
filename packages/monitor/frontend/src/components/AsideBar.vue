<template>
  <aside class="leftMenu">
    <ul>
      <li v-for="(value, index) in props.menu" :key="index">
        <i class="fa fa-desktop"></i><a href="#">{{ value.name }}</a>
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";

const props = defineProps<{
  route: RouteLocationNormalizedLoaded;
  menu: Array<{
    id: String;
    name: String;
  }>;
}>();
</script>

<style scoped lang="scss">
.leftMenu {
  background-color: rgba(173, 169, 169, 0.6);
  padding: 20px 0;
}
.leftMenu > ul > li {
  height: 42px;
  line-height: 42px;
  padding-left: 20px;
  display: flex;
  align-items: center;
}
.leftMenu > ul > li:hover {
  background-color: rgb(190, 184, 184);
}
.leftMenu > ul {
  margin-top: 5px;
}
.leftMenu > ul > li > a {
  text-decoration: none;
  color: rgb(100, 98, 98);
  margin-left: 30px;
}
</style>
