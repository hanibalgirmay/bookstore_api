/* eslint-disable prettier/prettier */
import { Repository } from "typeorm";
import { Books } from "../entity/book.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateBooksDto } from "../dto/create-book.dto";

/* eslint-disable prettier/prettier */
export class BookRepository extends Repository<Books> {
    constructor(
        @InjectRepository(Books)
        private userPointRepository: Repository<Books>,
    ) {
        super(
            userPointRepository.target,
            userPointRepository.manager,
            userPointRepository.queryRunner,
        );
    }

    public async findAll(page: number, limit: number): Promise<Books[]> {
        const skip = (page - 1) * limit;
        return await this.find({
            skip,
            take: limit,
        });
    }

    public async findById(id: number): Promise<Books | null> {
        return this.findById(id);
    }

    public async store(book: CreateBooksDto): Promise<Books> {
        const newUser = this.create(book);
        return this.save(newUser);
    }

    public async updateOne(
        id: number,
        updateUserDto: CreateBooksDto,
    ): Promise<Books | undefined> {
        const user = await this.findById(id);
        if (!user) return undefined;
        Object.assign(user, updateUserDto);
        return this.save(user);
    }

    public async destroy(id: number): Promise<void> {
        await this.delete(id);
    }
}
