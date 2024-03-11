import { TUpdateUser } from "../../domain/IUserApplicationImplementations";

export const UpdateUser: TUpdateUser = (repository) => async (user) => {
  const { phoneNumber } = user;
  return repository.update(phoneNumber, user);
};
