import {
  BasicIndicator,
  getPerformancesBasicindicatorstatistics,
} from "@/apis";
import { useStore } from "@/stores";
import { useDebounceFn } from "@vueuse/core";
import type { Dayjs } from "dayjs";
import type { Ref } from "vue";
import { isRef, ref, watch } from "vue";
import { timeFormate } from "./configs";
import type { Statistic } from "./types";

const store = useStore();

export const useBasicIndicatorStatistics = (
  mainType: BasicIndicator.mainType,
  subType: BasicIndicator.subType,
  startTime: Ref<Dayjs> | Dayjs,
  endTime: Ref<Dayjs> | Dayjs,
  userId?: Ref<string> | undefined,
  pageUrl?: Ref<string> | undefined,
  granularity?: Ref<string> | undefined
) => {
  const basicIndicatorStatistics = ref<Array<Array<Statistic>>>();
  const basicIndicatorStatisticsLoading = ref(false);
  const _getPerformancesBasicIndicatorStatistics = useDebounceFn(() => {
    basicIndicatorStatisticsLoading.value = true;
    getPerformancesBasicindicatorstatistics({
      appId: store.appId,
      startTime: isRef(startTime)
        ? startTime.value.format(timeFormate)
        : startTime.format(timeFormate),
      endTime: isRef(endTime)
        ? endTime.value.format(timeFormate)
        : endTime.format(timeFormate),
      mainType,
      subType,
      userId: userId?.value,
      pageUrl: pageUrl?.value,
      granularity: granularity?.value,
    }).then((res) => {
      basicIndicatorStatistics.value = res.data;
      basicIndicatorStatisticsLoading.value = false;
    });
  }, 20);
  watch(
    [
      isRef(startTime) ? () => startTime.value : undefined,
      isRef(endTime) ? () => endTime.value : undefined,
      () => userId?.value,
      () => pageUrl?.value,
      () => granularity?.value,
    ].filter((item) => item),
    () => _getPerformancesBasicIndicatorStatistics(),
    {
      immediate: true,
    }
  );
  return {
    basicIndicatorStatisticsLoading,
    basicIndicatorStatistics,
    reload: _getPerformancesBasicIndicatorStatistics,
  };
};
