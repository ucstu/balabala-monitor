import {
  getPerformancesInterfaceindicatorstatistics,
  InterfaceIndicator,
} from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicStatisticItem, BasicStatisticParam } from "./types";

const store = useStore();

export interface InterfaceIndicatorStatisticParam extends BasicStatisticParam {
  /*
   * 接口路径
   */
  url?: string;
}

export type InterfaceIndicatorStatisticItem = BasicStatisticItem;

export const useInterfaceIndicatorStatistics = (
  _param: MaybeComputedRef<InterfaceIndicatorStatisticParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const interfaceIndicatorStatistics =
    ref<Array<Array<InterfaceIndicatorStatisticItem>>>();
  const interfaceIndicatorStatisticsLoading = ref(false);
  const _getPerformancesInterfaceIndicatorStatistics = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    interfaceIndicatorStatisticsLoading.value = true;
    getPerformancesInterfaceindicatorstatistics({
      ...param.value,
      appId: store.appId,
      mainType: InterfaceIndicator.mainType.InterfaceIndicator,
      subType: InterfaceIndicator.subType.InterfaceIndicator,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        interfaceIndicatorStatistics.value = res.data.map((section) =>
          section.map((item) => {
            return {
              ...item,
              dateTime: dayjs(item.dateTime, dateTimeFormate),
            };
          })
        );
      })
      .finally(() => {
        interfaceIndicatorStatisticsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getPerformancesInterfaceIndicatorStatistics(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    interfaceIndicatorStatisticsLoading,
    interfaceIndicatorStatistics,
    reload: _getPerformancesInterfaceIndicatorStatistics,
  };
};
