import { PrismaClient } from "@prisma/client";
import { IAppGlobalConfigsRepository } from "@/core/AppGlobalConfigs/domain/IAppGlobalConfigsRepository";
import { Filter, operatorEnum } from "@/shared/Types/IFilter";
import { IAppGlobalConfigsBase } from "../../domain/IAppGlobalConfigs";
import { criteriaConverter } from "@/shared/utils/criteriaConverter";

export const PrismaAppGlobalConfigsRepository = (
  client: PrismaClient
): IAppGlobalConfigsRepository => ({
  async save(user) {
    const nUser = await client.appGlobalConfigs.upsert({
      where: {
        id: user.id,
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
    const AppGlobalConfigs = await client.appGlobalConfigs.findFirst({
      where: criteriaConverter(criteria),
    });

    if (!AppGlobalConfigs) {
      return null;
    }
    return AppGlobalConfigs;
  },
});

const isFilter = (
  obj: Filter<IAppGlobalConfigsBase>
): obj is Filter<IAppGlobalConfigsBase> =>
  typeof obj === "object" &&
  obj !== null &&
  typeof obj.field === "string" &&
  (typeof obj.value === "string" || typeof obj.value === "number") &&
  (obj.operator === operatorEnum.EQUAL ||
    obj.operator === operatorEnum.GREATER_THAN ||
    obj.operator === operatorEnum.GREATER_THAN_OR_EQUAL ||
    obj.operator === operatorEnum.LESS_THAN ||
    obj.operator === operatorEnum.LESS_THAN_OR_EQUAL ||
    obj.operator === operatorEnum.NOT_EQUAL);
