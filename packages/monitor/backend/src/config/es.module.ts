import { Module } from "@nestjs/common";

import { ElasticsearchModule } from "@nestjs/elasticsearch";

@Module({
  imports: [
    ElasticsearchModule.register({
      node: "***REMOVED***",
    }),
  ],
  exports: [ElasticsearchModule],
})
export class EsConfigModule {}
