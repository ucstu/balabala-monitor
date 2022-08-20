<template>
  <div class="whole">
    <div style="flex: 1"></div>
    <div class="main-content"></div>
    <div class="right-content"></div>
    <div style="flex: 1"></div>
  </div>
</template>

<script lang="ts" setup></script>
<style>
.whole {
  display: flex;
  height: 100%;
  margin-top: 63px;
  background-color: rgb(244 245 243);
}

.main-content {
  flex: 3;
  height: 400px;
  margin-top: 20px;
  background-color: white;
}

.right-content {
  flex: 1;
  margin: 20px 0 0 20px;
  background-color: white;
}
</style>
