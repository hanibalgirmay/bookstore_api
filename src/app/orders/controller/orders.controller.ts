/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { IdParamValidation } from 'src/utils/decorators/IdParamValidation ';
import { Response as ResponseType } from '../../../utils/enums/response.enum';
import { OrdersService } from '../service/orders.service';
import { CreateOrderDto } from '../dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService) { }


    @Get()
    async findAll(@Res() response) {
        try {
            const users = await this.orderService.findAll();
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
            console.log('====================================');
            console.log(id);
            console.log('====================================');
            const user = await this.orderService.findById(id);
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
    
    @Get('user/:id')
    async getByUserId(@Res() response, @Param() { id }: IdParamValidation) {
        try {
            const user = await this.orderService.findByUserId(id);
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
    @UsePipes(ValidationPipe)
    async create(@Res() response, @Body() createUsersDto: CreateOrderDto) {
        try {
            const user = await this.orderService.create(createUsersDto);
            return response.status(HttpStatus.OK).json({
                type: ResponseType.SUCCESS,
                message: 'Order has been created successfully',
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
        @Body() updateUsersDto: CreateOrderDto,
    ) {
        try {
            const user = await this.orderService.update(id, updateUsersDto);
            return response.status(HttpStatus.OK).json({
                type: ResponseType.SUCCESS,
                message: 'Order has been updated successfully',
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
            await this.orderService.delete(id);
            return response.status(HttpStatus.OK).json({
                type: ResponseType.SUCCESS,
                message: 'Order has been deleted successfully',
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
