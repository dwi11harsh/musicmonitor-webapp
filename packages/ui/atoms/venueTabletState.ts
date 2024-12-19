import { atom } from "recoil";

interface VenueTablet {
  venue: string;
  region: string;
  top_artist: string;
  top_track: string;
  joined: string;
  latitude: string;
  longitude: string;
  count: string;
}

export const venueTabletState = atom<VenueTablet | null>({
  key: "venueTabletState",
  default: null,
});
