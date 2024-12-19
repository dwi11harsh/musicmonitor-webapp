import { selector } from "recoil";
import { labelsDataState } from "../atoms/labelsDataState";

export const getLabelsDataState = selector({
  key: "getLabelsDataState",
  get: ({ get }) => {
    const currLabelsDataState = get(labelsDataState);
    return currLabelsDataState;
  },
});
