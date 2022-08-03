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
    clickBehavior: ClickBehavior
  ): Promise<responseRust> {
    const res = await this.elasticsearchService.index({
      index: clickbehaviorIndex,
      body: clickBehavior,
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
  async queryClickBehavior(querys: ClickBehaviorVo) {
    const body = getQueryBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: clickbehaviorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }

    const list: ClickBehavior[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: ClickBehavior = element._source;
      list.push(source);
    });
    return responseRust.success_data(list);
  }
}
