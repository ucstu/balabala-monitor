import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { interfacindicatorIndex } from "src/config/db.index";
import { responseRust } from "src/entity/responseRust";
import { totalData } from "src/utils/esUtils";
import {
  getInterfaceerrorsBody,
  getTotalInterfaceerrorstatisticsBody,
} from "src/utils/searchBody";
import {
  InterfaceerrorsTotalVo,
  InterfaceerrorsVo,
} from "src/vo/interfaceerrors.vo";

@Injectable()
export class InterfaceerrorsService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   *接口错误查询
   * @param querys
   * @returns
   */
  async getInterfaceerrors(querys: InterfaceerrorsVo) {
    const body = getInterfaceerrorsBody(querys);
    let size = querys.size ? querys.size : 10;
    if (!querys.size) {
      body.aggs = {
        allCount: {
          cardinality: {
            field: "url",
          },
        },
      };
      // 查询总条数
      const allCount = await this.elasticsearchService.search({
        index: interfacindicatorIndex,
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
          field: "url",
          size: size,
        },
        aggs: {
          userCount: {
            cardinality: {
              field: "userID",
            },
          },
          pageCount: {
            cardinality: {
              field: "pageUrl",
            },
          },
          average: {
            avg: {
              field: "duration",
            },
          },
        },
      },
    };
    const res = await this.elasticsearchService.search({
      index: interfacindicatorIndex,
      body,
    });

    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list = res.body.aggregations.count.buckets.map((item) => {
      return {
        url: item.key,
        count: item.doc_count,
        average: item.average.value,
        userCount: item.userCount.value,
        pageCount: item.doc_count,
      };
    });
    return responseRust.success_data(list);
  }

  /**
   * 接口错误统计
   * @param querys
   * @returns
   */
  async totalInterfaceerrorstatistics(querys: InterfaceerrorsTotalVo) {
    const body = getTotalInterfaceerrorstatisticsBody(querys);
    const res = await this.elasticsearchService.search({
      index: interfacindicatorIndex,
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
