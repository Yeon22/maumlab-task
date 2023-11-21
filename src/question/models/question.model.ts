import { Field, ObjectType } from "@nestjs/graphql";
import { AnswerModel } from "src/answer/models/answer.model";
import { DistractorModel } from "src/distractor/models/distractor.model";
import { SurveyModel } from "src/survey/models/survey.model";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @OneToOne(() => DistractorModel, distractor => distractor.question, {nullable: true})
    distractor: DistractorModel;

    @Field()
    @Column({ name: 'created_at' })
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column({ name: 'updated_at' })
    @UpdateDateColumn()
    updatedAt: Date;
}