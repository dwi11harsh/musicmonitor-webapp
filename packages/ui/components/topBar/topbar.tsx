import { useRecoilState, useRecoilValue } from "recoil";
import { getCountState, tableState } from "../../index";
import { drawerButtonState } from "../../index";
import { loading } from "../../atoms/loading";

export function TopBar() {
  const [currentTable, setTable] = useRecoilState(tableState);
  const [drawerState, setDrawerState] = useRecoilState(drawerButtonState);
  const [tempLoading, setTempLoading] = useRecoilState(loading);
  const counts = useRecoilValue(getCountState);

  const handleButtonClick = (table: any) => {
    setTable(table);
    setDrawerState(false);
    setTempLoading(true);
    setTimeout(() => {
      setTempLoading(false);
    }, 2000);
  };

  const handleSelectChange = (event: any) => {
    const selectedTable = event.target.value;
    setTempLoading(true);
    setTable(selectedTable);
    setDrawerState(false);
    setTimeout(() => {
      setTempLoading(false);
    }, 2000);
  };

  return (
    <div className="sticky top-24 z-50 p-2">
      <div className="sm:hidden">
        <label className="sr-only">Select from List</label>
        <select
          onChange={handleSelectChange}
          id="tabs"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-xl rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-sky-800 dark:border-gray-50 dark:placeholder-gray-400 dark:text-white dark:focus:ring-4 dark:focus:border-0 dark:focus:border-blue-500"
        >
          <option value="venuestable">Venues</option>
          <option value="artiststable">Artists</option>
          <option value="labelstable">Labels</option>
          <option value="songstable">Songs</option>
        </select>
      </div>
      <div className="hidden sm:block rounded-full w-full" role="group">
        <div className="flex justify-between">
          <button
            onClick={() => handleButtonClick("venuestable")}
            type="button"
            className={
              currentTable === "venuestable"
                ? "mr-3 flex-auto shadow-xl w-1/5 px-3 py-2 text-xl font-light  bg-white border  rounded-full hover:bg-gray-100 hover:text-blue-700 z-10 ring-2 ring-blue-700 text-blue-700 dark:bg-teal-500 dark:border-gray-50 dark:text-white dark:hover:text-white dark:hover:bg-teal-600 dark:ring-4 dark:border-0 dark:ring-yellow-500"
                : "mr-3 flex-auto shadow-xl w-1/5 px-3 py-2 text-xl font-light text-gray-900 bg-white border-gray-200 rounded-full hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-teal-500 dark:border-gray-50 dark:text-white dark:hover:text-white dark:hover:bg-teal-600 dark:focus:ring-4 dark:focus:border-0 dark:focus:ring-yellow-500 dark:focus:text-white"
            }
          >
            <div>Venues</div>
            <div className="display-block">{counts.data.venuesResult}</div>
          </button>
          <button
            onClick={() => handleButtonClick("artiststable")}
            type="button"
            className={
              currentTable === "artiststable"
                ? "mr-3 flex-auto shadow-xl w-1/5 px-3 py-2 text-xl font-light  bg-white border  rounded-full hover:bg-gray-100 hover:text-blue-700 z-10 ring-2 ring-blue-700 text-blue-700 dark:bg-yellow-600 dark:border-gray-50 dark:text-white dark:hover:text-white dark:hover:bg-yellow-700 dark:ring-4 dark:border-0 dark:ring-yellow-500"
                : "mr-3 flex-auto shadow-xl w-1/5 px-3 py-2 text-xl font-light text-gray-900 bg-white border-gray-200 rounded-full hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-yellow-600 dark:border-gray-50 dark:text-white dark:hover:text-white dark:hover:bg-yellow-700 dark:focus:ring-4 dark:focus:border-0 dark:focus:ring-yellow-500 dark:focus:text-white"
            }
          >
            <div>Artists</div>
            <div className="display-block">{counts.data.artistsResult}</div>
          </button>
          <button
            onClick={() => handleButtonClick("labelstable")}
            type="button"
            className={
              currentTable === "labelstable"
                ? "mr-3 flex-auto shadow-xl w-1/5 px-3 py-2 text-xl font-light  bg-white border  rounded-full hover:bg-gray-100 hover:text-blue-700 z-10 ring-2 ring-blue-700 text-blue-700 dark:bg-gray-500 dark:border-gray-50 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:ring-4 dark:border-0 dark:ring-yellow-500"
                : "mr-3 flex-auto shadow-xl w-1/5 px-3 py-2 text-xl font-light text-gray-900 bg-white border-gray-200 rounded-full hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-500 dark:border-gray-50 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-4 dark:focus:border-0 dark:focus:ring-yellow-500 dark:focus:text-white"
            }
          >
            <div>Labels</div>
            <div className="display-block">{counts.data.labelsResult}</div>
          </button>
          <button
            onClick={() => handleButtonClick("songstable")}
            type="button"
            className={
              currentTable === "songstable"
                ? "mr-3 flex-auto shadow-xl w-1/5 px-3 py-2 text-xl font-light  bg-white border  rounded-full hover:bg-gray-100 hover:text-blue-700 z-10 ring-2 ring-blue-700 text-blue-700 dark:bg-slate-950 dark:border-gray-50 dark:text-white dark:hover:text-white dark:hover:bg-slate-800 dark:ring-4 dark:border-0 dark:ring-yellow-500"
                : "mr-3 flex-auto shadow-xl w-1/5 px-3 py-2 text-xl font-light text-gray-900 bg-white border-gray-200 rounded-full hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-slate-950 dark:border-gray-50 dark:text-white dark:hover:text-white dark:hover:bg-slate-800 dark:focus:ring-4 dark:focus:border-0 dark:focus:ring-yellow-500 dark:focus:text-white"
            }
          >
            <div>Songs</div>
            <div className="display-block">{counts.data.songsResult}</div>
          </button>
        </div>
      </div>
    </div>
  );
}
