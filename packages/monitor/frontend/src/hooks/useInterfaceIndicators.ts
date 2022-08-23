import { getPerformancesInterfaceindicators, InterfaceIndicator } from "@/apis";
import { useStore } from "@/stores";
import { useDebounceFn } from "@vueuse/core";
import type { Dayjs } from "dayjs";
import type { Ref } from "vue";
import { isRef, ref, watch } from "vue";
import { timeFormate } from "./configs";
import type { BasicIndicatorItem } from "./types";

const store = useStore();

export interface InterfaceIndicatorItem extends BasicIndicatorItem {
  url: string;
}

export const useInterfaceIndicators = (
  startTime: Ref<Dayjs> | Dayjs,
  endTime: Ref<Dayjs> | Dayjs,
  userId?: Ref<string> | undefined,
  pageUrl?: Ref<string> | undefined,
  size?: Ref<number> | undefined
) => {
  const interfaceIndicators = ref<Array<InterfaceIndicatorItem>>();
  const interfaceIndicatorsLoading = ref(false);
  const _getPerformancesInterfaceIndicators = useDebounceFn(() => {
    interfaceIndicatorsLoading.value = true;
    getPerformancesInterfaceindicators({
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
      size: size?.value,
    }).then((res) => {
      interfaceIndicators.value = res.data;
      interfaceIndicatorsLoading.value = false;
    });
  }, 20);
  watch(
    [
      isRef(startTime) ? () => startTime.value : undefined,
      isRef(endTime) ? () => endTime.value : undefined,
      () => userId?.value,
      () => pageUrl?.value,
      () => size?.value,
    ].filter((item) => item),
    () => _getPerformancesInterfaceIndicators(),
    {
      immediate: true,
    }
  );
  return {
    interfaceIndicatorsLoading,
    interfaceIndicators,
    reload: _getPerformancesInterfaceIndicators,
  };
};
