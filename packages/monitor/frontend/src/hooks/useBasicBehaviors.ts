import { BasicBehavior, getBehaviorsBasicbehaviors } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicQueryItem, BasicQueryParam } from "./types";

const store = useStore();

export interface BasicBehaviorParam extends BasicQueryParam {
  /*
   * 父级分类
   */
  mainType: BasicBehavior.mainType;
  /*
   * 子级分类
   */
  subType: BasicBehavior.subType;
}

export interface BasicBehaviorItem extends BasicQueryItem {
  /*
   * 页面路径
   */
  pageUrl: string;
}

export const useBasicBehaviors = (
  _param: MaybeComputedRef<BasicBehaviorParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const basicBehaviors = ref<Array<BasicBehaviorItem>>();
  const basicBehaviorsLoading = ref(false);
  const _getBehaviorsBasicBehaviors = useDebounceFn(() => {
    if (param.value._skip) {
      return;
    }
    basicBehaviorsLoading.value = true;
    getBehaviorsBasicbehaviors({
      ...param.value,
      appId: store.appId,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        basicBehaviors.value = res.data;
      })
      .finally(() => {
        basicBehaviorsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getBehaviorsBasicBehaviors(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    basicBehaviorsLoading,
    basicBehaviors,
    reload: _getBehaviorsBasicBehaviors,
  };
};
