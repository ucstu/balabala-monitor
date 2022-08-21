import dayjs from "dayjs";
import { computed, ref } from "vue";

export const useDateTime = (format: string) => {
  const date = ref(new Date());
  setTimeout(() => {
    date.value = new Date();
  }, 1000 * 60);
  return computed(() => dayjs(date.value).format(format));
};
