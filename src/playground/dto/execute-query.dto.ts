import { IsString, MinLength, MaxLength, IsOptional, IsNumber } from 'class-validator';

export class ExecuteQueryDto {
  @IsString()
  @MinLength(1)
  @MaxLength(5000)
  query: string;

  @IsOptional()
  @IsNumber()
  stageOrder?: number;
}
