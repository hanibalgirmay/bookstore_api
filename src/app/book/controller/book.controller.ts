/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { BookService } from '../service/book.service';
import { IdParamValidation } from 'src/utils/decorators/IdParamValidation ';
import { CreateBooksDto } from '../dto/create-book.dto';
import { Response as ResponseType } from '../../../utils/enums/response.enum';
import { TagsEnum } from 'src/utils/enums/tags.enum';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService) { }

    @Get('generate')
    async generateBook() {
        return await this.bookService.generateBookJson();
    }

    @Get()
    async findAll(
        @Res() response,
        @Query('page') page: number,
        @Query('searchTitle') searchTitle: string,
        @Query('tags') tags: TagsEnum[],
        @Query('limit') limit: number,) {
        try {
            if (typeof tags === 'string') {
                // If tags is a string, convert it to an array
                tags = [tags];
            }
            const users = await this.bookService.findAll(page, limit, searchTitle, tags);
            return response.status(HttpStatus.OK).json({
                type: ResponseType.SUCCESS,
                message: null,
                data: users || [],
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                type: ResponseType.ERROR,
                message: 'Something went wrong, Please try again later',
                data: null,
            });
        }
    }

    @Get('/:id')
    async getById(@Res() response, @Param() { id }: IdParamValidation) {
        try {
            const user = await this.bookService.findById(id);
            return response.status(HttpStatus.OK).json({
                type: ResponseType.SUCCESS,
                message: null,
                data: user,
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                type: ResponseType.ERROR,
                message: 'Something went wrong, Please try again later',
                data: null,
            });
        }
    }

    @Post()
    async create(@Res() response, @Body() createUsersDto: CreateBooksDto) {
        try {
            const user = await this.bookService.create(createUsersDto);
            return response.status(HttpStatus.OK).json({
                type: ResponseType.SUCCESS,
                message: 'User has been created successfully',
                data: user,
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                type: ResponseType.ERROR,
                message: 'Something went wrong, Please try again later',
                data: null,
            });
        }
    }

    @Put('/:id')
    async update(
        @Res() response,
        @Param() { id }: IdParamValidation,
        @Body() updateUsersDto: CreateBooksDto,
    ) {
        try {
            const user = await this.bookService.update(id, updateUsersDto);
            return response.status(HttpStatus.OK).json({
                type: ResponseType.SUCCESS,
                message: 'User has been updated successfully',
                data: user,
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                type: ResponseType.ERROR,
                message: 'Something went wrong, Please try again later',
                data: null,
            });
        }
    }

    @Delete('/:id')
    async delete(@Res() response, @Param() { id }: IdParamValidation) {
        try {
            await this.bookService.delete(id);
            return response.status(HttpStatus.OK).json({
                type: ResponseType.SUCCESS,
                message: 'User has been deleted successfully',
                data: null,
            });
        } catch (error) {
            return response.status(HttpStatus.BAD_REQUEST).json({
                type: ResponseType.ERROR,
                message: 'Something went wrong, Please try again later',
                data: null,
            });
        }
    }
}
