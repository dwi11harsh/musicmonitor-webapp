export function DrawerLoadingCard() {
  return (
    <div className="p-12">
      {/* graph loader */}
      <div
        role="status"
        className="max-w-sm p-4 border border-gray-200 rounded shadow animate-pulse md:p-6 dark:border-gray-700"
      >
        <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2.5"></div>
        <div className="w-48 h-2 mb-10 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        <div className="flex items-baseline mt-4 space-x-6">
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
          <div className="w-full h-56 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
          <div className="w-full h-64 bg-gray-200 rounded-t-lg dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-72 dark:bg-gray-700"></div>
          <div className="w-full bg-gray-200 rounded-t-lg h-80 dark:bg-gray-700"></div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
      {/* content loader */}
      <div>
        <div role="status" className="max-w-sm animate-pulse pt-5">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
        <div role="status" className="max-w-sm animate-pulse pt-2">
          <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
}
