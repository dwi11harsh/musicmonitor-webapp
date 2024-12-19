import { atom } from "recoil";

interface Venues {
  venue: string;
  venue_type: string;
  song: string;
  artist: string;
  time_of_play: string;
}

export const venuesDataState = atom<Venues[]>({
  key: "venuesDataState",
  default: [],
});
