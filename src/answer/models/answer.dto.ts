import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAnswerDto {
    @Field()
    text: string;

    @Field()
    questionId: number;

    @Field({ nullable: true })
    distractorId: number;

    @Field({ nullable: true })
    score: number;

    @Field({ nullable: true })
    checked: boolean;

    @Field({ nullable: true })
    order: number;
}

@InputType()
export class UpdateAnswerDto {
    @Field()
    id: number;

    @Field({ nullable: true })
    text: string;

    @Field({ nullable: true })
    score: number;

    @Field({ nullable: true })
    order: number;

    @Field({ nullable: true })
    questionId: number;

    @Field({ nullable: true })
    distractorId: number;
}