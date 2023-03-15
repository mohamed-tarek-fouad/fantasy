/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateUserTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  toplanerId: number;
  @ApiProperty()
  @IsNotEmpty()
  junglerId: number;
  @ApiProperty()
  @IsNotEmpty()
  midlanerId: number;
  @ApiProperty()
  @IsNotEmpty()
  botlanerId: number;
  @ApiProperty()
  @IsNotEmpty()
  supporterId: number;
  @ApiProperty()
  @IsNotEmpty()
  sup1Id: number;
  @ApiProperty()
  @IsNotEmpty()
  sup2Id: number;
}
