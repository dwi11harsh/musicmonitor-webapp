import { atom } from "recoil";

export const page = atom<number>({
  key: "page",
  default: 1,
});
