import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import * as dayjs from "dayjs";
import { resourceerrorIndex } from "src/config/db.index";
import { ResourceError } from "src/entity/resourceError.entity";
import { responseRust } from "src/entity/responseRust";
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
    const res = await this.elasticsearchService.search({
      index: resourceerrorIndex,
      body,
    });
    if (res.statusCode !== 200) {
      return responseRust.error();
    }
    const list: ResourceError[] = [];
    res.body.hits.hits.forEach((element) => {
      const source: ResourceError = element._source;
      list.push(source);
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
    const list = this.totalData(res.body.aggregations.count.buckets);
    return responseRust.success_data(list);
  }
  private totalData(list) {
    const restList = [];
    list.forEach((e) => {
      restList.push({
        datetime: dayjs(e.key).format("YYYY-MM-DD HH:mm:ss"),
        count: e.doc_count,
        userCount: e.userCount.value,
      });
    });
    return restList;
  }
}
