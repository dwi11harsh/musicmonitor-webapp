import { DateRangePicker } from "rsuite";
import { useRecoilState } from "recoil";
import { fromDate, toDate } from "../../index";

export function Calender() {
  const [fDate, setFDate] = useRecoilState(fromDate);
  const [tDate, setTDate] = useRecoilState(toDate);

  const handleClear = () => {
    let d = new Date();
    const t_date = d.toISOString().split("T")[0];
    setFDate("2023-12-01");
    setTDate(t_date);
  };

  const handleSelection = (rawDate: Date[]) => {
    const formatOptions: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };

    // console.log("raw date[0]", rawDate[0]);
    const from = new Date(rawDate[0])
      .toLocaleDateString("hi-IN", formatOptions)
      .replace(/\//g, "-");
    const to = new Date(rawDate[1])
      .toLocaleDateString("hi-IN", formatOptions)
      .replace(/\//g, "-");

    setFDate(from);
    setTDate(to);
    // console.log("FROM DATE:     ", from);
    // console.log("TO DATE:        ", to);
  };

  return (
    <>
      <DateRangePicker
        format="dd-MM-yyyy"
        limitStartYear={1800}
        onClean={handleClear}
        onOk={handleSelection}
        placeholder="DD-MM-YYYY ~ DD-MM-YYYY"
        appearance="default"
      />
    </>
  );
}

// setFDate(new Date(rawDate[0]));
// setTDate(new Date(rawDate[1]));
