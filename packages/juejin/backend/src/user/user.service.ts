import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "src/entity/account.entity";
import { responseRust } from "src/entity/responseRust";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Account)
    private articleMapper: Repository<Account>
  ) {}

  //插入用户
  async insert(account: Account) {
    const rest = await this.articleMapper.insert(account);
    const rust = new responseRust();
    if (rest.raw.affectedRows > 0) {
      return rust.success();
    } else {
      return rust.error();
    }
  }

  //用户登录
  async login(accout: Account) {
    const rust = new responseRust();

    const user = await this.articleMapper
      .createQueryBuilder()
      .where("phone=:phone", { phone: accout.phone })
      .getOne();

    if (user.password == accout.password) {
      const token = "1111";

      return rust.success_data({ token: token });
    } else {
      return rust.error();
    }
  }
}
