/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
  Validate,
} from "class-validator";
import {
  PasswordValidation,
  PasswordValidationRequirement,
} from "class-validator-password-check";
const passwordRequirement: PasswordValidationRequirement = {
  mustContainLowerLetter: true,
  mustContainNumber: true,
  mustContainSpecialCharacter: true,
  mustContainUpperLetter: true,
};
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateUserDto {
  @ApiProperty({ example: "mohamed" })
  @MinLength(3)
  @IsNotEmpty()
  username: string;
  @ApiProperty({ example: "mdmedoo7@gmail.com" })
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({ example: "123mM123@" })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
  @ApiProperty()
  @IsNotEmpty()
  nationality: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  age: number;
  @ApiProperty()
  @IsNotEmpty()
  riotId: string;
}
