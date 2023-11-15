import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionModel } from './models/question.model';
import { UpdateQuestionDto } from './models/question.dto';

@Injectable()
export class QuestionService {
    constructor(
        @InjectRepository(QuestionModel)
        private readonly questionRepository: Repository<QuestionModel>
    ) {}

    findOne(id: number): Promise<QuestionModel> {
        return this.questionRepository.findOne({where: {id}})
    }

    create(text: string): Promise<QuestionModel> {
        return this.questionRepository.save({text});
    }

    async update(question: UpdateQuestionDto): Promise<QuestionModel> {
        const originQuestion = await this.findOne(question.id);
        if (!originQuestion) {
            throw new BadRequestException('존재하지 않는 항목입니다');
        }

        const newQuestion = {...originQuestion, ...question};
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
