import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  customer_id!: number;

  @Column()
  order_no!: string;

  @Column()
  product_name!: string;

  @Column('int')
  quantity!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number;

  @Column('decimal', { precision: 10, scale: 2 })
  total_amount!: number;

  @Column({ default: 'pending' }) // pending, paid, cancelled
  status!: string;

  @CreateDateColumn()
  created_at!: Date;

  @UpdateDateColumn()
  updated_at!: Date;
}
