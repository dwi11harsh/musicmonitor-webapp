import { selector } from "recoil";
import { countState } from "../atoms/countState";

export const getCountState = selector({
  key: "getCountState",
  get: ({ get }) => {
    const currCountState = get(countState);
    return currCountState;
  },
});
