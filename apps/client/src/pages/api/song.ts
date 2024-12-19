import type { NextApiRequest, NextApiResponse } from "next";
import Redshift from "../../redshift";

type chart = {
  date: string;
  value: number;
};

type Data = {
  release_date: string;
  song_writers: string;
  producer: string;
  label: string;
  isrc_code: string;
  top_region: string;
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
      `SELECT artists_name, release_date, label, isrc,  town, premises_name
FROM "dev"."public"."MVW_ACR_ALL_STREAMS_ALL_VENUES"
WHERE mm_song_id = 'ee218070dc8be7c710c3071bef35851f'
ORDER BY timestamp_utc DESC
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
