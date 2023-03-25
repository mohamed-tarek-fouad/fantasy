import { PrismaService } from "../prisma.service";
import {
  Injectable,
  HttpException,
  HttpStatus,
  Inject,
  CACHE_MANAGER,
} from "@nestjs/common";
import { Cache } from "cache-manager";
@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async allUsers() {
    try {
      const isCached = await this.cacheManager.get("users");
      const user = isCached;
      if (isCached) {
        return { user, message: "fetched all users successfully" };
      }
      const users = await this.prisma.users.findMany({});
      if (users.length === 0) {
        throw new HttpException("user does'nt exist", HttpStatus.BAD_REQUEST);
      }
      await this.cacheManager.set("users", user);
      return { user: users, message: "fetched all users successfully" };
    } catch (err) {
      return err;
    }
  }

  async userById(id: string) {
    try {
      const isCached: object = await this.cacheManager.get(`user${id}`);
      const user = isCached;
      if (isCached) {
        return { user, message: "fetched all users successfully" };
      }

      const userFound = await this.prisma.users.findUnique({
        where: {
          id: parseInt(id),
        },
      });
      if (!user) {
        throw new HttpException(
          "this user does'nt exist",
          HttpStatus.BAD_REQUEST,
        );
      }

      delete userFound.password;
      await this.cacheManager.set(`user${id}`, {
        user: userFound,
      });
      return { ...user, message: "user fetched successfully" };
    } catch (err) {
      return err;
    }
  }
}
