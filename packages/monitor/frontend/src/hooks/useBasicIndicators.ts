import { BasicIndicator, getPerformancesBasicindicators } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicQueryItem, BasicQueryParam } from "./types";

const store = useStore();

export interface BasicIndicatorParam extends BasicQueryParam {
  mainType: BasicIndicator.mainType;
  subType: BasicIndicator.subType;
}

export interface BasicIndicatorItem extends BasicQueryItem {
  pageUrl: string;
}

export const useBasicIndicators = (
  _param: MaybeComputedRef<BasicIndicatorParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const basicIndicators = ref<Array<BasicIndicatorItem>>();
  const basicIndicatorsLoading = ref(false);
  const _getPerformancesBasicIndicators = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    basicIndicatorsLoading.value = true;
    getPerformancesBasicindicators({
      ...param.value,
      appId: store.appId,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        basicIndicators.value = res.data;
      })
      .finally(() => {
        basicIndicatorsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
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
