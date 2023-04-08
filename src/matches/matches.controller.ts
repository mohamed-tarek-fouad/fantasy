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
import { CreateMatchDto } from "./dtos/createMatch.dto";
import { UpdateMatchDto } from "./dtos/updateMatch.dto";
import { MatchesService } from "./matches.service";
@Controller()
export class MatchesController {
  constructor(private matchesService: MatchesService) {}
  @Post()
  createMatch(@Body() createMatchDto: CreateMatchDto) {
    return this.matchesService.createMatch(createMatchDto);
  }
  @Patch(":id")
  updateMatch(@Body() updateMatchDto: UpdateMatchDto, @Param("id") id: string) {
    return this.matchesService.updateMatch(updateMatchDto, id);
  }
  @Delete(":id")
  deleteMatch(@Param("id") id: string) {
    return this.matchesService.deleteMatch(id);
  }
  @Get("allMatches")
  allMatchs() {
    return this.matchesService.allMatches();
  }
  @Get(":id")
  matchbyId(@Param("id") id: string) {
    return this.matchesService.matchById(id);
  }
}
