import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionResolver } from './question.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionModel } from './models/question.model';

@Module({
  imports: [TypeOrmModule.forFeature([QuestionModel])],
  providers: [QuestionService, QuestionResolver]
})
export class QuestionModule {}
