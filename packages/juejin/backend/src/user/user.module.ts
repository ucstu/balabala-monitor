import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Account } from "src/entity/account.entity";
import { AuthModule } from "src/auth/auth.module";
@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([Account]), AuthModule],
})
export class UserModule {}
