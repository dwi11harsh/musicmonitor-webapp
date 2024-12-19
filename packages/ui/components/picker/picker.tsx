import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export function Picker() {
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
  };
  return (
    <Datepicker
      value={value}
      onChange={handleValueChange}
      showShortcuts={true}
    />
  );
}
