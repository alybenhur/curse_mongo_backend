import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class AnswerDto {
  @IsString() questionId: string;
  @IsString() selectedKey: string;
}

export class SubmitEvaluationDto {
  @IsNumber() stageOrder: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  answers: AnswerDto[];
}
