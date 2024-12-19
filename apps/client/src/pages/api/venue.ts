import type { NextApiRequest, NextApiResponse } from "next";
import Redshift from "../../redshift";

type map_val = {
  lat: number;
  lng: number;
};

type Data = {
  region: string;
  total_plays: string;
  top_track: string;
  joined: string;
  top_artist: string;
  map_val: map_val;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  //extract the name of venue from the params

  // check whether the db is up or not
  const dbClient = new Redshift();
  // if not then call getConnecion
  await dbClient.getConnection();
  try {
    const result = await dbClient.executeQuery(
      `SELECT premises_name as venue, town as region, artists_name as top_artist, title as top_track, min(timestamp_utc) as joined, latitude, longitude, count(mm_song_id)
FROM "dev"."public"."MVW_ACR_ALL_STREAMS_ALL_VENUES"
WHERE timestamp_utc >= '2023-10-20' and timestamp_utc <= '2023-12-26'
AND premises_name='Hair By Tracy'
GROUP BY premises_name, town, artists_name, title, latitude, longitude
ORDER by count DESC
LIMIT 1
;`
    );

    // Convert the result into JSON
    // following line is throwing error when the type Data is applied to it, fix it asap
    const formattedResult = result; // apply the type Data to it before using it

    res.status(200).json({ data: formattedResult });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
}
