/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from "@nestjs/common";

export const playerRole = (
  toplaner,
  jungler,
  midlaner,
  botlaner,
  supporter,
  sameRoleCheck,
) => {
  if (
    toplaner.lane !== "toplane" ||
    jungler.lane !== "jungle" ||
    midlaner.lane !== "midlane" ||
    botlaner.lane !== "botlane" ||
    supporter.lane !== "support"
  ) {
    throw new HttpException("invalid lane for player", HttpStatus.BAD_REQUEST);
  }
  if (sameRoleCheck[0].lane === sameRoleCheck[1].lane) {
    throw new HttpException(
      `can't have two sup ${sameRoleCheck[0].lane}rs`,
      HttpStatus.BAD_REQUEST,
    );
  }
};
