/* eslint-disable prettier/prettier */

import { Controller, Post, Get, Req, Param } from "@nestjs/common";
import { UserTeamService } from "./userTeam.service";
import { ApiBearerAuth } from "@nestjs/swagger/dist";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./../jwtAuthGuard";

@Controller("userTeam")
export class UserTeamController {
  constructor(private userTeamService: UserTeamService) {}
  @ApiBearerAuth("access-token")
  @UseGuards(JwtAuthGuard)
  @Post(
    "createUserTeam/:toplanerId/:junglerId/:midlanerId/:botlanerId/:supporterId/:sup1Id/:sup2Id/:captinId",
  )
  createTeamUser(
    @Param("toplanerId") toplanerId: string,
    @Param("junglerId") junglerId: string,
    @Param("midlanerId") midlanerId: string,
    @Param("botlanerId") botlanerId: string,
    @Param("supporterId") supporterId: string,
    @Param("sup1Id") sup1Id: string,
    @Param("sup2Id") sup2Id: string,
    @Param("captinId") captinId: string,
    @Req() req,
  ) {
    return this.userTeamService.createUserTeam(
      toplanerId,
      junglerId,
      midlanerId,
      botlanerId,
      supporterId,
      sup1Id,
      sup2Id,
      captinId,
      req,
    );
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  userTeamById(@Req() req) {
    return this.userTeamService.userTeamById(req);
  }
}
