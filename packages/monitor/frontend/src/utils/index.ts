export const totalCount = (val: number): string => {
  if (val < 1000) {
    return Math.floor(val * 100) / 100 + "";
  } else if (val < 10000) {
    return Math.floor((val / 1000) * 100) / 100 + "千";
  } else {
    return Math.floor((val / 10000) * 100) / 100 + "万";
  }
};

export const totalTime = (val: number): string => {
  if (val < 1000) {
    return Math.floor(val * 100) / 100 + "ms";
  } else if (val < 10000) {
    return Math.floor((val / 1000) * 100) / 100 + "s";
  }
  return val + "";
};
