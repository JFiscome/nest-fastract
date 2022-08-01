import { IsInt, IsString, Length } from 'class-validator';

export class CreateCatDto {
  @IsString()
  @Length(2, 6)
  readonly name: string;

  @IsInt()
  readonly age: number;

  @IsString()
  readonly breed: string;
}
