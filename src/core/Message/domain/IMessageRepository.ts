import { GetResult } from "@prisma/client/runtime";
  import { IMessageBase } from "./IMessage";
  import { Filter } from "@/shared/Types/IFilter";
import { Nullable } from "@/shared/Types/TNullable";
  export interface IMessageRepository {
      save(user: IMessageBase): Promise<GetResult<IMessageBase, { [x: string]: () => unknown; }>>;
      find(criteria: Filter<IMessageBase>[]): Promise<Nullable<IMessageBase>>;
  }
