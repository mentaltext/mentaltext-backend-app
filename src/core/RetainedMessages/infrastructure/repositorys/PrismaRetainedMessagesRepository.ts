import { PrismaClient } from "@prisma/client";
  import { IRetainedMessagesRepository } from "@/core/RetainedMessages/domain/IRetainedMessagesRepository";
  import { Filter, operatorEnum } from "@/shared/Types/IFilter";
import { IRetainedMessagesBase } from "../../domain/IRetainedMessages";

  export const PrismaRetainedMessagesRepository = (
    client: PrismaClient
  ): IRetainedMessagesRepository => ({
    async save(user) {
      const nUser = await client.retainedMessages.upsert({
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
      const RetainedMessages = await client.retainedMessages.findFirst({
        where: criteriaConverter(criteria)
      });

      if (!RetainedMessages) {
        return null;
      }
      return RetainedMessages;
    },
  });


const isFilter = (obj: Filter<IRetainedMessagesBase>): obj is Filter<IRetainedMessagesBase> =>
typeof obj === "object" &&
obj !== null &&
typeof obj.field === "string" &&
typeof obj.value === "string" &&
(obj.operator === operatorEnum.EQUAL);

const criteriaConverter = (criteria: Filter<IRetainedMessagesBase>[]) => {
return criteria.reduce(
  (acc, filter) => ({
    ...acc,
    [filter.field]: filter.value,
  }),
  {}
);
};

