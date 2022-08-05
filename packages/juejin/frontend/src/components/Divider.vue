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
  color: rgb(0, 0, 0, 0.1);
  display: inline-block;
  height: 1px;
  width: 100%;
  opacity: 0.6;
  background: rgb(0, 0, 0, 0.1);
}
</style>
