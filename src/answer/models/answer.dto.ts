import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateAnswerDto {
    @Field()
    text: string;

    @Field()
    score: number;
}

@InputType()
export class UpdateAnswerDto {
    @Field()
    id: number;

    @Field({ nullable: true })
    text: string;

    @Field({ nullable: true })
    score: number;
}