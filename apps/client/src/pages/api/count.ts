import type { NextApiRequest, NextApiResponse } from "next";
import Redshift from "../../redshift";

type Data = {
  venues: number;
  artists: number;
  labels: number;
  songs: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  // make connection to db
  const dbClient = new Redshift();
  await dbClient.getConnection();
  try {
    const venuesResult = await dbClient.executeQuery(
      `SELECT COUNT(DISTINCT slid) FROM "MVW_ACR_ALL_STREAMS_ALL_VENUES"`
    );

    const artistsResult = await dbClient.executeQuery(
      `SELECT COUNT(DISTINCT mm_artist_id) FROM "MVW_ACR_ALL_STREAMS_ALL_VENUES"`
    );

    const labelsResult = await dbClient.executeQuery(
      `SELECT COUNT(DISTINCT label) FROM "MVW_ACR_ALL_STREAMS_ALL_VENUES"`
    );

    const songsResult = await dbClient.executeQuery(
      `SELECT COUNT(DISTINCT mm_song_id) FROM "MVW_ACR_ALL_STREAMS_ALL_VENUES"`
    );

    const result = {
      venuesResult: venuesResult[0].count,
      artistsResult: artistsResult[0].count,
      labelsResult: labelsResult[0].count,
      songsResult: songsResult[0].count,
    };

    const formattedResult = result; // apply the type Data to it before using it

    res.status(200).json({ data: formattedResult });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
}
