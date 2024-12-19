import { atom } from "recoil";
// only for song information tablet
// song query does not return the name of song so this is used to show on information tablet
export const currentSongState = atom<string | null>({
  key: "currentSongState",
  default: null,
});
