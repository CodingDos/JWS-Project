import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.enableCors();

  const port = configService.get<number>('PORT');

  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}

bootstrap();
