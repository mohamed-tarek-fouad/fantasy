/* eslint-disable prettier/prettier */
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
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
export class UpdateUserDto {
  @ApiProperty({ example: "mohamed" })
  @MinLength(3)
  @IsOptional()
  @IsNotEmpty()
  username: string;
  @ApiProperty({ example: "mdmedoo7@gmail.com" })
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  email: string;
  @ApiProperty({ example: "123mM123@" })
  @IsNotEmpty()
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Validate(PasswordValidation, [passwordRequirement])
  password: string;
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  nationality: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  age: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  riotId: string;
}
