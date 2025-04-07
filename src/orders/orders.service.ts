import { HttpException, HttpStatus, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @Inject(Logger)
    private readonly logger: LoggerService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    try {
      return await this.orderRepository.save(createOrderDto);
    } catch(e){
      this.logger.error('Ошибка при создании заказа', e)
      if (e.code === '23503') {
        throw new HttpException(
          'Связанный пользователь не найден. Проверьте, существует ли указанный user_id.',
          HttpStatus.BAD_REQUEST
        );
      }
    
      throw new HttpException(
        'Произошла ошибка при создании заказа. Попробуйте позже.',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
      
    }
  }

  async findAll() {
    return await this.orderRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
