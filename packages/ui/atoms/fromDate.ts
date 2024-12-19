import { atom } from "recoil";

export const fromDate = atom<string>({
  key: "fromDate",
  default: "2023-12-01",
});
