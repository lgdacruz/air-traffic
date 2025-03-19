import {
  ArrayNotEmpty,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsIn(['pending', 'done'])
  @IsOptional()
  status: string;

  @IsIn([1, 2, 3, 4, 5])
  @IsOptional()
  priority: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('4', { each: true })
  employee: string[];
}
