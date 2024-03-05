import { TUpdateUser } from "../../domain/IUserApplicationImplementations";

export const UpdateUser: TUpdateUser = (repository) => async (user) => {
  const { phoneCode } = user;
  return repository.update(phoneCode, user);
};
