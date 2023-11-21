import { Field, ObjectType } from "@nestjs/graphql";
import { AnswerModel } from "src/answer/models/answer.model";
import { SurveyModel } from "src/survey/models/survey.model";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Field(() => [AnswerModel], {nullable: true})
    @OneToMany(() => AnswerModel, answer => answer.question)
    answers: AnswerModel[];

    @Field()
    @Column({ name: 'created_at' })
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column({ name: 'updated_at' })
    @UpdateDateColumn()
    updatedAt: Date;
}