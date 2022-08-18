import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { clickbehaviorIndex } from "src/config/db.index";
import { ClickBehavior } from "src/entity/clickBehavior.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody } from "src/utils/searchBody";
import { ClickBehaviorVo } from "src/vo/ClickBehavior.vo";

@Injectable()
export class ClickbehaviorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   */

  async upLoadClickBehavior(
    clickBehavior: ClickBehavior[]
  ): Promise<responseRust> {
    const body = [];
    clickBehavior.forEach((e) => {
      body.push({ index: { _index: clickbehaviorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: clickbehaviorIndex,
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
  async queryClickBehavior(querys: ClickBehaviorVo) {
    const body = getQueryBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: clickbehaviorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const rest = {
      items: [],
      totalCount: 0,
    };
    const list: ClickBehavior[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: ClickBehavior = element._source;
      list.push(source);
    });
    rest.items = list;
    rest.totalCount = res.body.hits.total.value;
    return responseRust.success_data(rest);
  }
}
