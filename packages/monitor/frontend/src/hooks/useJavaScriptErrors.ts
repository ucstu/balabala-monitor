import { getErrorsJavascripterrors, JavaScriptError } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicQueryItem, BasicQueryParam } from "./types";

const store = useStore();

export type JavaScriptErrorParam = BasicQueryParam;

export interface JavaScriptErrorItem extends BasicQueryItem {
  /*
   * 接口路径
   */
  url: string;
  /*
   * 错误消息
   */
  msg: string;
  /*
   * 错误行号
   */
  line: number;
  /*
   * 错误列号
   */
  column: number;
}

export const useJavaScriptErrors = (
  _param: MaybeComputedRef<JavaScriptErrorParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const javaScriptErrors = ref<Array<JavaScriptErrorItem>>();
  const javaScriptErrorsLoading = ref(false);
  const _getErrorsJavaScriptErrors = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    javaScriptErrorsLoading.value = true;
    getErrorsJavascripterrors({
      ...param.value,
      appId: store.appId,
      mainType: JavaScriptError.mainType.JavaScriptError,
      subType: JavaScriptError.subType.JavaScriptError,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        javaScriptErrors.value = res.data;
      })
      .finally(() => {
        javaScriptErrorsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getErrorsJavaScriptErrors(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    javaScriptErrorsLoading,
    javaScriptErrors,
    reload: _getErrorsJavaScriptErrors,
  };
};
