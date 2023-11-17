import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'answer' })
export class AnswerModel {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ length: 255 })
    text: string;

    @Field()
    @Column({ default: 1 })
    score: number;

    @Field()
    @Column({ name: 'created_at' })
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column({ name: 'updated_at' })
    @UpdateDateColumn()
    updatedAt: Date;
}