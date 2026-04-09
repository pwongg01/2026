import { Controller, Post, Body, Get } from '@nestjs/common';

// 1. แก้ Interface ให้รู้จัก customerName
interface Order {
  id: number;
  customerId: number;
  customerName: string;
  amount: number;
  createdAt: Date;
}

@Controller('orders')
export class OrdersController {
  private orders: Order[] = [];

  @Get()
  findAll(): Order[] {
    return this.orders;
  }

  @Post()
  create(
    @Body() data: { customerId: number; customerName: string; amount: number },
  ) {
    // 2. กำหนด Type ให้ชัดเจนตอนสร้าง Object
    const newOrder: Order = {
      id: this.orders.length + 1,
      customerId: data.customerId,
      customerName: data.customerName,
      amount: data.amount,
      createdAt: new Date(),
    };

    this.orders.push(newOrder);
    return newOrder;
  }
}
