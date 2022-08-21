import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import * as dayjs from "dayjs";
import { promiseerrorIndex } from "src/config/db.index";
import { PromiseError } from "src/entity/promiseError.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalPromiseerrorBody } from "src/utils/searchBody";
import { PromiseerrorTotalVo, PromiseerrorVo } from "src/vo/promiseerror.vo";
const SqlString = require("sqlstring");
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
    let size = querys.size ? querys.size : 10;
    if (!querys.size) {
      body.aggs = {
        allCount: {
          cardinality: {
            field: "stack",
          },
        },
      };
      // 查询总条数
      const allCount = await this.elasticsearchService.search({
        index: promiseerrorIndex,
        body,
      });
      if (allCount.statusCode !== 200) {
        return responseRust.error();
      }
      size =
        allCount.body.aggregations.allCount.value === 0
          ? size
          : allCount.body.aggregations.allCount.value;
    }
    body.aggs = {
      count: {
        terms: {
          field: "stack",
          size: size,
        },
        aggs: {
          userCount: {
            cardinality: {
              field: "userID",
            },
          },
          pageUrl: {
            cardinality: {
              field: "pageUrl",
            },
          },
        },
      },
    };
    const res = await this.elasticsearchService.search({
      index: promiseerrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list = res.body.aggregations.count.buckets.map((item) => {
      return {
        stack: item.key,
        count: item.doc_count,
        average: 0,
        userCount: item.userCount.value,
        pageCount: item.pageUrl.value,
      };
    });
    return responseRust.success_data(list);
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
        dateTime: dayjs(e.key).format("YYYY-MM-DD MM:mm:ss"),
        count: e.doc_count,
        userCount: e.userCount.value,
      });
    });
    return restList;
  }
}
