import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import * as dayjs from "dayjs";
import { resourceerrorIndex } from "src/config/db.index";
import { ResourceError } from "src/entity/resourceError.entity";
import { responseRust } from "src/entity/responseRust";
import {
  getQueryBody,
  getTotalResourceerrorstatisticsBody,
} from "src/utils/searchBody";
import { ResourceerrorTotalVo, ResourceerrorVo } from "src/vo/resourceerror.vo";
@Injectable()
export class ResourceerrorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  /**
   * 上报数据
   * @param resourceError
   * @returns
   */
  async uploadError(resourceError: ResourceError[]): Promise<responseRust> {
    const body = [];
    resourceError.forEach((e) => {
      body.push({ index: { _index: resourceerrorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk<ResourceError>({
      index: resourceerrorIndex,
      body,
    });
    if (res.statusCode === 200) {
      return responseRust.success_creat();
    }
    return responseRust.error("上传失败,原因:" + JSON.stringify(res));
  }

  /**
   * 列表查询
   * @param querys
   * @returns
   */
  async getErrorList(querys: ResourceerrorVo) {
    const body = getQueryBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: resourceerrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const rest = {
      items: [],
      totalCount: 0,
    };
    const list: ResourceError[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: ResourceError = element._source;
      list.push(source);
    });
    rest.items = list;
    rest.totalCount = res.body.hits.total.value;
    return responseRust.success_data(rest);
  }

  /**
   * 统计
   * @param querys
   * @returns
   */
  async totalResourceerrorstatistics(
    querys: ResourceerrorTotalVo
  ): Promise<responseRust> {
    const body = getTotalResourceerrorstatisticsBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: resourceerrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list = this.totalData(querys, res.body.aggregations.count.buckets);
    return responseRust.success_data(list);
  }
  private totalData(querys: ResourceerrorTotalVo, list) {
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
            userCount: 0,
            pageCount: 0,
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
          userCount: 0,
          pageCount: 0,
        });
      }
      startTime = dayjs(list[list.length - 1].key);

      for (let i = 0; i <= endDay - startDay; i++) {
        const item = list[i];
        restList.push({
          datetime: dayjs(item.key).format(timeFormat),
          count: item.doc_count,
          pageCount: item.pageCount.value ? item.pageCount.value : 0,
          userCount: item.userCount.value ? item.userCount.value : 0,
        });
      }
      for (let i = 0; i < dayNum - endDay; i++) {
        restList.push({
          datetime: dayjs(list[list.length - 1].key)
            .add(1 + i, "day")
            .format(timeFormat),
          count: 0,
          userCount: 0,
          pageCount: 0,
        });
      }
    } else if (querys.granularity === "1h") {
      timeFormat = "MM-DD";
      // 当天
      let startTime = dayjs(querys.start_time, "YYYY-MM-DD").startOf("hour");
      const dayNum = 24;
      if (list.length === 0) {
        // 当月天数
        for (let index = 0; index < dayNum; index++) {
          restList.push({
            datetime: startTime.format(timeFormat),
            count: 0,
            userCount: 0,
            pageCount: 0,
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
          userCount: 0,
          pageCount: 0,
        });
      }
      startTime = dayjs(list[list.length - 1].key);

      for (let i = 0; i <= endDay - startDay; i++) {
        const item = list[i];
        restList.push({
          datetime: dayjs(item.key).format(timeFormat),
          count: item.doc_count,
          pageCount: item.pageCount.value ? item.pageCount.value : 0,
          userCount: item.userCount.value ? item.userCount.value : 0,
        });
      }
      for (let i = 0; i < dayNum - endDay; i++) {
        restList.push({
          datetime: dayjs(list[list.length - 1].key)
            .add(1 + i, "hour")
            .format(timeFormat),
          count: 0,
          pageCount: 0,
          userCount: 0,
        });
      }
    }
    return restList;
  }
}
