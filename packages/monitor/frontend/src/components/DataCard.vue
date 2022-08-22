<template>
  <div class="card">
    <div class="header">
      <div class="left">
        <div class="title" @click="emits('titleClick')">
          <slot name="title" :icon="icon" :title="title">
            <i v-if="icon" class="fa" :class="icon"></i>
            <span>{{ title }}</span>
          </slot>
        </div>
        <div>
          <slot name="actions"> </slot>
        </div>
      </div>
      <div>
        <slot name="tools"> </slot>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const { icon = "", title = "卡片标题" } = defineProps<{
  icon?: string;
  title?: string;
}>();
const emits = defineEmits<{
  (e: "titleClick"): void;
}>();
</script>

<style lang="scss" scoped>
.card {
  padding: 10px;
  padding-top: 5px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 10px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .left {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px;
        margin-bottom: 10px;
        font-size: 1rem;
        font-weight: 500;
        color: #333;
        border-bottom: 3px solid #ea6947;

        i {
          margin-right: 0.5rem;
        }
      }
    }
  }
}
</style>
