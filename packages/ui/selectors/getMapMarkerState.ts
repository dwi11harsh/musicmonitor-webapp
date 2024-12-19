import { selector } from "recoil";
import { mapMarkerState } from "../atoms/mapMarkerState";

export const getMapMarkerState = selector({
  key: "getMapMarkerState",
  get: ({ get }) => {
    const currMarkerState = get(mapMarkerState);
    return currMarkerState;
  },
});
