/* eslint-disable prettier/prettier */
import { TeamsService } from "./teams.service";
import { TeamsController } from "./teams.controller";
import { Module } from "@nestjs/common";
import { PrismaService } from "./../prisma.service";

@Module({
  imports: [],
  controllers: [TeamsController],
  providers: [TeamsService, PrismaService],
})
export class TeamsModule {}
