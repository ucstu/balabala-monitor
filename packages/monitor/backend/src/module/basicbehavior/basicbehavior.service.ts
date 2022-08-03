import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { basicbehaviorIndex } from "src/config/db.index";
import { BasicBehavior } from "src/entity/basicBehavior.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalBody } from "src/utils/searchBody";
import { BasicBehaviorTotalVo, BasicBehaviorVo } from "src/vo/BasicBehavior.vo";
import { format } from "src/utils/timeUtils";
/**
 * 基础行为
 */
@Injectable()
export class BasicbehaviorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  /**
   * 上传数据
   */

  async upLoadBasicBehavior(basicbehavior: BasicBehavior) {
    const res = await this.elasticsearchService.index({
      index: basicbehaviorIndex,
      body: basicbehavior,
    });
    if (res.statusCode === 201) {
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

    const list: BasicBehavior[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: BasicBehavior = element._source;
      list.push(source);
    });
    return responseRust.success_data(list);
  }

  /**
   * 统计数据
   */
  async totalBasicBehavior(
    querys: BasicBehaviorTotalVo
  ): Promise<responseRust> {
    const body = getTotalBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: basicbehaviorIndex,
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
