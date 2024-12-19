import { useRecoilState, useRecoilValue } from "recoil";
import {
  BASE_URL,
  TableLoader,
  drawerButtonState,
  getSearchBarState,
  mapMarkerState,
  queryState,
  venuesDataState,
} from "../../index";
import { venueTabletState } from "../../atoms/venueTabletState";
import { useEffect } from "react";
import axios from "axios";
import { formatDateTimeForTimeOfPlay } from "../../utils";

export function VenuesTable() {
  const searchString = useRecoilValue(getSearchBarState);
  const [drawerState, setDrawerState] = useRecoilState(drawerButtonState);
  const [queryName, setQueryName] = useRecoilState(queryState);
  const [venuesData, setVenuesData] = useRecoilState(venuesDataState);
  const [venueTabletInfo, setVenueTabletInfo] =
    useRecoilState(venueTabletState);
  const [mapMarker, setMapMarker] = useRecoilState(mapMarkerState);

  const handleRowClick = (venue_name: string) => {
    setQueryName(venue_name);
    setDrawerState((prevState) => !prevState);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // More Info
        const result = await axios.get(`${BASE_URL}/user/venue`, {
          params: {
            venue_name: queryName,
          },
        });
        setVenueTabletInfo(result.data.data[0]);
        if (venueTabletInfo) {
          setMapMarker([
            {
              id: 1,
              name: venueTabletInfo.venue,
              position: {
                lat: +venueTabletInfo.latitude,
                lng: +venueTabletInfo.longitude,
              },
            },
          ]);
          // console.log("markers: ", mapMarker);
        }
      } catch (e: any) {
        // console.log("error in getting the information: ", e.message);
      }
    };
    fetchData();
  }, [queryName]);

  if (venuesData) {
    return (
      <div className="sm:max-h-[540px] lg:max-h-full relative overflow-auto shadow-md sm:rounded-lg">
        <table className="w-full h-full text-sm text-left text-gray-500 dark:text-gray-100">
          <thead className="sticky top-0 z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-sky-700 dark:text-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Venue
              </th>
              <th scope="col" className="px-6 py-3">
                Song
              </th>
              <th scope="col" className="px-6 py-3">
                Artist
              </th>
              <th scope="col" className="px-6 py-3">
                Venue Type
              </th>
              <th scope="col" className="px-6 py-3">
                Time of Play
              </th>
            </tr>
          </thead>
          <tbody>
            {venuesData
              .filter((item) => {
                return searchString?.toLocaleLowerCase() === ""
                  ? item
                  : item.venue.toLocaleLowerCase().includes(searchString);
              })
              .map((venue, index) => (
                <tr
                  onClick={() => {
                    handleRowClick(venue.venue);
                  }}
                  key={index}
                  className="bg-white border-b dark:bg-sky-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-sky-950"
                >
                  <td className="px-6 py-4">{venue.venue}</td>
                  <td className="px-6 py-4">{venue.song}</td>
                  <td className="px-6 py-4">{venue.artist}</td>
                  <td className="px-6 py-4">{venue.venue_type}</td>
                  <td className="px-6 py-4">
                    {formatDateTimeForTimeOfPlay(venue.time_of_play)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    );
  } else return <TableLoader />;
}
