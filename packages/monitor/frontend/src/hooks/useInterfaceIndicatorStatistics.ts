import {
  getPerformancesInterfaceindicatorstatistics,
  InterfaceIndicator,
} from "@/apis";
import { useStore } from "@/stores";
import { useDebounceFn } from "@vueuse/core";
import type { Dayjs } from "dayjs";
import type { Ref } from "vue";
import { isRef, ref, watch } from "vue";
import { timeFormate } from "./configs";
import type { Statistic } from "./types";

const store = useStore();

export const useInterfaceIndicatorStatistics = (
  startTime: Ref<Dayjs> | Dayjs,
  endTime: Ref<Dayjs> | Dayjs,
  userId?: Ref<string> | undefined,
  pageUrl?: Ref<string> | undefined,
  granularity?: Ref<string> | undefined,
  url?: Ref<string> | undefined
) => {
  const interfaceIndicatorStatistics = ref<Array<Array<Statistic>>>();
  const interfaceIndicatorStatisticsLoading = ref(false);
  const _getPerformancesInterfaceIndicatorStatistics = useDebounceFn(() => {
    interfaceIndicatorStatisticsLoading.value = true;
    getPerformancesInterfaceindicatorstatistics({
      appId: store.appId,
      startTime: isRef(startTime)
        ? startTime.value.format(timeFormate)
        : startTime.format(timeFormate),
      endTime: isRef(endTime)
        ? endTime.value.format(timeFormate)
        : endTime.format(timeFormate),
      mainType: InterfaceIndicator.mainType.InterfaceIndicator,
      subType: InterfaceIndicator.subType.InterfaceIndicator,
      userId: userId?.value,
      pageUrl: pageUrl?.value,
      granularity: granularity?.value,
      url: url?.value,
    }).then((res) => {
      interfaceIndicatorStatistics.value = res.data;
      interfaceIndicatorStatisticsLoading.value = false;
    });
  }, 20);
  watch(
    [
      isRef(startTime) ? () => startTime.value : undefined,
      isRef(endTime) ? () => endTime.value : undefined,
      () => userId?.value,
      () => pageUrl?.value,
      () => granularity?.value,
      () => url?.value,
    ].filter((item) => item),
    () => _getPerformancesInterfaceIndicatorStatistics(),
    {
      immediate: true,
    }
  );
  return {
    interfaceIndicatorStatisticsLoading,
    interfaceIndicatorStatistics,
    reload: _getPerformancesInterfaceIndicatorStatistics,
  };
};
