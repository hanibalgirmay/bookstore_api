/* eslint-disable prettier/prettier */
import { TagsEnum } from 'src/utils/enums/tags.enum';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Books {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    title: string;

    @Column()
    writer: string;

    @Column({ type: "text" })
    cover_image: string;

    @Column({ type: 'float' })
    price: number;

    @Column({ type: 'enum', enum: TagsEnum })
    tags: TagsEnum[];

}