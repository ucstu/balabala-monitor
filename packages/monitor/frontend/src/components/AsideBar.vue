<template>
  <div class="leftmenu">
    <ul>
      <li><i class="fa fa-desktop"></i><a href="#">总览</a></li>
      <li><i class="fa fa-desktop"></i><a href="#">总览</a></li>
      <li><i class="fa fa-desktop"></i><a href="#">总览</a></li>
      <li><i class="fa fa-desktop"></i><a href="#">总览</a></li>
      <li><i class="fa fa-desktop"></i><a href="#">总览</a></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";

const props = defineProps<{
  route: RouteLocationNormalizedLoaded;
}>();
</script>

<style scoped lang="scss">
.leftmenu {
  width: 220px;
  height: 100%;
  background-color: rgba(196, 193, 193, 0.6);
  padding: 20px 0;
}
.leftmenu > ul > li {
  height: 42px;
  line-height: 42px;
  padding-left: 20px;
  display: flex;
  align-items: center;
}
.leftmenu > ul > li:hover {
  background-color: rgb(190, 184, 184);
}
.leftmenu > ul {
  margin-top: 5px;
}
.leftmenu > ul > li > a {
  text-decoration: none;
  color: rgb(100, 98, 98);
  margin-left: 30px;
}
</style>
