import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { typeOrmConfig } from './config/typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { OrdersModule } from './app/orders/orders.module';
import { BookModule } from './app/book/book.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, UsersModule, OrdersModule, BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
