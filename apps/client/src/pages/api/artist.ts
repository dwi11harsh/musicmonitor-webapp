import type { NextApiRequest, NextApiResponse } from "next";
import Redshift from "../../redshift";

type chart = {
  date: Date;
  value: number;
};

type Data = {
  top_track: string;
  top_album: string;
  total_time_played: string;
  top_region: string;
  top_venue: string;
  top_venue_type: string;
  chart: chart[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  //extract the name of artist from the params

  // check whether the db is up or not
  const dbClient = new Redshift();
  // if not then call getConnecion
  await dbClient.getConnection();
  try {
    const result = await dbClient.executeQuery(
      `SELECT artists_name as top_artist, title as top_song, album_name as top_album, town as region, venue_type as top_venue_type, premises_name as top_venues, COUNT(*) as count
FROM "dev"."public"."MVW_ACR_ALL_STREAMS_ALL_VENUES"
WHERE artists_name = 'Michael Bublé'
GROUP BY artists_name, title, album_name, town, venue_type, premises_name
ORDER BY count DESC
LIMIT 1`
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
