/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { OrdersService } from './service/orders.service';
import { OrdersController } from './controller/orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entity/order.entity';
import { OrdersRepository } from './repository/orders.repository';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Orders]), UsersModule],
  providers: [OrdersService, OrdersRepository],
  controllers: [OrdersController]
})
export class OrdersModule { }
