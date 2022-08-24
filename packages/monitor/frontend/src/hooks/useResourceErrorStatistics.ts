import { getErrorsResourceerrorstatistics, ResourceError } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicStatisticItem, BasicStatisticParam } from "./types";

const store = useStore();

export interface ResourceErrorStatisticParam extends BasicStatisticParam {
  /*
   * 资源路径
   */
  url?: string;
}

export type ResourceErrorStatisticItem = BasicStatisticItem;

export const useResourceErrorStatistics = (
  _param: MaybeComputedRef<ResourceErrorStatisticParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const resourceErrorStatistics = ref<Array<ResourceErrorStatisticItem>>();
  const resourceErrorStatisticsLoading = ref(false);
  const _getErrorsResourceErrorStatistics = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    resourceErrorStatisticsLoading.value = true;
    getErrorsResourceerrorstatistics({
      ...param.value,
      appId: store.appId,
      mainType: ResourceError.mainType.ResourceError,
      subType: ResourceError.subType.ResourceError,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        resourceErrorStatistics.value = res.data.map((item) => {
          return {
            ...item,
            dateTime: dayjs(item.dateTime, dateTimeFormate),
          };
        });
      })
      .finally(() => {
        resourceErrorStatisticsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getErrorsResourceErrorStatistics(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    resourceErrorStatisticsLoading,
    resourceErrorStatistics,
    reload: _getErrorsResourceErrorStatistics,
  };
};
