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
  const dbClient = new Redshift();

  let artist = "Michael Bublé";
  await dbClient.getConnection();
  try {
    const result = await dbClient.executeQuery(
      `select DATE(timestamp_utc) as date, count(mm_song_id) as value
        from MVW_ACR_ALL_STREAMS_ALL_VENUES
        WHERE artists_name = '${artist}'
        GROUP BY 1
        ORDER BY date DESC`
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
