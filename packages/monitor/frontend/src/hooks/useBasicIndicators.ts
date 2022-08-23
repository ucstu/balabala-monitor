import { BasicIndicator, getPerformancesBasicindicators } from "@/apis";
import { useStore } from "@/stores";
import { useDebounceFn } from "@vueuse/core";
import type { Dayjs } from "dayjs";
import type { Ref } from "vue";
import { isRef, ref, watch } from "vue";
import { timeFormate } from "./configs";
import type { BasicIndicatorItem as _BasicIndicatorItem } from "./types";

const store = useStore();

export interface BasicIndicatorItem extends _BasicIndicatorItem {
  pageUrl: string;
}

export const useBasicIndicators = (
  mainType: BasicIndicator.mainType,
  subType: BasicIndicator.subType,
  startTime: Ref<Dayjs> | Dayjs,
  endTime: Ref<Dayjs> | Dayjs,
  userId?: Ref<string> | undefined,
  pageUrl?: Ref<string> | undefined,
  size?: Ref<number> | undefined
) => {
  const basicIndicators = ref<Array<BasicIndicatorItem>>();
  const basicIndicatorsLoading = ref(false);
  const _getPerformancesBasicIndicators = useDebounceFn(() => {
    basicIndicatorsLoading.value = true;
    getPerformancesBasicindicators({
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
      size: size?.value,
    }).then((res) => {
      basicIndicators.value = res.data;
      basicIndicatorsLoading.value = false;
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
    () => _getPerformancesBasicIndicators(),
    {
      immediate: true,
    }
  );
  return {
    basicIndicatorsLoading,
    basicIndicators,
    reload: _getPerformancesBasicIndicators,
  };
};
