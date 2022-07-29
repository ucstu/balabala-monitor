import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Account } from "src/entity/account.entity";
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
    return rest;
  }
}
