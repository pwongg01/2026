import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
interface CreateOrderDto {
    customer_id: number;
    product_name: string;
    quantity: number;
    price: number;
}
export declare class OrdersService {
    private readonly ordersRepository;
    private readonly httpService;
    constructor(ordersRepository: Repository<Order>, httpService: HttpService);
    create(createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(): Promise<Order[]>;
    findOne(id: number): Promise<Order | null>;
    updateStatus(id: number, status: string): Promise<Order | null>;
}
export {};
