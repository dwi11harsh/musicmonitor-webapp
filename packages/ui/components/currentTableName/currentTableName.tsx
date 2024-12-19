import { useRecoilValue } from "recoil";
import { getTableState } from "../../selectors/getTablestate";

export function CurrentTableName() {
  const currentTable = useRecoilValue(getTableState);

  switch (currentTable) {
    case "venuestable":
      return <>Venues</>;
    case "artiststable":
      return <>Artists</>;
    case "labelstable":
      return <>Labels</>;
    case "songstable":
      return <>Songs</>;
    default:
      return null;
  }
}
