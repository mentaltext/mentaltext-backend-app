import { GetResult } from "@prisma/client/runtime";
  import { IChatBase } from "./IChat";
  import { Filter } from "@/shared/Types/IFilter";
import { Nullable } from "@/shared/Types/TNullable";
  export interface IChatRepository {
      save(user: IChatBase): Promise<GetResult<IChatBase, { [x: string]: () => unknown; }>>;
      find(criteria: Filter<IChatBase>[]): Promise<Nullable<IChatBase>>;
  }
  