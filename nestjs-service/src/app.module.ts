import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// 1. ตรวจสอบว่ามีบรรทัด Import นี้
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    // 2. ต้องใส่ OrdersModule ลงในอาเรย์ imports ตรงนี้!
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
