import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModel } from './models/question.model';
import { SurveyModule } from 'src/survey/survey.module';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel]), SurveyModule],
  providers: [QuestionService, QuestionResolver],
  exports: [QuestionService]
})
export class QuestionModule {}
