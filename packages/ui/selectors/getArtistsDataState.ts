import { selector } from "recoil";
import { artistsDataState } from "../atoms/artistsDataState";

export const getArtistsDataState = selector({
  key: "getArtistsDataState",
  get: ({ get }) => {
    const currArtistsDataState = get(artistsDataState);
    return currArtistsDataState;
  },
});
