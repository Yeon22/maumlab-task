import { Inject } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { SurveyService } from './survey.service';
import { SurveyModel } from './models/survey.model';

@Resolver()
export class SurveyResolver {
    constructor(@Inject(SurveyService) private surveyService: SurveyService) {}

    @Query(returns => [SurveyModel])
    async surveys(): Promise<SurveyModel[]> {
        return this.surveyService.findAll();
    }
}
