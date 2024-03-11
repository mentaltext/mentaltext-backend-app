export const ensurePhonePrefix = (phoneNumber: string): string => {
  if (!phoneNumber.startsWith("+")) {
    return `+${phoneNumber}`;
  }
  return phoneNumber;
};
