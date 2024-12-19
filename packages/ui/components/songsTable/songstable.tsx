import { useRecoilState, useRecoilValue } from "recoil";
import {
  BASE_URL,
  TableLoader,
  chartDataState,
  currentSongState,
  drawerButtonState,
  getSearchBarState,
  getSongsDataState,
  queryState,
} from "../../index";
import { useEffect } from "react";
import axios from "axios";
import { songTabletState } from "../../atoms/songTabletState";
import { formatDateTimeForTimeOfPlay } from "../../utils";

export function SongsTable() {
  const searchString = useRecoilValue(getSearchBarState);
  const [drawerState, setDrawerState] = useRecoilState(drawerButtonState);
  const [queryName, setQueryName] = useRecoilState(queryState);
  const [songTabletInfo, setSongTabletInfo] = useRecoilState(songTabletState);
  const [chartData, setChartData] = useRecoilState(chartDataState);
  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);

  const songsData = useRecoilValue(getSongsDataState);

  const handleRowClick = (mm_song_id: string) => {
    setQueryName(mm_song_id);
    setDrawerState((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // More Info
        const result = await axios.get(`${BASE_URL}/user/song`, {
          params: {
            mm_song_id: queryName,
          },
        });
        setSongTabletInfo(result.data.data[0]);

        // Chart Data
        const chartData = await axios.get(`${BASE_URL}/user/song-chart`, {
          params: {
            mm_song_id: queryName,
          },
        });
        const raw = chartData.data.data;
        const formattedResult = raw.map((item: any) => {
          return {
            value: item.value,
            date: formatDate(item.date),
          };
        });
        setChartData(formattedResult);
      } catch (e: any) {
        // console.log("error in getting the information: ", e.message);
      }
    };

    if (queryName) {
      fetchData();
    }
  }, [queryName]);

  if (songsData) {
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
                  Song
                </th>
                <th scope="col" className="px-6 py-3">
                  Artist
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
              </tr>
            </thead>
            <tbody>
              {songsData
                .filter((item) => {
                  return searchString?.toLocaleLowerCase() === ""
                    ? item
                    : item.title.toLocaleLowerCase().includes(searchString);
                })
                .map((song, index) => (
                  <tr
                    onClick={() => {
                      setCurrentSong(song.title);
                      handleRowClick(song.mm_song_id);
                    }}
                    key={index}
                    className=" bg-white border-b dark:bg-sky-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-sky-950"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {song.rank}
                    </th>
                    <td className="px-6 py-4">{song.title}</td>
                    <td className="px-6 py-4">{song.artists_name}</td>
                    <td className="px-6 py-4">{song.total_plays}</td>
                    <td className="px-6 py-4">
                      {formatDateTimeForTimeOfPlay(song.first_play)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDateTimeForTimeOfPlay(song.last_play)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  } else {
    return <TableLoader />;
  }
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
