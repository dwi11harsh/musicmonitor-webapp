import { atom } from "recoil";

type Songs = {
  rank: number;
  title: string;
  mm_song_id: string;
  artists_name: string;
  total_plays: string;
  first_play: string;
  last_play: string;
  total_play_duration_mins: string;
};

export const songsDataState = atom<Songs[] | null>({
  key: "songsDataState",
  default: null,
});
