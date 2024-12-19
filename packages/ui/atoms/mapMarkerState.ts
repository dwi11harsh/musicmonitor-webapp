import { atom } from "recoil";

export const mapMarkerState = atom({
  key: "mapMarkerState",
  default: [
    {
      id: 1,
      name: "London Cuts",
      position: { lat: 54.56265525323084, lng: -1.2226749612730854 },
    },
  ],
});
