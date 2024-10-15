import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { ExternalExceptionsHandler } from '@nestjs/core/exceptions/external-exceptions-handler';
import { ExceptionHandlerFilter } from './filters/exception.filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService)

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory(errors) {
      const errorMsgs = errors.map((err) =>
        Object.values(err.constraints).join(', '),
      )
      throw new BadRequestException(errorMsgs.join(' && '))
    }
  }))

  app.useGlobalFilters(new ExceptionHandlerFilter());
  
  app.setGlobalPrefix('/api/v1');


  const config = new DocumentBuilder()
    .setTitle('Retsepts Api')
    .setDescription('yangi ovqatlarni biz bilan kashf eting')
    .setVersion('1.0')

    .addBearerAuth()  
    .build();

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)


  await app.listen(configService.get<number>('appConfig.port'), () => {
    console.log(`Listening on ${configService.get<number>('appConfig.port')}`)
  });
}
bootstrap();
