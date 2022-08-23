<template>
  <div class="card">
    <div
      class="header"
      :style="line === 'full' ? 'border-bottom: 3px solid #ea6947;' : ''"
    >
      <div class="left">
        <div
          class="title"
          :style="line === 'title' ? 'border-bottom: 3px solid #ea6947;' : ''"
          @click="emits('titleClick')"
        >
          <slot name="title" :icon="icon" :title="title">
            <i v-if="icon" class="fa" :class="icon"></i>
            <span>{{ title }}</span>
            <i
              v-if="showFold"
              class="fa fa-angle-up icon-up fa-2x"
              style="margin-left: 0.5rem"
              :class="{ 'fa-rotate-180': fold }"
              @click="fold = !fold"
            >
            </i>
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
    <Transition name="main">
      <div v-show="!fold" class="main">
        <slot></slot>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
const {
  icon = "",
  title,
  showFold = false,
  line = "title",
} = defineProps<{
  icon?: string;
  title: string;
  showFold?: boolean;
  line?: "none" | "title" | "full";
}>();

let fold = $ref(false);

const emits = defineEmits<{
  (e: "titleClick"): void;
}>();
</script>

<style lang="scss" scoped>
.card {
  padding: 10px;
  padding-top: 5px;
  margin-bottom: 10px;
  overflow: hidden;
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
    width: 100%;
    height: 100%;
  }

  .main-leave-active {
    transition: height 5s;
  }

  .main-leave-to {
    height: 0;
  }
}
</style>
