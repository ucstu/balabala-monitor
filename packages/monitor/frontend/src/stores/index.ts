import { defineStore } from "pinia";

export const useStore = defineStore("main", () => {
  const appId = $ref("");
  return { appId };
});
