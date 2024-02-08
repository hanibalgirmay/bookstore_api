/* eslint-disable prettier/prettier */
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserPoints } from '../entity/userPoints.entity';
import { UpdateUserPointDto } from '../dto/update.user-point';
import { CreateUserPointDto } from '../dto/create.user-point.dto';

export class UserPointsRepository extends Repository<UserPoints> {
    constructor(
        @InjectRepository(UserPoints)
        private userPointRepository: Repository<UserPoints>,
    ) {
        super(
            userPointRepository.target,
            userPointRepository.manager,
            userPointRepository.queryRunner,
        );
    }

    public async findAll(): Promise<UserPoints[]> {
        return await this.find({ relations: ["User"] });
    }

    public async findById(id: number): Promise<UserPoints | null> {
        return this.findOneBy({ id });
    }

    public async store(user: CreateUserPointDto): Promise<UserPoints> {
        const newUser = this.create({
            userId: user.userId,
            points: user.points
        });
        return this.save(newUser);
    }

    public async updateOne(
        id: number,
        updateUserDto: UpdateUserPointDto,
    ): Promise<UserPoints | undefined> {
        const user = await this.findById(id);
        if (!user) return undefined;
        Object.assign(user, updateUserDto);
        return this.save(user);
    }

    public async destroy(id: number): Promise<void> {
        const _user = this.findById(id);
        if (_user) {
            await this.delete(id);
        } else {
            throw new Error('User not found');
        }
    }


}
