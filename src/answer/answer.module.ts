import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './answer.service';
import { AnswerResolver } from './answer.resolver';
import { AnswerModel } from './models/answer.model';

@Module({
  imports: [TypeOrmModule.forFeature([AnswerModel])],
  providers: [AnswerService, AnswerResolver]
})
export class AnswerModule {}
