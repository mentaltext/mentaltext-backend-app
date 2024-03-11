import { PrismaClient } from "@prisma/client";
import { IUserProfileRepository } from "@/core/UserProfile/domain/IUserProfileRepository";

export const PrismaUserProfileRepository = (
  client: PrismaClient
): IUserProfileRepository => ({
  async save(user) {
    const nUser = await client.userProfile.upsert({
      where: {
        phoneNumber: user.phoneNumber,
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
