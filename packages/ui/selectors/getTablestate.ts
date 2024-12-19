import { selector } from "recoil";
import { tableState } from "../atoms/tablestate";

export const getTableState = selector({
  key: "getTableState",
  get: ({ get }) => {
    const currTable = get(tableState);
    return currTable;
  },
});
