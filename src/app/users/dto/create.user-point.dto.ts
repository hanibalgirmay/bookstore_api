/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { User } from 'src/app/auth/entities/user.entity';

export class CreateUserPointDto {
    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: true, type: Number })
    userId?: number;

    @IsNumber()
    @IsOptional()
    @ApiProperty({ required: true, type: Number })
    points?: number;
}