import { getPerformancesInterfaceindicators, InterfaceIndicator } from "@/apis";
import { useStore } from "@/stores";
import { MaybeComputedRef, useDebounceFn } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicQueryItem, BasicQueryParam } from "./types";

const store = useStore();

export type InterfaceIndicatorParam = BasicQueryParam;

export interface InterfaceIndicatorItem extends BasicQueryItem {
  /*
   * 接口路径
   */
  url: string;
}

export const useInterfaceIndicators = (
  _param: MaybeComputedRef<InterfaceIndicatorParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const interfaceIndicators = ref<Array<InterfaceIndicatorItem>>();
  const interfaceIndicatorsLoading = ref(false);
  const _getPerformancesInterfaceIndicators = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    interfaceIndicatorsLoading.value = true;
    getPerformancesInterfaceindicators({
      ...param.value,
      appId: store.appId,
      mainType: InterfaceIndicator.mainType.InterfaceIndicator,
      subType: InterfaceIndicator.subType.InterfaceIndicator,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        interfaceIndicators.value = res.data;
      })
      .finally(() => {
        interfaceIndicatorsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getPerformancesInterfaceIndicators(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    interfaceIndicatorsLoading,
    interfaceIndicators,
    reload: _getPerformancesInterfaceIndicators,
  };
};
