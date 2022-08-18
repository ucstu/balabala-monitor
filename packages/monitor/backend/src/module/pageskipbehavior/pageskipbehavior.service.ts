import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { pageskipbehaviorIndex } from "src/config/db.index";
import { PageSkipBehavior } from "src/entity/pageSkipBehavior.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody } from "src/utils/searchBody";
import { PageSkipBehaviorVo } from "src/vo/PageSkipBehavior.vo";

@Injectable()
export class PageskipbehaviorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   */

  async upLoadPageskipbehavior(
    pageSkipBehavior: PageSkipBehavior[]
  ): Promise<responseRust> {
    const body = [];
    pageSkipBehavior.forEach((e) => {
      body.push({ index: { _index: pageskipbehaviorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: pageskipbehaviorIndex,
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
  async queryPageskipbehavior(querys: PageSkipBehaviorVo) {
    const body = getQueryBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: pageskipbehaviorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const rest = {
      items: [],
      totalCount: 0,
    };
    const list: PageSkipBehavior[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: PageSkipBehavior = element._source;
      list.push(source);
    });
    rest.items = list;
    rest.totalCount = res.body.hits.total.value;
    return responseRust.success_data(rest);
  }
}
