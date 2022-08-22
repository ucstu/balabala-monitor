import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { basicindicatorIndex } from "src/config/db.index";
import { BasicIndicator } from "src/entity/basicIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import { totalData } from "src/utils/esUtils";
import {
  getPerformancesBasicindicatorsBody,
  getQueryBody,
} from "src/utils/searchBody";
import {
  BasicindicatorsTotalVo,
  BasicindicatorsVo,
} from "src/vo/basicindicators.vo";

@Injectable()
export class BasicindicatorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   * @param basicIndicator
   * @returns
   */
  async upLoadBasicindicator(
    basicIndicator: BasicIndicator[]
  ): Promise<responseRust> {
    const body = [];
    basicIndicator.forEach((e) => {
      body.push({ index: { _index: basicindicatorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: basicindicatorIndex,
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
   *
   */
  async queryBasicindicator(querys: BasicindicatorsVo) {
    const body = getQueryBody(querys, "startTime");
    let size = querys.size ? querys.size : 10;
    if (!querys.size) {
      body.aggs = {
        allCount: {
          cardinality: {
            field: "pageUrl",
          },
        },
      };
      // 查询总条数
      const allCount = await this.elasticsearchService.search({
        index: basicindicatorIndex,
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
          field: "pageUrl",
          size: size,
        },
        aggs: {
          average: {
            avg: {
              field: "value",
            },
          },
          userCount: {
            cardinality: {
              field: "userID",
            },
          },
        },
      },
    };
    const res = await this.elasticsearchService.search({
      index: basicindicatorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list = res.body.aggregations.count.buckets.map((item) => {
      return {
        pageUrl: item.key,
        count: item.doc_count,
        average: item.average.value,
        userCount: item.userCount.value,
        pageCount: item.doc_count,
      };
    });
    return responseRust.success_data(list);
  }

  /**
   *统计数据
   */
  async totalBasicindicator(
    querys: BasicindicatorsTotalVo
  ): Promise<responseRust> {
    const body = getPerformancesBasicindicatorsBody(querys, "startTime");
    const res = await this.elasticsearchService.search({
      index: basicindicatorIndex,
      body,
    });
    if (res.statusCode != 200) {
      return responseRust.error();
    }
    const list = [];
    res.body.aggregations.count.buckets.forEach((e) => {
      const tempList = totalData(querys, e.list.buckets);
      list.push(tempList);
    });
    return responseRust.success_data(list);
  }
}
