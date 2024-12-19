import type { NextApiRequest, NextApiResponse } from "next";
import Redshift from "../../redshift";
import { useRecoilValue } from "recoil";
import { getFromDateState, getToDateState } from "ui";

type Data = {
  rank: number;
  artist: string;
  total_plays: string;
  first_play: string;
  last_play: string;
  number_of_tracks: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | any>
) {
  // run the required query to get the data
  try {
    const dbClient = new Redshift();
    await dbClient.getConnection();
    const result = await dbClient.executeQuery(
      `WITH CTE AS (
    SELECT 
    artists_name ,
    mm_artist_id,
    count(mm_song_id) as total_plays,
    min(timestamp_utc) as first_play,
    max(timestamp_utc) as last_play, 
    count(distinct (mm_song_id)) as count_tracks,    
    (sum(duration_ms)/60000) as total_play_duration_mins
    FROM "dev"."public"."mvw_acr_all_streams_primary"
    WHERE timestamp_utc >= '2023-12-25' and timestamp_utc <= '2023-12-31'
    GROUP BY 1,2
    ORDER BY total_plays DESC
)
SELECT DENSE_RANK() OVER (ORDER BY total_plays desc) as Rank, *
FROM CTE`
    );

    // try logging the data and remove this later

    // formatting the resul to the required need
    const formattedResult = result;

    // return the formatted result with a 200 'OK' status
    res.status(200).json({ data: formattedResult });
  } catch (error) {
    // add handling mechanism to handle all types of errors possible so that server never goes down
    console.error(`Error: ${error.message}`);
    // return better warnings for the developer
    res.status(500).json({ name: "Internal Server Error" });
  }
}
