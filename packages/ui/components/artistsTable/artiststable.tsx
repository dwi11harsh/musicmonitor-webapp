import { useRecoilState, useRecoilValue } from "recoil";
import {
  BASE_URL,
  TableLoader,
  artistTabletState,
  chartDataState,
  drawerButtonState,
  getArtistsDataState,
  queryState,
  searchBarState,
} from "../../index";
import axios from "axios";
import { useEffect } from "react";
import { formatDateTimeForTimeOfPlay } from "../../utils";

export function ArtistsTable() {
  const searchString = useRecoilValue(searchBarState);
  const [drawerState, setDrawerState] = useRecoilState(drawerButtonState);
  const [queryName, setQueryName] = useRecoilState(queryState);
  const artistsData = useRecoilValue(getArtistsDataState);
  const [artistTabletInfo, setArtistTabletInfo] =
    useRecoilState(artistTabletState);
  const [chartData, setChartData] = useRecoilState(chartDataState);

  const handleRowClick = (artist_name: string) => {
    setQueryName(artist_name);
    setDrawerState((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Tablet Info
        const infoResponse = await axios.get(`${BASE_URL}/user/artist`, {
          params: {
            artist_name: queryName,
          },
        });
        setArtistTabletInfo(infoResponse.data.data);

        //Chart Data
        const dataResponse = await axios.get(`${BASE_URL}/user/artist-chart`, {
          params: {
            artist_name: queryName,
          },
        });
        const raw = dataResponse.data.data;
        const formattedResult = raw.map((item: any) => {
          return {
            value: item.value,
            date: formatDate(item.date),
          };
        });
        // console.log("ARTISTS TABLE ARRAY: ", raw);
        setChartData(formattedResult);
      } catch (e) {
        // console.log("error getting the information: ", e);
      }
    };

    if (queryName) {
      fetchData();
    }
  }, [queryName]);

  if (artistsData) {
    console.log("ARTISTS TABLE DATA: ", artistsData);
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
                <th scope="col" className="px-6 py-3">
                  No. of Tracks
                </th>
              </tr>
            </thead>
            <tbody>
              {artistsData
                .filter((item) => {
                  return searchString?.toLocaleLowerCase() === ""
                    ? item
                    : item.artists_name
                        .toLocaleLowerCase()
                        .includes(searchString);
                })
                .map((artist, index) => (
                  <tr
                    onClick={() => handleRowClick(artist.artists_name)}
                    key={index}
                    className=" bg-white border-b dark:bg-sky-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-sky-950"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {artist.rank}
                    </th>
                    <td className="px-6 py-4">{artist.artists_name}</td>
                    <td className="px-6 py-4">{artist.total_plays}</td>
                    <td className="px-6 py-4">
                      {formatDateTimeForTimeOfPlay(artist.first_play)}
                    </td>
                    <td className="px-6 py-4">
                      {formatDateTimeForTimeOfPlay(artist.last_play)}
                    </td>
                    <td className="px-6 py-4">{artist.count_tracks}</td>
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
