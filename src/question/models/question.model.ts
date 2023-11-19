import { Field, ObjectType } from "@nestjs/graphql";
import { SurveyModel } from "src/survey/models/survey.model";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'question' })
export class QuestionModel {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ length: 255})
    text: string;

    @Field()
    @Column({ default: 1})
    order: number;

    @Field(type => SurveyModel, { nullable: true })
    @ManyToOne(type => SurveyModel, survey => survey.questions)
    survey: SurveyModel;

    @Field()
    @Column({ name: 'created_at' })
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column({ name: 'updated_at' })
    @UpdateDateColumn()
    updatedAt: Date;
}