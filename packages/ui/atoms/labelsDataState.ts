import { atom } from "recoil";

type Labels = {
  rank: number;
  label: string;
  total_plays: string;
  first_play: string;
  last_play: string;
  count_tracks: number;
};

export const labelsDataState = atom<Labels[] | null>({
  key: "labelsDataState",
  default: null,
});
