/* eslint-disable prettier/prettier */
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthCredentialDto } from '../dto/create-auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../repository/user.repository';
import { JwtPayload } from '../payload/jwt-payload-interface';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService')

    constructor(private readonly userRepository: UserRepository, private jwtService: JwtService) { }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        return await this.userRepository.signUp(authCredentialDto);
    }

    async signIn(
        authCredentialDto: AuthCredentialDto,
    ): Promise<{ accessToken: string }> {
        console.log('service: ', authCredentialDto);
        const username = await this.userRepository.validateUser(authCredentialDto);
        console.log('service: ', username);
        //   console.log(result)
        if (!username) {
            throw new UnauthorizedException('Invalid Credential');
        }
        const payload: JwtPayload = { username };
        const accessToken = await this.jwtService.sign(payload);

        this.logger.debug(`\nGenerated Token with payload ${JSON.stringify(payload)}`)
        return { accessToken };
    }
}
