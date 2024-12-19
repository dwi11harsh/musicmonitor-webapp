import { useRecoilState } from "recoil";
import { searchBarState } from "../../atoms/searchBarState";

export const SearchBar = () => {
  const [searchString, setSearchString] = useRecoilState(searchBarState);
  const handleSubmit = (event: any) => {
    event.preventDefault();
  };
  return (
    <div>
      <div>
        <form className="w-96 my-1 pl-0" onSubmit={handleSubmit}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative py-1">
            <input
              type="search"
              id="default-search"
              className="block w-full p-3 pl-10 text-sm shadow-xl text-gray-900 border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-sky-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
              onChange={(e) => setSearchString(e.target.value)}
            />
            <button
              type="submit"
              className="dark:text-gray-200 text-gray-700 absolute right-2.5 bottom-2.5 font-medium rounded-full text-sm px-4 mb-1 pb-1"
            >
              <img
                className="w-5 h-5"
                alt="svgImg"
                src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIKc3R5bGU9ImZpbGw6IzczNzM3MzsiPgogICAgPHBhdGggZD0iTSA5IDIgQyA1LjE0NTg1MTQgMiAyIDUuMTQ1ODUxNCAyIDkgQyAyIDEyLjg1NDE0OSA1LjE0NTg1MTQgMTYgOSAxNiBDIDEwLjc0Nzk5OCAxNiAxMi4zNDUwMDkgMTUuMzQ4MDI0IDEzLjU3NDIxOSAxNC4yODEyNSBMIDE0IDE0LjcwNzAzMSBMIDE0IDE2IEwgMjAgMjIgTCAyMiAyMCBMIDE2IDE0IEwgMTQuNzA3MDMxIDE0IEwgMTQuMjgxMjUgMTMuNTc0MjE5IEMgMTUuMzQ4MDI0IDEyLjM0NTAwOSAxNiAxMC43NDc5OTggMTYgOSBDIDE2IDUuMTQ1ODUxNCAxMi44NTQxNDkgMiA5IDIgeiBNIDkgNCBDIDExLjc3MzI2OCA0IDE0IDYuMjI2NzMxNiAxNCA5IEMgMTQgMTEuNzczMjY4IDExLjc3MzI2OCAxNCA5IDE0IEMgNi4yMjY3MzE2IDE0IDQgMTEuNzczMjY4IDQgOSBDIDQgNi4yMjY3MzE2IDYuMjI2NzMxNiA0IDkgNCB6Ij48L3BhdGg+Cjwvc3ZnPg=="
              />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
