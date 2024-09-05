import {
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

// правила для создания книги
export class CreateBookDto {
  @IsString()
  @MinLength(2)
  title: string;

  @IsInt()
  @Min(5)
  @Max(120)
  // чтобы указать во что трансформировать сработает так как настроено app.useGlobalPipes(new ValidationPipe());
  @Type(() => Number)
  // @Transform(({ value }) => Number(value)) // Преобразование строки в число
  ageRestriction: number;

  @IsString()
  author: string;

  @IsOptional()
  @IsString()
  image?: string;
}
