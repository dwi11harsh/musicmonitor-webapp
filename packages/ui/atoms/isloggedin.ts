import { RecoilState, atom } from "recoil";

interface EMAIL {
  isLoading: boolean;
  userEmail: null | string;
}

export const isLoggedIn = atom<EMAIL>({
  key: "isLoggedIn",
  default: {
    isLoading: true,
    userEmail: null,
  },
});
