import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { QuestionService } from './question.service';
import { QuestionModel } from './models/question.model';
import { UpdateQuestionDto } from './models/question.dto';

@Resolver()
export class QuestionResolver {
    constructor(@Inject(QuestionService) private questionService: QuestionService) {}

    @Query(returns => QuestionModel)
    async question(@Args('id') id: number): Promise<QuestionModel> {
        return await this.questionService.findOne(id);
    }

    @Mutation(returns => QuestionModel)
    async createQuestion(@Args('text') text: string): Promise<QuestionModel> {
        return await this.questionService.create(text);
    }

    @Mutation(returns => QuestionModel)
    async updateQuestion(
        @Args('question') question: UpdateQuestionDto
    ): Promise<QuestionModel> {
        return await this.questionService.update(question);
    }

    @Mutation(returns => String)
    async deleteQuestion(@Args('id') id: number): Promise<string> {
        const deletedTitle = await this.questionService.delete(id);
        return `문항 ${deletedTitle} 이/가 삭제되었습니다`;
    }
}
