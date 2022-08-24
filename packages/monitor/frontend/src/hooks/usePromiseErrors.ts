import { getErrorsPromiseerrors, PromiseError } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicQueryItem, BasicQueryParam } from "./types";

const store = useStore();

export type PromiseErrorParam = BasicQueryParam;

export interface PromiseErrorItem extends BasicQueryItem {
  /*
   * 调用堆栈
   */
  stack: string;
}

export const usePromiseErrors = (
  _param: MaybeComputedRef<PromiseErrorParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const promiseErrors = ref<Array<PromiseErrorItem>>();
  const promiseErrorsLoading = ref(false);
  const _getErrorsPromiseErrors = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    promiseErrorsLoading.value = true;
    getErrorsPromiseerrors({
      ...param.value,
      appId: store.appId,
      mainType: PromiseError.mainType.PromiseError,
      subType: PromiseError.subType.PromiseError,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        promiseErrors.value = res.data;
      })
      .finally(() => {
        promiseErrorsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getErrorsPromiseErrors(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    promiseErrorsLoading,
    promiseErrors,
    reload: _getErrorsPromiseErrors,
  };
};
