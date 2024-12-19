import Image from "next/image";
import { logo } from ".";
import { ThemeButton } from "../..";
import profile from "./profile.svg";

export const NavBar = () => {
  return (
    <div className="sticky top-0 z-50 bg-slate-100 py-3 dark:bg-slate-950 shadow-xl">
      <nav>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 bg-blue">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Image
                  className="bg-blue"
                  height={100}
                  width={300}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  src={logo.src}
                  alt="Workflow"
                />
              </div>
            </div>

            {/* Signup logo */}
            <div className="flex justify-between">
              <div className="pr-5 pt-5">
                <ThemeButton />
              </div>
              {/* <div>
                <Image
                  className=""
                  src={profile}
                  alt=" "
                  width={60}
                  height={60}
                />
              </div> */}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
