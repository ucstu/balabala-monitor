import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content")
export class Account {
    /**
     * 账号ID
     */
    @PrimaryGeneratedColumn({name:"id"})
    id: number;
    /**
     * 昵称
     */
    @Column({name:"name"})
    name: string;
    /**
     * 用户名称
     */
    @Column({name:"password"})
    password: string;
    /**
     * 电话号码
     */
    @Column({name:"phone"})
    phone: string;
}
