import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { CartItem } from './cart-item.entity';

@Entity({ name: 'carts' })
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => User, (user) => user.carts)
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  items: CartItem[];
}
