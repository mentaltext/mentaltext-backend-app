import { CommonTokenStructure } from "../Types/Jwt";

export const hasExpiredToken = (token: CommonTokenStructure): boolean => {
  const currentDate = new Date().getTime();
  return token.exp <= currentDate;
};
