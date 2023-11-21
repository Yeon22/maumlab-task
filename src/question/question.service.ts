import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionModel } from './models/question.model';
import { CreateQuestionDto, UpdateQuestionDto } from './models/question.dto';
import { SurveyService } from 'src/survey/survey.service';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(QuestionModel) private readonly questionRepository: Repository<QuestionModel>,
        @Inject(SurveyService) private readonly surveyService: SurveyService
    ) {}

    findAll(): Promise<QuestionModel[]> {
        return this.questionRepository.find({
            order: {order: 'ASC'},
            relations: {
                survey: true, distractor: true, answers: true
            }
        });
    }

    findOne(id: number): Promise<QuestionModel> {
        return this.questionRepository.findOne({
            where: {id},
            relations: {
                survey: true, distractor: true, answers: true
            }
        });
    }

    async create(question: CreateQuestionDto): Promise<QuestionModel> {
        const survey = await this.surveyService.findOne(question.surveyId);
        if (!survey) {
            throw new BadRequestException('존재하지 않는 설문지입니다');
        }
        
        const newQuestion = {...question, survey};
        return this.questionRepository.save({...newQuestion});
    }

    async update(question: UpdateQuestionDto): Promise<QuestionModel> {
        const survey = await this.surveyService.findOne(question.surveyId);
        if (!survey) {
            throw new BadRequestException('존재하지 않는 설문지입니다');
        }

        const originQuestion = await this.findOne(question.id);
        if (!originQuestion) {
            throw new BadRequestException('존재하지 않는 항목입니다');
        }

        const newQuestion = {...originQuestion, ...question, survey};
        return this.questionRepository.save(newQuestion);
    }

    async delete(id: number): Promise<string> {
        const question = await this.findOne(id);
        if (!question) {
            throw new BadRequestException('존재하지 않는 항목입니다');
        }

        await this.questionRepository.delete({id});
        return question.text;
    }
}
