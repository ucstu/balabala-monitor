import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore(
  "main",
  () => {
    const token = ref();
    return { token };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: "balabala-juejin",
          storage: sessionStorage,
        },
      ],
    },
  }
);
