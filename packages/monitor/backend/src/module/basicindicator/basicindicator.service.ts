import { Injectable } from "@nestjs/common";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { basicbehaviorIndex } from "src/config/db.index";
import { BasicIndicator } from "src/entity/basicIndicator.entity";
import { responseRust } from "src/entity/responseRust";
import { BasicindicatorsVo } from "src/vo/basicindicators.vo";

@Injectable()
export class BasicindicatorService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  /**
   * 上传数据
   * @param basicIndicator
   * @returns
   */
  async upLoadBasicindicator(
    basicIndicator: BasicIndicator
  ): Promise<responseRust> {
    const res = await this.elasticsearchService.index({
      index: basicbehaviorIndex,
      body: basicIndicator,
    });
    if (res.statusCode === 201) {
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
    const res = await this.elasticsearchService.search({
      index: basicbehaviorIndex,
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
              {
                range: {
                  startTime: {
                    gte: new Date(querys.starttime).getTime(),
                    lte: new Date(querys.endtime).getTime(),
                  },
                },
              },
            ],
          },
        },
      },
    });

    return res;
  }

  /**
   *统计数据
   */
}
