import type { NextApiRequest, NextApiResponse } from "next";
import Redshift from "../../redshift";

type Data = {
  venue: string;
  song: string;
  artist: string;
  venue_type: string;
  time_of_play: string;
  latitude: any;
  longitude: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | any>
) {
  // following infos are in params

  // add logic to extract from (date) and to (date) to modify the data being returned

  // add logic to extract page_number to return the indexes of data

  // make connection to the redshift
  const dbClient = new Redshift();
  await dbClient.getConnection();

  // run the required query to get the data
  try {
    const result = await dbClient.executeQuery(`SELECT 
premises_name as venue, title as song, artists_name as artist, venue_type, timestamp_utc as time_of_play, latitude, longitude
FROM "dev"."public"."MVW_ACR_ALL_STREAMS_ALL_VENUES"
WHERE timestamp_utc >= '2023-12-20' and timestamp_utc <= '2023-12-26'
ORDER BY timestamp_utc DESC
LIMIT 100`);

    // try logging the data and remove this later

    // formatting the resul to the required need
    const formattedResult: Data[] = result.map((item) => {
      // Format each item as needed
      return {
        venue: item.venue,
        song: item.song,
        artist: item.artist,
        venue_type: item.venue_type,
        time_of_play: item.time_of_play,
      };
    });

    // return the formatted result with a 200 'OK' status
    res.status(200).json({ data: formattedResult });
  } catch (error) {
    // add handling mechanism to handle all types of errors possible so that server never goes down
    console.error(`Error: ${error.message}`);
    // return better warnings for the developer
    res.status(500).json({ name: "Internal Server Error" });
  }
}
