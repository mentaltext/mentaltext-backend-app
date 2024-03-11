import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "@/core/User/domain/IUserRepository";
import { Filter, operatorEnum } from "@/shared/Types/IFilter";
import { IUserBase } from "../../domain/IUser";

export const PrismaUserRepository = (
  client: PrismaClient
): IUserRepository => ({
  async save(user) {
    const nUser = await client.user.upsert({
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
  },
  async find(criteria) {
    if (!Array.isArray(criteria) || !criteria.every(isFilter)) {
      throw new Error("Invalid input: criteria must be an array of Filters");
    }
    const user = await client.user.findFirst({
      where: criteriaConverter(criteria)
    });

    if (!user) {
      return null;
    }
    return user;
  },
  update(phone: string, user: Partial<IUserBase>) {
    return client.user.update({
      where: {
        phoneNumber: phone,
      },
      data: {
        ...user,
      },
    });
  }
});

const isFilter = (obj: Filter<IUserBase>): obj is Filter<IUserBase> =>
  typeof obj === "object" &&
  obj !== null &&
  typeof obj.field === "string" &&
  typeof obj.value === "string" &&
  (obj.operator === operatorEnum.EQUAL);

const criteriaConverter = (criteria: Filter<IUserBase>[]) => {
  return criteria.reduce(
    (acc, filter) => ({
      ...acc,
      [filter.field]: filter.value,
    }),
    {}
  );
};
