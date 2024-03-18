import { PrismaClient } from "@prisma/client";
  import { IMessageStatusRepository } from "@/core/MessageStatus/domain/IMessageStatusRepository";
  import { Filter, operatorEnum } from "@/shared/Types/IFilter";
import { IMessageStatusBase } from "../../domain/IMessageStatus";

  export const PrismaMessageStatusRepository = (
    client: PrismaClient
  ): IMessageStatusRepository => ({
    async save(user) {
      const nUser = await client.messageStatus.create({
        data: {
          ...user,
        }
      });

      return nUser;
    },
    async find(criteria) {
      if (!Array.isArray(criteria) || !criteria.every(isFilter)) {
        throw new Error("Invalid input: criteria must be an array of Filters");
      }
      const MessageStatus = await client.messageStatus.findFirst({
        where: criteriaConverter(criteria)
      });

      if (!MessageStatus) {
        return null;
      }
      return MessageStatus;
    },
  });


const isFilter = (obj: Filter<IMessageStatusBase>): obj is Filter<IMessageStatusBase> =>
typeof obj === "object" &&
obj !== null &&
typeof obj.field === "string" &&
typeof obj.value === "string" &&
(obj.operator === operatorEnum.EQUAL);

const criteriaConverter = (criteria: Filter<IMessageStatusBase>[]) => {
return criteria.reduce(
  (acc, filter) => ({
    ...acc,
    [filter.field]: filter.value,
  }),
  {}
);
};

