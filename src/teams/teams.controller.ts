/* eslint-disable prettier/prettier */
import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Param,
  Delete,
} from "@nestjs/common";
import { TeamsService } from "./teams.service";
import { CreateTeamDto } from "./dtos/createTeam.dto";
import { UpdateTeamDto } from "./dtos/updateTeam.dto";
import { AddKDADto } from "./dtos/addKDA.dto";

@Controller("teams")
export class TeamsController {
  constructor(private teamsService: TeamsService) {}
  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamsService.createTeam(createTeamDto);
  }
  @Patch(":id")
  updateTeam(@Body() updateTeamDto: UpdateTeamDto, @Param("id") id: string) {
    return this.teamsService.updateTeam(updateTeamDto, id);
  }
  @Delete(":id")
  deleteTeam(@Param("id") id: string) {
    return this.teamsService.deleteTeam(id);
  }
  @Get("allTeams")
  allTeams() {
    return this.teamsService.allTeams();
  }
  @Get(":id")
  teambyId(@Param("id") id: string) {
    return this.teamsService.teamById(id);
  }

  @Post("addKDA/:playerId")
  addKda(@Body() addKDADto: AddKDADto, @Param("playerId") playerId: string) {
    return this.teamsService.addKDA(addKDADto, playerId);
  }
}
