import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // เพิ่มส่วนนี้เข้าไปครับ
  app.enableCors({
    origin: 'http://localhost:5173', // URL ของฝั่ง React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
