import { Global, Module } from "@nestjs/common";

import { ElasticsearchModule } from "@nestjs/elasticsearch";
@Global()
@Module({
  imports: [
    ElasticsearchModule.register({
      // node: "http://139.155.90.228:9200",
      node: "http://192.168.134.130:9200",
    }),
  ],
  exports: [ElasticsearchModule],
})
export class EsConfigModule {}
