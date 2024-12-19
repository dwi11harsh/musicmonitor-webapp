const express = require("express");
const { authenticateJwt, SECRET } = require("../middleware/auth");
const { User, Admin } = require("../db");
const { Redshift } = require("../redshift");
const router = express.Router();

const dbClient = new Redshift();

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "24h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

// Artist Date Chart
router.get("/artist-chart", async (req, res) => {
  const artist_name = req.query.artist_name;

  try {
    await dbClient.getConnection();

    const result = await dbClient.executeQuery(
      `select DATE(timestamp_utc) as date, count(mm_song_id) as value
        from mvw_acr_all_streams_all_venues
        WHERE artists_name = '${artist_name}'
        GROUP BY 1
        ORDER BY date DESC`
    );

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

// Artist Tablet
router.get("/artist", async (req, res) => {
  const artist_name = req.query.artist_name;
  try {
    // use following artist name for testing purposes
    // const artistName = "Queen";

    await dbClient.getConnection();

    const formattedResult = await dbClient.executeQuery(
      `SELECT artists_name as top_artist, title as top_song, album_name as top_album, town as region, venue_type as top_venue_type, premises_name as top_venues, COUNT(*) as count
        FROM "public"."mvw_acr_all_streams_all_venues"
        WHERE artists_name = '${artist_name}'
        GROUP BY artists_name, title, album_name, town, venue_type, premises_name
        ORDER BY count DESC
        LIMIT 1`
    );

    res.status(200).json({ data: formattedResult[0] });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

// Artists Table
router.get("/artists", async (req, res) => {
  try {
    const f_date = req.query.f_date;
    const t_date = req.query.t_date;

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
    FROM "public"."mvw_acr_all_streams_primary"
    WHERE timestamp_utc >= '${f_date}' and timestamp_utc <= '${t_date}'
    GROUP BY 1,2
    ORDER BY total_plays DESC
)
SELECT DENSE_RANK() OVER (ORDER BY total_plays desc) as Rank, *
FROM CTE`
    );

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

//distinct count
router.get("/counts", async (req, res) => {
  try {
    await dbClient.getConnection();

    //mvw_acr_all_streams_all_venuesa
    const venuesResult = await dbClient.executeQuery(
      `SELECT COUNT(DISTINCT slid) FROM "mvw_acr_all_streams_all_venues"`
    );

    const artistsResult = await dbClient.executeQuery(
      `SELECT COUNT(DISTINCT mm_artist_id) FROM "mvw_acr_all_streams_all_venues"`
    );

    const labelsResult = await dbClient.executeQuery(
      `SELECT COUNT(DISTINCT label) FROM "mvw_acr_all_streams_all_venues"`
    );

    const songsResult = await dbClient.executeQuery(
      `SELECT COUNT(DISTINCT mm_song_id) FROM "mvw_acr_all_streams_all_venues"`
    );

    const result = {
      venuesResult: venuesResult[0].count,
      artistsResult: artistsResult[0].count,
      labelsResult: labelsResult[0].count,
      songsResult: songsResult[0].count,
    };

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

// Label Date Chart
router.get("/label-chart", async (req, res) => {
  const label_name = req.query.label_name;

  try {
    await dbClient.getConnection();

    const result = await dbClient.executeQuery(
      `select DATE(timestamp_utc) as date, count(mm_song_id) as value
        from mvw_acr_all_streams_all_venues
        WHERE label = '${label_name}'
        GROUP BY 1
        ORDER BY date DESC`
    );
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

// Label Tablet
router.get("/label", async (req, res) => {
  const label_name = req.query.label_name;

  try {
    // use this for testing purposes
    // const labelName = "Queen";

    await dbClient.getConnection();
    const result = await dbClient.executeQuery(
      `SELECT label, title, artists_name, town, venue_type, COUNT(*) as count
FROM "public"."mvw_acr_all_streams_all_venues"
WHERE label = '${label_name}'
GROUP BY 1,2,3,4,5
ORDER BY count DESC
LIMIT 1
;`
    );

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

// Labels Table
router.get("/labels", async (req, res) => {
  try {
    const f_date = req.query.f_date;
    const t_date = req.query.t_date;

    await dbClient.getConnection();
    const result = await dbClient.executeQuery(
      `WITH CTE AS (
        SELECT 
        label ,
        count(mm_song_id) as total_plays,
        count(distinct (mm_song_id)) as count_tracks, 
        min(timestamp_utc) as first_play,
        max(timestamp_utc) as last_play, 
        (sum(duration_ms)/60000) as total_play_duration_mins
        FROM "public"."mvw_acr_all_streams_primary"
        WHERE timestamp_utc >= '${f_date}' and timestamp_utc <= '${t_date}'
        AND label != ''
        GROUP BY 1 
        ORDER BY total_plays DESC
        )
      SELECT DENSE_RANK() OVER (ORDER BY total_plays desc) as Rank, *
      FROM CTE`
    );

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

// Song Date Chart
router.get("/song-chart", async (req, res) => {
  const mm_id = req.query.mm_song_id;

  try {
    // use this for testing purposes
    // const id = "ee218070dc8be7c710c3071bef35851f";

    await dbClient.getConnection();

    const result = await dbClient.executeQuery(
      `select DATE(timestamp_utc) as date, count(mm_song_id) as value
          from mvw_acr_all_streams_all_venues
          WHERE mm_song_id = '${mm_id}' -- insert id
          GROUP BY 1
          ORDER BY date DESC`
    );

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

// Song Tablet
router.get("/song", async (req, res) => {
  const mm_id = req.query.mm_song_id;

  try {
    // use this for testing purposes
    // const id = "ee218070dc8be7c710c3071bef35851f";

    await dbClient.getConnection();

    const result = await dbClient.executeQuery(
      `SELECT artists_name, release_date, label, isrc,  town, premises_name
FROM "public"."mvw_acr_all_streams_all_venues"
WHERE mm_song_id = '${mm_id}'
ORDER BY timestamp_utc DESC
LIMIT 1`
    );

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

// Songs Table
router.get("/songs", async (req, res) => {
  try {
    const f_date = req.query.f_date;
    const t_date = req.query.t_date;

    await dbClient.getConnection();
    const result = await dbClient.executeQuery(`WITH CTE AS (
    SELECT 
    title ,
    mm_song_id,
    artists_name,
    count(mm_song_id) as total_plays,
    count(distinct (mm_song_id)) as count_tracks, 
    min(timestamp_utc) as first_play,
    max(timestamp_utc) as last_play, 
    (sum(duration_ms)/60000) as total_play_duration_mins
    FROM "public"."mvw_acr_all_streams_all_venues"
    WHERE timestamp_utc >= '${f_date}' and timestamp_utc <= '${t_date}'
    AND title != ''
    GROUP BY 1, 2,3
    ORDER BY total_plays DESC
)
SELECT DENSE_RANK() OVER (ORDER BY total_plays desc) as Rank, *
FROM CTE`);
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

// Venue Tablet
router.get("/venue", async (req, res) => {
  const venue_name = req.query.venue_name;

  try {
    // use this for testing purposes
    // const premises = "Hair By Tracy";

    await dbClient.getConnection();

    const result = await dbClient.executeQuery(
      `SELECT premises_name as venue, town as region, artists_name as top_artist, title as top_track, min(timestamp_utc) as joined, latitude, longitude, count(mm_song_id)
        FROM "public"."mvw_acr_all_streams_all_venues"
        WHERE timestamp_utc >= '2023-10-20' and timestamp_utc <= '2023-12-26'
        AND premises_name='${venue_name}'
        GROUP BY premises_name, town, artists_name, title, latitude, longitude
        ORDER by count DESC
        LIMIT 1
        ;`
    );

    res.status(200).json({ data: result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

// Venues Table
router.get("/venues", async (req, res) => {
  try {
    const f_date = req.query.f_date;
    const t_date = req.query.t_date;

    await dbClient.getConnection();
    const result = await dbClient.executeQuery(`SELECT 
premises_name as venue, title as song, artists_name as artist, venue_type, timestamp_utc as time_of_play, latitude, longitude
FROM "public"."mvw_acr_all_streams_all_venues"
WHERE timestamp_utc >= '${f_date}' and timestamp_utc <= '${t_date}'
ORDER BY timestamp_utc DESC
LIMIT 100`);
    res.status(200).json({ data: result });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ name: "Internal Server Error" });
  }
});

module.exports = router;
