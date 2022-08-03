import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { basicindicatorIndex } from "src/config/db.index";
import { BasicIndicator } from "src/entity/basicIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalBody } from "src/utils/searchBody";
import { format } from "src/utils/timeUtils";
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
    basicIndicator: BasicIndicator
  ): Promise<responseRust> {
    const res = await this.elasticsearchService.index({
      index: basicindicatorIndex,
      body: basicIndicator,
    });
    if (res.statusCode === 201) {
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

    const list: BasicIndicator[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: BasicIndicator = element._source;
      list.push(source);
    });
    return responseRust.success_data(list);
  }

  /**
   *统计数据
   */
  async totalBasicindicator(
    querys: BasicindicatorsTotalVo
  ): Promise<responseRust> {
    const body = getTotalBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: basicindicatorIndex,
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
