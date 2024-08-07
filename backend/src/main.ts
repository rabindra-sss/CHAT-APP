import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';
import { BadRequestException, ValidationPipe } from '@nestjs/common';

import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:5173', 'https://66b3dd3073f2f6258a0c7676--unique-daffodil-d84d80.netlify.app'], 
    credentials: true,
    // all headers that client are allowed to use
    allowedHeaders: [
      'Accept',
      'Authorization',
      'Content-Type',
      'X-Requested-With',
      'apollo-require-preflight',
    ],
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  });
  app.use(cookieParser());
  app.use(graphqlUploadExpress({ maxFileSize: 10000000000, maxFiles: 1 }));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((accumulator, error) => {
          accumulator[error.property] = Object.values(error.constraints).join(
            ', ',
          );
          return accumulator;
        }, {});

        throw new BadRequestException(formattedErrors);
      },
    }),
  );
  const port = process.env.PORT || 3030;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
