import { PrismaClient } from "@prisma/client";
import { IUserSettingsRepository } from "@/core/UserSettings/domain/IUserSettingsRepository";

export const PrismaUserSettingsRepository = (
  client: PrismaClient
): IUserSettingsRepository => ({
  async save(user) {
    const nUser = await client.userSettings.upsert({
      where: {
        userId: user.userId,
      },
      update: {
        ...user,
      },
      create: {
        ...user,
      },
    });

    return nUser;
  }
});
