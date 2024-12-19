import { selector } from "recoil";
import { drawerButtonState } from "../atoms/drawerstate";

export const getDrawerButtonState = selector({
  key: "getDrawerState",
  get: ({ get }) => {
    const currButtonState = get(drawerButtonState);
    return currButtonState;
  },
});
