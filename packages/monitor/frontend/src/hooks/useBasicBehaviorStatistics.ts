import { BasicBehavior, getBehaviorsBasicbehaviorstatistics } from "@/apis";
import { useStore } from "@/stores";
import type { MaybeComputedRef } from "@vueuse/core";
import { useDebounceFn } from "@vueuse/core";
import dayjs from "dayjs";
import { computed, ref, watch } from "vue";
import { dateTimeFormate } from "./configs";
import type { BasicStatisticItem, BasicStatisticParam } from "./types";

const store = useStore();

export interface BasicBehaviorStatisticParam extends BasicStatisticParam {
  /*
   * 父级分类
   */
  mainType: BasicBehavior.mainType;
  /*
   * 子级分类
   */
  subType: BasicBehavior.subType;
}

export type BasicBehaviorStatisticItem = BasicStatisticItem;

export const useBasicBehaviorStatistics = (
  _param: MaybeComputedRef<BasicBehaviorStatisticParam>
) => {
  const param = typeof _param === "function" ? computed(_param) : ref(_param);
  const basicBehaviorStatistics = ref<Array<BasicBehaviorStatisticItem>>();
  const basicBehaviorStatisticsLoading = ref(false);
  const _getBehaviorsBasicBehaviorStatistics = useDebounceFn(() => {
    console.log(param.value);

    if (param.value._skip) {
      return;
    }
    basicBehaviorStatisticsLoading.value = true;
    getBehaviorsBasicbehaviorstatistics({
      ...param.value,
      appId: store.appId,
      startTime: param.value.startTime.format(dateTimeFormate),
      endTime: param.value.endTime.format(dateTimeFormate),
    })
      .then((res) => {
        basicBehaviorStatistics.value = res.data.map((item) => {
          return {
            ...item,
            dateTime: dayjs(item.dateTime, dateTimeFormate),
          };
        });
      })
      .finally(() => {
        basicBehaviorStatisticsLoading.value = false;
      });
  }, 20);
  watch(
    () => param.value,
    () => _getBehaviorsBasicBehaviorStatistics(),
    {
      immediate: !param.value._lazy,
    }
  );
  return {
    basicBehaviorStatisticsLoading,
    basicBehaviorStatistics,
    reload: _getBehaviorsBasicBehaviorStatistics,
  };
};
