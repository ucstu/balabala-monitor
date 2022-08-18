import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import * as dayjs from "dayjs";
import { basicindicatorIndex } from "src/config/db.index";
import { BasicIndicator } from "src/entity/basicIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import {
  getPerformancesBasicindicatorsBody,
  getQueryBody,
} from "src/utils/searchBody";
import {
  BasicindicatorsTotalVo,
  BasicindicatorsVo,
} from "src/vo/basicindicators.vo";

@Injectable()
export class BasicindicatorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   * @param basicIndicator
   * @returns
   */
  async upLoadBasicindicator(
    basicIndicator: BasicIndicator[]
  ): Promise<responseRust> {
    const body = [];
    basicIndicator.forEach((e) => {
      body.push({ index: { _index: basicindicatorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: basicindicatorIndex,
      body,
    });
    if (res.statusCode === 200) {
      return responseRust.success_creat();
    } else {
      return responseRust.error();
    }
  }

  /**
   * 查询数据
   *
   */
  async queryBasicindicator(querys: BasicindicatorsVo) {
    const body = getQueryBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: basicindicatorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const rest = {
      items: [],
      totalCount: 0,
    };
    const list: BasicIndicator[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: BasicIndicator = element._source;
      list.push(source);
    });
    rest.items = list;
    rest.totalCount = res.body.hits.total.value;
    return responseRust.success_data(rest);
  }

  /**
   *统计数据
   */
  async totalBasicindicator(
    querys: BasicindicatorsTotalVo
  ): Promise<responseRust> {
    const body = getPerformancesBasicindicatorsBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: basicindicatorIndex,
      body,
    });
    if (res.statusCode != 200) {
      return responseRust.error();
    }
    const list = [];
    res.body.aggregations.count.buckets.forEach((e) => {
      const tempList = this.totalData(querys, e.list.buckets);
      list.push(tempList);
    });
    return responseRust.success_data(list);
  }

  /**
   * 处理es 返回结果集
   * 填充日期
   * @param querys
   * @param list
   * @returns
   */
  private totalData(querys: BasicindicatorsTotalVo, list) {
    const restList = [];
    let timeFormat;
    if (querys.granularity === "1d") {
      timeFormat = "MM-DD";
      // 当月的第一天
      let startTime = dayjs(querys.starttime, "YYYY-MM-DD").startOf("month");
      const dayNum = dayjs(querys.starttime, "YYYY-MM-DD").daysInMonth();
      if (list.length === 0) {
        // 当月天数
        for (let index = 0; index < dayNum; index++) {
          restList.push({
            datetime: startTime.format(timeFormat),
            count: 0,
            avarge: 0,
          });
          startTime = startTime.add(1, "day");
        }
        return restList;
      }
      // 这个月开始的第一天
      const startMontyDay: number = startTime.date();
      // 结果集的第一天
      const startDay: number = dayjs(list[0].key).date();
      // 结果集的最后一天
      const endDay = dayjs(list[list.length - 1].key).date();

      for (let i = 0; i < startDay - startMontyDay; i++) {
        restList.unshift({
          datetime: dayjs(list[0].key)
            .subtract(i + 1, "day")
            .format(timeFormat),
          count: 0,
          avarge: 0,
        });
      }
      startTime = dayjs(list[list.length - 1].key);

      for (let i = 0; i <= endDay - startDay; i++) {
        const item = list[i];
        restList.push({
          datetime: dayjs(item.key).format(timeFormat),
          count: item.doc_count,
          avarge: item.avg.value ? item.avg.value : 0,
        });
      }
      for (let i = 0; i < dayNum - endDay; i++) {
        restList.push({
          datetime: dayjs(list[list.length - 1].key)
            .add(1 + i, "day")
            .format(timeFormat),
          count: 0,
          avarge: 0,
        });
      }
    } else if (querys.granularity === "1h") {
      timeFormat = "HH:mm";
      // 当天
      let startTime = dayjs(querys.starttime, "YYYY-MM-DD").startOf("hour");
      const dayNum = 24;
      if (list.length === 0) {
        // 当月天数
        for (let index = 0; index < dayNum; index++) {
          restList.push({
            datetime: startTime.format(timeFormat),
            count: 0,
            avarge: 0,
          });
          startTime = startTime.add(1, "hour");
        }
        return restList;
      }
      // 这个天开始的第一天
      const startMontyDay: number = startTime.hour();
      // 结果集的第一天
      const startDay: number = dayjs(list[0].key).hour();
      // 结果集的最后一天
      const endDay = dayjs(list[list.length - 1].key).hour();

      for (let i = 0; i < startDay - startMontyDay; i++) {
        restList.unshift({
          datetime: dayjs(list[0].key)
            .subtract(i + 1, "hour")
            .format(timeFormat),
          count: 0,
          avarge: 0,
        });
      }
      startTime = dayjs(list[list.length - 1].key);

      for (let i = 0; i <= endDay - startDay; i++) {
        const item = list[i];
        restList.push({
          datetime: dayjs(item.key).format(timeFormat),
          count: item.doc_count,
          avarge: item.avg.value ? item.avg.value : 0,
        });
      }
      for (let i = 0; i < dayNum - endDay; i++) {
        restList.push({
          datetime: dayjs(list[list.length - 1].key)
            .add(1 + i, "hour")
            .format(timeFormat),
          count: 0,
          avarge: 0,
        });
      }
    }
    return restList;
  }
}
