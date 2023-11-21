import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerModel } from './models/answer.model';
import { Repository } from 'typeorm';
import { CreateAnswerDto, UpdateAnswerDto } from './models/answer.dto';
import { QuestionService } from 'src/question/question.service';
import { DistractorService } from 'src/distractor/distractor.service';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(AnswerModel) private readonly answerRepository: Repository<AnswerModel>,
        @Inject(QuestionService) private readonly questionService: QuestionService,
        @Inject(DistractorService) private readonly distractorService: DistractorService
    ) {}

    findAll(): Promise<AnswerModel[]> {
        return this.answerRepository.find({relations: {question: true, distractor: true}});
    }

    findOne(id: number): Promise<AnswerModel> {
        return this.answerRepository.findOne({
            where: {id},
            relations: {question: true, distractor: true}
        });
    }

    async create(answer: CreateAnswerDto): Promise<AnswerModel> {
        const question = await this.questionService.findOne(answer.questionId);
        if (!question) {
            throw new BadRequestException('존재하지 않는 문항입니다');
        }

        const distractor = answer.distractorId ? await this.distractorService.findOne(answer.distractorId) : {};
        return this.answerRepository.save({...answer, question, distractor});
    }

    async update(answer: UpdateAnswerDto): Promise<AnswerModel> {
        const question = answer.questionId ? await this.questionService.findOne(answer.questionId) : {};
        const distractor = answer.distractorId ? await this.distractorService.findOne(answer.distractorId) : {};

        const originAnswer = await this.findOne(answer.id);
        if (!originAnswer) {
            throw new BadRequestException('존재하지 않는 답변입니다');
        }

        const newAnswer = {...originAnswer, ...answer, question, distractor};
        return this.answerRepository.save(newAnswer);
    }

    async check(id: number): Promise<AnswerModel> {
        const answer = await this.findOne(id);
        if (!answer) {
            throw new BadRequestException('존재하지 않는 답변입니다');
        }

        return this.answerRepository.save({...answer, checked: true});
    }

    async unCheck(id: number): Promise<AnswerModel> {
        const answer = await this.findOne(id);
        if (!answer) {
            throw new BadRequestException('존재하지 않는 답변입니다');
        }

        return this.answerRepository.save({...answer, checked: false});
    }

    async delete(id: number): Promise<string> {
        const answer = await this.findOne(id);
        if (!answer) {
            throw new BadRequestException('존재하지 않는 답변입니다');
        }

        await this.answerRepository.delete({id});
        return answer.text;
    }
}
