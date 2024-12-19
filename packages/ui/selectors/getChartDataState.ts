// getChartDataState.ts
import { selector } from "recoil";
import { chartDataState} from "../atoms/chartDataState";

export const getChartDataState:any = selector({
  key: "getChartDataState",
  get: ({ get }) => {
    const currChartDataState = get(chartDataState);
    return currChartDataState;
  },
});
