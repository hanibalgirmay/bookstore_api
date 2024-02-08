/* eslint-disable prettier/prettier */
import { Repository, EntityRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import {
    ConflictException,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthCredentialDto } from '../dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserPointService } from 'src/app/users/service/userPoint.service';

//@EntityRepository(User)
export class UserRepository extends Repository<User> {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private userPointService: UserPointService
    ) {
        super(
            userRepository.target,
            userRepository.manager,
            userRepository.queryRunner,
        );
    }

    async signUp(authCredentialDto: AuthCredentialDto): Promise<void> {
        const { email, password } = authCredentialDto;

        const salt = await bcrypt.genSaltSync(10);
        console.log(salt);

        const _password = await this.hashPassword(password, salt);
        const user = {
            email: email,
            salt: salt,
            password: _password
        };

        try {
            await this.save(user).then((res) => {
                this.userPointService.create({
                    userId: res.id,
                })
            });
            // console.log(user)
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('User name or email exists');
            } else {
                throw new InternalServerErrorException();
            }
            //   console.log(error.code);
        }
    }

    async validateUser(authCredentialDto: AuthCredentialDto): Promise<any> {
        console.log('validate user: ', authCredentialDto);
        const { email, password } = authCredentialDto;
        // @ts-ignore
        const user = await this.findOne({ where: { email } });
        if (user) {
            if (user && (await user.validatePassword(password))) {
                return { email: user.email, id: user?.id };
            } else {
                return null;
            }
        } else {
            throw new NotFoundException('User not found')
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}