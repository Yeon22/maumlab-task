import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'survey' })
export class SurveyModel {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ length: 125, nullable: false })
    title: string;

    @Field()
    @Column({ length: 255, nullable: false })
    description: string;

    @Field()
    @Column({ name: "created_at" })
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column({ name: "updated_at" })
    @UpdateDateColumn()
    updatedAt: Date;
}