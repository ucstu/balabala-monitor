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
    <div v-show="!fold" class="content">
      <div
        v-show="firstTime || loading || empty"
        class="mask"
        :style="{
          zIndex: zIndex,
          opacity: firstTime ? 1 : 0.75,
        }"
      >
        <div
          v-show="loading"
          class="icon"
          :style="{
            width: Math.min(Math.max(mainSize[1], 30) * 0.7, 50) + 'px',
            height: Math.min(Math.max(mainSize[1], 30) * 0.7, 50) + 'px',
          }"
        ></div>
        <span v-show="!firstTime && !loading && empty"> 暂无数据 </span>
      </div>

      <div v-show="firstTime || !empty" ref="mainRef" class="main">
        <slot></slot>
      </div>
      <div
        v-if="!firstTime && empty"
        style="width: 100%"
        :style="{
          height: Math.max(mainSize[1], 30) + 'px',
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, provide, watch } from "vue";

const {
  icon = "",
  title,
  empty = undefined,
  fold: _fold = undefined,
  foldable: _foldable = undefined,
  loading = undefined,
  line = "title",
} = defineProps<{
  /**
   * 左侧ICON
   */
  icon?: string;
  /**
   * 卡片标题
   */
  title: string;
  /**
   * 是否无数据
   */
  empty?: boolean;
  /**
   * 是否折叠
   */
  fold?: boolean | undefined;
  /**
   * 是否可折叠（若传fold，此值忽略）
   */
  foldable?: boolean;
  /**
   * 是否正在加载
   */
  loading?: boolean;
  /**
   * 下划线位置
   */
  line?: "none" | "title" | "full";
}>();

const emits = defineEmits<{
  (e: "titleClick"): void;
  (e: "update:fold", value: boolean): void;
}>();

let __fold = $ref(false);

const nextZIndex = inject("zIndex") as number | undefined;
let zIndex = nextZIndex || 19;
if (!nextZIndex) {
  provide("zIndex", zIndex - 1);
}

let firstTime = $ref(loading !== undefined || empty !== undefined);
let mainSize = $ref<[number, number]>([0, 0]);
let mainRef = $ref<HTMLElement>(null as unknown as HTMLElement);

let foldable = $computed(() => _foldable || _fold !== undefined);
let fold = $computed({
  get: () => (_fold !== undefined ? _fold : foldable ? __fold : false),
  set: (value) => {
    __fold = value;
    emits("update:fold", value);
  },
});

onMounted(() => {
  mainSize = [
    parseFloat(getComputedStyle(mainRef).width),
    parseFloat(getComputedStyle(mainRef).height),
  ];
});

const cancelWatch = watch(
  () => loading,
  (newValue, oldValue) => {
    if (oldValue === true && newValue === false) {
      firstTime = false;
      cancelWatch();
    }
  }
);
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
    height: 25px;
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

  .content {
    position: relative;
    flex: 1;
    width: 100%;

    .mask {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      background-color: #f3f3f3;
      border-radius: 5px;

      .icon {
        box-sizing: border-box;
        display: inline-block;
        border: 5px solid #f3f3f3;
        border-top: 5px solid red;
        border-radius: 50%;
        animation: rotate-360 1s infinite linear;
      }
    }

    @keyframes rotate-360 {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(360deg);
      }
    }

    .main {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
