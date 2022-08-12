export const format = (date: Date): string => {
  //日期
  const DD = String(date.getDate()).padStart(2, "0"); // 获取日
  const MM = String(date.getMonth() + 1).padStart(2, "0"); //获取月份，1 月为 0
  const yyyy = date.getFullYear(); // 获取年

  // 时间
  const hh = String(date.getHours()).padStart(2, "0"); //获取当前小时数(0-23)
  const mm = String(date.getMinutes()).padStart(2, "0"); //获取当前分钟数(0-59)
  const ss = String(date.getSeconds()).padStart(2, "0"); //获取当前秒数(0-59)
  const dateStr = yyyy + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
  return dateStr;
};
