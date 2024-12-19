import { atom } from "recoil";

export const countState = atom({
  key: "countState",
  default: {
    data: {
      venuesResult: "4",
      artistsResult: "28077",
      labelsResult: "16211",
      songsResult: "51371",
    },
  },
});
