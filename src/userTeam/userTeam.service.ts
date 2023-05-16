/* eslint-disable prettier/prettier */
import { Cron, CronExpression } from "@nestjs/schedule";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { PrismaService } from "./../prisma.service";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { checkTwoPlayersFromSameTeam } from "./functions/twoPLayersTeam";
import { playerRole } from "./functions/checkRole";
@Injectable()
export class UserTeamService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async createUserTeam(
    toplanerId: string,
    junglerId: string,
    midlanerId: string,
    botlanerId: string,
    supporterId: string,
    sup1Id: string,
    sup2Id: string,
    captinId: string,
    req,
  ) {
    try {
      const comingTeam = [
        parseInt(toplanerId),
        parseInt(junglerId),
        parseInt(midlanerId),
        parseInt(botlanerId),
        parseInt(supporterId),
        parseInt(sup1Id),
        parseInt(sup2Id),
      ];
      if (
        !comingTeam.includes(parseInt(captinId)) ||
        captinId === sup1Id ||
        captinId === sup2Id
      ) {
        throw new HttpException("invalid captin ID", HttpStatus.BAD_REQUEST);
      }
      if (
        [
          toplanerId,
          junglerId,
          midlanerId,
          botlanerId,
          supporterId,
          sup2Id,
        ].includes(sup1Id) ||
        [
          toplanerId,
          junglerId,
          midlanerId,
          botlanerId,
          supporterId,
          sup1Id,
        ].includes(sup2Id)
      ) {
        throw new HttpException(
          "cant have same player in two roles",
          HttpStatus.BAD_REQUEST,
        );
      }
      const toplaner = await this.prisma.players.findUnique({
        where: {
          id: parseInt(toplanerId),
        },
      });
      const jungler = await this.prisma.players.findUnique({
        where: {
          id: parseInt(junglerId),
        },
      });
      const midlaner = await this.prisma.players.findUnique({
        where: {
          id: parseInt(midlanerId),
        },
      });
      const botlaner = await this.prisma.players.findUnique({
        where: {
          id: parseInt(botlanerId),
        },
      });
      const supporter = await this.prisma.players.findUnique({
        where: {
          id: parseInt(supporterId),
        },
      });
      const sameRoleCheck = await this.prisma.players.findMany({
        where: {
          OR: [{ id: parseInt(sup1Id) }, { id: parseInt(sup2Id) }],
        },
      });
      const team = [
        toplaner,
        jungler,
        midlaner,
        botlaner,
        supporter,
        sameRoleCheck[0],
        sameRoleCheck[1],
      ];
      checkTwoPlayersFromSameTeam(team);
      playerRole(
        toplaner,
        jungler,
        midlaner,
        botlaner,
        supporter,
        sameRoleCheck,
      );
      const checkUserTeamExist = await this.prisma.userTeam.findUnique({
        where: {
          userId: req.user.userId,
        },
        include: {
          user: true,
          toplaner: true,
          jungler: true,
          midlaner: true,
          botlaner: true,
          supporter: true,
          sup1: true,
          sup2: true,
          captin: true,
        },
      });
      const previousTeam = [
        checkUserTeamExist?.toplanerId,
        checkUserTeamExist?.junglerId,
        checkUserTeamExist?.midlanerId,
        checkUserTeamExist?.botlanerId,
        checkUserTeamExist?.supporterId,
        checkUserTeamExist?.sup1Id,
        checkUserTeamExist?.sup2Id,
      ];
      const totalMoney =
        toplaner.cost +
        jungler.cost +
        midlaner.cost +
        botlaner.cost +
        supporter.cost +
        sameRoleCheck[0].cost +
        sameRoleCheck[1].cost;
      if (!checkUserTeamExist || checkUserTeamExist === null) {
        const userTeam = await this.prisma.userTeam.create({
          data: {
            toplanerId: parseInt(toplanerId),
            junglerId: parseInt(junglerId),
            midlanerId: parseInt(midlanerId),
            botlanerId: parseInt(botlanerId),
            supporterId: parseInt(supporterId),
            sup1Id: parseInt(sup1Id),
            sup2Id: parseInt(sup2Id),
            userId: req.user.userId,
            captinId: parseInt(captinId),
            budget: 100000000 - totalMoney,
          },
          include: {
            toplaner: true,
            jungler: true,
            midlaner: true,
            botlaner: true,
            supporter: true,
            sup1: true,
            sup2: true,
            captin: true,
          },
        });
        delete userTeam.toplanerId;
        delete userTeam.junglerId;
        delete userTeam.midlanerId;
        delete userTeam.botlanerId;
        delete userTeam.supporterId;
        delete userTeam.sup1Id;
        delete userTeam.sup2Id;
        delete userTeam.captinId;
        return {
          userTeam,
          message: "team has been created successfully",
        };
      }
      //*********if there is team*********
      let points = 0;
      let diffrence: number[] = [];
      //teamfan status check
      if (!checkUserTeamExist.teamFanStatus) {
        diffrence = comingTeam.filter((x) => !previousTeam.includes(x));
        if (diffrence.length > checkUserTeamExist.transfers) {
          points = -1;
          points *= diffrence.length - checkUserTeamExist.transfers;
        }
      }
      const userTeam = await this.prisma.userTeam.update({
        where: { userId: req.user.userId },
        data: {
          toplanerId: parseInt(toplanerId),
          junglerId: parseInt(junglerId),
          midlanerId: parseInt(midlanerId),
          botlanerId: parseInt(botlanerId),
          supporterId: parseInt(supporterId),
          sup1Id: parseInt(sup1Id),
          sup2Id: parseInt(sup2Id),
          userId: req.user.userId,
          captinId: parseInt(captinId),
          transfers:
            checkUserTeamExist.transfers - diffrence.length < 0
              ? 0
              : checkUserTeamExist.transfers - diffrence.length,
          nextWeekPoints: { decrement: points },
        },
        include: {
          toplaner: true,
          jungler: true,
          midlaner: true,
          botlaner: true,
          supporter: true,
          sup1: true,
          sup2: true,
          captin: true,
        },
      });
      const currTeam = [
        userTeam.toplaner,
        userTeam.jungler,
        userTeam.midlaner,
        userTeam.botlaner,
        userTeam.supporter,
        userTeam.sup1,
        userTeam.sup2,
      ];
      const prevTeam = [
        checkUserTeamExist.toplaner,
        checkUserTeamExist.jungler,
        checkUserTeamExist.midlaner,
        checkUserTeamExist.botlaner,
        checkUserTeamExist.supporter,
        checkUserTeamExist.sup1,
        checkUserTeamExist.sup2,
      ];

      let newBudget = 0;
      for (let i = 0; i < currTeam.length; i++) {
        if (currTeam[i] != prevTeam[i]) {
          newBudget += currTeam[i].cost - prevTeam[i].cost;
        }
      }
      const appliedBudget = await this.prisma.userTeam.update({
        where: {
          userId: req.user.userId,
        },
        data: {
          budget: { decrement: newBudget },
        },
        include: {
          toplaner: true,
          jungler: true,
          midlaner: true,
          botlaner: true,
          supporter: true,
          sup1: true,
          sup2: true,
          captin: true,
        },
      });
      delete appliedBudget.toplanerId;
      delete appliedBudget.junglerId;
      delete appliedBudget.midlanerId;
      delete appliedBudget.botlanerId;
      delete appliedBudget.supporterId;
      delete appliedBudget.sup1Id;
      delete appliedBudget.sup2Id;
      delete appliedBudget.captinId;
      return {
        userTeam: appliedBudget,
        message: "Edits has been applied successfully",
      };
    } catch (err) {
      return err;
    }
  }

  async userTeamById(req) {
    try {
      const userTeam = await this.prisma.userTeam.findUnique({
        where: {
          userId: req.user.userId,
        },
        include: {
          toplaner: true,
          jungler: true,
          midlaner: true,
          botlaner: true,
          supporter: true,
          sup1: true,
          sup2: true,
          captin: true,
        },
      });
      delete userTeam.toplanerId;
      delete userTeam.junglerId;
      delete userTeam.midlanerId;
      delete userTeam.botlanerId;
      delete userTeam.supporterId;
      delete userTeam.sup1Id;
      delete userTeam.sup2Id;
      delete userTeam.captinId;
      if (!userTeam) {
        throw new HttpException("invalid ID", HttpStatus.BAD_REQUEST);
      }
      return { ...userTeam, message: "fetched all user team successfully" };
    } catch (err) {
      return err;
    }
  }
  async applyCard(
    tripleCaptin: boolean,
    allIn: boolean,
    teamFan: boolean,
    req,
  ) {
    try {
      const cards = await this.prisma.userTeam.findUnique({
        where: {
          userId: req.user.userId,
        },
      });
      if (
        (cards.tripleCaptin === 0 && tripleCaptin) ||
        (cards.allIn === 0 && allIn) ||
        (cards.teamFan === 0 && teamFan)
      ) {
        throw new HttpException(
          "you don't have enough chips",
          HttpStatus.BAD_REQUEST,
        );
      }
      const applyCard = await this.prisma.userTeam.update({
        where: {
          userId: req.user.userId,
        },
        data: {
          tripleCaptin: tripleCaptin ? { decrement: 1 } : null,
          allIn: allIn ? { decrement: 1 } : null,
          teamFan: teamFan ? { decrement: 1 } : null,
        },
      });
      return { ...applyCard, message: "card activated successfully" };
    } catch (err) {
      return err;
    }
  }
  @Cron(CronExpression.EVERY_WEEK)
  async addPoints() {
    try {
      const map = {};
      let playersKDA = await this.prisma.playerKDA.findMany({
        select: {
          points: true,
          playerId: true,
          week: true,
        },
      });
      const week = await this.prisma.playerKDA.aggregate({
        _max: {
          week: true,
        },
      });
      playersKDA = playersKDA.filter((player) => {
        if (player.week == week._max.week) {
          return player;
        }
      });
      for (let i = 0; i < playersKDA.length; i++) {
        if (playersKDA[i].playerId in map) {
          map[playersKDA[i].playerId] += playersKDA[i].points;
        } else {
          map[playersKDA[i].playerId] = playersKDA[i].points;
        }
      }
      for (let player = 0; player < Object.keys(map).length; player++) {
        //if triple captin activated
        await this.prisma.userTeam.updateMany({
          where: {
            AND: [
              {
                OR: [
                  { toplanerId: parseInt(Object.keys(map)[player]) },
                  { junglerId: parseInt(Object.keys(map)[player]) },
                  { midlanerId: parseInt(Object.keys(map)[player]) },
                  { botlanerId: parseInt(Object.keys(map)[player]) },
                  { supporterId: parseInt(Object.keys(map)[player]) },
                ],
              },
              { allInStatus: false },
              { tripleCaptinStatus: true },
            ],
          },
          data: {
            points: { increment: Number(Object.values(map)[player]) * 1.5 },
          },
        });

        //if allin activated
        await this.prisma.userTeam.updateMany({
          where: {
            AND: [
              {
                OR: [
                  { toplanerId: parseInt(Object.keys(map)[player]) },
                  { junglerId: parseInt(Object.keys(map)[player]) },
                  { midlanerId: parseInt(Object.keys(map)[player]) },
                  { botlanerId: parseInt(Object.keys(map)[player]) },
                  { supporterId: parseInt(Object.keys(map)[player]) },
                  { sup1Id: parseInt(Object.keys(map)[player]) },
                  { sup2Id: parseInt(Object.keys(map)[player]) },
                ],
              },
              { allInStatus: true },
            ],
          },
          data: {
            points: { increment: Number(Object.values(map)[player]) },
            allInStatus: false,
          },
        });

        //if allin activated
        //if triple captin activated
        await this.prisma.userTeam.updateMany({
          where: {
            AND: [
              {
                OR: [
                  { toplanerId: parseInt(Object.keys(map)[player]) },
                  { junglerId: parseInt(Object.keys(map)[player]) },
                  { midlanerId: parseInt(Object.keys(map)[player]) },
                  { botlanerId: parseInt(Object.keys(map)[player]) },
                  { supporterId: parseInt(Object.keys(map)[player]) },
                  { sup1Id: parseInt(Object.keys(map)[player]) },
                  { sup2Id: parseInt(Object.keys(map)[player]) },
                ],
              },
              { allInStatus: true },
              { tripleCaptinStatus: true },
            ],
          },
          data: {
            points: { increment: Number(Object.values(map)[player]) * 1.5 },
            allInStatus: false,
            tripleCaptinStatus: false,
            teamFanStatus: false,
          },
        });
      }
      console.log("points updated");
    } catch (err) {
      return err;
    }
  }
}
