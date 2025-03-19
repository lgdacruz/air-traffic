import { ArrayNotEmpty, IsArray, IsIn, IsString } from 'class-validator';

export class ModifyListEmployeeDto {
  @IsArray()
  @ArrayNotEmpty()
  employeesId: string[];

  @IsString()
  @IsIn(['remove', 'add'])
  operation: string;
}
