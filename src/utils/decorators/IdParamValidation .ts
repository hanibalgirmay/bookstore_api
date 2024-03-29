/* eslint-disable prettier/prettier */
import { IsInt, IsNotEmpty } from 'class-validator';

export class IdParamValidation {
    @IsInt()
    @IsNotEmpty()
    id: number;
}