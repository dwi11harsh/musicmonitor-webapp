import { atom } from "recoil";

export const searchBarState = atom<string>({
  key: "searchBarState",
  default: "",
});
