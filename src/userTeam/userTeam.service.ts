/* eslint-disable prettier/prettier */
import { Cron, CronExpression } from "@nestjs/schedule";
import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { Cache } from "cache-manager";
import { PrismaService } from "./../prisma.service";
import { HttpException } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
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
      // const arr = [
      //   { role: "toplane", id: parseInt(toplanerId) },
      //   { role: "jungle", id: parseInt(junglerId) },
      //   { role: "midlane", id: parseInt(midlanerId) },
      //   { role: "botlane", id: parseInt(botlanerId) },
      //   { role: "support", id: parseInt(supporterId) },
      //   { role: "sup1", id: parseInt(sup1Id) },
      //   { role: "sup2", id: parseInt(sup2Id) },
      // ].sort(function (a, b) {
      //   return a.id - b.id;
      // });
      // const test = await this.prisma.players.findMany({
      //   where: {
      //     OR: [
      //       { id: parseInt(toplanerId) },
      //       { id: parseInt(junglerId) },
      //       { id: parseInt(midlanerId) },
      //       { id: parseInt(botlanerId) },
      //       { id: parseInt(supporterId) },
      //       { id: parseInt(sup1Id) },
      //       { id: parseInt(sup2Id) },
      //     ],
      //   },
      // });
      // for (let i = 0; i < 5; i++) {
      //   if (arr[i].role !== test[i].lane) {
      //     console.log("wrong");
      //   }
      // }

      if (!comingTeam.includes(parseInt(captinId))) {
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
      const map = {};
      for (let i = 0; i < team.length; i++) {
        if (map[team[i].teamId]) {
          map[team[i].teamId] += 1;
          if (map[team[i].teamId] === 3) {
            throw new HttpException(
              "you can have only 2 players from the same team",
              HttpStatus.BAD_REQUEST,
            );
          }
        } else {
          map[team[i].teamId] = 1;
        }
      }
      // for (let i = 0; i < team.length; i++) {
      //   let counter1 = 0;
      //   let counter2 = 0;
      //   for (let j = 1; j < team.length; j++) {
      //     if (team[i].teamId === team[j].teamId) {
      //       counter1 += 1;
      //     }
      //     if (counter1 === 2) {
      //       counter2 += 1;
      //     }
      //     if (counter2 === 2) {
      //       throw new HttpException(
      //         "you can have only 2 players from the same team others should be one from each",
      //         HttpStatus.BAD_REQUEST,
      //       );
      //     }
      //     if (counter1 > 2) {
      //       throw new HttpException(
      //         "you can't have more than two players from the same team",
      //         HttpStatus.BAD_REQUEST,
      //       );
      //     }
      //   }
      // }
      if (
        toplaner.lane !== "toplane" ||
        jungler.lane !== "jungle" ||
        midlaner.lane !== "midlane" ||
        botlaner.lane !== "botlane" ||
        supporter.lane !== "support"
      ) {
        throw new HttpException(
          "invalid lane for player",
          HttpStatus.BAD_REQUEST,
        );
      }
      // if (sameRoleCheck[0].lane === sameRoleCheck[1].lane) {
      //   throw new HttpException(
      //     `can't have two sup ${sameRoleCheck[0].lane}rs`,
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }
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
      if (!checkUserTeamExist) {
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
        const totalMoney =
          userTeam.toplaner.cost +
          userTeam.jungler.cost +
          userTeam.midlaner.cost +
          userTeam.botlaner.cost +
          userTeam.supporter.cost +
          userTeam.sup1.cost +
          userTeam.sup2.cost;
        await this.prisma.users.update({
          where: {
            id: req.user.userId,
          },
          data: {
            budget: { decrement: totalMoney },
          },
        });
        return { ...userTeam, message: "team has been created successfully" };
      }
      const diffrence = comingTeam.filter((x) => !previousTeam.includes(x));
      if (diffrence.length > checkUserTeamExist.transfers) {
        throw new HttpException(
          "not enogh transfers available",
          HttpStatus.BAD_REQUEST,
        );
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
          transfers: checkUserTeamExist.transfers - diffrence.length,
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
      delete userTeam.toplanerId;
      delete userTeam.junglerId;
      delete userTeam.midlanerId;
      delete userTeam.botlanerId;
      delete userTeam.supporterId;
      delete userTeam.sup1Id;
      delete userTeam.sup2Id;
      delete userTeam.captinId;
      let newBudget = 0;
      for (let i = 0; i < currTeam.length; i++) {
        if (currTeam[i] != prevTeam[i]) {
          newBudget += currTeam[i].cost - prevTeam[i].cost;
        }
      }

      await this.prisma.users.update({
        where: {
          id: req.user.userId,
        },
        data: {
          budget: { decrement: newBudget },
        },
      });
      return { ...userTeam, message: "edits has been applied successfully" };
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
      const playersKDA = await this.prisma.playerKDA.findMany({
        select: {
          points: true,
          playerId: true,
        },
      });
      for (let i = 0; i < playersKDA.length; i++) {
        if (playersKDA[i].playerId in map) {
          map[playersKDA[i].playerId] += playersKDA[i].points;
        } else {
          map[playersKDA[i].playerId] = playersKDA[i].points;
        }
      }
      for (let player = 0; player < Object.keys(map).length; player++) {
        await this.prisma.userTeam.updateMany({
          where: {
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
          data: {
            points: { increment: Number(Object.values(map)[player]) },
          },
        });
      }
      console.log("points updated");
    } catch (err) {
      return err;
    }
  }
}
