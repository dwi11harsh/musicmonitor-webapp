import { useEffect, useRef, useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";

import format from "date-fns/format";
import { addDays } from "date-fns";
import { useRecoilState } from "recoil";
import { fromDate } from "../../atoms/fromDate";
import { toDate } from "../../atoms/toDate";

export function DatePicker() {
  // date state
  const [fdate, setFdate] = useRecoilState(fromDate);
  const [tdate, setTdate] = useRecoilState(toDate);
  const [range, setRange] = useState([
    {
      startDate: new Date(fdate),
      endDate: new Date(tdate),
      key: "selection",
    },
  ]);

  // open close
  const [open, setOpen] = useState(false);

  // get the target element to toggle
  const refOne = useRef(null);

  useEffect(() => {
    // event listeners
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  // hide dropdown on ESC press
  const hideOnEscape = (e: any) => {
    // console.log(e.key)
    if (e.key === "Escape") {
      setOpen(false);
    }
  };

  // Hide dropdown on outside click
  const hideOnClickOutside = (e: any) => {
    // console.log(refOne.current)
    // console.log(e.target)
    //@ts-ignore
    if (refOne.current && !refOne.current.contains(e.target)) {
      setOpen(false);
    }
  };

  return (
    <div className="inline-block relative">
      <input
        value={`${format(new Date(fdate), "dd/MM/yyyy")} to ${format(
          new Date(tdate),
          "dd/MM/yyyy"
        )}`}
        readOnly
        className="block w-full p-3 px-10 mr-4 text-sm shadow-xl text-gray-900 border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-sky-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        onClick={() => setOpen((open) => !open)}
      />

      <div ref={refOne}>
        {open && (
          <DateRange
            onChange={(item) => {
              //@ts-ignore
              setRange([item.selection]);

              setFdate(format(item.selection.startDate as Date, "yyyy-MM-dd"));
              // console.log("fdate from date picker, ", fdate);
              setTdate(format(item.selection.endDate as Date, "yyyy-MM-dd"));
            }}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction="horizontal"
            className="calendarElement ml-52 mt-3"
            maxDate={addDays(new Date(), 1)}
          />
        )}
      </div>
    </div>
  );
}
