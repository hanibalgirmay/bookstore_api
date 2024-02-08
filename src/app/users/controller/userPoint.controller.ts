/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UseGuards } from '@nestjs/common';
import { UserPointService } from '../service/userPoint.service';
import { CreateUserPointDto } from '../dto/create.user-point.dto';
import { Response as ResponseType } from '../../../utils/enums/response.enum';
import { IdParamValidation } from 'src/utils/decorators/IdParamValidation ';
import { UpdateUserPointDto } from '../dto/update.user-point';
import { AuthGuard } from 'src/app/auth/guard/guard';
//import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserPointsController {
    constructor(private usersPointService: UserPointService) { }


    @Get()
    //@UseGuards(AuthGuard)
    async findAll(@Res() response) {
        try {
            const users = await this.usersPointService.findAll();
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
    @UseGuards(AuthGuard)
    async getById(@Res() response, @Param() { id }: IdParamValidation) {
        try {
            const user = await this.usersPointService.findById(id);
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
    async create(@Res() response, @Body() createUsersDto: CreateUserPointDto) {
        try {
            const user = await this.usersPointService.create(createUsersDto);
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
        @Body() updateUsersDto: UpdateUserPointDto,
    ) {
        try {
            const user = await this.usersPointService.update(id, updateUsersDto);
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
            await this.usersPointService.delete(id);
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
