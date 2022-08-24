import { getErrorsResourceerrors, ResourceError } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicQueryItem, BasicQueryParam } from "./types";

const store = useStore();

export type ResourceErrorParam = BasicQueryParam;

export interface ResourceErrorItem extends BasicQueryItem {
  /*
   * 资源路径
   */
  url: string;
}

export const useResourceErrors = (
  _param: MaybeComputedRef<ResourceErrorParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const resourceErrors = ref<Array<ResourceErrorItem>>();
  const resourceErrorsLoading = ref(false);
  const _getErrorsResourceErrors = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    resourceErrorsLoading.value = true;
    getErrorsResourceerrors({
      ...param.value,
      appId: store.appId,
      mainType: ResourceError.mainType.ResourceError,
      subType: ResourceError.subType.ResourceError,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        resourceErrors.value = res.data;
      })
      .finally(() => {
        resourceErrorsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getErrorsResourceErrors(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    resourceErrorsLoading,
    resourceErrors,
    reload: _getErrorsResourceErrors,
  };
};
