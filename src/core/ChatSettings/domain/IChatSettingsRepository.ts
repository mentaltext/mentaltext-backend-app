import { GetResult } from "@prisma/client/runtime";
  import { IChatSettingsBase } from "./IChatSettings";
  import { Filter } from "@/shared/Types/IFilter";
import { Nullable } from "@/shared/Types/TNullable";
  export interface IChatSettingsRepository {
      save(user: IChatSettingsBase): Promise<GetResult<IChatSettingsBase, { [x: string]: () => unknown; }>>;
      find(criteria: Filter<IChatSettingsBase>[]): Promise<Nullable<IChatSettingsBase>>;
  }
  