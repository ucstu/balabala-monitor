<template>
  <div class="card">
    <div
      class="header"
      :style="line === 'full' ? 'border-bottom: 3px solid #ea6947;' : ''"
    >
      <div
        class="left"
        :style="line === 'left' ? 'border-bottom: 3px solid #ea6947;' : ''"
      >
        <div
          class="title"
          :style="line === 'title' ? 'border-bottom: 3px solid #ea6947;' : ''"
          @click="emits('titleClick')"
        >
          <slot name="title" :icon="icon" :title="title">
            <i v-if="icon" class="fa" :class="icon"></i>
            <span>{{ title }}</span>
          </slot>
        </div>
        <div class="l-actions">
          <slot name="lActions"> </slot>
        </div>
      </div>
      <div class="r-actions">
        <slot name="rActions"> </slot>
      </div>
    </div>
    <div class="main">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const {
  icon = "",
  title = "卡片标题",
  line = "title",
} = defineProps<{
  icon?: string;
  title?: string;
  line?: "title" | "left" | "full";
}>();
const emits = defineEmits<{
  (e: "titleClick"): void;
}>();
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 5px;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 10px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 5px;

    .left {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .title {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3px;
        font-size: 1rem;
        font-weight: 500;
        color: #333;

        i {
          margin-right: 0.5rem;
        }
      }
    }
  }

  .main {
    flex: 1;
    width: 100%;
  }
}
</style>
