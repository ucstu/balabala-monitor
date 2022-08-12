<template>
  <aside class="leftMenu">
    <ul>
      <li v-for="(value, index) in menuList" :key="index">
        <router-link :to="value.path" active-class="active"
          ><i class="fa fa-desktop"></i
          ><span>{{ value.name }}</span></router-link
        >
      </li>
    </ul>
  </aside>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";

const { route, menuList = [] } = defineProps<{
  route: RouteLocationNormalizedLoaded;
  menuList?: Array<{
    name: String;
    path: String;
  }>;
}>();
</script>

<style scoped lang="scss">
.leftMenu {
  background-color: white;
  width: 200px;
  height: 100%;
}
.leftMenu > ul > li > a {
  height: 42px;
  line-height: 42px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: rgb(100, 98, 98);
  margin: 10px 0;
}

.leftMenu > ul > li:hover {
  background-color: rgba(201, 193, 193, 0.5);
}
.leftMenu > ul {
  margin-top: 10px;
  list-style: none;
  padding: 0 0;
}
.leftMenu > ul > li > a > span {
  margin-left: 30px;
}
.leftMenu > ul > li > a.active {
  color: #ea6947;
  border-right: 3px solid #ea5c35;
  background-color: rgba(255, 227, 235, 0.7);
}
</style>
