/* eslint-disable prettier/prettier */
import { User } from 'src/app/auth/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class UserPoints {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    userId: number;

    @OneToOne(() => User)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ type: "float", default: 100 })
    points: number;

}