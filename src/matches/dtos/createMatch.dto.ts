/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateMatchDto {
  @ApiProperty()
  @IsNotEmpty()
  team1Id: string;
  @ApiProperty()
  @IsNotEmpty()
  team2Id: string;
  @ApiProperty()
  @IsNotEmpty()
  date: string;
}
