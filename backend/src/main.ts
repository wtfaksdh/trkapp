import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:5173', // адрес React-фронтенда
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,       // обрезает лишние поля
    forbidNonWhitelisted: true,
    transform: true,
  }));

  await app.listen(3000);
  console.log('Server running on http://localhost:3000');
}
bootstrap();