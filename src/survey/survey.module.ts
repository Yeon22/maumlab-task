import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SurveyService } from './survey.service';
import { SurveyResolver } from './survey.resolver';
import { SurveyModel } from './models/survey.model';

@Module({
  imports: [TypeOrmModule.forFeature([SurveyModel])],
  providers: [SurveyService, SurveyResolver],
  exports: [SurveyService]
})
export class SurveyModule {}
