/* eslint-disable prettier/prettier */
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Orders } from "../entity/order.entity";
import { CreateOrderDto } from "../dto/create-order.dto";

/* eslint-disable prettier/prettier */
export class OrdersRepository extends Repository<Orders> {
    constructor(
        @InjectRepository(Orders)
        private orderRepository: Repository<Orders>,
    ) {
        super(
            orderRepository.target,
            orderRepository.manager,
            orderRepository.queryRunner,
        );
    }

    public async findAll(): Promise<Orders[]> {
        return this.findAll();
    }

    public async findById(id: number): Promise<Orders | null> {
        return await this.findOne({ where: { id } });
    }

    public async store(order: CreateOrderDto): Promise<Orders> {
        const newUser = this.create(order);
        return this.save(newUser);
    }

    public async updateOne(
        id: number,
        updateUserDto: CreateOrderDto,
    ): Promise<Orders | undefined> {
        const user = await this.findById(id);
        if (!user) return undefined;
        Object.assign(user, updateUserDto);
        return this.save(user);
    }

    public async destroy(id: number): Promise<void> {
        await this.delete(id);
    }

}
