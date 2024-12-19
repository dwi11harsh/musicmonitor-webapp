import type { NextApiRequest, NextApiResponse } from "next";
import Redshift from "../../redshift";

type chart = {
  date: string;
  value: number;
};

type Data = {
  top_track: string;
  top_artist: string;
  top_region: string;
  top_venue_type: string;
  total_time_played: string;
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
      `SELECT label, title, artists_name, town, venue_type, COUNT(*) as count
FROM "dev"."public"."MVW_ACR_ALL_STREAMS_ALL_VENUES"
WHERE artists_name = 'Queen'
GROUP BY 1,2,3,4,5
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
