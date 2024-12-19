import { atom } from "recoil";

let d = new Date();
const t_date = d.toISOString().split("T")[0];

export const toDate = atom<string>({
  key: "toDate",
  default: t_date,
});
