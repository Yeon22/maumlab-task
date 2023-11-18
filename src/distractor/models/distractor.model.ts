import { Field, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
@Entity({ name: 'distractor' })
export class DistractorModel {
    @Field()
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column({ name: 'created_at' })
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @Column({ name: 'updated_at' })
    @UpdateDateColumn()
    updatedAt: Date;
}