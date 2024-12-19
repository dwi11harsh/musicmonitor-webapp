export function TableLoader() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <div className="relative overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-sky-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                <Loader />
              </th>
              <th scope="col" className="px-6 py-3">
                <Loader />
              </th>
              <th scope="col" className="px-6 py-3">
                <Loader />
              </th>
              <th scope="col" className="px-6 py-3">
                <Loader />
              </th>
              <th scope="col" className="px-6 py-3">
                <Loader />
              </th>
              <th scope="col" className="px-6 py-3">
                <Loader />
              </th>
            </tr>
          </thead>
          <tbody>
            {arr.map((element) => (
              <tr
                key={element}
                className="bg-white border-b dark:bg-sky-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-sky-950"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  <Loader />
                </th>
                <td className="px-6 py-4">
                  <Loader />
                </td>
                <td className="px-6 py-4">
                  <Loader />
                </td>
                <td className="px-6 py-4">
                  <Loader />
                </td>
                <td className="px-6 py-4">
                  <Loader />
                </td>
                <td className="px-6 py-4">
                  <Loader />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div>
      <div className="animate-pulse">
        <div className="h-2 mx-3 my-2 dark:bg-sky-400 bg-gray-200  rounded"></div>
      </div>
    </div>
  );
}
