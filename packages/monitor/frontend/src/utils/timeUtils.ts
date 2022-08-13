/**
 *
 * @param date
 * @returns yyyy-MM-dd
 */
export const format = (date: Date): string => {
  //日期
  const DD = String(date.getDate()).padStart(2, "0"); // 获取日
  const MM = String(date.getMonth() + 1).padStart(2, "0"); //获取月份，1 月为 0
  const yyyy = date.getFullYear(); // 获取年
  const dateStr = yyyy + "-" + MM + "-" + DD;
  return dateStr;
};
