import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DistractorService } from './distractor.service';
import { DistractorModel } from './models/distractor.model';

@Resolver()
export class DistractorResolver {
    constructor(
        @Inject(DistractorService) private distractorService: DistractorService
    ) {}

    @Query(returns => DistractorModel)
    async distractor(@Args('id') id: number): Promise<DistractorModel> {
        return await this.distractorService.findOne(id);
    }

    @Mutation(returns => DistractorModel)
    async createDistractor(): Promise<DistractorModel> {
        return await this.distractorService.create();
    }

    @Mutation(returns => String)
    async deleteDistractor(@Args('id') id: number): Promise<string> {
        const deletedId = await this.distractorService.delete(id);
        return `선택지 ${deletedId} 이/가 삭제되었습니다`;
    }
}
