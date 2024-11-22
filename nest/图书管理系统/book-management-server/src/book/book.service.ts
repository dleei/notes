import { UpdateBookDto } from './dto/update-book.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { Book } from './entities/book.entity';

const randomNum = () => Math.floor(Math.random() * 1000000);

@Injectable()
export class BookService {
  @Inject()
  DbService: DbService;
  async list() {
    const books: Array<Book> = await this.DbService.read();
    return books;
  }

  async findById(id: number) {
    const books: Array<Book> = await this.DbService.read();

    return books.find((book) => book.id === id);
  }

  async create(createBookDto: CreateBookDto) {
    const books: Array<Book> = await this.DbService.read();

    const book = new Book();
    book.id = randomNum();
    book.author = createBookDto.author;
    book.name = createBookDto.name;
    book.description = createBookDto.description;
    book.cover = createBookDto.cover;

    books.push(book);

    await this.DbService.write(books);
    return book;
  }

  async update(updateBookDto: UpdateBookDto) {
    const books: Book[] = await this.DbService.read();

    const foundBook = books.find((book) => book.id === updateBookDto.id);

    if (!foundBook) {
      throw new BadRequestException('该图书不存在');
    }

    foundBook.author = updateBookDto.author;
    foundBook.cover = updateBookDto.cover;
    foundBook.description = updateBookDto.description;
    foundBook.name = updateBookDto.name;

    await this.DbService.write(books);
    return foundBook;
  }

  async delete(id: number) {
    const books: Book[] = await this.DbService.read();
    const index = books.findIndex((book) => book.id === id);

    if (index !== -1) {
      books.splice(index, 1);
      await this.DbService.write(books);
    }
  }
}
