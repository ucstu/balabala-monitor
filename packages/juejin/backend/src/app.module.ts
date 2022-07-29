import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticleModule } from "./article/article.module";
import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    ArticleModule,
    UploadModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "***REMOVED***8",
      port: 3306,
      username: "***REMOVED***",
      password: "***REMOVED***",
      database: "***REMOVED***",
      synchronize: false, // 自动载入的模型将同步
      autoLoadEntities: true, // 自动加载实体类
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
