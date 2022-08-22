import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { resourceerrorIndex } from "src/config/db.index";
import { ResourceError } from "src/entity/resourceError.entity";
import { responseRust } from "src/entity/responseRust";
import { totalData } from "src/utils/esUtils";
import {
  getQueryBody,
  getTotalResourceerrorstatisticsBody,
} from "src/utils/searchBody";
import { ResourceerrorTotalVo, ResourceerrorVo } from "src/vo/resourceerror.vo";
@Injectable()
export class ResourceerrorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  /**
   * 上报数据
   * @param resourceError
   * @returns
   */
  async uploadError(resourceError: ResourceError[]): Promise<responseRust> {
    const body = [];
    resourceError.forEach((e) => {
      body.push({ index: { _index: resourceerrorIndex } });
      body.push(e);
    });
    const res = await this.elasticsearchService.bulk<ResourceError>({
      index: resourceerrorIndex,
      body,
    });
    if (res.statusCode === 200) {
      return responseRust.success_creat();
    }
    return responseRust.error("上传失败,原因:" + JSON.stringify(res));
  }

  /**
   * 列表查询
   * @param querys
   * @returns
   */
  async getErrorList(querys: ResourceerrorVo) {
    const body = getQueryBody(querys, "errorTime");
    let size = querys.size ? querys.size : 10;
    if (!querys.size) {
      body.aggs = {
        allCount: {
          cardinality: {
            field: "path",
          },
        },
      };
      // 查询总条数
      const allCount = await this.elasticsearchService.search({
        index: resourceerrorIndex,
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
          field: "path",
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
        },
      },
    };

    const res = await this.elasticsearchService.search({
      index: resourceerrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list = res.body.aggregations.count.buckets.map((item) => {
      return {
        path: item.key,
        count: item.doc_count,
        userCount: item.userCount.value,
        pageCount: item.pageCount.value,
      };
    });
    return responseRust.success_data(list);
  }

  /**
   * 统计
   * @param querys
   * @returns
   */
  async totalResourceerrorstatistics(
    querys: ResourceerrorTotalVo
  ): Promise<responseRust> {
    const body = getTotalResourceerrorstatisticsBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: resourceerrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list = totalData(querys, res.body.aggregations.count.buckets);
    return responseRust.success_data(list);
  }
}
