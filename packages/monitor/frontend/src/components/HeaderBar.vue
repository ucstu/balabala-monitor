<template>
  <div class="main">
    <div class="left">
      <i class="fa fa-bars"></i>
      <span
        ><i class="fa fa-cloud-upload"></i> <strong>balabala云</strong></span
      >
    </div>
    <div class="right">
      <span><i class="fa fa-search"></i></span>
      <span><input type="text" /></span>
      <a href="#" class="i">费用</a>
      <a href="#" class="i">工单</a>
      <a href="#" class="i">ICP备案</a>
      <a href="#" class="i">企业</a>
      <a href="#" class="i">支持</a>
      <a href="#" class="fa fa-envelope-o i"></a>
      <img src="@/assets/no_user.png" alt="#" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from "vue-router";

const props = defineProps<{
  route: RouteLocationNormalizedLoaded;
}>();
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: space-between;
  height: 50px;
  width: 100%;
  background-color: rgba(213, 211, 211, 0.5);
}
.left {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left span {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.left .fa-bars {
  font-size: 25px;
  padding: 12.5px 14px;
  color: white;
  background-color: rgb(63, 63, 84);
}
.left .fa-cloud-upload {
  font-size: 30px;
}
.left .fa-cloud-upload,
.left strong {
  color: rgb(63, 63, 84);
  padding: 0 10px;
}
.right {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 10px;
}
.right span input {
  border: none;
  background-color: rgba(212, 210, 210, 0.5);
}
.right span input:focus {
  outline: none;
}
.right span {
  background-color: rgba(212, 210, 210, 0.5);
  padding: 5px 5px;
  display: flex;
  align-items: center;
}
.right .i {
  padding: 5px 20px;
}
.right a {
  text-decoration: none;
  color: grey;
}
.right a:hover {
  color: black;
  transition: top 0.3s ease;
}
.right img {
  margin: 0 30px 0 20px;
}
</style>
