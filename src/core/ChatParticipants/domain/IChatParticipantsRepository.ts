import { GetResult } from "@prisma/client/runtime";
  import { IChatParticipantsBase } from "./IChatParticipants";
  import { Filter } from "@/shared/Types/IFilter";
import { Nullable } from "@/shared/Types/TNullable";
  export interface IChatParticipantsRepository {
      save(user: IChatParticipantsBase): Promise<GetResult<IChatParticipantsBase, { [x: string]: () => unknown; }>>;
      find(criteria: Filter<IChatParticipantsBase>[]): Promise<Nullable<IChatParticipantsBase>>;
  }
  