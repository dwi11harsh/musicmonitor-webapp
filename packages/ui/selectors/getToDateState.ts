import { selector } from "recoil";
import { toDate } from "../atoms/toDate";

export const getToDateState = selector({
  key: "getToDateState",
  get: ({ get }) => {
    const currToDateState = get(toDate);
    return currToDateState;
  },
});
