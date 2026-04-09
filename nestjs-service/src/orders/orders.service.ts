import { Injectable, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity'; // ตรวจสอบว่า path นี้ถูกต้อง
import { firstValueFrom } from 'rxjs';

// สร้าง Interface เพื่อแก้ Error: Unsafe member access
interface CreateOrderDto {
  customer_id: number;
  product_name: string;
  quantity: number;
  price: number;
}

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    private readonly httpService: HttpService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // 1. ตรวจสอบ Customer จาก Laravel Service
    try {
      await firstValueFrom(
        this.httpService.get(
          `http://localhost:8000/api/customers/${createOrderDto.customer_id}`,
        ),
      );
    } catch {
      // แก้ Error: 'error' is defined but never used โดยการลบชื่อตัวแปรออกเหลือแค่ catch
      throw new BadRequestException('Customer not found in Laravel System');
    }

    // 2. คำนวณ total_amount
    const total_amount = createOrderDto.quantity * createOrderDto.price;

    // 3. บันทึกข้อมูล
    const newOrder = this.ordersRepository.create({
      ...createOrderDto,
      total_amount,
      order_no: `ORD-${Date.now()}`,
      status: 'pending',
    });

    return this.ordersRepository.save(newOrder);
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findOne(id: number): Promise<Order | null> {
    return this.ordersRepository.findOneBy({ id });
  }

  async updateStatus(id: number, status: string): Promise<Order | null> {
    await this.ordersRepository.update(id, { status });
    return this.findOne(id);
  }
}
