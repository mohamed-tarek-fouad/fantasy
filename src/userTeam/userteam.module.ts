/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { PrismaService } from "./../prisma.service";
import { UserTeamController } from "./userTeam.controller";
import { UserTeamService } from "./userTeam.service";
import { ScheduleModule } from "@nestjs/schedule";

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [UserTeamController],
  providers: [PrismaService, UserTeamService],
})
export class UserTeamModule {}
