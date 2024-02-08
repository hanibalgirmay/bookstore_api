import { Module } from '@nestjs/common';
import { BookService } from './service/book.service';
import { BookController } from './controller/book.controller';
import { BookRepository } from './repository/book.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './entity/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Books])],
  providers: [BookService, BookRepository],
  controllers: [BookController],
})
export class BookModule {}
