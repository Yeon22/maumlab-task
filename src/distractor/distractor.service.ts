import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DistractorModel } from './models/distractor.model';
import { UpdateDistractorDto } from './models/distractor.dto';
import { QuestionService } from 'src/question/question.service';

@Injectable()
export class DistractorService {
    constructor(
        @InjectRepository(DistractorModel) private readonly distractorRepository: Repository<DistractorModel>,
        @Inject(QuestionService) private readonly questionService: QuestionService,
    ) {}

    findAll(): Promise<DistractorModel[]> {
        return this.distractorRepository.find({relations: {question: true}});
    }

    findOne(id: number): Promise<DistractorModel> {
        return this.distractorRepository.findOne({
            where: {id},
            relations: {question: true}
        });
    }

    async create(questionId: number): Promise<DistractorModel> {
        const question = await this.questionService.findOne(questionId);
        if (!question) {
            throw new BadRequestException('존재하지 않는 문항입니다');
        }

        return this.distractorRepository.save({question});
    }

    async update(distractor: UpdateDistractorDto): Promise<DistractorModel> {
        const originDistractor = await this.findOne(distractor.id);
        if (!originDistractor) {
            throw new BadRequestException('존재하지 않는 선택자입니다');
        }

        const question = distractor.questionId ? await this.questionService.findOne(distractor.questionId) : {};

        return this.distractorRepository.save({...originDistractor, question});
    }

    async delete(id: number): Promise<number> {
        const distractor = await this.findOne(id);
        if (!distractor) {
            throw new BadRequestException('존재하지 않는 선택자입니다');
        }

        await this.distractorRepository.delete({id});
        return distractor.id;
    }
}
