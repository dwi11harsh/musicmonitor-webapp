import type { NextApiRequest, NextApiResponse } from "next";
import Redshift from "../../redshift";

type Data = {
  venue: string;
  venue_type: string;
  song: string;
  artist: string;
  time_of_play: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | any>
) {
  try {
    res.status(200).json({ data: "John Doe" });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
}
