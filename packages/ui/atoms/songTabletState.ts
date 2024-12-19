import { atom } from "recoil";

interface SongTablet {
  artists_name: string;
  release_date: string;
  label: string;
  isrc: string;
  town: string;
  premises_name: string;
}

export const songTabletState = atom<SongTablet | null>({
  key: "songTabletState",
  default: null,
});
