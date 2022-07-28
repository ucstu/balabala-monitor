import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("content")
export class Article {
    /**
     * 文章分类，{1:后端,2:前端,3:Android,4:IOS,5:人工智能,6:开发工具,7:代码人生,8:阅读}
     */
    @Column({name:"article_class"})
    articleClass: number;
    /**
     * 文章内容
     */
    @Column({name:"article_content"})
    articleContent: string;
    /**
     * 文章封面
     */
    @Column({name:"article_cover"})
    articleCover: string;
    /**
     * 文章ID
     */
    @PrimaryGeneratedColumn({name:"article_id"})
    articleId: string;
    /**
     * 文章点赞量
     */
    @Column({name:"article_likes"})
    articlelikes: number;
    /**
     * 文章概要
     */
    @Column({name:"article_summary"})
    articleSummary: string;
    /**
     * 文章标签
     */
    @Column({name:"article_tags"})
    articleTags: string;
    /**
     * 文章标题
     */
    @Column({name:"article_title"})
    articleTitle: string;
    /**
     * 文章访问量
     */
     @Column({name:"article_traffic"})
    articleTraffic: number;
    /**
     * 创建时间
     */
     @Column({name:"created_at",type:"datetime"})
    createdAt: Date;
    /**
     * 发布用户ID
     */
    @Column({name:"phone"})
    phone: string;
    /**
     * 更新时间
     */
    @Column({name:"updated_at",type:"datetime"})
    updatedAt: Date;
}
