/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UserPointsController } from './controller/userPoint.controller';
import { UserPointService } from './service/userPoint.service';
import { UserPointsRepository } from './repository/userPoint.repository';
import { UserPoints } from './entity/userPoints.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([UserPoints])],
    controllers: [UserPointsController],
    providers: [UserPointService, UserPointsRepository],
    exports: [UserPointService]
})
export class UsersModule { }
