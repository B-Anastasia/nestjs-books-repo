import { Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './books.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UsersRepository } from '../users/users.repository';
import { UpdateBookDto } from './dto/update-book.dto';

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

  async updateBook(
    dto: UpdateBookDto,
    userId: number,
    bookId: number,
  ): Promise<void> {
    const book = await this.booksRepository.findOneOrNotFoundFail(bookId);
    book.updateBook(dto, userId);
  }
}
