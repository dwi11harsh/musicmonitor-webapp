// incoming string from database is the "yyyy-mm-dd hrs:min:sec" format which needs to be in "dd-mm-yyyy hrs:min:sec" format
export function formatDateTimeForTimeOfPlay(dateTime: string): string {
  const [datePart, timePart] = dateTime.split(" ");

  const [year, month, day] = datePart.split("-");

  const formattedDate = `${day}-${month}-${year}`;

  return `${formattedDate} ${timePart}`;
}
