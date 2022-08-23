<template>
  <div v-if="actionType !== -1">
    <div class="action-info-item">
      <div class="action-info-item-title">事件类型：</div>
      <div class="action-info-item-data">
        {{ actionInfo.title }}
      </div>
    </div>
    <div class="action-info-item">
      <div class="action-info-item-title">发生时间：</div>
      <div class="action-info-item-data">
        {{ dayjs(actionInfo.time).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </div>
    <div class="action-info-item">
      <div class="action-info-item-title">发生页面：</div>
      <div class="action-info-item-data">
        {{ actionInfo.pageUrl }}
      </div>
    </div>
    <!-- 资源错误 -->
    <div
      v-if="actionInfo.listType === 2 && actionInfo.mainType === 1"
      class="action-info-item"
    >
      <div class="action-info-item-title">资源类型：</div>
      <div class="action-info-item-data">
        {{ actionInfo.resourceType }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 2 && actionInfo.mainType === 1"
      class="action-info-item"
    >
      <div class="action-info-item-title">资源路径：</div>
      <div class="action-info-item-data">
        {{ actionInfo.path }}
      </div>
    </div>
    <!-- js错误 -->
    <div
      v-if="actionInfo.listType === 2 && actionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">文件路径：</div>
      <div class="action-info-item-data">
        {{ actionInfo.url }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 2 && actionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">错误消息：</div>
      <div class="action-info-item-data">
        {{ actionInfo.msg }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 2 && actionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">错误行号：</div>
      <div class="action-info-item-data">
        {{ actionInfo.line }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 2 && actionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">错误列号：</div>
      <div class="action-info-item-data">
        {{ actionInfo.column }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 2 && actionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">错误调用堆栈：</div>
      <div class="action-info-item-data">
        {{ actionInfo.stack }}
      </div>
    </div>
    <!-- Promise 错误-->
    <div
      v-if="actionInfo.listType === 2 && actionInfo.mainType === 3"
      class="action-info-item"
    >
      <div class="action-info-item-title">错误调用堆栈：</div>
      <div class="action-info-item-data">
        {{ actionInfo.stack }}
      </div>
    </div>
    <!-- 点击行为 -->
    <div
      v-if="actionInfo.listType === 1 && actionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">点击位置距离页面左端距离：</div>
      <div class="action-info-item-data">
        {{ actionInfo.left }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 1 && actionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">点击位置距离页面顶端距离：</div>
      <div class="action-info-item-data">
        {{ actionInfo.top }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 1 && actionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">点击对象：</div>
      <div class="action-info-item-data">
        {{ actionInfo.target }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 1 && actionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">内部文本：</div>
      <div class="action-info-item-data">
        {{ actionInfo.inner }}
      </div>
    </div>
    <!-- 页面跳转行为 -->
    <div
      v-if="actionInfo.listType === 1 && actionInfo.mainType === 3"
      class="action-info-item"
    >
      <div class="action-info-item-title">路由跳转起步位置：</div>
      <div class="action-info-item-data">
        {{ actionInfo.from }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 1 && actionInfo.mainType === 3"
      class="action-info-item"
    >
      <div class="action-info-item-title">路由跳转目的位置：</div>
      <div class="action-info-item-data">{{ actionInfo.to }}</div>
    </div>
    <!-- 路由跳转 -->
    <div
      v-if="actionInfo.listType === 1 && actionInfo.mainType === 4"
      class="action-info-item"
    >
      <div class="action-info-item-title">路径参数：</div>
      <div class="action-info-item-data">
        {{ actionInfo.params }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 1 && actionInfo.mainType === 4"
      class="action-info-item"
    >
      <div class="action-info-item-title">查询参数：</div>
      <div class="action-info-item-data">
        {{ actionInfo.query }}
      </div>
    </div>
    <!-- 接口 -->
    <div
      v-if="actionInfo.listType === 3 && actionInfo.mainType === 5"
      class="action-info-item"
    >
      <div class="action-info-item-title">接口地址：</div>
      <div class="action-info-item-data">
        {{ actionInfo.url }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 3 && actionInfo.mainType === 5"
      class="action-info-item"
    >
      <div class="action-info-item-title">状态码：</div>
      <div class="action-info-item-data">
        {{ actionInfo.statusCode }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 3 && actionInfo.mainType === 5"
      class="action-info-item"
    >
      <div class="action-info-item-title">请求方式：</div>
      <div class="action-info-item-data">
        {{ actionInfo.method }}
      </div>
    </div>
    <div
      v-if="actionInfo.listType === 3 && actionInfo.mainType === 5"
      class="action-info-item"
    >
      <div class="action-info-item-title">接口耗时：</div>
      <div class="action-info-item-data">
        {{ actionInfo.duration }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import type { ActionInfo } from "./types";

const { actionType, actionInfo } = defineProps<{
  actionType: number;
  actionInfo: ActionInfo;
}>();
</script>

<style lang="scss" scoped>
/* stylelint-disable-next-line no-empty-source */

.action-info-item {
  width: 100%;
  margin-bottom: 20px;
  word-wrap: break-word;

  .action-info-item-data {
    font-size: 14px;
    color: gray;
  }
}
</style>
