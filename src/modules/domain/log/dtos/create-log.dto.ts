import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class createLogDto {
  @IsString()
  @IsNotEmpty()
  project: string;

  @IsString()
  @IsIn(['Error', 'Success'])
  @IsNotEmpty()
  logType: string;

  @IsString()
  @IsOptional()
  message: string;

  @IsString()
  @IsOptional()
  tag: string;

  @IsNumber()
  @IsNotEmpty()
  statusCode: number;
}
