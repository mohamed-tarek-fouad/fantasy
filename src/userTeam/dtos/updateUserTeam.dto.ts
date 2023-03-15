/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsOptional } from "class-validator";
export class UpdateUserTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  toplanerId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  junglerId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  midlanerId: string;
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  botlanerId: string;
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  supporterId: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  sup1Id: string;
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  sup2Id: string;
}
