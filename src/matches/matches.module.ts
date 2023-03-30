/* eslint-disable prettier/prettier */

import { MatchesService } from "./matches.service";
import { MatchesController } from "./matches.controller";
import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Module({
  imports: [],
  controllers: [MatchesController],
  providers: [PrismaService, MatchesService],
})
export class MatchesModule {}
