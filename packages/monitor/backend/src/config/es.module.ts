import { Global, Module } from "@nestjs/common";

import { ElasticsearchModule } from "@nestjs/elasticsearch";
@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      // node: "***REMOVED***",
      node: "http://192.168.134.130:9200",
    }),
  ],
  exports: [ElasticsearchModule],
})
export class EsConfigModule {}
