/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class UpdatePlayerDto {
  @ApiProperty()
  @MinLength(3)
  @IsNotEmpty()
  @IsOptional()
  playerName: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  nationality: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  cost: number;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  lane: Lane;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  teamId: string;
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  otp: string;
}

enum Lane {
  toplane = "toplane",
  jungle = "jungle",
  midlane = "midlane",
  botlane = "botlane",
  support = "support",
}
