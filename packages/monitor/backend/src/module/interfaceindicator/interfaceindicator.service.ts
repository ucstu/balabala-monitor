import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { interfacindicatorIndex } from "src/config/db.index";
import { InterfaceIndicator } from "src/entity/interfaceIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import { totalData } from "src/utils/esUtils";
import { getQueryBody, getTotalinterfaceIndicator } from "src/utils/searchBody";
import {
  InterfaceIndicatorTotalVo,
  InterfaceIndicatorVo,
} from "src/vo/interfaceIndicator.vo";
@Injectable()
export class InterfaceindicatorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   *上传数据
   * @param interfaceIndicator
   * @returns
   */
  async upLoadInterfaceindicator(interfaceIndicator: InterfaceIndicator[]) {
    const body = [];
    interfaceIndicator.forEach((e) => {
      body.push({ index: { _index: interfacindicatorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: interfacindicatorIndex,
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
  async queryInterfaceindicator(querys: InterfaceIndicatorVo) {
    const body = getQueryBody(querys, "startTime");
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
          average: {
            avg: {
              field: "duration",
            },
          },
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
        pageCount: item.pageCount.value,
      };
    });
    return responseRust.success_data(list);
  }

  /**
   * 统计数据
   */
  async totalinterfaceIndicator(querys: InterfaceIndicatorTotalVo) {
    const body = getTotalinterfaceIndicator(querys, "startTime");
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
