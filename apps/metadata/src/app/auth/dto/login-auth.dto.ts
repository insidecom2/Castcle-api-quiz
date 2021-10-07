import { IsNotEmpty } from 'class-validator';

export class LoginAuthDTO {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
