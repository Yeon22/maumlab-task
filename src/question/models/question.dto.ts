import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateQuestionDto {
    @Field()
    id: number;

    @Field()
    text: string;
}