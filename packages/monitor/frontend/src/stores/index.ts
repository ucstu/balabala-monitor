import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("main", () => {
  const appId = ref("b2FdF9cb-1EE7-Dc6e-de9C-1cAcf37dcdd5");
  return { appId };
});
