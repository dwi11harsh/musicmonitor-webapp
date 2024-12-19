import { atom } from "recoil";

interface ArtistTablet {
  top_artist: string;
  top_song: string;
  top_album: string;
  region: string;
  top_venue_type: string;
  top_venues: string;
  count: string;
}

export const artistTabletState = atom<ArtistTablet | null>({
  key: "artistTabletState",
  default: null,
});
