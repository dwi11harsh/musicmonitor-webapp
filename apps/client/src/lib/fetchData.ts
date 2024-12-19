// import {
//   artistsDataState,
//   countState,
//   getTableState,
//   labelsDataState,
//   songsDataState,
//   venuesDataState,
// } from "ui";
// import axios, { AxiosResponse } from "axios";
// import { useRecoilState, useRecoilValue } from "recoil";
// import { useState } from "react";
// import { api_endpoint } from "./apiEndPoint";
// import { setError } from "./error";

// // Define the interfaces for different data types
// interface Venues {
//   venue: string;
//   venue_type: string;
//   song: string;
//   artist: string;
//   time_of_play: string;
// }

// type Artists = {
//   rank: number;
//   artist: string;
//   total_plays: string;
//   first_play: string;
//   last_play: string;
//   number_of_tracks: number;
// };

// type Labels = {
//   rank: number;
//   label: string;
//   total_plays: string;
//   first_play: string;
//   last_play: string;
//   total_tracks: number;
// };

// type Songs = {
//   rank: number;
//   song: string;
//   artist: string;
//   total_plays: string;
//   first_play: string;
//   last_play: string;
//   total_tracks: number;
// };

// // Use Recoil atoms to store values

// const [venuesData, setVenuesData] = useRecoilState(venuesDataState);
// const [artistsData, setArtistsData] = useRecoilState(artistsDataState);
// const [labelsData, setLabelsData] = useRecoilState(labelsDataState);
// const [songsData, setSongsData] = useRecoilState(songsDataState);
// const currentTable = useRecoilValue(getTableState);

// const [loading, setLoading] = useState(true);

// export const fetchData = async () => {
//   try {
//     // Call the API endpoints according to the selected table
//     if (currentTable === "artiststable") {
//       const artistsResponse: AxiosResponse<{ data: Artists[] }> =
//         await axios.get(`${api_endpoint}/artists`);

//       setArtistsData(artistsResponse.data.data);

//       console.log("Artists Response:", artistsResponse.data.data);
//     } else if (currentTable === "venuestable") {
//       const venuesResponse: AxiosResponse<{ data: Venues[] }> = await axios.get(
//         `${api_endpoint}/venues`
//       );
//       setVenuesData(venuesResponse.data.data);
//       console.log("Venues Response:", venuesResponse.data.data);
//     } else if (currentTable === "labelstable") {
//       const labelsResponse: AxiosResponse<{ data: Labels[] }> = await axios.get(
//         `${api_endpoint}/labels`
//       );
//       setLabelsData(labelsResponse.data.data);
//       console.log("Labels Response:", labelsResponse.data.data);
//     } else if (currentTable === "songstable") {
//       const songsResponse: AxiosResponse<{ data: Songs[] }> = await axios.get(
//         `${api_endpoint}/songs`
//       );
//       setSongsData(songsResponse.data.data);
//       console.log("Songs Response:", songsResponse.data.data);
//     }
//   } catch (error) {
//     setError("Error fetching data");
//   } finally {
//     setLoading(false);
//   }
// };
