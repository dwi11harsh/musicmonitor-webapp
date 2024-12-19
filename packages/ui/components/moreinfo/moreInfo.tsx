import { useRecoilState, useRecoilValue } from "recoil";
import {
  BASE_URL,
  artistTabletState,
  currentSongState,
  getTableState,
  labelTabletState,
  queryState,
} from "../../index";
import { songTabletState } from "../../atoms/songTabletState";
import { venueTabletState } from "../../atoms/venueTabletState";

interface Venue {
  venue: string;
  region: string;
  top_artist: string;
  top_track: string;
  joined: string;
  count: string;
}

export function MoreInfo() {
  const currentTable = useRecoilValue(getTableState);

  const [currentSong, setCurrentSong] = useRecoilState(currentSongState);
  const [venueResponse, setVenueResponse] = useRecoilState(venueTabletState);
  const [artistResponse, setArtistResponse] = useRecoilState(artistTabletState);
  const [songResponse, setSongResponse] = useRecoilState(songTabletState);
  const [labelResponse, setLabelResponse] = useRecoilState(labelTabletState);

  if (currentTable === "venuestable" && venueResponse) {
    return (
      <div className="w-96 h-96 p-5 dark:text-gray-300 shadow-xl rounded-2xl content-center dark:bg-sky-700">
        <div className="flex font-bold text-xl py-4 px-14">
          {venueResponse.venue}
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="flex pb-2 px-2">Region</div>
          <div>{venueResponse.region}</div>
          <div className="flex pb-2 px-2">Total Plays</div>
          <div>{venueResponse.count}</div>
          <div className="flex pb-2 px-2">Top Track</div>
          <div>{venueResponse.top_track}</div>
          <div className="flex pb-2 px-2">Joined</div>
          <div>{venueResponse.joined}</div>
          <div className="flex pb-2 px-2">Top Artist</div>
          <div>{venueResponse.top_artist}</div>
        </div>
      </div>
    );
  } else if (currentTable === "artiststable" && artistResponse) {
    return (
      <div className="w-96 h-96 p-5 dark:text-gray-300 shadow-xl rounded-2xl items-center justify-center dark:bg-sky-700">
        <div className="items-center justify-center">
          <div className="flex font-bold text-xl py-4 px-14 items-center justify-center">
            {artistResponse.top_artist}
          </div>
          <div className="grid grid-cols-2 gap-1">
            <div className="flex py-2 px-2">Top Track</div>
            <div>{artistResponse.top_song}</div>
            <div className="flex py-2 px-2">Top Album</div>
            <div>{artistResponse.top_album}</div>
            <div className="flex py-2 px-2">Top Region</div>
            <div>{artistResponse.region}</div>
            <div className="flex py-2 px-2">Top Venue Type</div>
            <div>{artistResponse.top_venue_type}</div>
            <div className="flex py-2 px-2">Top Venue</div>
            <div>{artistResponse.top_venues}</div>
          </div>
        </div>
      </div>
    );
  } else if (currentTable === "labelstable" && labelResponse) {
    return (
      <div className="w-96 h-96 p-5 dark:text-gray-300 shadow-xl rounded-2xl content-center dark:bg-sky-700">
        <div className="flex font-bold text-xl py-4 px-14">
          {labelResponse.label}
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="flex pb-2 px-2">Top Track</div>
          <div>{labelResponse.title}</div>
          <div className="flex pb-2 px-2">Top Artist</div>
          <div>{labelResponse.artists_name}</div>
          <div className="flex pb-2 px-2">Top Region</div>
          <div>{labelResponse.town}</div>
          <div className="flex pb-2 px-2">Top Venue Type</div>
          <div>{labelResponse.venue_type}</div>
        </div>
      </div>
    );
  } else if (currentTable === "songstable" && songResponse) {
    return (
      <div className="w-96 h-96 p-5 dark:text-gray-300 shadow-xl rounded-2xl items-center justify-center dark:bg-sky-700">
        <div className="flex font-bold text-xl py-4 px-14 items-center justify-center">
          {currentSong}
        </div>
        <div className="grid grid-cols-2 gap-1">
          <div className="flex pb-2 px-2">Release Date</div>
          <div>{songResponse.release_date}</div>
          <div className="flex pb-2 px-2">Label</div>
          <div>{songResponse.label}</div>
          <div className="flex pb-2 px-2">ISRC Code</div>
          <div>{songResponse.isrc}</div>
          <div className="flex pb-2 px-2">Top Region</div>
          <div>{songResponse.town}</div>
        </div>
      </div>
    );
  }
}
