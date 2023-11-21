import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { SurveyModel } from './models/survey.model';
import { CreateSurveyDto, UpdateSurveyDto } from './models/survey.dto';

@Resolver()
export class SurveyResolver {
    constructor(@Inject(SurveyService) private surveyService: SurveyService) {}

    @Query(returns => [SurveyModel])
    async surveys(@Args('finished', {nullable: true}) finished?: boolean): Promise<SurveyModel[]> {
        return await this.surveyService.findAll(finished);
    }

    @Mutation(returns => SurveyModel)
    async createSurvey(
        @Args('survey') survey: CreateSurveyDto
    ): Promise<SurveyModel> {
        return await this.surveyService.create(survey);
    }

    @Mutation(returns => SurveyModel)
    async finishSurvey(@Args('id') id: number): Promise<SurveyModel> {
        return await this.surveyService.finish(id);
    }

    @Mutation(returns => SurveyModel)
    async updateSurvey(
        @Args('survey') survey: UpdateSurveyDto
    ): Promise<SurveyModel> {
        return await this.surveyService.update(survey);
    }

    @Mutation(returns => String)
    async deleteSurvey(
        @Args('id') id: number
    ): Promise<string> {
        const deletedTitle = await this.surveyService.delete(id);
        return `설문지 ${deletedTitle} 이/가 삭제되었습니다`;
    }
}
