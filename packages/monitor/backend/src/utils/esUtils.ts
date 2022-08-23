import * as dayjs from "dayjs";
import { ManipulateType } from "dayjs";
import { BaseTotalVo } from "src/vo/base.vo";
/**
 * 处理es 返回结果集
 * 填充日期
 * @param querys
 * @param list
 * @returns
 */
export const totalData = (querys: BaseTotalVo, list) => {
  const restList = [];
  const [_value, value, unit] = /(\d)+([smhdMy])/.exec(querys.granularity);
  const intValue = parseInt(value);
  const typeUnit = unit as ManipulateType;
  const timeFormat = "YYYY-MM-DD HH:mm:ss";
  //查询的结束时间
  const endTime = dayjs(querys.end_time, "YYYY-MM-DD HH:mm:ss");
  //查询的开始时间
  let startTime = dayjs(querys.start_time, "YYYY-MM-DD HH:mm:ss");
  if (list.length === 0) {
    while (startTime.isBefore(endTime, typeUnit)) {
      restList.push({
        dateTime: startTime.format(timeFormat),
        count: 0,
        average: 0,
        userCount: 0,
        pageCount: 0,
      });
      startTime = startTime.add(1, typeUnit);
    }
    return restList;
  }
  // 结果集的第一天
  let resultStartTime = dayjs(list[0].key);
  // 结果集的最后一天
  let resultEndTime = dayjs(list[list.length - 1].key);

  const tempList = [];
  // 填充结果集第一天之前
  while (startTime.isBefore(resultStartTime, typeUnit)) {
    tempList.push({
      dateTime: startTime.format(timeFormat),
      count: 0,
      average: 0,
      userCount: 0,
      pageCount: 0,
    });
    startTime = startTime.add(intValue, typeUnit);
  }

  restList.unshift(...tempList);

  // 填充结果集中间
  let index = 0;
  while (
    resultStartTime.isBefore(resultEndTime, typeUnit) ||
    resultStartTime.isSame(resultEndTime)
  ) {
    const item = list[index];
    restList.push({
      dateTime: resultStartTime.format(timeFormat),
      count: item.doc_count,
      average: item.avg && item.avg.value ? item.avg.value : 0,
      userCount: item.userCount ? item.userCount.value : 0,
      pageCount: item.pageCount ? item.pageCount.value : 0,
    });
    index++;
    resultStartTime = resultStartTime.add(intValue, typeUnit);
  }
  resultEndTime = resultEndTime.add(intValue, typeUnit);
  // 填充结果集最后一天到结束时间
  while (resultEndTime.isBefore(endTime, typeUnit)) {
    restList.push({
      dateTime: resultEndTime.format(timeFormat),
      count: 0,
      average: 0,
      userCount: 0,
      pageCount: 0,
    });
    resultEndTime = resultEndTime.add(intValue, typeUnit);
  }
  return restList;
};
