import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UsersRepository } from '../users/users.repository';

@Injectable()
export class BooksService {
  constructor(
    private readonly booksRepository: BooksRepository,
    private userRepository: UsersRepository,
  ) {}

  // Получить список всех книг
  async getAllBooks(): Promise<Book[]> {
    return this.booksRepository.findAll();
  }

  // Получить книгу по ID
  async getBookById(id: number): Promise<Book> {
    return this.booksRepository.findOneOrNotFoundFail(id);
  }

  // Создать новую книгу
  async createBook(dto: CreateBookDto, userId: number): Promise<void> {
    const user = await this.userRepository.findByIdOrNotFoundFail(userId);
    const book = Book.createBook(dto, userId, user.age);
    await this.booksRepository.save(book);
  }
}
