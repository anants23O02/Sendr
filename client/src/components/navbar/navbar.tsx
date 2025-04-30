import { FC } from "react";
import { Search } from "lucide-react";
import { SearchBarProps } from "./navbarInterface";
import Image from "next/image";
import logo  from "../../../public/logo.svg"


const Navbar: FC<SearchBarProps> = ({ placeholder = "Search in Public Relations" }) => {
  return (
    <div className="bg-[#2e2e2e] rounded-md flex items-center justify-between w-full px-4 py-2">
    <div>
      <Image src={logo} alt="Logo" width={100} height={50} className="h-8 w-auto" />
    </div>
      <div className="flex items-center bg-[#808080] rounded-md px-4 py-4">
        <Search className="text-white opacity-70 mr-2 h-4 w-4" />
        <input
          type="text"
          placeholder={placeholder}
          className="bg-transparent text-white text-sm placeholder-white placeholder-opacity-70 focus:outline-none w-full"
        />
      </div>
    </div>
  );
};

export default Navbar;
