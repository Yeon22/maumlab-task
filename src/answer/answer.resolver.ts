import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AnswerService } from './answer.service';
import { AnswerModel } from './models/answer.model';
import { CreateAnswerDto, UpdateAnswerDto } from './models/answer.dto';

@Resolver()
export class AnswerResolver {
    constructor(@Inject(AnswerService) private answerService: AnswerService) {}

    @Query(returns => AnswerModel)
    async answer(@Args('id') id: number): Promise<AnswerModel> {
        return await this.answerService.findOne(id);
    }

    @Mutation(returns => AnswerModel)
    async createAnswer(@Args('answer') answer: CreateAnswerDto): Promise<AnswerModel> {
        return await this.answerService.create(answer);
    }

    @Mutation(returns => AnswerModel)
    async updateAnswer(@Args('answer') answer: UpdateAnswerDto): Promise<AnswerModel> {
        return await this.answerService.update(answer);
    }

    @Mutation(returns => AnswerModel)
    async checkAnswer(@Args('id') id: number): Promise<AnswerModel> {
        return await this.answerService.check(id);
    }

    @Mutation(returns => AnswerModel)
    async unCheckAnswer(@Args('id') id: number): Promise<AnswerModel> {
        return await this.answerService.unCheck(id);
    }

    @Mutation(returns => String)
    async deleteAnswer(@Args('id') id: number): Promise<string> {
        const deleted = await this.answerService.delete(id);
        return `답변 ${deleted} 이/가 삭제되었습니다`;
    }
}
