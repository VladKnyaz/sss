import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Stock } from './entities/stock.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Stock])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
