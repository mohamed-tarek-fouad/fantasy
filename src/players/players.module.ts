/* eslint-disable prettier/prettier */
import { PlayersService } from "./players.service";
import { PlayersController } from "./players.controller";
import { Module } from "@nestjs/common";
import { PrismaService } from "./../prisma.service";
@Module({
  imports: [],
  controllers: [PlayersController],
  providers: [PlayersService, PrismaService],
})
export class PlayersModule {}
