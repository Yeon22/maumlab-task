import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DistractorModel } from './models/distractor.model';
import { Repository } from 'typeorm';

@Injectable()
export class DistractorService {
    constructor(
        @InjectRepository(DistractorModel) private readonly distractorRepository: Repository<DistractorModel>
    ) {}

    findOne(id: number): Promise<DistractorModel> {
        return this.distractorRepository.findOne({
            where: {id},
            relations: {question: true}
        });
    }

    create(questionId?: number): Promise<DistractorModel> {
        const newDistractor = questionId ? {question: {id: questionId}} : {};
        return this.distractorRepository.save(newDistractor);
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
