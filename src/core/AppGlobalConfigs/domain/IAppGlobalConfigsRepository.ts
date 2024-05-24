import { GetResult } from "@prisma/client/runtime";
  import { IAppGlobalConfigsBase } from "./IAppGlobalConfigs";
  import { Filter } from "@/shared/Types/IFilter";
import { Nullable } from "@/shared/Types/TNullable";
  export interface IAppGlobalConfigsRepository {
      save(user: IAppGlobalConfigsBase): Promise<GetResult<IAppGlobalConfigsBase, { [x: string]: () => unknown; }>>;
      find(criteria: Filter<IAppGlobalConfigsBase>[]): Promise<Nullable<IAppGlobalConfigsBase>>;
  }
  