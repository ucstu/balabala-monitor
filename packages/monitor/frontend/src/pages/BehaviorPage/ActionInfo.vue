<template>
  <div v-if="chosesAction !== -1">
    <div class="action-info-item">
      <div class="action-info-item-title">事件类型：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.title }}
      </div>
    </div>
    <div class="action-info-item">
      <div class="action-info-item-title">发生时间：</div>
      <div class="action-info-item-data">
        {{ dayjs(showActionInfo.time).format("YYYY-MM-DD HH:mm:ss") }}
      </div>
    </div>
    <div class="action-info-item">
      <div class="action-info-item-title">发生页面：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.pageUrl }}
      </div>
    </div>
    <!-- 资源错误 -->
    <div
      v-if="showActionInfo.listType === 2 && showActionInfo.mainType === 1"
      class="action-info-item"
    >
      <div class="action-info-item-title">资源类型：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.resourceType }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 2 && showActionInfo.mainType === 1"
      class="action-info-item"
    >
      <div class="action-info-item-title">资源路径：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.path }}
      </div>
    </div>
    <!-- js错误 -->
    <div
      v-if="showActionInfo.listType === 2 && showActionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">文件路径：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.url }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 2 && showActionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">错误消息：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.msg }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 2 && showActionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">错误行号：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.line }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 2 && showActionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">错误列号：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.column }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 2 && showActionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">错误调用堆栈：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.stack }}
      </div>
    </div>
    <!-- Promise 错误-->
    <div
      v-if="showActionInfo.listType === 2 && showActionInfo.mainType === 3"
      class="action-info-item"
    >
      <div class="action-info-item-title">错误调用堆栈：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.stack }}
      </div>
    </div>
    <!-- 点击行为 -->
    <div
      v-if="showActionInfo.listType === 1 && showActionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">点击位置距离页面左端距离：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.left }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 1 && showActionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">点击位置距离页面顶端距离：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.top }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 1 && showActionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">点击对象：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.target }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 1 && showActionInfo.mainType === 2"
      class="action-info-item"
    >
      <div class="action-info-item-title">内部文本：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.inner }}
      </div>
    </div>
    <!-- 页面跳转行为 -->
    <div
      v-if="showActionInfo.listType === 1 && showActionInfo.mainType === 3"
      class="action-info-item"
    >
      <div class="action-info-item-title">路由跳转起步位置：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.from }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 1 && showActionInfo.mainType === 3"
      class="action-info-item"
    >
      <div class="action-info-item-title">路由跳转目的位置：</div>
      <div class="action-info-item-data">{{ showActionInfo.to }}</div>
    </div>
    <!-- 路由跳转 -->
    <div
      v-if="showActionInfo.listType === 1 && showActionInfo.mainType === 4"
      class="action-info-item"
    >
      <div class="action-info-item-title">路径参数：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.params }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 1 && showActionInfo.mainType === 4"
      class="action-info-item"
    >
      <div class="action-info-item-title">查询参数：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.query }}
      </div>
    </div>
    <!-- 接口 -->
    <div
      v-if="showActionInfo.listType === 3 && showActionInfo.mainType === 5"
      class="action-info-item"
    >
      <div class="action-info-item-title">接口地址：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.url }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 3 && showActionInfo.mainType === 5"
      class="action-info-item"
    >
      <div class="action-info-item-title">状态码：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.statusCode }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 3 && showActionInfo.mainType === 5"
      class="action-info-item"
    >
      <div class="action-info-item-title">请求方式：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.method }}
      </div>
    </div>
    <div
      v-if="showActionInfo.listType === 3 && showActionInfo.mainType === 5"
      class="action-info-item"
    >
      <div class="action-info-item-title">接口耗时：</div>
      <div class="action-info-item-data">
        {{ showActionInfo.duration }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { Info } from "./types";

type Props = {
  chosesAction: number;
  showActionInfo: Info;
};

defineProps<Props>();
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
