import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DistractorService } from './distractor.service';
import { DistractorModel } from './models/distractor.model';
import { UpdateDistractorDto } from './models/distractor.dto';

@Resolver()
export class DistractorResolver {
    constructor(
        @Inject(DistractorService) private distractorService: DistractorService
    ) {}

    @Query(returns => [DistractorModel], {nullable: true})
    async distractors(): Promise<DistractorModel[]> {
        return await this.distractorService.findAll();
    }

    @Query(returns => DistractorModel, {nullable: true})
    async distractor(@Args('id') id: number): Promise<DistractorModel> {
        return await this.distractorService.findOne(id);
    }

    @Mutation(returns => DistractorModel)
    async createDistractor(@Args('questionId') questionId: number): Promise<DistractorModel> {
        return await this.distractorService.create(questionId);
    }

    @Mutation(returns => DistractorModel)
    async updateDistractor(@Args('distractor') distractor: UpdateDistractorDto): Promise<DistractorModel> {
        return await this.distractorService.update(distractor);
    }

    @Mutation(returns => String)
    async deleteDistractor(@Args('id') id: number): Promise<string> {
        const deletedId = await this.distractorService.delete(id);
        return `선택지 ${deletedId} 이/가 삭제되었습니다`;
    }
}
