/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class UpdateMatchDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  team1Id: string;
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  team2Id: string;
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  date: string;
}
