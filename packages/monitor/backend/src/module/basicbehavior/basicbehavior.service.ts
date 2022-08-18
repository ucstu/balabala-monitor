import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import * as dayjs from "dayjs";
import { basicbehaviorIndex } from "src/config/db.index";
import { BasicBehavior } from "src/entity/basicBehavior.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalBasicBehaviorBody } from "src/utils/searchBody";
import { BasicBehaviorTotalVo, BasicBehaviorVo } from "src/vo/BasicBehavior.vo";
/**
 * 基础行为
 */
@Injectable()
export class BasicbehaviorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  /**
   * 上传数据
   */
  async upLoadBasicBehavior(basicbehavior: BasicBehavior[]) {
    const body = [];
    basicbehavior.forEach((e) => {
      body.push({ index: { _index: basicbehaviorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: basicbehaviorIndex,
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
   */
  async queryBasicBehavior(querys: BasicBehaviorVo) {
    const body = getQueryBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: basicbehaviorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const rest = {
      items: [],
      totalCount: 0,
    };
    const list: BasicBehavior[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: BasicBehavior = element._source;
      list.push(source);
    });

    rest.items = list;
    rest.totalCount = res.body.hits.total.value;
    return responseRust.success_data(rest);
  }

  /**
   * 统计数据
   */
  async totalBasicBehavior(
    querys: BasicBehaviorTotalVo
  ): Promise<responseRust> {
    const body = getTotalBasicBehaviorBody(querys);
    const res = await this.elasticsearchService.search({
      index: basicbehaviorIndex,
      body,
    });

    if (res.statusCode != 200) {
      return responseRust.error();
    }
    const list = this.totalData(querys, res.body.aggregations.count.buckets);
    return responseRust.success_data(list);
  }

  /**
   * 处理es 返回结果集
   * 填充日期
   * @param querys
   * @param list
   * @returns
   */
  private totalData(querys: BasicBehaviorTotalVo, list) {
    const restList = [];
    let timeFormat;
    if (querys.granularity === "1d") {
      timeFormat = "MM-DD";
      // 当月的第一天
      let startTime = dayjs(querys.start_time, "YYYY-MM-DD").startOf("month");
      const dayNum = dayjs(querys.start_time, "YYYY-MM-DD").daysInMonth();
      if (list.length === 0) {
        // 当月天数
        for (let index = 0; index < dayNum; index++) {
          restList.push({
            datetime: startTime.format(timeFormat),
            count: 0,
            average: 0,
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
          average: 0,
        });
      }
      startTime = dayjs(list[list.length - 1].key);

      for (let i = 0; i <= endDay - startDay; i++) {
        const item = list[i];
        restList.push({
          datetime: dayjs(item.key).format(timeFormat),
          count: item.doc_count,
          average: item.avg.value ? item.avg.value : 0,
        });
      }
      for (let i = 0; i < dayNum - endDay; i++) {
        restList.push({
          datetime: dayjs(list[list.length - 1].key)
            .add(1 + i, "day")
            .format(timeFormat),
          count: 0,
          average: 0,
        });
      }
    } else if (querys.granularity === "1h") {
      timeFormat = "HH:mm";
      // 当天
      let startTime = dayjs(querys.start_time, "YYYY-MM-DD").startOf("hour");
      const dayNum = 24;
      if (list.length === 0) {
        // 当月天数
        for (let index = 0; index < dayNum; index++) {
          restList.push({
            datetime: startTime.format(timeFormat),
            count: 0,
            average: 0,
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
          average: 0,
        });
      }
      startTime = dayjs(list[list.length - 1].key);

      for (let i = 0; i <= endDay - startDay; i++) {
        const item = list[i];
        restList.push({
          datetime: dayjs(item.key).format(timeFormat),
          count: item.doc_count,
          average: item.avg.value ? item.avg.value : 0,
        });
      }
      for (let i = 0; i < dayNum - endDay; i++) {
        restList.push({
          datetime: dayjs(list[list.length - 1].key)
            .add(1 + i, "hour")
            .format(timeFormat),
          count: 0,
          average: 0,
        });
      }
    }
    return restList;
  }
}
