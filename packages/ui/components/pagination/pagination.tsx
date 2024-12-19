import { useRecoilState } from "recoil";
import { page } from "../../index";

export const Pagination = () => {
  const [currPage, setCurrPage] = useRecoilState(page);

  const handlePrevious = () => {
    if (currPage > 1) {
      setCurrPage(currPage - 1);

      // Add any other logic you want to perform when navigating to the previous page
    }
  };

  const handleNext = () => {
    setCurrPage(currPage + 1);
    // Add any other logic you want to perform when navigating to the next page
  };

  return (
    <nav
      className="flex items-center justify-between pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-gray-400">
          1-10
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-gray-400">
          1000
        </span>
      </span>
      <ul className="inline-flex -space-x-px text-sm h-8 ">
        <li>
          <div
            onClick={handlePrevious}
            className="flex items-center justify-center px-5 h-8 ml-0 shadow-xl dark:shadow-xl leading-tight text-gray-500 bg-white  rounded-l-full hover:bg-gray-100 hover:text-gray-700 dark:bg-sky-900  dark:text-gray-400 dark:hover:bg-sky-950 dark:hover:text-white"
          >
            Previous
          </div>
        </li>
        <li>
          <div
            onClick={handleNext}
            className="flex items-center justify-center px-5 h-8 shadow-xl dark:shadow-xl leading-tight text-gray-500 bg-white  rounded-r-full hover:bg-gray-100 hover:text-gray-700 dark:bg-sky-900  dark:text-gray-400 dark:hover:bg-sky-950 dark:hover:text-white"
          >
            Next
          </div>
        </li>
      </ul>
    </nav>
  );
};
