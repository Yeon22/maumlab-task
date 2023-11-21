import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateDistractorDto {
    @Field()
    id: number;

    @Field()
    questionId: number;
}