import { GetResult } from "@prisma/client/runtime";
import { IUserProfileBase } from "./IUserProfile";

export interface IUserProfileRepository {
    save(user: IUserProfileBase): Promise<GetResult<IUserProfileBase, { [x: string]: () => unknown; }>>;
}
