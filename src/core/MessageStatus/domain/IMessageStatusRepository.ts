import { GetResult } from "@prisma/client/runtime";
  import { IMessageStatusBase } from "./IMessageStatus";
  import { Filter } from "@/shared/Types/IFilter";
import { Nullable } from "@/shared/Types/TNullable";
  export interface IMessageStatusRepository {
      save(user: IMessageStatusBase): Promise<GetResult<IMessageStatusBase, { [x: string]: () => unknown; }>>;
      find(criteria: Filter<IMessageStatusBase>[]): Promise<Nullable<IMessageStatusBase>>;
  }
  