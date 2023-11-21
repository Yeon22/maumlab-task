import { Field, ObjectType } from "@nestjs/graphql";
import { DistractorModel } from "src/distractor/models/distractor.model";
import { QuestionModel } from "src/question/models/question.model";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    @Column({ default: false })
    checked: boolean;

    @Field()
    @Column({ default: 1 })
    order: number;

    @Field(() => QuestionModel, { nullable: true })
    @ManyToOne(() => QuestionModel, question => question.answers)
    question: QuestionModel;

    @Field(() => DistractorModel, {nullable: true})
    @OneToOne(() => DistractorModel)
    @JoinColumn()
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