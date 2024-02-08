/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Books } from 'src/app/book/entity/book.entity';

export class CreateOrderDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ required: false, type: String })
    orderID?: string;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ required: true, type: Number })
    userId: number;
    
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ required: true, type: Number })
    price: number;
    
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ required: true, type: Array })
    books: Books[];
}