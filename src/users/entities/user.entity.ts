import { Role } from 'src/auth/role.enum';
import { Cart } from 'src/carts/entities/cart.entity';
import { Order } from 'src/orders/entities/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: Role, array: true, default: `{user}` }) // Массив ENUM в PostgreSQL
  roles: Role[];

  @Column({ default: '' })
  address: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];

  @OneToOne(() => Cart, (cart) => cart.user)
  carts: Cart;
}
