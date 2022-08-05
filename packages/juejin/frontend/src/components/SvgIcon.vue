<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    prefix?: string;
    name: string;
    color?: string;
  }>(),
  {
    prefix: "icon",
    color: "#333",
  }
);

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<style>
.svg-icon {
  width: 2em;
  height: 2em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
