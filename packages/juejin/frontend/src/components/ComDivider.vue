<template>
  <span class="divider" :style="props"></span>
</template>

<script lang="ts" setup>
const props = defineProps({
  color: {
    type: String,
    default: "#ccc",
  },
  display: {
    type: String,
    default: "block",
  },
});
</script>

<style lang="scss" scoped>
.divider {
  display: inline-block;
  width: 100%;
  height: 1px;
  color: rgb(0 0 0 / 10%);
  background: rgb(0 0 0 / 10%);
  opacity: 0.6;
}
</style>
