import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import * as dayjs from "dayjs";
import { javascripterrorIndex } from "src/config/db.index";
import { JavaScriptError } from "src/entity/javaScriptError.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalErrorBody } from "src/utils/searchBody";
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

  async getErrorList(querys: JavaScriptErrorVo) {
    const body = getQueryBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: javascripterrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const rest = {
      itmes: [],
      totalCount: 0,
    };
    const list: JavaScriptError[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: JavaScriptError = element._source;
      list.push(source);
    });
    rest.itmes = list;
    rest.totalCount = res.body.hits.total.value;
    return responseRust.success_data(rest);
  }

  async totalError(querys: JavaScriptErrorTotalVo) {
    const body = getTotalErrorBody(querys);
    const res = await this.elasticsearchService.search({
      index: javascripterrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list = this.getData(res.body.aggregations.count.buckets);
    return responseRust.success_data(list);
  }
  /**
   * 处理数据
   * @param list
   * @returns
   */
  private getData(list) {
    const restList = [];
    list.forEach((e) => {
      restList.push({
        datetime: dayjs(e.key).format("YYYY-MM-DD MM:mm:ss"),
        count: e.doc_count,
        userCount: e.userCount.value,
      });
    });
    return restList;
  }
}
