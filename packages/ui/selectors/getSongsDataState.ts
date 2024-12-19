import { selector } from "recoil";
import { songsDataState } from "../atoms/songsDataState";

export const getSongsDataState = selector({
  key: "getSongsDataState",
  get: ({ get }) => {
    const currSongsDataState = get(songsDataState);
    return currSongsDataState;
  },
});
