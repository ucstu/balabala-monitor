import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { vueerrorIndex } from "src/config/db.index";
import { responseRust } from "src/entity/responseRust";
import { VueError } from "src/entity/vueError.entity";
import { getQueryBody, getTotalBody } from "src/utils/searchBody";
import { format } from "src/utils/timeUtils";
import { VueerrorTotalVo, VueerrorVo } from "src/vo/vueerror.vo";

@Injectable()
export class VueerrorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async uploadError(vueError: VueError[]) {
    const body = [];
    vueError.forEach((e) => {
      body.push({ index: { _index: vueerrorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: vueerrorIndex,
      body,
    });
    if (res.statusCode === 201) {
      return responseRust.success_creat();
    }
    return responseRust.error("上传失败");
  }
  async totalError(querys: VueerrorTotalVo) {
    const body = getTotalBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: vueerrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
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
  async getErrorList(querys: VueerrorVo) {
    const body = getQueryBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: vueerrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list: VueError[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: VueError = element._source;
      list.push(source);
    });
    return responseRust.success_data(list);
  }
}
