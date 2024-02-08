/* eslint-disable prettier/prettier */
import { User } from 'src/app/auth/entities/user.entity';
import { Books } from 'src/app/book/entity/book.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Orders {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    orderID: string;

    @Column()
    userId: number;

    @ManyToOne(() => User)
    @JoinColumn()
    user: User;

    @Column({ type: "float" })
    price: number;

    @Column("jsonb", { nullable: true })
    books: Books[]
}