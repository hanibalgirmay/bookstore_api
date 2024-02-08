/* eslint-disable prettier/prettier */
import { Injectable, Logger } from '@nestjs/common';
import { BookRepository } from '../repository/book.repository';
import { Books } from '../entity/book.entity';
import { CreateBooksDto } from '../dto/create-book.dto';
import { TagsEnum } from 'src/utils/enums/tags.enum';

@Injectable()
export class BookService {
    private logger = new Logger(BookService.name);
    constructor(private readonly bookRepository: BookRepository) { }

    async findAll(page: number, limit: number, searchTitle?: string): Promise<Books[]> {
        try {
            let books = await this.bookRepository.findAll(page, limit);
            if (searchTitle) {
                const regexPattern = new RegExp(searchTitle, 'i');
                books = await this.findByTitleRegex(regexPattern, page, limit);
            } else {
                books = await this.bookRepository.findAll(page, limit);
            }

            if (books?.length === 0) {
                throw new Error('No record found.');
            }
            return books;
        } catch (error) {
            this.logger.log(
                `BookService:findAll : ${JSON.stringify(error.message)}`,
            );
        }
    }

    async findByTitleRegex(regexPattern: RegExp, page: number, limit: number): Promise<Books[]> {
        try {
          const books = await this.bookRepository
            .createQueryBuilder('book')
            .where('book.title ILIKE :title', { title: `%${regexPattern.source}%` })
            .skip((page - 1) * limit)
            .take(limit)
            .getMany();
      
          return books;
        } catch (error) {
          throw new Error('Error finding books by title regex.');
        }
      }

    async generateBookJson() {
        const bookData = [];

        console.log('====================================');
        console.log(Object.values(TagsEnum));
        console.log('====================================');
        const _tags: TagsEnum[] = Object.values(TagsEnum);
        for (let i = 0; i < 30; i++) {
            const book = {
                title: `Book ${i + 1}`,
                writer: `Writer ${i + 1}`,
                cover_image: `https://images-na.ssl-images-amazon.com/images/I/51Ga5GuElyL._AC_SX184_.jpg`,
                price: `${i + 1}.99`,
                tags: _tags[Math.floor(Math.random() * Object.values(TagsEnum).length)],
            };

            bookData.push(book);
            await this.create({ ...book, price: Number(book.price), tags: [book.tags] });
        }

    }

    async create(user: CreateBooksDto): Promise<Books> {
        console.log('books: ', user);
        try {
            const _user = {
                ...user,
            }
            return this.bookRepository.save(_user);
        } catch (error) {
            this.logger.log(`BookService:create: ${JSON.stringify(error.message)}`);
            throw new Error(error.message);
        }
    }

    async findById(id: number): Promise<Books> {
        try {
            const user = await this.bookRepository.findById(id);
            if (!user) {
                throw new Error('Book not found.');
            }
            return user;
        } catch (error) {
            this.logger.log(
                `BookService:findById: ${JSON.stringify(error.message)}`,
            );
            throw new Error(error.message);
        }
    }

    async update(id: number, user: CreateBooksDto): Promise<any> {
        try {
            const _user = await this.findById(id);
            if (_user) {
                return await this.bookRepository.updateOne(_user.id, user);
            }
        } catch (error) {
            this.logger.log(`BookService:update: ${JSON.stringify(error.message)}`);
            throw new Error(error.message);
        }
    }

    async delete(id: number) {
        try {
            return await this.bookRepository.delete(id);
        } catch (error) {
            this.logger.log(`BookService:delete: ${JSON.stringify(error.message)}`);
            throw new Error(error.message);
        }
    }
}
