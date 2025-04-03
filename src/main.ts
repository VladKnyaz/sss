import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  BadRequestException,
  ConsoleLogger,
  ValidationPipe,
} from '@nestjs/common';
import { validationMessages } from './constants/validation-messages';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: 'Sun',
    }),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const customErros = errors.map((err) => {
          const firstConstraintKey = Object.keys(err.constraints!)[0];
          const defaultMessage = err.constraints![firstConstraintKey];

          const customMessage = validationMessages[firstConstraintKey]
            ? validationMessages[firstConstraintKey]
                .replace('$property', err.property)
                .replace('$constraint1', err.constraints![firstConstraintKey])
            : defaultMessage;

          return {
            field: err.property,
            message: customMessage,
          };
        });
        throw new BadRequestException(customErros);
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
