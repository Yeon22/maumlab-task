import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateQuestionDto {
    @Field()
    surveyId: number;

    @Field()
    text: string;

    @Field()
    order: number;
}

@InputType()
export class UpdateQuestionDto {
    @Field()
    id: number;

    @Field({ nullable: true })
    surveyId: number;

    @Field({ nullable: true })
    text: string;

    @Field({ nullable: true })
    order: number;
}