import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { resourceindicatorIndex } from "src/config/db.index";
import { ResourceIndicator } from "src/entity/resourceIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalBody } from "src/utils/searchBody";
import { format } from "src/utils/timeUtils";
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

    const list: ResourceIndicator[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: ResourceIndicator = element._source;
      list.push(source);
    });
    return responseRust.success_data(list);
  }

  /**
   * 统计数据
   */
  async totalinterfaceIndicator(querys: ResourceIndicatorTotalVo) {
    const body = getTotalBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: resourceindicatorIndex,
      body,
    });

    if (res.statusCode != 200) {
      return responseRust.error();
    }
    const list = [];
    res.body.aggregations.count.buckets.forEach((element) => {
      list.push({
        datetime: format(new Date(element.key)),
        count: element.doc_count,
      });
    });
    return responseRust.success_data(res);
  }
}
