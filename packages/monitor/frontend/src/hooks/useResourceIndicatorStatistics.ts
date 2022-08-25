import {
  getPerformancesResourceindicatorstatistics,
  ResourceIndicator,
} from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicStatisticItem, BasicStatisticParam } from "./types";

const store = useStore();

export interface ResourceIndicatorStatisticParam extends BasicStatisticParam {
  /*
   * 接口路径
   */
  url?: string;
}

export type ResourceIndicatorStatisticItem = BasicStatisticItem;

export const useResourceIndicatorStatistics = (
  _param: MaybeComputedRef<ResourceIndicatorStatisticParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const resourceIndicatorStatistics =
    ref<Array<ResourceIndicatorStatisticItem>>();
  const resourceIndicatorStatisticsLoading = ref(false);
  const _getPerformancesResourceIndicatorStatistics = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    resourceIndicatorStatisticsLoading.value = true;
    getPerformancesResourceindicatorstatistics({
      ...param.value,
      appId: store.appId,
      mainType: ResourceIndicator.mainType.ResourceIndicator,
      subType: ResourceIndicator.subType.ResourceIndicator,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        resourceIndicatorStatistics.value = res.data.map((item) => {
          return {
            ...item,
            dateTime: dayjs(item.dateTime, dateTimeFormate),
          };
        });
      })
      .finally(() => {
        resourceIndicatorStatisticsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getPerformancesResourceIndicatorStatistics(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    resourceIndicatorStatisticsLoading,
    resourceIndicatorStatistics,
    reload: _getPerformancesResourceIndicatorStatistics,
  };
};
