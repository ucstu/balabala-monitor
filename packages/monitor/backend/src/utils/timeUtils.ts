export const format = (date: Date): string => {
  //日期
  var DD = String(date.getDate()).padStart(2, "0"); // 获取日
  var MM = String(date.getMonth() + 1).padStart(2, "0"); //获取月份，1 月为 0
  var yyyy = date.getFullYear(); // 获取年

  // 时间
  let hh = String(date.getHours()).padStart(2, "0"); //获取当前小时数(0-23)
  let mm = String(date.getMinutes()).padStart(2, "0"); //获取当前分钟数(0-59)
  let ss = String(date.getSeconds()).padStart(2, "0"); //获取当前秒数(0-59)
  let dateStr = yyyy + "-" + MM + "-" + DD + " " + hh + ":" + mm + ":" + ss;
  return dateStr;
};
