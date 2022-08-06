export const onBeforeUnload = (
  callback: (this: Window, ev: BeforeUnloadEvent) => any
) => {
  window.addEventListener("beforeunload", callback);
};
