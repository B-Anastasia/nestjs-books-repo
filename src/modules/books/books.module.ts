import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './books.entity';
import { BooksRepository } from './books.repository';
import { JwtStrategy } from '../../core/guard/jwt.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([Book])],
  controllers: [BooksController],
  // кого в кого регистрируем стратегию
  providers: [BooksService, BooksRepository, JwtStrategy],
})
export class BooksModule {}
