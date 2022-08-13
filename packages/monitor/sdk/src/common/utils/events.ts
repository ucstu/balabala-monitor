const beforeUnloadCallbacks = new Set<
  (this: Window, ev: BeforeUnloadEvent) => void
>();
export const onBeforeUnload = (
  callback: (this: Window, ev: BeforeUnloadEvent) => void
) => {
  beforeUnloadCallbacks.add(callback);
  window.addEventListener("beforeunload", callback, true);
  return () => {
    window.removeEventListener("beforeunload", callback, true);
    beforeUnloadCallbacks.delete(callback);
  };
};

const hiddenCallbacks = new Set<() => void>();
export const onHidden = (callback: () => void) => {
  const superCallback = () => {
    if (document.visibilityState === "hidden") {
      callback();
    }
  };
  hiddenCallbacks.add(superCallback);
  window.addEventListener("visibilitychange", superCallback, true);
  return () => {
    window.removeEventListener("visibilitychange", superCallback, true);
    hiddenCallbacks.delete(superCallback);
  };
};
