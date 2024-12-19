import { drawerButtonState } from "../../atoms/drawerstate";
import { useRecoilState, useRecoilValue } from "recoil";
import { LineChart, Map, MoreInfo, getTableState } from "../../index";

export function DrawerComponent() {
  const [drawerState, setDrawerState] = useRecoilState(drawerButtonState);
  const tableState = useRecoilValue(getTableState);

  return (
    <main
      className={
        "z-[100] fixed overflow-hidden bg-gray-900 bg-opacity-25 inset-0 transform ease-in-out " +
        (drawerState
          ? "transition-opacity opacity-100 duration-500 translate-x-0 "
          : "transition-all delay-500 opacity-0 translate-x-full ")
      }
    >
      <section
        className={
          "w-screen max-w-lg right-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform " +
          (drawerState ? "translate-x-0 " : "translate-x-full ")
        }
      >
        <article className="relative w-screen max-w-lg pb-10 bg-gray-200 dark:bg-sky-700 flex flex-col space-y-6 overflow-y-scroll h-full">
          <div className="m-4 shadow-2xl rounded-md dark:text-gray-300 items-center justify-center">
            {tableState === "venuestable" ? <Map /> : <LineChart />}
          </div>
          <div className="m-auto">
            <MoreInfo />
          </div>
        </article>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => {
          setDrawerState(false);
        }}
      ></section>
    </main>
  );
}
