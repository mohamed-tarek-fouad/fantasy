import { MatchesModule } from "./matches/matches.module";
import { UserTeamModule } from "./userTeam/userteam.module";
import { TeamsModule } from "./teams/teams.module";
import { PlayersModule } from "./players/players.module";
import { AuthModule } from "./auth/auth.module";
import { Module, CacheModule } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { JwtAuthGuard } from "./jwtAuthGuard";
import { MailerModule } from "@nestjs-modules/mailer";
import { ConfigModule, ConfigService } from "@nestjs/config";
import * as CacheStore from "cache-manager-ioredis";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
@Module({
  imports: [
    MatchesModule,
    UserTeamModule,
    UserTeamModule,
    TeamsModule,
    PlayersModule,
    AuthModule,
    UsersModule,
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get("EMAIL_HOST"),
          secure: false,
          auth: {
            user: config.get("EMAIL_USER"),
            pass: config.get("EMAIL_PASSWORD"),
          },
        },
      }),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot(),
    CacheModule.register({
      isGlobal: true,
      store: CacheStore,
      host: "localhost",
      port: process.env.REDIS,
      ttl: 60 * 60 * 6,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "uploads"),
    }),
  ],

  controllers: [],
  providers: [JwtAuthGuard],
})
export class AppModule {}
