import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnswerModel } from './models/answer.model';
import { Repository } from 'typeorm';
import { CreateAnswerDto, UpdateAnswerDto } from './models/answer.dto';

@Injectable()
export class AnswerService {
    constructor(
        @InjectRepository(AnswerModel) private readonly answerRepository: Repository<AnswerModel>
    ) {}

    findOne(id: number): Promise<AnswerModel> {
        return this.answerRepository.findOne({where: {id}});
    }

    create(answer: CreateAnswerDto): Promise<AnswerModel> {
        return this.answerRepository.save({...answer});
    }

    async update(answer: UpdateAnswerDto): Promise<AnswerModel> {
        const originAnswer = await this.findOne(answer.id);
        if (!originAnswer) {
            throw new BadRequestException('존재하지 않는 답변입니다');
        }

        const newAnswer = {...originAnswer, ...answer};
        return this.answerRepository.save(newAnswer);
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
