import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { resourceerrorIndex } from "src/config/db.index";
import { ResourceError } from "src/entity/resourceError.entity";
import { responseRust } from "src/entity/responseRust";
import { ResourceerrorTotalVo } from "src/vo/resourceerror.vo";
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

  async totalError(querys: ResourceerrorTotalVo) {
    const res = await this.elasticsearchService.search({
      index: resourceerrorIndex,
      body: {
        query: {
          bool: {
            must: [
              {
                term: {
                  appId: querys.appid,
                },
              },
              {
                term: {
                  userid: querys.userid,
                },
              },
              {
                term: {
                  pageurl: querys.pageurl,
                },
              },
              {
                term: {
                  type: querys.type,
                },
              },
              {
                term: {
                  subType: querys.subType,
                },
              },
            ],
          },
        },
        range: {
          errorTime: {
            gte: new Date(querys.starttime).getTime(),
            lte: new Date(querys.endtime).getTime(),
          },
        },
      },
    });
    console.log(res);
    return res;
  }
}
