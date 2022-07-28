import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticleModule } from "./article/article.module";
import { Article } from "./entity/article.entity";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    UserModule,
    ArticleModule,
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "139.155.90.228",
      port: 3306,
      username: "jkpt",
      password: "123456",
      database: "juejin_ht",
      synchronize: false, // 自动载入的模型将同步
      autoLoadEntities: true, // 自动加载实体类
    }),
    TypeOrmModule.forFeature([Article]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
