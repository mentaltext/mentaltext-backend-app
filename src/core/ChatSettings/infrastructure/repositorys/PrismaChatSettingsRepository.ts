import { PrismaClient } from "@prisma/client";
  import { IChatSettingsRepository } from "@/core/ChatSettings/domain/IChatSettingsRepository";
  import { Filter, operatorEnum } from "@/shared/Types/IFilter";
import { IChatSettingsBase } from "../../domain/IChatSettings";

  export const PrismaChatSettingsRepository = (
    client: PrismaClient
  ): IChatSettingsRepository => ({
    async save(user) {
      const nUser = await client.chatSettings.upsert({
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
      const ChatSettings = await client.chatSettings.findFirst({
        where: criteriaConverter(criteria)
      });

      if (!ChatSettings) {
        return null;
      }
      return ChatSettings;
    },
  });


const isFilter = (obj: Filter<IChatSettingsBase>): obj is Filter<IChatSettingsBase> =>
typeof obj === "object" &&
obj !== null &&
typeof obj.field === "string" &&
typeof obj.value === "string" &&
(obj.operator === operatorEnum.EQUAL);

const criteriaConverter = (criteria: Filter<IChatSettingsBase>[]) => {
return criteria.reduce(
  (acc, filter) => ({
    ...acc,
    [filter.field]: filter.value,
  }),
  {}
);
};

