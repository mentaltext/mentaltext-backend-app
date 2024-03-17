import { PrismaClient } from "@prisma/client";
  import { IChatParticipantsRepository } from "@/core/ChatParticipants/domain/IChatParticipantsRepository";
  import { Filter, operatorEnum } from "@/shared/Types/IFilter";
import { IChatParticipantsBase } from "../../domain/IChatParticipants";

  export const PrismaChatParticipantsRepository = (
    client: PrismaClient
  ): IChatParticipantsRepository => ({
    async save(user) {
      const nUser = await client.chatParticipants.create({
        data: {
          ...user,
        },
      });

      return nUser;
    },
    async find(criteria) {
      if (!Array.isArray(criteria) || !criteria.every(isFilter)) {
        throw new Error("Invalid input: criteria must be an array of Filters");
      }
      const ChatParticipants = await client.chatParticipants.findFirst({
        where: criteriaConverter(criteria)
      });

      if (!ChatParticipants) {
        return null;
      }
      return ChatParticipants;
    },
  });


const isFilter = (obj: Filter<IChatParticipantsBase>): obj is Filter<IChatParticipantsBase> =>
typeof obj === "object" &&
obj !== null &&
typeof obj.field === "string" &&
typeof obj.value === "string" &&
(obj.operator === operatorEnum.EQUAL);

const criteriaConverter = (criteria: Filter<IChatParticipantsBase>[]) => {
return criteria.reduce(
  (acc, filter) => ({
    ...acc,
    [filter.field]: filter.value,
  }),
  {}
);
};

