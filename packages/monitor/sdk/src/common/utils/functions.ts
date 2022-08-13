export const monitoring = (...indicators: Array<() => void>) => {
  for (const indicator of indicators) {
    indicator();
  }
};
