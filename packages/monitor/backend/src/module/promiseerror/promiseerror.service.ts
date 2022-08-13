import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { promiseerrorIndex } from "src/config/db.index";
import { PromiseError } from "src/entity/promiseError.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalBody } from "src/utils/searchBody";
import { format } from "src/utils/timeUtils";
import { PromiseerrorTotalVo, PromiseerrorVo } from "src/vo/promiseerror.vo";

@Injectable()
export class PromiseerrorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async uploadError(promiseError: PromiseError[]) {
    const body = [];
    promiseError.forEach((e) => {
      body.push({ index: { _index: promiseerrorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: promiseerrorIndex,
      body,
    });
    if (res.statusCode === 200) {
      return responseRust.success_creat();
    }
    return responseRust.error("上传失败,原因:" + JSON.stringify(res));
  }
  async getErrorList(querys: PromiseerrorVo) {
    const body = getQueryBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: promiseerrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list: PromiseError[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: PromiseError = element._source;
      list.push(source);
    });
    return responseRust.success_data(list);
  }
  async totalError(querys: PromiseerrorTotalVo) {
    const body = getTotalBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: promiseerrorIndex,
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
}
