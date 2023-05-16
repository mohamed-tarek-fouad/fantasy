/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from "@nestjs/common";

export const checkTwoPlayersFromSameTeam = (team) => {
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
};
