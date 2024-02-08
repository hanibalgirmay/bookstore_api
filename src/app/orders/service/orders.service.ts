/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { OrdersRepository } from '../repository/orders.repository';
import { Orders } from '../entity/order.entity';
import { CreateOrderDto } from '../dto/create-order.dto';
import { UserPointService } from 'src/app/users/service/userPoint.service';

@Injectable()
export class OrdersService {
    private logger = new Logger(OrdersService.name);
    constructor(private readonly orderRepository: OrdersRepository, private userPointService: UserPointService) { }

    async findAll(): Promise<Orders[]> {
        try {
            const users = await this.orderRepository.findAll();
            if (users?.length === 0) {
                throw new Error('No record found.');
            }
            return users;
        } catch (error) {
            this.logger.log(
                `OrderService:findAll : ${JSON.stringify(error.message)}`,
            );
        }
    }

    async create(order: CreateOrderDto): Promise<Orders> {
        console.log('order: ', order);
        try {
            const _order = {
                ...order,
                orderID: this.generateOrderID(),
                userId: order.userId,
            }
            const getUserPOint = await this.checkBalance(order.userId);
            if (getUserPOint) {
                if (getUserPOint >= order.price) {
                    const createdOrder = this.orderRepository.create(_order);
                    // deduct point from user point
                    await this.userPointService.update(createdOrder.userId, { points: ((await getUserPOint) - createdOrder.price) });
                    return await this.orderRepository.save(createdOrder);
                } else {
                    throw new Error('Insufficient balance to place the order');
                }
            }
        } catch (error) {
            this.logger.log(`OrderService:create: ${JSON.stringify(error.message)}`);
            throw new Error(error.message);
        }
    }

    async findById(id: number): Promise<Orders> {
        try {
            const order = await this.orderRepository.findById(id);
            if (!order) {
                throw new Error('Order not found.');
            }
            return order;
        } catch (error) {
            this.logger.log(
                `OrderService:findById: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }

    async findByUserId(id: number): Promise<any> {
        try {
            const order = await this.orderRepository.find({ where: { userId: id } });
            if (!order) {
                throw new Error('User Order not found.');
            }
            return order;
        } catch (error) {
            this.logger.log(
                `OrderService:findById: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }

    async update(id: number, user: CreateOrderDto): Promise<any> {
        try {
            const _order = await this.findById(id);
            if (_order) {
                // Check if the balance is sufficient for the order
                const balance = await this.checkBalance(user.userId);
                console.log('ballance', balance)
                if (balance >= user.price) {
                    return await this.orderRepository.updateOne(_order.id, user);
                } else {
                    throw new Error('Insufficient balance to place the order');
                }
                //return await this.orderRepository.updateOne(_order.id, user);
            }
        } catch (error) {
            this.logger.log(`OrderService:update: ${JSON.stringify(error.message)}`);
            throw new Error(error.message);
        }
    }

    async delete(id: number) {
        try {
            const _order = await this.findById(id);
            if (_order) {
                const _userPoint = await this.userPointService.findById(_order.userId);
                // Add the order price to the user's points
                _userPoint.points += _order.price;
                // Update the user's points in the database
                await this.userPointService.update(_userPoint.userId, { points: _userPoint.points });

                await this.orderRepository.delete(id);
                return { message: 'Order cancelled successfully' };
            }
        } catch (error) {
            this.logger.log(`OrderService:delete: ${JSON.stringify(error.message)}`);
            throw new Error(error.message);
        }
    }

    generateOrderID = (): string => {
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
        const randomDigits = Math.floor(100000 + Math.random() * 900000).toString();
        const orderID = randomLetter + randomDigits;
        return orderID;
    }

    async checkBalance(userId: number): Promise<number> {
        const user = await this.userPointService.findById(userId);
        return user.points;
    }
}
