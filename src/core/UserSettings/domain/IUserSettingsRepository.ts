import { GetResult } from "@prisma/client/runtime";
import { IUserSettingsBase } from "./IUserSettingsSettingsProfile";

export interface IUserSettingsRepository {
    save(user: IUserSettingsBase): Promise<GetResult<IUserSettingsBase, { [x: string]: () => unknown; }>>;
}
