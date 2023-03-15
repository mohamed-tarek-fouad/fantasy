/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class AddKDADto {
  @ApiProperty()
  @IsNotEmpty()
  kills: number;
  @ApiProperty()
  @IsNotEmpty()
  deathes: number;
  @ApiProperty()
  @IsNotEmpty()
  assists: number;
  @ApiProperty()
  @IsNotEmpty()
  visionScore: number;
  @ApiProperty()
  @IsNotEmpty()
  cs: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  MVB: boolean;
}
