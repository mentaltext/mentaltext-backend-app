import { PrismaClient } from "@prisma/client";
  import { IChatRepository } from "@/core/Chat/domain/IChatRepository";
  import { Filter, operatorEnum } from "@/shared/Types/IFilter";
import { IChatBase } from "../../domain/IChat";

  export const PrismaChatRepository = (
    client: PrismaClient
  ): IChatRepository => ({
    async save(user) {
      const nUser = await client.chat.upsert({
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
      const Chat = await client.chat.findFirst({
        where: criteriaConverter(criteria)
      });

      if (!Chat) {
        return null;
      }
      return Chat;
    },
  });


const isFilter = (obj: Filter<IChatBase>): obj is Filter<IChatBase> =>
typeof obj === "object" &&
obj !== null &&
typeof obj.field === "string" &&
typeof obj.value === "string" &&
(obj.operator === operatorEnum.EQUAL);

const criteriaConverter = (criteria: Filter<IChatBase>[]) => {
return criteria.reduce(
  (acc, filter) => ({
    ...acc,
    [filter.field]: filter.value,
  }),
  {}
);
};

  