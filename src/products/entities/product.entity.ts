import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Stock } from './stock.entity';
import { CartItem } from 'src/carts/entities/cart-item.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  id_in_crm: string; // Id продукта в bitrix или 1с или срм

  @Column({ default: '' })
  description: string;

  @Column({ type: 'json' })
  attributes: string;

  @OneToMany(() => Stock, (stock) => stock.product)
  stocks: Stock[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  cart_items: CartItem[];
}
