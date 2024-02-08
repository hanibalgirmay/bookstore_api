/* eslint-disable prettier/prettier */
import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthCredentialDto } from '../dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  register(
    @Body(ValidationPipe) authCredential: AuthCredentialDto,
  ): Promise<void> {
    console.log('====================================');
    console.log(authCredential);
    console.log('====================================');
    return this.authService.signUp(authCredential);
  }

  @Post('/signin')
  login(
    @Body(ValidationPipe) authCredential: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    console.log('====================================');
    console.log("login! ", authCredential);
    console.log('====================================');
    return this.authService.signIn(authCredential);
  }
}
