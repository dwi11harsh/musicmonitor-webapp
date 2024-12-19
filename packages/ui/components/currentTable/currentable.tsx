import { loading } from "../../atoms/loading";
import {
  VenuesTable,
  ArtistsTable,
  LabelsTable,
  SongsTable,
  getTableState,
  TableLoader,
} from "../../index";
import { useRecoilState, useRecoilValue } from "recoil";
export const CurrentTable = () => {
  const currentTable = useRecoilValue(getTableState);
  const [tempLoading, setTempLoading] = useRecoilState(loading);

  const getTableComponent = () => {
    switch (currentTable) {
      case "venuestable":
        return <VenuesTable />;
      case "artiststable":
        return <ArtistsTable />;
      case "labelstable":
        return <LabelsTable />;
      case "songstable":
        return <SongsTable />;
      default:
        return null;
    }
  };
  if (tempLoading)
    return (
      <div>
        <TableLoader />
      </div>
    );
  else return <div className="w-full h-full">{getTableComponent()}</div>;
};
