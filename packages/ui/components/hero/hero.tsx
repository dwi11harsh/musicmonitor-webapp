import {
  TopBar,
  StaticBar,
  Pagination,
  DrawerComponent,
  SearchBar,
  Footer,
  CurrentTable,
  Calender,
  DatePicker,
} from "../../index";

export function Hero() {
  return (
    <div className="w-full h-full p-2 border dark:border-0 dark:bg-sky-600">
      <TopBar />
      <StaticBar />
      {/* hide the following div for the smaller devices */}
      <div className="hidden md:flex sticky top-[234px] z-50 justify-between">
        <div className="pt-2">
          <DatePicker />
        </div>
        <SearchBar />
      </div>
      <DrawerComponent />
      <CurrentTable />
      {/* <Pagination /> */}
    </div>
  );
}
