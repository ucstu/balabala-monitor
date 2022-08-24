import { getErrorsPromiseerrorstatistics, PromiseError } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicStatisticItem, BasicStatisticParam } from "./types";

const store = useStore();

export interface PromiseErrorStatisticParam extends BasicStatisticParam {
  /*
   * 错误消息
   */
  msg?: string;
}

export type PromiseErrorStatisticItem = BasicStatisticItem;

export const usePromiseErrorStatistics = (
  _param: MaybeComputedRef<PromiseErrorStatisticParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const promiseErrorStatistics = ref<Array<PromiseErrorStatisticItem>>();
  const promiseErrorStatisticsLoading = ref(false);
  const _getErrorsPromiseErrorStatistics = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    promiseErrorStatisticsLoading.value = true;
    getErrorsPromiseerrorstatistics({
      ...param.value,
      appId: store.appId,
      mainType: PromiseError.mainType.PromiseError,
      subType: PromiseError.subType.PromiseError,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        promiseErrorStatistics.value = res.data.map((item) => {
          return {
            ...item,
            dateTime: dayjs(item.dateTime, dateTimeFormate),
          };
        });
      })
      .finally(() => {
        promiseErrorStatisticsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getErrorsPromiseErrorStatistics(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    promiseErrorStatisticsLoading,
    promiseErrorStatistics,
    reload: _getErrorsPromiseErrorStatistics,
  };
};
