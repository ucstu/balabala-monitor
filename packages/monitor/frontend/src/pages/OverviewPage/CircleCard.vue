<template>
  <div class="loop-progress">
    <div class="progress"></div>
    <div class="half-progress"></div>
    <div class="mask">
      <div class="content">10%</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  with?: number;
  height?: number;
  data?: number;
  color?: string;
};
const progressStyle = {};

const props = withDefaults(defineProps<Props>(), {
  with: 50,
  height: 50,
  data: 180,
  color: "#fff",
});
</script>

<style lang="scss" scoped>
.loop-progress {
  position: relative;
  width: 100px;
  height: 100px;
  background-color: #6ed4bf;
  border-radius: 50%;
}

.loop-progress .mask {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 80px;
  height: 80px;
  background-color: #1bbc9b;
  border-radius: 50%;
}

.loop-progress .half-progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 100px;
  background-color: #6ed4bf;
  border-top: 0 solid #000;
  border-radius: 50px 0 0 50px;
  transform: rotate(0deg);
  transform-origin: 100% 50% 0;
}

.loop-progress .progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 100px;
  background-color: #fff;
  border-radius: 50px 0 0 50px;
  transition: all 1s;
  transform: rotate(v-bind("data+'deg'"));
  transform-origin: 100% 50% 0;
}

.loop-progress .content {
  font-weight: bold;
  line-height: 80px;
  color: #fff;
  text-align: center;
}
</style>
