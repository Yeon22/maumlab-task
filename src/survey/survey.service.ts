import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SurveyModel } from './models/survey.model';
import { CreateSurveyDto, UpdateSurveyDto } from './models/survey.dto';

@Injectable()
export class SurveyService {
    constructor(
        @InjectRepository(SurveyModel)
        private readonly surveyRepository: Repository<SurveyModel>
    ) {}

    findAll(finished: boolean = false): Promise<SurveyModel[]> {
        return this.surveyRepository.find({
                where: {finished},
                relations: {questions: true},
                order: {questions: {order: 'ASC'}}
            });
    }

    findOne(id: number): Promise<SurveyModel> {
        return this.surveyRepository.findOne({
            where: {id},
            relations: {questions: true}
        });
    }

    create(survey: CreateSurveyDto): Promise<SurveyModel> {
        return this.surveyRepository.save({
            title: survey.title,
            description: survey.description
        });
    }

    async finish(id: number): Promise<SurveyModel> {
        const survey = await this.findOne(id);
        if (!survey) {
            throw new BadRequestException('존재하지 않는 설문지입니다');
        }

        return this.surveyRepository.save({...survey, finished: true});
    }

    async update(survey: UpdateSurveyDto): Promise<SurveyModel> {
        const originSurvey = await this.findOne(survey.id);
        if (!originSurvey) {
            throw new BadRequestException('존재하지 않는 설문지 입니다');
        }
        const newSurvey = {...originSurvey, ...survey};
        return this.surveyRepository.save(newSurvey);
    }

    async delete(id: number): Promise<String> {
        const survey = await this.findOne(id);
        if (!survey) {
            throw new BadRequestException('존재하지 않는 설문지 입니다');
        }
        
        await this.surveyRepository.delete({id});
        return survey.title;
    }
}
