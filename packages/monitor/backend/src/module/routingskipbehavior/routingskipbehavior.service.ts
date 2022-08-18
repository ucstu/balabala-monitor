import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { routingskipbehaviorIndex } from "src/config/db.index";
import { responseRust } from "src/entity/responseRust";
import { RoutingSkipBehavior } from "src/entity/routingSkipBehavior.entity";
import { getQueryBody } from "src/utils/searchBody";
import { RoutingSkipBehaviorVo } from "src/vo/RoutingSkipBehavior.vo";

@Injectable()
export class RoutingskipbehaviorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   */

  async upLoadRoutingSkipBehavior(
    routingSkipBehavior: RoutingSkipBehavior[]
  ): Promise<responseRust> {
    const body = [];
    routingSkipBehavior.forEach((e) => {
      body.push({ index: { _index: routingskipbehaviorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: routingskipbehaviorIndex,
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
  async queryRoutingSkipBehavior(querys: RoutingSkipBehaviorVo) {
    const body = getQueryBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: routingskipbehaviorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const rest = {
      items: [],
      totalCount: 0,
    };
    const list: RoutingSkipBehavior[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: RoutingSkipBehavior = element._source;
      list.push(source);
    });
    rest.items = list;
    rest.totalCount = res.body.hits.total.value;
    return responseRust.success_data(rest);
  }
}
