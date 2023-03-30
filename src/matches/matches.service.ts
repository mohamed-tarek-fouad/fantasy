/* eslint-disable prettier/prettier */
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { PrismaService } from "./../prisma.service";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { CreateMatchDto } from "./dtos/createMatch.dto";
import { UpdateMatchDto } from "./dtos/updateMatch.dto";
@Injectable()
export class MatchesService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async createMatch(matchDto: CreateMatchDto) {
    try {
      const match = await this.prisma.matches.create({
        data: matchDto,
      });
      return { ...match, message: "match created successfully" };
    } catch (err) {
      return err;
    }
  }
  async updateMatch(matchDto: UpdateMatchDto, id: string) {
    try {
      const checkMatch = await this.prisma.matches.findUnique({
        where: { id: parseInt(id) },
      });
      if (!checkMatch) {
        throw new HttpException("match doesn't exist", HttpStatus.BAD_REQUEST);
      }
      const match = await this.prisma.matches.update({
        where: { id: parseInt(id) },
        data: matchDto,
      });
      return { ...match, message: "match updated successfully" };
    } catch (err) {
      return err;
    }
  }
  async allMatches() {
    try {
      const matches = await this.prisma.matches.findMany({});
      return { ...matches, message: "fetched all matches successfully" };
    } catch (err) {
      return err;
    }
  }
  async matchById(id: string) {
    try {
      const match = await this.prisma.matches.findUnique({
        where: { id: parseInt(id) },
      });
      return { ...match, message: "match created successfully" };
    } catch (err) {
      return err;
    }
  }
  async deleteMatch(id: string) {
    try {
      await this.prisma.matches.delete({
        where: { id: parseInt(id) },
      });
    } catch (err) {
      return err;
    }
  }
}
