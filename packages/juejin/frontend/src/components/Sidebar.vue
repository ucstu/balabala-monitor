<template>
  <div>
    <div class="author">
      <span>优质作者</span>
      <div v-for="item in authorName" :key="item">
        {{ item }}
      </div>
    </div>
    <div>签到</div>
  </div>
</template>

<script lang="ts" setup>
const authorName: Array<string> = ["aaa", "bbbb", "cc"];
</script>

<style lang="scss" scoped>
.author {
  color: rgb(15, 52, 137);
}
</style>
