/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
import { IsOptional } from "class-validator";
export class UpdateTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  teamName: string;
}
