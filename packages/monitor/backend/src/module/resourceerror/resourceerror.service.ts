import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { resourceerrorIndex } from "src/config/db.index";
import { ResourceError } from "src/entity/resourceError.entity";
import { responseRust } from "src/entity/responseRust";
import { getQueryBody, getTotalBody } from "src/utils/searchBody";
import { format } from "src/utils/timeUtils";
import { ResourceerrorTotalVo, ResourceerrorVo } from "src/vo/resourceerror.vo";
@Injectable()
export class ResourceerrorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}
  async uploadError(resourceError: ResourceError): Promise<responseRust> {
    const res = await this.elasticsearchService.index<ResourceError>({
      index: resourceerrorIndex,
      body: resourceError,
    });
    return responseRust.success_creat();
  }

  async totalError(querys: ResourceerrorTotalVo): Promise<responseRust> {
    const body = getTotalBody(querys, "errorTime");
    const res = await this.elasticsearchService.search({
      index: resourceerrorIndex,
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
}
