import { customAlphabet, nanoid } from "nanoid";

export const getId = customAlphabet("1234567890", 6);
export const getCliendId = nanoid;
