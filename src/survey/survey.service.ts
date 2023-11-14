import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyModel } from './models/survey.model';

@Injectable()
export class SurveyService {
    constructor(
        @InjectRepository(SurveyModel)
        private readonly surveyRepository: Repository<SurveyModel>
    ) {}

    findAll(): Promise<SurveyModel[]> {
        return this.surveyRepository.find();
    }
}
