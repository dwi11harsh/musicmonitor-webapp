import { selector } from "recoil";
import { fromDate } from "../atoms/fromDate";

export const getFromDateState = selector({
  key: "getFromDateState",
  get: ({ get }) => {
    const currFromDateState = get(fromDate);
    return currFromDateState;
  },
});
