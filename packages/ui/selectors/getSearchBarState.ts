import { selector } from "recoil";
import { searchBarState } from "../atoms/searchBarState";

export const getSearchBarState = selector({
  key: "getSearchBarState",
  get: ({ get }) => {
    const currSearchBarState = get(searchBarState);
    return currSearchBarState;
  },
});
