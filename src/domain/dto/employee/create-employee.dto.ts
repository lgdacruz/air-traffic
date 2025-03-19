import { IsDate, IsEmail, IsIn, IsOptional, IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  warName: string;

  @IsDate()
  @IsOptional()
  bornDate?: Date;

  @IsEmail()
  email: string;

  @IsIn([
    'soldier',
    'sergeant',
    'lieutenant',
    'captain',
    'major',
    'colonel',
    'general',
  ])
  degree: string;

  @IsIn(['alfa', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot'])
  companyName: string;
}
