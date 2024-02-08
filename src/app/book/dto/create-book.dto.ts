/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TagsEnum } from 'src/utils/enums/tags.enum';

export class CreateBooksDto {
    @IsString()
    @ApiProperty({ required: true, type: String })
    title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false, type: String })
    writer?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false, type: String })
    cover_image?: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ required: true, type: Number })
    price?: number;

    @IsIn([TagsEnum])
    @IsOptional()
    @ApiProperty({ required: false, type: Array, enum: TagsEnum })
    tags?: TagsEnum[];
}