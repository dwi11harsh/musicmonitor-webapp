// incoming string from database is the "yyyy-mm-dd hrs:min:sec" format which needs to be in "dd-mm-yyyy hrs:min:sec" format
export function formatDate(dateTime: string): string {
  const [datePart, timePart] = dateTime.split(" ");

  const [year, month, day] = datePart.split("-");

  const formattedDate = `${day}-${month}-${year}`;

  return `${formattedDate} ${timePart}`;
}

// 2023-12-17T08:59:15.000Z

export const formatDateTimeForTimeOfPlay = (dateString: string): string => {
  const date = new Date(dateString);
  return `${String(date.getUTCDate()).padStart(2, "0")}-${String(
    date.getUTCMonth() + 1
  ).padStart(2, "0")}-${date.getUTCFullYear()} ${String(
    date.getUTCHours()
  ).padStart(2, "0")}:${String(date.getUTCMinutes()).padStart(2, "0")}:${String(
    date.getUTCSeconds()
  ).padStart(2, "0")}`;
};
