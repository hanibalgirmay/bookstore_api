/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches, IsEmail, IsNotEmpty } from 'class-validator';

export class AuthCredentialDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  email: string;
  
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty({ required: true, type: String, minLength: 8, maxLength: 20 })
  password: string;
}