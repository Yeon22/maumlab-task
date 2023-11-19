import { Field, ObjectType } from "@nestjs/graphql";
import { QuestionModel } from "src/question/models/question.model";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    @Column({ default: false })
    finished: boolean;

    @Field(type => [QuestionModel], {nullable: true})
    @OneToMany(type => QuestionModel, question => question.survey)
    questions: QuestionModel[];

    @Field()
    @Column({ name: "created_at" })
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column({ name: "updated_at" })
    @UpdateDateColumn()
    updatedAt: Date;
}