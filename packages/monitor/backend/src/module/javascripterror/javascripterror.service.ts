import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { javascripterrorIndex } from "src/config/db.index";
import { JavaScriptError } from "src/entity/javaScriptError.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalBody } from "src/utils/searchBody";
import { format } from "src/utils/timeUtils";
import {
  JavaScriptErrorTotalVo,
  JavaScriptErrorVo,
} from "src/vo/javascripterror.vo";

@Injectable()
export class JavascripterrorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async uploadError(javaScriptError: JavaScriptError[]) {
    const body = [];
    javaScriptError.forEach((e) => {
      body.push({ index: { _index: javascripterrorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: javascripterrorIndex,
      body,
    });
    if (res.statusCode === 200) {
      return responseRust.success_creat();
    }
    return responseRust.error("上传失败,原因:" + JSON.stringify(res));
  }
  async totalError(querys: JavaScriptErrorTotalVo) {
    const body = getTotalBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: javascripterrorIndex,
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
  async getErrorList(querys: JavaScriptErrorVo) {
    const body = getQueryBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: javascripterrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list: JavaScriptError[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: JavaScriptError = element._source;
      list.push(source);
    });
    return responseRust.success_data(list);
  }
}
