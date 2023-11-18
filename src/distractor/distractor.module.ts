import { Module } from '@nestjs/common';
import { DistractorService } from './distractor.service';
import { DistractorResolver } from './distractor.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistractorModel } from './models/distractor.model';

@Module({
  imports: [TypeOrmModule.forFeature([DistractorModel])],
  providers: [DistractorService, DistractorResolver]
})
export class DistractorModule {}
