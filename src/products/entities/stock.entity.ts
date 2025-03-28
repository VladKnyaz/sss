import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Product } from './product.entity';

@Entity({ name: 'stocks' })
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Product, (product) => product.stocks, { onDelete: 'CASCADE' })
  product: Product;

  @Column({ default: 0 })
  quantity: number; // Сколько товара всего

  @Column({ default: 0 })
  reserved: number; // Сколько зарезервировано (например, в заказах)

}
