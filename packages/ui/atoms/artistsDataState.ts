import { atom } from "recoil";

type Artists = {
  rank: number;
  artists_name: string;
  total_plays: string;
  first_play: string;
  last_play: string;
  count_tracks: number;
};

export const artistsDataState = atom<Artists[] | null>({
  key: "artistsDataState",
  default: null,
});
