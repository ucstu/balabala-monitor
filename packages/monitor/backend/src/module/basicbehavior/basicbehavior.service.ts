import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { basicbehaviorIndex } from "src/config/db.index";
import { BasicBehavior } from "src/entity/basicBehavior.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalBody } from "src/utils/searchBody";
import { format } from "src/utils/timeUtils";
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
      console.log(res);
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
      itmes: [],
      totalCount: 0,
    };
    const list: BasicBehavior[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: BasicBehavior = element._source;
      list.push(source);
    });

    rest.itmes = list;
    rest.totalCount = res.body.hits.total.value;
    return responseRust.success_data(rest);
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
    return responseRust.success_data(list);
  }
}
