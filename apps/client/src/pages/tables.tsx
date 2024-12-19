// Import necessary modules and components
import {
  BASE_URL,
  Hero,
  NavBar,
  artistsDataState,
  countState,
  getFromDateState,
  getTableState,
  getToDateState,
  labelsDataState,
  songsDataState,
  venuesDataState,
} from "ui";
import { RecoilRoot, useRecoilState, useRecoilValue } from "recoil";
import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

// Define the API endpoint
const api_endpoint = `${BASE_URL}/user`;

// Define the interfaces for different data types
interface Venues {
  venue: string;
  venue_type: string;
  song: string;
  artist: string;
  time_of_play: string;
}

type Artists = {
  rank: number;
  artists_name: string;
  total_plays: string;
  first_play: string;
  last_play: string;
  count_tracks: number;
};

type Labels = {
  rank: number;
  label: string;
  total_plays: string;
  first_play: string;
  last_play: string;
  count_tracks: number;
};

type Songs = {
  rank: number;
  title: string;
  mm_song_id: string;
  artists_name: string;
  total_plays: string;
  first_play: string;
  last_play: string;
  total_play_duration_mins: string;
};

// Define the Tables component
export default function Tables() {
  // Get the current table from Recoil state
  const currentTable = useRecoilValue(getTableState);
  // Set up state for loading and error handling
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use Recoil atoms to store values
  const [venuesData, setVenuesData] = useRecoilState(venuesDataState);
  const [artistsData, setArtistsData] = useRecoilState(artistsDataState);
  const [labelsData, setLabelsData] = useRecoilState(labelsDataState);
  const [songsData, setSongsData] = useRecoilState(songsDataState);
  const [counts, setCounts] = useRecoilState(countState);

  // Call recoil selectors to get the from and to dates
  const fromDate = useRecoilValue(getFromDateState);
  const toDate = useRecoilValue(getToDateState);

  // Fetch data from the API when the component mounts
  const fetchData = async () => {
    try {
      // Call the API endpoints according to the selected table without any parameters

      if (currentTable === "artiststable") {
        setArtistsData(null);
        const artistsResponse: AxiosResponse<{ data: Artists[] }> =
          await axios.get(`${api_endpoint}/artists`, {
            params: {
              f_date: fromDate,
              t_date: toDate,
            },
          });

        setArtistsData(artistsResponse.data.data);
      } else if (currentTable === "venuestable") {
        setVenuesData(null);
        const venuesResponse: AxiosResponse<{ data: Venues[] }> =
          await axios.get(`${api_endpoint}/venues`, {
            params: {
              f_date: fromDate,
              t_date: toDate,
            },
          });

        setVenuesData(venuesResponse.data.data);
      } else if (currentTable === "labelstable") {
        setLabelsData(null);
        const labelsResponse: AxiosResponse<{ data: Labels[] }> =
          await axios.get(`${api_endpoint}/labels`, {
            params: {
              f_date: fromDate,
              t_date: toDate,
            },
          });

        setLabelsData(labelsResponse.data.data);
      } else if (currentTable === "songstable") {
        setSongsData(null);
        const songsResponse: AxiosResponse<{ data: Songs[] }> = await axios.get(
          `${api_endpoint}/songs`,
          {
            params: {
              f_date: fromDate,
              t_date: toDate,
            },
          }
        );

        setSongsData(songsResponse.data.data);
      }
    } catch (error) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const fetchCounts = async () => {
    try {
      const countResponse = await axios.get(`${api_endpoint}/counts`);
      setCounts(countResponse.data);
    } catch (error) {
      setError("Error in fetching counts");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Check if the code is running in the browser (not during SSR)
    if (typeof window !== "undefined") {
      // console.log(
      //   "sending request with    :    ",
      //   fromDate,
      //   "        :   ",
      //   toDate
      // );
      fetchData();
    }
  }, [currentTable, toDate]); // Run the effect when the currentTable changes

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchCounts();
    }
  }, []);

  // Render NavBar and Hero components
  return (
    <div>
      <NavBar />
      <Hero />
    </div>
  );
}
