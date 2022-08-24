import { getErrorsJavascripterrorstatistics, JavaScriptError } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicStatisticItem, BasicStatisticParam } from "./types";

const store = useStore();

export interface JavaScriptErrorStatisticParam extends BasicStatisticParam {
  /*
   * 接口路径
   */
  url?: string;
  /*
   * 错误消息
   */
  msg?: string;
}

export type JavaScriptErrorStatisticItem = BasicStatisticItem;

export const useJavaScriptErrorStatistics = (
  _param: MaybeComputedRef<JavaScriptErrorStatisticParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const javaScriptErrorStatistics = ref<Array<JavaScriptErrorStatisticItem>>();
  const javaScriptErrorStatisticsLoading = ref(false);
  const _getErrorsJavaScriptErrorStatistics = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    javaScriptErrorStatisticsLoading.value = true;
    getErrorsJavascripterrorstatistics({
      ...param.value,
      appId: store.appId,
      mainType: JavaScriptError.mainType.JavaScriptError,
      subType: JavaScriptError.subType.JavaScriptError,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        javaScriptErrorStatistics.value = res.data.map((item) => {
          return {
            ...item,
            dateTime: dayjs(item.dateTime, dateTimeFormate),
          };
        });
      })
      .finally(() => {
        javaScriptErrorStatisticsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getErrorsJavaScriptErrorStatistics(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    javaScriptErrorStatisticsLoading,
    javaScriptErrorStatistics,
    reload: _getErrorsJavaScriptErrorStatistics,
  };
};
