import { BasicIndicator, getErrorsInterfaceerrorstatistics } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicStatisticItem, BasicStatisticParam } from "./types";

const store = useStore();

export interface InterfaceErrorStatisticParam extends BasicStatisticParam {
  /*
   * 接口路径
   */
  url?: string;
  /*
   * 状态码
   */
  statusCode?: number;
}

export type InterfaceErrorStatisticItem = BasicStatisticItem;

export const useInterfaceErrorStatistics = (
  _param: MaybeComputedRef<InterfaceErrorStatisticParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const interfaceErrorStatistics = ref<Array<InterfaceErrorStatisticItem>>();
  const interfaceErrorStatisticsLoading = ref(false);
  const _getErrorsInterfaceErrorStatistics = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    interfaceErrorStatisticsLoading.value = true;
    getErrorsInterfaceerrorstatistics({
      ...param.value,
      appId: store.appId,
      mainType: BasicIndicator.mainType.InterfaceIndicator,
      subType: BasicIndicator.subType.InterfaceIndicator,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        interfaceErrorStatistics.value = res.data.map((item) => {
          return {
            ...item,
            dateTime: dayjs(item.dateTime, dateTimeFormate),
          };
        });
      })
      .finally(() => {
        interfaceErrorStatisticsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getErrorsInterfaceErrorStatistics(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    interfaceErrorStatisticsLoading,
    interfaceErrorStatistics,
    reload: _getErrorsInterfaceErrorStatistics,
  };
};
