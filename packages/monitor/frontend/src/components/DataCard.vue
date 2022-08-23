<template>
  <div class="card">
    <div class="header" :class="{ border: line === 'full' }">
      <div class="left">
        <div
          class="title"
          :class="{ border: line === 'title' }"
          @click="emits('titleClick')"
        >
          <slot name="title" :icon="icon" :title="title">
            <i v-if="icon" class="fa" :class="icon"></i>
            <span>{{ title }}</span>
            <i
              v-if="foldable"
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
    <div v-show="!fold" class="main">
      <div v-show="loading" ref="loadingRef" class="loading">
        <div
          class="icon"
          :style="{
            height: iconWidth + 'px',
            width: iconWidth + 'px',
          }"
        ></div>
      </div>
      <slot v-if="!empty"></slot>
      <div v-else-if="!loading" class="no-data">暂无数据</div>
      <div v-else style="height: 40px"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const {
  icon = "",
  title,
  empty = false,
  fold: _fold = undefined,
  foldable: _foldable = false,
  loading = false,
  line = "title",
} = defineProps<{
  icon?: string;
  title: string;
  empty?: boolean;
  fold?: boolean | undefined;
  foldable?: boolean;
  loading?: boolean;
  line?: "none" | "title" | "full";
}>();

const emits = defineEmits<{
  (e: "titleClick"): void;
  (e: "update:fold", value: boolean): void;
}>();

let __fold = $ref(false);
let iconWidth = $ref(0);
let loadingRef = $ref<HTMLElement>(null as unknown as HTMLElement);

let foldable = $computed(() => _foldable || _fold !== undefined);
let fold = $computed({
  get: () => (_fold !== undefined ? _fold : foldable ? __fold : false),
  set: (value) => {
    __fold = value;
    emits("update:fold", value);
  },
});

onMounted(() => {
  iconWidth = Math.min(
    50,
    (parseFloat(getComputedStyle(loadingRef).height) || 0) * 0.65
  );
});
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  padding: 10px;
  padding-top: 5px;
  margin-bottom: 10px;
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;

  .border {
    border-bottom: 3px solid #ea6947;
  }

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
    position: relative;
    flex: 1;
    width: 100%;

    .loading {
      position: absolute;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: #f3f3f3;
      border-radius: 5px;
      opacity: 0.8;

      .icon {
        box-sizing: border-box;
        display: inline-block;
        border: 5px solid #f3f3f3;
        border-top: 5px solid red;
        border-radius: 50%;
        animation: rotate-360 1s infinite linear;
      }
    }

    .no-data {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
