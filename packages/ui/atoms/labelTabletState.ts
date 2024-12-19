import { atom } from "recoil";

export interface LabelTablet {
  label: string;
  title: string;
  artists_name: string;
  town: string;
  venue_type: string;
  count: string;
}

export const labelTabletState = atom<LabelTablet | null>({
  key: "labelTabletState",
  default: null,
});
