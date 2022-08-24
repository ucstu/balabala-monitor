import { BasicIndicator, getErrorsInterfaceerrors } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicQueryItem, BasicQueryParam } from "./types";

const store = useStore();

export interface InterfaceErrorParam extends BasicQueryParam {
  /*
   * 状态码
   */
  statusCode?: number;
}

export interface InterfaceErrorItem extends BasicQueryItem {
  /*
   * 接口路径
   */
  url: string;
}

export const useInterfaceErrors = (
  _param: MaybeComputedRef<InterfaceErrorParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const interfaceErrors = ref<Array<InterfaceErrorItem>>();
  const interfaceErrorsLoading = ref(false);
  const _getErrorsInterfaceErrors = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    interfaceErrorsLoading.value = true;
    getErrorsInterfaceerrors({
      ...param.value,
      appId: store.appId,
      mainType: BasicIndicator.mainType.InterfaceIndicator,
      subType: BasicIndicator.subType.InterfaceIndicator,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        interfaceErrors.value = res.data;
      })
      .finally(() => {
        interfaceErrorsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getErrorsInterfaceErrors(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    interfaceErrorsLoading,
    interfaceErrors,
    reload: _getErrorsInterfaceErrors,
  };
};
