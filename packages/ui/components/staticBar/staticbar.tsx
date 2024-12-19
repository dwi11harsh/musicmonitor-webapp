import { Clock } from "../clock/clock";
import { CurrentTableName } from "../currentTableName/currentTableName";

export const StaticBar = () => {
  return (
    <div className="sticky md:top-48 z-50 w-full flex justify-center my-2 bg-white shadow-lg dark:shadow-xl rounded-full dark:bg-sky-700 ">
      <p className="m-1 font-normal text-gray-700 dark:text-gray-300 py-1 px-4">
        <CurrentTableName /> Data - Music Monitor Network - United Kingdom -{" "}
        <Clock />
      </p>
    </div>
  );
};
