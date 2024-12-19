import { atom } from "recoil";

export const credentials = atom({
  key: "credentials",
  default: {
    email: "",
    password: "",
  },
});
