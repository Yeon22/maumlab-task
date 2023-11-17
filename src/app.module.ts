import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SurveyModule } from './survey/survey.module';
import { GraphQLError } from 'graphql';
import { ErrorDto } from './errors/error.dto';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'test_user',
      password: 'test1234',
      database: 'test_db',
      entities: ['dist/**/*.model.js'],
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      formatError: (error: GraphQLError): ErrorDto => {
        const gqlErrorCode = error.extensions?.code as string;
        const message = error.message;

        return {errorCode: gqlErrorCode, message};
      },
      autoSchemaFile: 'src/schema.gql'
    }),
    SurveyModule,
    QuestionModule,
    AnswerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
