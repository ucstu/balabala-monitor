import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import * as dayjs from "dayjs";
import { resourceindicatorIndex } from "src/config/db.index";
import { ResourceIndicator } from "src/entity/resourceIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import {
  getPerformancesResourceindicatorstatistics,
  getQueryBody,
} from "src/utils/searchBody";
import {
  ResourceIndicatorTotalVo,
  ResourceIndicatorVo,
} from "src/vo/resourceIndicator.vo";

@Injectable()
export class ResourceindicatorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   */
  async upLoadResourceIndicator(resourceIndicator: ResourceIndicator[]) {
    const body = [];
    resourceIndicator.forEach((e) => {
      body.push({ index: { _index: resourceindicatorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: resourceindicatorIndex,
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

  async queryResourceIndicator(querys: ResourceIndicatorVo) {
    const body = getQueryBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: resourceindicatorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const rest = {
      itmes: [],
      totalCount: 0,
    };
    const list: ResourceIndicator[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: ResourceIndicator = element._source;
      list.push(source);
    });
    rest.itmes = list;
    rest.totalCount = res.body.hits.total.value;
    return responseRust.success_data(rest);
  }

  /**
   * 统计数据
   */
  async totalinterfaceIndicator(querys: ResourceIndicatorTotalVo) {
    const body = getPerformancesResourceindicatorstatistics(
      querys,
      "startTime"
    );
    const res = await this.elasticsearchService.search({
      index: resourceindicatorIndex,
      body,
    });

    if (res.statusCode != 200) {
      return responseRust.error();
    }
    const list = this.totalData(res.body.aggregations.count.buckets);

    return responseRust.success_data(list);
  }

  /**
   * 处理数据
   * @param list
   * @returns
   */
  private totalData(list) {
    const restList = [];
    list.forEach((e) => {
      restList.push({
        datetime: dayjs(e.key).format("YYYY-MM-DD MM:mm:ss"),
        happenCount: e.doc_count,
        pageCount: e.pageCount.value,
        userCount: e.userCount.value,
      });
    });
    return restList;
  }
}
