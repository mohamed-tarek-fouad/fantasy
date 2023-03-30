/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreatePlayerDto {
  @ApiProperty()
  @MinLength(3)
  @IsNotEmpty()
  playerName: string;
  @ApiProperty()
  @IsNotEmpty()
  nationality: string;
  @ApiProperty()
  @IsNotEmpty()
  cost: number;
  @ApiProperty()
  @IsNotEmpty()
  lane: Lane;
  @ApiProperty()
  @IsNotEmpty()
  teamId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  otp: string;
}

enum Lane {
  toplane = "toplane",
  jungle = "jungle",
  midlane = "midlane",
  botlane = "botlane",
  support = "support",
}
