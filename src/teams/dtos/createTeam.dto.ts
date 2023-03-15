/* eslint-disable prettier/prettier */
import { IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger/dist/decorators";
export class CreateTeamDto {
  @ApiProperty()
  @IsNotEmpty()
  teamName: string;
}
