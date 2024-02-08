/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { UserPoints } from '../entity/userPoints.entity';
import { CreateUserPointDto } from '../dto/create.user-point.dto';
import { UserPointsRepository } from '../repository/userPoint.repository';
import { UpdateUserPointDto } from '../dto/update.user-point';

@Injectable()
export class UserPointService {
    private logger = new Logger(UserPointService.name);
    constructor(private readonly userPointRepository: UserPointsRepository) { }

    async findAll(): Promise<UserPoints[]> {
        try {
            const users = await this.userPointRepository.find();
            if (users?.length === 0) {
                throw new Error('No record found.');
            }
            return users;
        } catch (error) {
            this.logger.log(
                `UsersService:findAll : ${JSON.stringify(error.message)}`,
            );
        }
    }

    async create(user: CreateUserPointDto): Promise<UserPoints> {
        console.log('user: ', user);
        try {
            const _user = {
                ...user,
                userId: user.userId,
            }
            return this.userPointRepository.save(_user);
        } catch (error) {
            this.logger.log(`UsersService:create: ${JSON.stringify(error.message)}`);
            throw new Error(error.message);
        }
    }

    async findById(id: number): Promise<UserPoints> {
        try {
            const user = await this.userPointRepository.findOne({where: {userId: id}});
            if (!user) {
                throw new Error('User not found.');
            }
            return user;
        } catch (error) {
            this.logger.log(
                `UsersService:findById: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }

    async update(id: number, user: UpdateUserPointDto): Promise<any> {
        try {
            const _user = await this.findById(id);
            if (_user) {
                return await this.userPointRepository.updateOne(_user.id, user);
            }
        } catch (error) {
            this.logger.log(`UsersService:update: ${JSON.stringify(error.message)}`);
            throw new Error(error.message);
        }
    }

    async delete(id: number) {
        try {
            return await this.userPointRepository.delete(id);
        } catch (error) {
            this.logger.log(`UsersService:delete: ${JSON.stringify(error.message)}`);
            throw new Error(error.message);
        }
    }
}
