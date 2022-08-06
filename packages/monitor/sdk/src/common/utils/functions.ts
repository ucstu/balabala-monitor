export const monitoring = (...indicators: Array<Function>) => {
  for (const indicator of indicators) {
    indicator();
  }
};
