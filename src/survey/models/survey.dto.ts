import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateSurveyDto {
    @Field()
    title: string;

    @Field()
    description: string;
}

@InputType()
export class UpdateSurveyDto {
    @Field()
    id: number;

    @Field({ nullable: true })
    title: string;

    @Field({ nullable: true })
    description: string;
}