import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { AnswerModel } from './models/answer.model';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerModel]), QuestionModule],
  providers: [AnswerService, AnswerResolver]
})
export class AnswerModule {}
