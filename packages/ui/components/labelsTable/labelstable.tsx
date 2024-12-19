import { useRecoilState, useRecoilValue } from "recoil";
import {
  BASE_URL,
  TableLoader,
  chartDataState,
  drawerButtonState,
  getLabelsDataState,
  getSearchBarState,
  labelTabletState,
  queryState,
} from "../../index";
import { useEffect } from "react";
import axios from "axios";
import { formatDateTimeForTimeOfPlay } from "../../utils";

export function LabelsTable() {
  const searchString = useRecoilValue(getSearchBarState);
  const [drawerState, setDrawerState] = useRecoilState(drawerButtonState);
  const [queryName, setQueryName] = useRecoilState(queryState);
  const [labelsTableInfo, setLabelsTableInfo] =
    useRecoilState(labelTabletState);
  const labelsData = useRecoilValue(getLabelsDataState);
  const [chartData, setChartData] = useRecoilState(chartDataState);

  const handleRowClick = (label_name: string) => {
    setQueryName(label_name);
    setDrawerState((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // //Chart Data
        const dataResponse = await axios.get(`${BASE_URL}/user/label-chart`, {
          params: {
            label_name: queryName,
          },
        });
        const raw = dataResponse.data.data;
        const formattedResult = raw.map((item: any) => {
          return {
            value: item.value,
            date: formatDate(item.date),
          };
        });

        setChartData(formattedResult);
      } catch (e) {
        // console.log("error getting the information: ", e);
      }

      // Table info
      const labelResponse = await axios.get(`${BASE_URL}/user/label`, {
        params: {
          label_name: queryName,
        },
      });
      setLabelsTableInfo(labelResponse.data.data[0]);
    };

    if (queryName) {
      fetchData();
    }
  }, [queryName]);

  if (labelsData) {
    return (
      <div>
        <div className="sm:max-h-[540px] lg:max-h-full relative overflow-auto shadow-md sm:rounded-lg">
          <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-100">
            <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-sky-700 dark:text-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Rank
                </th>
                <th scope="col" className="px-6 py-3">
                  Label
                </th>
                <th scope="col" className="px-6 py-3">
                  Total Plays
                </th>
                <th scope="col" className="px-6 py-3">
                  First Play
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Play
                </th>
                <th scope="col" className="px-6 py-3">
                  No. of Tracks
                </th>
              </tr>
            </thead>
            <tbody>
              {labelsData
                .filter((item) => {
                  return searchString?.toLocaleLowerCase() === ""
                    ? item
                    : item.label.toLocaleLowerCase().includes(searchString);
                })
                .map((label, index) => (
                  <tr
                    onClick={() => {
                      handleRowClick(label.label);
                    }}
                    key={index}
                    className="bg-white border-b dark:bg-sky-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-sky-950"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {label.rank}
                    </th>
                    <td className="px-6 py-4">{label.label}</td>
                    <td className="px-6 py-4">{label.total_plays}</td>
                    <td className="px-6 py-4">
                      {formatDateTimeForTimeOfPlay(label.first_play)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDateTimeForTimeOfPlay(label.last_play)}
                    </td>
                    <td className="px-6 py-4">{label.count_tracks}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else return <TableLoader />;
}

function formatDate(inputString: string): string {
  const indexOfT = inputString.indexOf("T");

  if (indexOfT !== -1) {
    return inputString.slice(0, indexOfT);
  } else {
    // Handle the case where 'T' is not found in the string
    throw new Error("Invalid date string format");
  }
}
