/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from 'src/app/auth/entities/user.entity';

export class UpdateUserPointDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ required: true, type: Number })
    points: number;
}