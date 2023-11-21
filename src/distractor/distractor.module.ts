import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistractorService } from './distractor.service';
import { DistractorResolver } from './distractor.resolver';
import { DistractorModel } from './models/distractor.model';
import { QuestionModule } from 'src/question/question.module';

@Module({
  imports: [TypeOrmModule.forFeature([DistractorModel]), QuestionModule],
  providers: [DistractorService, DistractorResolver],
  exports: [DistractorService]
})
export class DistractorModule {}
