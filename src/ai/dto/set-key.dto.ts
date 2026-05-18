import { IsString, MinLength } from 'class-validator';

export class SetKeyDto {
  @IsString()
  @MinLength(10)
  apiKey: string;
}
