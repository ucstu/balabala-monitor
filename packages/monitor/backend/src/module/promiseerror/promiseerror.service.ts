import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import * as dayjs from "dayjs";
import { promiseerrorIndex } from "src/config/db.index";
import { PromiseError } from "src/entity/promiseError.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalPromiseerrorBody } from "src/utils/searchBody";
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
    const rest = {
      items: [],
      totalCount: 0,
    };
    const list: PromiseError[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: PromiseError = element._source;
      list.push(source);
    });
    rest.items = list;
    rest.totalCount = res.body.hits.total.value;
    return responseRust.success_data(rest);
  }
  async totalPromiseerror(querys: PromiseerrorTotalVo) {
    const body = getTotalPromiseerrorBody(querys);
    const res = await this.elasticsearchService.search({
      index: promiseerrorIndex,
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
