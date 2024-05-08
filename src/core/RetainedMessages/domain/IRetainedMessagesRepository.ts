import { GetResult } from "@prisma/client/runtime";
  import { IRetainedMessagesBase } from "./IRetainedMessages";
  import { Filter } from "@/shared/Types/IFilter";
import { Nullable } from "@/shared/Types/TNullable";
  export interface IRetainedMessagesRepository {
      save(user: IRetainedMessagesBase): Promise<GetResult<IRetainedMessagesBase, { [x: string]: () => unknown; }>>;
      find(criteria: Filter<IRetainedMessagesBase>[]): Promise<Nullable<IRetainedMessagesBase>>;
  }
