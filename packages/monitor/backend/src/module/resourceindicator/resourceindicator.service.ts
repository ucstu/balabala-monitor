import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import * as dayjs from "dayjs";
import { resourceindicatorIndex } from "src/config/db.index";
import { ResourceIndicator } from "src/entity/resourceIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import {
  getPerformancesResourceindicatorstatistics,
  getQueryBody,
} from "src/utils/searchBody";
import {
  ResourceIndicatorTotalVo,
  ResourceIndicatorVo,
} from "src/vo/resourceIndicator.vo";

@Injectable()
export class ResourceindicatorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   */
  async upLoadResourceIndicator(resourceIndicator: ResourceIndicator[]) {
    const body = [];
    resourceIndicator.forEach((e) => {
      body.push({ index: { _index: resourceindicatorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk({
      index: resourceindicatorIndex,
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

  async queryResourceIndicator(querys: ResourceIndicatorVo) {
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
        index: resourceindicatorIndex,
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
      index: resourceindicatorIndex,
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
  async totalinterfaceIndicator(querys: ResourceIndicatorTotalVo) {
    const body = getPerformancesResourceindicatorstatistics(
      querys,
      "startTime"
    );
    const res = await this.elasticsearchService.search({
      index: resourceindicatorIndex,
      body,
    });

    if (res.statusCode != 200) {
      return responseRust.error();
    }
    const list = this.totalData(res.body.aggregations.count.buckets);

    return responseRust.success_data(list);
  }

  /**
   * 处理数据
   * @param list
   * @returns
   */
  private totalData(list) {
    const restList = [];
    list.forEach((e) => {
      restList.push({
        dateTime: dayjs(e.key).format("YYYY-MM-DD MM:mm:ss"),
        count: e.doc_count,
        pageCount: e.pageCount.value,
        userCount: e.userCount.value,
      });
    });
    return restList;
  }
}
