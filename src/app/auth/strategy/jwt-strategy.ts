/* eslint-disable prettier/prettier */
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UnauthorizedException } from '@nestjs/common';
import * as config from 'config';
import { UserRepository } from '../repository/user.repository';
import { JwtPayload } from '../payload/jwt-payload-interface';
import { User } from '../entities/user.entity';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectRepository(UserRepository)
    private userRepository: UserRepository) {
        super({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
        });
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        // @ts-ignore
        const user = await this.userRepository.findOne({ username});

        if(!user){
            throw new UnauthorizedException();
        }

        return user;
    }
}