import { Field, ObjectType } from "@nestjs/graphql";
import { QuestionModel } from "src/question/models/question.model";
import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'distractor' })
export class DistractorModel {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => QuestionModel)
    @OneToOne(() => QuestionModel, question => question.distractor)
    @JoinColumn()
    question: QuestionModel;

    @Field()
    @Column({ name: 'created_at' })
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column({ name: 'updated_at' })
    @UpdateDateColumn()
    updatedAt: Date;
}