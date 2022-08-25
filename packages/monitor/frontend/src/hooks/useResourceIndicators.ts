import { getPerformancesResourceindicators, ResourceIndicator } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicQueryItem, BasicQueryParam } from "./types";

const store = useStore();

export interface ResourceIndicatorParam extends BasicQueryParam {
  /*
   * 父级分类
   */
  mainType: ResourceIndicator.mainType;
  /*
   * 子级分类
   */
  subType: ResourceIndicator.subType;
}

export interface ResourceIndicatorItem extends BasicQueryItem {
  /*
   * 资源路径
   */
  url: string;
}

export const useResourceIndicators = (
  _param: MaybeComputedRef<ResourceIndicatorParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const resourceIndicators = ref<Array<ResourceIndicatorItem>>();
  const resourceIndicatorsLoading = ref(false);
  const _getPerformancesResourceIndicators = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    resourceIndicatorsLoading.value = true;
    getPerformancesResourceindicators({
      ...param.value,
      appId: store.appId,
      mainType: ResourceIndicator.mainType.ResourceIndicator,
      subType: ResourceIndicator.subType.ResourceIndicator,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        resourceIndicators.value = res.data;
      })
      .finally(() => {
        resourceIndicatorsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getPerformancesResourceIndicators(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    resourceIndicatorsLoading,
    resourceIndicators,
    reload: _getPerformancesResourceIndicators,
  };
};
