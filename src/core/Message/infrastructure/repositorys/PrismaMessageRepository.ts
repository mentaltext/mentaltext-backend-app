import { PrismaClient } from "@prisma/client";
  import { IMessageRepository } from "@/core/Message/domain/IMessageRepository";
  import { Filter, operatorEnum } from "@/shared/Types/IFilter";
import { IMessageBase } from "../../domain/IMessage";

  export const PrismaMessageRepository = (
    client: PrismaClient
  ): IMessageRepository => ({
    async save(user) {
      const nUser = await client.message.upsert({
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
      const Message = await client.message.findFirst({
        where: criteriaConverter(criteria)
      });

      if (!Message) {
        return null;
      }
      return Message;
    },
  });


const isFilter = (obj: Filter<IMessageBase>): obj is Filter<IMessageBase> =>
typeof obj === "object" &&
obj !== null &&
typeof obj.field === "string" &&
typeof obj.value === "string" &&
(obj.operator === operatorEnum.EQUAL);

const criteriaConverter = (criteria: Filter<IMessageBase>[]) => {
return criteria.reduce(
  (acc, filter) => ({
    ...acc,
    [filter.field]: filter.value,
  }),
  {}
);
};

