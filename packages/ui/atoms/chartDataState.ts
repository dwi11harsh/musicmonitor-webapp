import { atom } from "recoil";

export interface Data {
  date: string;
  value: number;
}

export const chartDataState = atom<Data[]>({
  key: "chartDataState",
  default: [
    { date: "2020-01-01", value: 0 },
    { date: "2020-02-01", value: 5 },
    { date: "2020-03-01", value: 10 },
    { date: "2020-04-01", value: 30 },
    { date: "2020-05-01", value: 35 },
    { date: "2020-06-01", value: 45 },
    { date: "2020-07-01", value: 40 },
    { date: "2020-08-01", value: 42 },
    { date: "2020-09-01", value: 50 },
  ],
});
